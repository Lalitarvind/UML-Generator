import { Handle, type NodeProps, type Node, Position, NodeResizer } from '@xyflow/react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { reactFlowActions } from '@/store/flow-slice';

export type TextNode = Node<
    {
      label: string;
    },
    'textNode'
>

function TextNode(props: NodeProps<TextNode>) {
  const dispatch = useDispatch()

  return (
    <>
      <NodeResizer
        color="#3A2990"
        isVisible={props.selected}
        minWidth={100}
        minHeight={50}
      />
      <div className="w-full h-full flex">
        <textarea
          defaultValue={props.data.label}
          onChange={(event) => dispatch(reactFlowActions.updateNodeLabel(
            { nodeId: props.id, label: event.target.value }
          ))}
          className="nodrag w-full h-full resize-none outline-none bg-transparent text-sm text-gray-800 p-1 placeholder:text-gray-400"
          placeholder="Type text..."
        />
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(TextNode);
