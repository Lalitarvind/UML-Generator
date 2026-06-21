import { reactFlowActions } from '@/store/flow-slice';
import { useAppDispatch } from '@/store/hooks';

export type DiagramMutation = {
  action: 'addNode' | 'addEdge' | 'updateNodeLabel' | 'removeNode' | 'removeEdge';
  payload: Record<string, unknown>;
};

export function useDiagramMutations() {
  const dispatch = useAppDispatch();

  function applyMutations(mutations: DiagramMutation[]) {
    for (const mutation of mutations) {
      switch (mutation.action) {
        case 'addNode':
          dispatch(reactFlowActions.addNode(mutation.payload as Parameters<typeof reactFlowActions.addNode>[0]));
          break;
        case 'addEdge':
          dispatch(reactFlowActions.addEdgeWithType(mutation.payload as Parameters<typeof reactFlowActions.addEdgeWithType>[0]));
          break;
        case 'updateNodeLabel':
          dispatch(reactFlowActions.updateNodeLabel(mutation.payload as Parameters<typeof reactFlowActions.updateNodeLabel>[0]));
          break;
        case 'removeNode':
          dispatch(reactFlowActions.onNodesChange([{ type: 'remove', id: mutation.payload.nodeId as string }]));
          break;
        case 'removeEdge':
          dispatch(reactFlowActions.onEdgesChange([{ type: 'remove', id: mutation.payload.edgeId as string }]));
          break;
      }
    }
  }

  return { applyMutations };
}
