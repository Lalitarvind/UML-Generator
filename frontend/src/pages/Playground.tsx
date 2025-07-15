// src/pages/Playground.tsx
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PlaygroundHeader from '@/components/PlaygroundHeader';
import UtilitySidebar from '@/components/UtilitySidebar';
import ChatbotPanel from '@/components/ChatbotPanel';
import { useDispatch, useSelector } from 'react-redux';
import { reactFlowActions, type RFState } from '@/store/flow-slice';
import ActorNode from '@/components/NodeTypes/ActorNode';

export default function Playground() {
  const nodes = useSelector((state:RFState) => state.nodes)
  const edges = useSelector((state:RFState) => state.edges)
  
  const dispatch = useDispatch()
  
  const nodeTypes = {actorNode: ActorNode}

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      <PlaygroundHeader/>
      {/* Content */}
      <main className="flex flex-1">
        <UtilitySidebar/>
        {/* Canvas Area */}
        <section className="flex-1 bg-gray-50 p-6 overflow-auto">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={(changes)=>dispatch(reactFlowActions.onNodesChange(changes))}
              onEdgesChange={(changes)=>dispatch(reactFlowActions.onEdgesChange(changes))}
              onConnect={(changes)=>dispatch(reactFlowActions.onConnect(changes))}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </ReactFlowProvider>
        </section>
        <ChatbotPanel/>
      </main>
    </div>
  );
}
