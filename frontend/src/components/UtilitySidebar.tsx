import { User, Circle, Square } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import { reactFlowActions } from '@/store/flow-slice';
import UtilitySidebarButton from './UtilitySidebarButton';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from './ui/sidebar';

const NODE_TYPES = [
  { nodeType: 'actorNode', label: 'Actor', Icon: User },
  { nodeType: 'useCaseNode', label: 'Use Case', Icon: Circle },
  { nodeType: 'systemBoundaryNode', label: 'System', Icon: Square },
];

const EDGE_TYPES = [
  {
    edgeType: 'solidLineEdge',
    label: 'Line',
    preview: (
      <svg width="48" height="24" viewBox="0 0 48 24">
        <line x1="4" y1="12" x2="44" y2="12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    edgeType: 'solidArrowEdge',
    label: 'Arrow',
    preview: (
      <svg width="48" height="24" viewBox="0 0 48 24">
        <defs>
          <marker id="prev-solid-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
          </marker>
        </defs>
        <line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#prev-solid-arrow)" />
      </svg>
    ),
  },
  {
    edgeType: 'dashedLineEdge',
    label: 'Dashed',
    preview: (
      <svg width="48" height="24" viewBox="0 0 48 24">
        <line x1="4" y1="12" x2="44" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
      </svg>
    ),
  },
  {
    edgeType: 'dashedArrowEdge',
    label: 'Dashed Arrow',
    preview: (
      <svg width="48" height="24" viewBox="0 0 48 24">
        <defs>
          <marker id="prev-dashed-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
          </marker>
        </defs>
        <line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#prev-dashed-arrow)" />
      </svg>
    ),
  },
  {
    edgeType: 'includeExcludeEdge',
    label: 'Include/Extend',
    preview: (
      <svg width="48" height="24" viewBox="0 0 48 24">
        <defs>
          <marker id="prev-include-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polyline points="0 0, 8 3, 0 6" fill="none" stroke="currentColor" strokeWidth="1" />
          </marker>
        </defs>
        <line x1="4" y1="9" x2="36" y2="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" markerEnd="url(#prev-include-arrow)" />
        <text x="24" y="22" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="sans-serif">
          {'<<label>>'}
        </text>
      </svg>
    ),
  },
];

export default function UtilitySidebar() {
  const dispatch = useDispatch();
  const activeEdgeType = useAppSelector((state) => state.flow.activeEdgeType);

  function handleAddNode(nodeType: string) {
    dispatch(reactFlowActions.addNode({ nodeType }));
  }

  return (
    <Sidebar collapsible="none">
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
          <SidebarGroupContent>
            <div className="grid grid-cols-2 gap-2 p-2">
              {EDGE_TYPES.map(({ edgeType, label, preview }) => (
                <button
                  key={edgeType}
                  onClick={() => dispatch(reactFlowActions.setActiveEdgeType(edgeType))}
                  className={`flex flex-col items-center gap-1 p-2 rounded-md border-2 transition-colors ${
                    activeEdgeType === edgeType
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-transparent hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                  title={label}
                >
                  {preview}
                  <span className="text-xs leading-tight text-center">{label}</span>
                </button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
