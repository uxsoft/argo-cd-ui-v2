"use client"

import { authAtom } from "@/shared/state";
import { useAtomValue } from "jotai";
import { memo, useEffect, useMemo, useState } from "react";
import { ResponseError, isResponseError } from "@/shared/types";
import * as Server from "./server"
import ReactFlow, { Background, Controls, Handle, Position } from "reactflow";
import 'reactflow/dist/style.css';
import dagre from "@dagrejs/dagre";
import { AppStore24Filled, ArrowRoutingRectangleMultiple20Filled, Box20Filled, ControlButton20Filled, Database20Filled, Link20Filled, Organization20Filled, Stack20Filled } from "@fluentui/react-icons";
import { Card, CardBody, CardHeader, Divider, Tooltip } from "@nextui-org/react";
import { Application, ApplicationTree } from "@/shared/argocd";
import { ComparisonStatusIcon, HealthStatusIcon } from "@/components/argo-utils";

const Node = (content: (label: string) => React.ReactNode) => memo(({ data }: { data: { label: string } }) => {
    return (
        <div className="bg-foreground text-background p-2 text-xs rounded-sm">
            <Handle
                type="target"
                position={Position.Left}
            />
            <div>
                {content(data.label)}
            </div>
            <Handle
                type="source"
                position={Position.Right}
            />
        </div>
    );
});

const ApplicationNode = Node((label) => (<>
    <Tooltip content="Application">
        <AppStore24Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

const IngressNode = Node((label) => (<>
    <Tooltip content="Ingress">
        <Link20Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

const ServiceNode = Node((label) => (<>
    <Tooltip content="Service">
        <Organization20Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

const PodNode = Node((label) => (<>
    <Tooltip content="Pod">
        <Box20Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

const StatefulSetNode = Node((label) => (<>
    <Tooltip content="StatefulSet">
        <Stack20Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

const PersistentVolumeClaimNode = Node((label) => (<>
    <Tooltip content="PersistentVolumeClaim">
        <Database20Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

const EndpointsNode = Node((label) => (<>
    <Tooltip content="Endpoints">
        <ArrowRoutingRectangleMultiple20Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

const ControllerRevisionNode = Node((label) => (<>
    <Tooltip content="ControllerRevision">
        <ControlButton20Filled className="mr-1" />
    </Tooltip>
    {label}
</>))

function graph(input: ApplicationTree | ResponseError, appName: string = "Application") {
    if (isResponseError(input) || !input.nodes) {
        return ({ nodes: [], edges: [] })
    }

    console.log(input)

    const edges = input.nodes.flatMap((node) => (node.parentRefs ?? [{ uid: "1" }]).map(r => (
        {
            id: `${r.uid}-${node.uid}`,
            source: r.uid,
            target: node.uid,
            type: "smoothstep"
        })))

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 172;
    const nodeHeight = 36;

    dagreGraph.setGraph({ rankdir: "LR" });

    input.nodes.forEach((node) => {
        dagreGraph.setNode(node.uid, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    let nodes = input.nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.uid);

        return ({
            id: node.uid,
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            type: node.kind,
            data: { label: node.name },
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            }
        });
    });

    const maxNodeY = nodes.map(n => n.position.y).reduce((prev, current) => Math.max(prev, current), 0)

    nodes.push({
        id: "1",
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        type: "Application",
        data: { label: appName },
        position: {
            x: -nodeWidth,
            y: maxNodeY / 2,
        }
    })

    return ({ nodes: nodes, edges: edges })
}

export default function ResourceTreePage({ params }: { params: { namespace: string, app: string } }) {
    const auth = useAtomValue(authAtom)
    const [resourceTree, setResourceTree] = useState({} as ApplicationTree | ResponseError)
    const [appDetail, setAppDetail] = useState({} as Application | ResponseError)
    useEffect(() => {
        if (auth.token) {
            Server.getResourceTree(auth.token, params.app, params.namespace)
                .then(setResourceTree)
                .catch(console.error)

            Server.getApplicationDetails(auth.token, params.app, params.namespace)
                .then(setAppDetail)
                .catch(console.error)
        }
    }, [auth.token]);

    const { nodes, edges } = useMemo(() => graph(resourceTree, (appDetail as Application)?.metadata?.name ?? "Application"), [resourceTree])

    const nodeTypes = {
        "Application": ApplicationNode,
        "Ingress": IngressNode,
        "Service": ServiceNode,
        "Pod": PodNode,
        "PersistentVolumeClaim": PersistentVolumeClaimNode,
        "StatefulSet": StatefulSetNode,
        "Endpoints": EndpointsNode,
        "ControllerRevision": ControllerRevisionNode
    }

    return (
        <div className="h-full flex flex-col">
            <Card className="m-4">
                <CardBody className="flex flex-row items-center justify-evenly overflow-hidden">
                    <div className="p-3 flex flex-col">
                        <div className="text-sm">
                            App Health
                        </div>
                        <div className="text-xl">
                            <HealthStatusIcon state={(appDetail as Application)?.status?.health} />
                            {(appDetail as Application)?.status?.health.status ?? "Unknown"}
                        </div>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="p-3 flex flex-col">
                        <div className="text-sm">
                            Sync Status
                        </div>
                        <div className="text-xl flex items-center">
                            <ComparisonStatusIcon status={(appDetail as Application)?.status?.sync.status} label={true} />
                        </div>
                        <div className="text-xs mt-2">
                            {(appDetail as Application)?.spec?.syncPolicy?.automated ? 'Auto sync is enabled.' : 'Auto sync is not enabled.'}
                        </div>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="p-3 flex flex-col">
                        <div className="text-sm">
                            Last Sync
                        </div>
                        <div className="text-xl">
                            {/* <AppHealthStatus app={appDetail as Application} /> */}
                        </div>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="p-3 flex flex-col">
                        <div className="text-sm">
                            Revision
                        </div>
                        <div className="text-xl">
                            {/* <AppHealthStatus app={appDetail as Application} /> */}
                        </div>
                    </div>
                </CardBody>

            </Card>
            <ReactFlow
                className="grow h-full w-full"
                nodes={nodes}
                edges={edges}
                fitView
                nodeTypes={nodeTypes}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>)
}