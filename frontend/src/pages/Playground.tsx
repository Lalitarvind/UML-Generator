// src/pages/Playground.tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Shapes } from 'lucide-react';
import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Playground() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-[#3A2990] p-4 text-white">
        <div className="flex items-center space-x-3">
          <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Auto UML</h1>
        </div>
        <div className="flex items-center bg-white rounded-md px-2 py-1">
          <Input className="border-none text-black focus:outline-none" placeholder="Search" />
        </div>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1">
        {/* Sidebar Tools */}
        <aside className="w-20 bg-gray-100 border-r p-4 flex flex-col items-center space-y-4">
          <Pencil />
          <Shapes />
          <Button size="icon" variant="ghost">⬜</Button>
          <Button size="icon" variant="ghost">🔺</Button>
          <Button size="icon" variant="ghost">🔷</Button>
        </aside>

        {/* Canvas Area */}
        <section className="flex-1 bg-gray-50 p-6 overflow-auto">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </section>
      </main>
    </div>
  );
}
