import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
} from '@xyflow/react';
import { nanoid } from "nanoid";
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
        },
        addNode(state, action: PayloadAction<{nodeType:string, parentId?:string}>){
            const id = nanoid()
            let parent_details = {}
            if (action.payload.parentId){
                parent_details = {
                    extent: 'parent',
                    parentId: action.payload.parentId
                }
            }
            const newNode = {
                id,
                ...parent_details,
                position: {
                        x: Math.random() * 500,
                        y: Math.random() * 500,
                    },
                data: {
                    label: `${action.payload.nodeType} ${id}`,
                },
            };
            state.nodes = [...state.nodes,newNode]
        }
    }
})

export const reactFlowActions = reactFlowSlice.actions;

export default reactFlowSlice;