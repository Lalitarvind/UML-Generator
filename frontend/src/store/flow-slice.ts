import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
} from '@xyflow/react';
import {  applyNodeChanges, applyEdgeChanges, addEdge} from '@xyflow/react';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
};

const initialState: RFState = {
    nodes : [],
    edges : []
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
            state.edges = addEdge(action.payload, state.edges);
        },
        updateNodeLabel(state, action: PayloadAction<{nodeId:string, label: string}>){
            state.nodes = state.nodes.map((node)=>{
                if (node.id===action.payload.nodeId){
                    node.data = {...node.data, label: action.payload.label};
                }
                return node
            })
        }
    }
})

export const reactFlowActions = reactFlowSlice.actions;

export default reactFlowSlice;