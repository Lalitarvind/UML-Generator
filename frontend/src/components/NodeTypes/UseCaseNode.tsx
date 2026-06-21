import { Handle, type NodeProps, type Node, Position, NodeResizer } from '@xyflow/react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { reactFlowActions } from '@/store/flow-slice';

export type UseCaseNode = Node<
    {
      label: string;
    },
    'use_case'
>

function UseCaseNode(props: NodeProps<UseCaseNode>) {
  const dispatch = useDispatch()

  return (
    <>
      <NodeResizer
        color="#6d28d9"
        isVisible={props.selected}
        minWidth={120}
        minHeight={50}
        keepAspectRatio={false}
      />
      {/* Ellipse: fills the node wrapper (sized via node.style) */}
      <div className="w-full h-full flex items-center justify-center border-2 border-gray-700 rounded-[50%] bg-white overflow-hidden">
        <input
          defaultValue={props.data.label}
          onChange={(event) =>
            dispatch(reactFlowActions.updateNodeLabel({ nodeId: props.id, label: event.target.value }))
          }
          className="nodrag text-center text-sm bg-transparent outline-none w-3/4 text-gray-800 placeholder:text-gray-400"
          placeholder="Use case"
        />
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(UseCaseNode);
