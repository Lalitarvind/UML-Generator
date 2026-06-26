import { Handle, type NodeProps, type Node, Position, NodeResizer } from '@xyflow/react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { reactFlowActions } from '@/store/flow-slice';

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
        minWidth={60}
        minHeight={80}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
        <svg
          viewBox="0 0 40 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ flex: 1, width: '100%', minHeight: 0 }}
        >
          <circle cx="20" cy="10" r="8" fill="none" stroke="#3A2990" strokeWidth="2" />
          <line x1="20" y1="18" x2="20" y2="38" stroke="#3A2990" strokeWidth="2" />
          <line x1="4" y1="26" x2="36" y2="26" stroke="#3A2990" strokeWidth="2" />
          <line x1="20" y1="38" x2="8" y2="56" stroke="#3A2990" strokeWidth="2" />
          <line x1="20" y1="38" x2="32" y2="56" stroke="#3A2990" strokeWidth="2" />
        </svg>
        <input
          defaultValue={props.data.label}
          onChange={(event) => dispatch(reactFlowActions.updateNodeLabel(
            { nodeId: props.id, label: event.target.value }
          ))}
          style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}
        />
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}
 
export default memo(ActorNode);