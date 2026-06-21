// src/pages/Playground.tsx
import { useCallback } from 'react';
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
import UtilitySidebar from '@/components/UtilitySidebar';
import ChatbotPanel from '@/components/ChatbotPanel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { reactFlowActions } from '@/store/flow-slice';
import ActorNode from '@/components/NodeTypes/ActorNode';
import SystemBoundaryNode from '@/components/NodeTypes/SystemBoundaryNode';
import UseCaseNode from '@/components/NodeTypes/UseCaseNode';
import IncludeExcludeEdge from '@/components/EdgeTypes/IncludeExcludeEdge';
import { SidebarProvider } from '@/components/ui/sidebar';

const nodeTypes = {
  actorNode: ActorNode,
  systemBoundaryNode: SystemBoundaryNode,
  useCaseNode: UseCaseNode,
};

const edgeTypes = {
  includeExcludeEdge: IncludeExcludeEdge,
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
    <section
      className="flex-1 bg-gray-50 overflow-hidden"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
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
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <PlaygroundHeader />
      <SidebarProvider
        style={{
          '--sidebar-width': '20rem',
          '--sidebar-width-mobile': '20rem',
        } as React.CSSProperties}
      >
        <ReactFlowProvider>
          <main className="flex flex-1">
            <UtilitySidebar />
            <FlowCanvas />
            <ChatbotPanel />
          </main>
        </ReactFlowProvider>
      </SidebarProvider>
    </div>
  );
}
