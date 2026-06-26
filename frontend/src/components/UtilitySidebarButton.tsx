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
      <button
        className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        onClick={() => onClick(nodeType)}
        title={label}
      >
        <Icon size={20} />
      </button>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
