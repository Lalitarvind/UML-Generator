import { Handle, type NodeProps, type Node, Position, NodeResizer } from '@xyflow/react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { reactFlowActions } from '@/store/flow-slice';
import actorPng from '@assets/actor.png';

export type ActorNode = Node<
    {
      label: string;
    },
    'actor'
>
 
function ActorNode(props: NodeProps<ActorNode>) {
  const dispatch = useDispatch()

  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={props.selected}
        minWidth={100}
        minHeight={30}
      />
      <img src={actorPng}/>
      <input 
      defaultValue={props.data.label} 
      onChange={
        (event)=>dispatch(reactFlowActions.updateNodeLabel(
          {nodeId:props.id, label:event.target.value}
      ))}/>
 
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}
 
export default memo(ActorNode);