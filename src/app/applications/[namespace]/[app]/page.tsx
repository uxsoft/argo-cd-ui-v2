"use client"

import { authAtom } from "@/shared/state";
import { useAtomValue } from "jotai";
import { memo, useEffect, useMemo, useState } from "react";
import { ApplicationDetailResponse, ResourceTreeResponse } from "./types";
import { ResponseError, isResponseError } from "@/shared/types";
import * as Server from "./server"
import ReactFlow, { Background, Controls, Handle, Position } from "reactflow";
import 'reactflow/dist/style.css';
import dagre from "@dagrejs/dagre";
import { AppStore24Filled, Box20Filled, Database20Filled, Link20Filled, Organization20Filled, Stack20Filled } from "@fluentui/react-icons";

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
    <AppStore24Filled className="mr-1"/>
    {label}
</>))

const IngressNode = Node((label) => (<>
    <Link20Filled className="mr-1"/>
    {label}
</>))

const ServiceNode = Node((label) => (<>
    <Organization20Filled className="mr-1"/>
    {label}
</>))

const PodNode = Node((label) => (<>
    <Box20Filled className="mr-1"/>
    {label}
</>))

const StatefulSetNode = Node((label) => (<>
    <Stack20Filled className="mr-1"/>
    {label}
</>))

const PersistentVolumeClaimNode = Node((label) => (<>
    <Database20Filled className="mr-1"/>
    {label}
</>))



function graph(input: ResourceTreeResponse | ResponseError, appName: string = "Application") {
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

function ResourceTree(props: { namespace: string, app: string }) {
    const auth = useAtomValue(authAtom)
    const [resourceTree, setResourceTree] = useState({} as ResourceTreeResponse | ResponseError)
    const [appDetail, setAppDetail] = useState({} as ApplicationDetailResponse | ResponseError)
    useEffect(() => {
        if (auth.token) {
            Server.getResourceTree(auth.token, props.app, props.namespace)
                .then(setResourceTree)
                .catch(console.error)

            Server.getApplicationDetails(auth.token, props.app, props.namespace)
                .then(setAppDetail)
                .catch(console.error)
        }
    }, [auth.token]);

    const { nodes, edges } = useMemo(() => graph(resourceTree, (appDetail as ApplicationDetailResponse)?.metadata?.name ?? "Application"), [resourceTree])

    const nodeTypes = {
        "Application": ApplicationNode,
        "Ingress": IngressNode,
        "Service": ServiceNode,
        "Pod": PodNode,
        "PersistentVolumeClaim": PersistentVolumeClaimNode,
        "StatefulSet": StatefulSetNode
    }

    return (<div>
        {(appDetail as ApplicationDetailResponse)?.metadata?.name}
        <div style={{ height: 800, width: "100%" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                nodeTypes={nodeTypes}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    </div>)
}

export default function ApplicationPage({ params }: { params: { namespace: string, app: string } }) {
    return (<div>
        {params.namespace}
        {params.app}
        <ResourceTree namespace={params.namespace} app={params.app} />
    </div>)
}