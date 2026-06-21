import { User, Circle, Square } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { reactFlowActions } from '@/store/flow-slice';
import UtilitySidebarButton from './UtilitySidebarButton';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from './ui/sidebar';

const NODE_TYPES = [
  { nodeType: 'actorNode', label: 'Actor', Icon: User },
  { nodeType: 'useCaseNode', label: 'Use Case', Icon: Circle },
  { nodeType: 'systemBoundaryNode', label: 'System', Icon: Square },
];

export default function UtilitySidebar() {
  const dispatch = useDispatch();

  function handleAddNode(nodeType: string) {
    dispatch(reactFlowActions.addNode({ nodeType }));
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nodes</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-3 gap-2 p-2">
              {NODE_TYPES.map(({ nodeType, label, Icon }) => (
                <UtilitySidebarButton
                  key={nodeType}
                  Icon={Icon}
                  label={label}
                  nodeType={nodeType}
                  onClick={handleAddNode}
                />
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Edges</SidebarGroupLabel>
          <SidebarGroupContent />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
