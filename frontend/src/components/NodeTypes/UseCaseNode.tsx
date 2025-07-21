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
        color="#ff0071"
        isVisible={props.selected}
        minWidth={100}
        minHeight={30}
      />
      <div className='rounded-lg'>
        <input 
        defaultValue={props.data.label} 
        onChange={
            (event)=>dispatch(reactFlowActions.updateNodeLabel(
            {nodeId:props.id, label:event.target.value}
        ))}/>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}
 
export default memo(UseCaseNode);