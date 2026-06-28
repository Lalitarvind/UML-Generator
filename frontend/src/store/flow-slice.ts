import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
} from '@xyflow/react';
import { nanoid } from "nanoid";
import { applyNodeChanges, applyEdgeChanges, addEdge, MarkerType } from '@xyflow/react';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  activeEdgeType: string;
};

const initialState: RFState = {
    nodes : [],
    edges : [],
    activeEdgeType: 'solidArrowEdge',
}

const reactFlowSlice = createSlice({
    name: 'ReactFlow',
    initialState,
    reducers:{
        onNodesChange(state,action: PayloadAction<NodeChange[]>) {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        onEdgesChange(state, action: PayloadAction<EdgeChange[]>) {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },
        onConnect(state, action: PayloadAction<Connection>){
            const edgeType = state.activeEdgeType;
            const markerEnd =
                edgeType === 'solidArrowEdge' || edgeType === 'dashedArrowEdge'
                    ? { type: MarkerType.ArrowClosed }
                    : edgeType === 'includeExcludeEdge'
                    ? { type: MarkerType.Arrow }
                    : undefined;
            state.edges = addEdge(
                { ...action.payload, type: edgeType, ...(markerEnd && { markerEnd }) },
                state.edges,
            );
        },
        setActiveEdgeType(state, action: PayloadAction<string>) {
            state.activeEdgeType = action.payload;
        },
        updateNodeLabel(state, action: PayloadAction<{nodeId:string, label: string}>){
            state.nodes = state.nodes.map((node)=>{
                if (node.id===action.payload.nodeId){
                    node.data = {...node.data, label: action.payload.label};
                }
                return node
            })
        },
        setNodes(state, action: PayloadAction<Node[]>) {
            // Cast required: @xyflow/react Node has readonly arrays that conflict with Immer's WritableDraft
            state.nodes = action.payload as unknown as typeof state.nodes;
        },
        setEdges(state, action: PayloadAction<Edge[]>) {
            state.edges = action.payload as unknown as typeof state.edges;
        },
        addEdgeWithType(state, action: PayloadAction<{source:string, target:string, edgeType:string, label?:string}>) {
            const { source, target, edgeType, label } = action.payload;
            const markerEnd =
                edgeType === 'solidArrowEdge' || edgeType === 'dashedArrowEdge'
                    ? { type: MarkerType.ArrowClosed }
                    : edgeType === 'includeExcludeEdge'
                    ? { type: MarkerType.Arrow }
                    : undefined;
            const newEdge: Edge = {
                id: nanoid(),
                source,
                target,
                type: edgeType,
                data: { label: label ?? '' },
                ...(markerEnd && { markerEnd }),
            };
            state.edges = [...state.edges, newEdge];
        },
        addNode(state, action: PayloadAction<{nodeType:string, parentId?:string, position?:{x:number,y:number}, label?:string}>){
            const id = nanoid()
            let parent_details = {}
            if (action.payload.parentId){
                parent_details = {
                    extent: 'parent',
                    parentId: action.payload.parentId
                }
            }
            const defaultStyles: Record<string, { width: number; height: number }> = {
                actorNode: { width: 80, height: 100 },
                useCaseNode: { width: 180, height: 80 },
                systemBoundaryNode: { width: 400, height: 300 },
                textNode: { width: 160, height: 80 },
            };
            const newNode = {
                id,
                type: action.payload.nodeType,
                ...parent_details,
                position: action.payload.position ?? { x: 250, y: 150 },
                style: defaultStyles[action.payload.nodeType] ?? {},
                data: {
                    label: action.payload.label ?? `${action.payload.nodeType} ${id}`,
                },
            };
            state.nodes = [...state.nodes,newNode]
        }
    }
})

export const reactFlowActions = reactFlowSlice.actions;

export default reactFlowSlice;