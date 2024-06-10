"use client"

import { authAtom } from "@/shared/state";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { ApplicationDetailResponse, ResourceTreeResponse } from "./types";
import { ResponseError, isResponseError } from "@/shared/types";
import * as Server from "./server"
import ReactFlow, { Background, Controls, Position } from "reactflow";
import 'reactflow/dist/style.css';
import dagre from "@dagrejs/dagre";


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

    const initialNodes = [
        {
            id: '1',
            data: { label: 'Hello' },
            type: 'input',
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 100, y: 100 },
        },
    ];

    return (<div>
        {(appDetail as ApplicationDetailResponse)?.metadata?.name}
        <div style={{ height: 800, width: "100%" }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
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