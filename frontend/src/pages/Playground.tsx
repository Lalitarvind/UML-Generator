// src/pages/Playground.tsx
import { useCallback, useState } from 'react';
import type React from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PlaygroundHeader from '@/components/PlaygroundHeader';
import { Pencil, Bot } from 'lucide-react';
import UtilitySidebar from '@/components/UtilitySidebar';
import ChatbotPanel from '@/components/ChatbotPanel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { reactFlowActions } from '@/store/flow-slice';
import ActorNode from '@/components/NodeTypes/ActorNode';
import SystemBoundaryNode from '@/components/NodeTypes/SystemBoundaryNode';
import UseCaseNode from '@/components/NodeTypes/UseCaseNode';
import TextNode from '@/components/NodeTypes/TextNode';
import IncludeExcludeEdge from '@/components/EdgeTypes/IncludeExcludeEdge';
import {
  SolidLineEdge,
  SolidArrowEdge,
  DashedLineEdge,
  DashedArrowEdge,
} from '@/components/EdgeTypes/BasicEdges';
const nodeTypes = {
  textNode: TextNode,
  actorNode: ActorNode,
  systemBoundaryNode: SystemBoundaryNode,
  useCaseNode: UseCaseNode,
};

const edgeTypes = {
  includeExcludeEdge: IncludeExcludeEdge,
  solidLineEdge: SolidLineEdge,
  solidArrowEdge: SolidArrowEdge,
  dashedLineEdge: DashedLineEdge,
  dashedArrowEdge: DashedArrowEdge,
};

// Inner component so useReactFlow() is inside ReactFlowProvider
function FlowCanvas() {
  const { screenToFlowPosition } = useReactFlow();
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData('application/reactflow-nodetype');
      if (!nodeType) return;
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      dispatch(reactFlowActions.addNode({ nodeType, position }));
    },
    [screenToFlowPosition, dispatch]
  );

  return (
    <section className="flex-1 bg-gray-50 overflow-hidden" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(changes) => dispatch(reactFlowActions.onNodesChange(changes))}
        onEdgesChange={(changes) => dispatch(reactFlowActions.onEdgesChange(changes))}
        onConnect={(connection) => dispatch(reactFlowActions.onConnect(connection))}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </section>
  );
}

export default function Playground() {
  const [activePanel, setActivePanel] = useState<'edit' | 'ai'>('edit');

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      <PlaygroundHeader />
      <ReactFlowProvider>
        <main className="flex flex-1 overflow-hidden relative">
          {activePanel === 'edit' && <UtilitySidebar />}
          <FlowCanvas />
          {activePanel === 'ai' && <ChatbotPanel />}

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-1 gap-0.5">
            <button
              onClick={() => setActivePanel('edit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activePanel === 'edit'
                  ? 'bg-[#3A2990] text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Pencil size={13} />
              Edit
            </button>
            <button
              onClick={() => setActivePanel('ai')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activePanel === 'ai'
                  ? 'bg-[#3A2990] text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Bot size={13} />
              AI
            </button>
          </div>
        </main>
      </ReactFlowProvider>
    </div>
  );
}
