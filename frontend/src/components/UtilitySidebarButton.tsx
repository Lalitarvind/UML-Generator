import { Button } from './ui/button';
import type { LucideIcon } from 'lucide-react';

interface UtilitySidebarButtonProps {
  Icon: LucideIcon;
  label: string;
  nodeType: string;
  onClick: (nodeType: string) => void;
}

export default function UtilitySidebarButton({ Icon, label, nodeType, onClick }: UtilitySidebarButtonProps) {
  function onDragStart(event: React.DragEvent) {
    event.dataTransfer.setData('application/reactflow-nodetype', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing"
    >
      <Button
        variant="secondary"
        size="icon"
        className="size-12"
        onClick={() => onClick(nodeType)}
        title={label}
      >
        <Icon size={20} />
      </Button>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
