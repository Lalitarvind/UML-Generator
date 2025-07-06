// src/pages/Playground.tsx
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PlaygroundHeader from '@/components/PlaygroundHeader';
import UtilitySidebar from '@/components/UtilitySidebar';
import ChatbotPanel from '@/components/ChatbotPanel';
import { useDispatch, useSelector } from 'react-redux';
import { reactFlowActions, type RFState } from '@/store/flow-slice';

export default function Playground() {
  const nodes = useSelector((state:RFState) => state.nodes)
  const edges = useSelector((state:RFState) => state.edges)

  
  const dispatch = useDispatch()
  
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      <PlaygroundHeader/>
      {/* Content */}
      <main className="flex flex-1">
        <UtilitySidebar/>
        {/* Canvas Area */}
        <section className="flex-1 bg-gray-50 p-6 overflow-auto">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(changes)=>dispatch(reactFlowActions.onNodesChange(changes))}
            onEdgesChange={(changes)=>dispatch(reactFlowActions.onEdgesChange(changes))}
            onConnect={(changes)=>dispatch(reactFlowActions.onConnect(changes))}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </section>
        <ChatbotPanel/>
      </main>
    </div>
  );
}
