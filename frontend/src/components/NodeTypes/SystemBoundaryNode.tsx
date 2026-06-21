import { type NodeProps, type Node, NodeResizer } from '@xyflow/react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { reactFlowActions } from '@/store/flow-slice';

export type SystemBoundaryNode = Node<
    {
      label: string;
    },
    'system_boundary'
>

function SystemBoundaryNode(props: NodeProps<SystemBoundaryNode>) {
  const dispatch = useDispatch()

  return (
    <>
      <NodeResizer
        color="#6d28d9"
        isVisible={props.selected}
        minWidth={200}
        minHeight={150}
      />
      {/* Rectangle with title bar at top, transparent interior for child nodes */}
      <div className="w-full h-full flex flex-col border-2 border-gray-600 bg-blue-50/20">
        {/* Title bar */}
        <div className="flex items-center justify-center border-b border-gray-600 bg-white/70 py-1 px-2 shrink-0">
          <input
            defaultValue={props.data.label}
            onChange={(event) =>
              dispatch(reactFlowActions.updateNodeLabel({ nodeId: props.id, label: event.target.value }))
            }
            className="nodrag text-center text-sm font-semibold bg-transparent outline-none w-full text-gray-800 placeholder:text-gray-400"
            placeholder="System Name"
          />
        </div>
        {/* Empty interior — child nodes are rendered here by React Flow */}
        <div className="flex-1" />
      </div>
    </>
  );
}

export default memo(SystemBoundaryNode);
