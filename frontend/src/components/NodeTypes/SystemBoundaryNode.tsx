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
      <input 
      defaultValue={props.data.label} 
      onChange={
        (event)=>dispatch(reactFlowActions.updateNodeLabel(
          {nodeId:props.id, label:event.target.value}
      ))}/>
      <NodeResizer
        color="#ff0071"
        isVisible={props.selected}
        minWidth={500}
        minHeight={1000}
      />
    </>
  );
}
 
export default memo(SystemBoundaryNode);