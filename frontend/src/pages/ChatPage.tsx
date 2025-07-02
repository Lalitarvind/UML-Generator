import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Shapes } from 'lucide-react';
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
import { useCallback } from 'react';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 150, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function ChatPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-[#3A2990] p-4 text-white">
        <div className="flex items-center space-x-3">
          <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Auto UML</h1>
        </div>
        <div className="flex items-center bg-white rounded-md px-2 py-1">
          <Input className="border-none text-black focus:outline-none" placeholder="Search" />
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </header>

      {/* Content Area */}
      <main className="flex flex-1">
        {/* Sidebar Tools */}
        <aside className="w-20 bg-gray-100 border-r p-4 flex flex-col items-center space-y-4">
          <Pencil />
          <Shapes />
          <Button size="icon" variant="ghost">⬜</Button>
          <Button size="icon" variant="ghost">🔺</Button>
          <Button size="icon" variant="ghost">🔷</Button>
        </aside>

        {/* ReactFlow Canvas */}
        <section className="flex-1 bg-gray-50 p-4 overflow-auto">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <MiniMap />
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </section>

        {/* ChatBot Panel */}
        <aside className="w-[400px] border-l bg-white p-4 flex flex-col">
          <div className="text-lg font-semibold text-red-500 mb-2 text-center">Ask Whatever you want!</div>
          <div className="flex-1 space-y-2 text-sm overflow-y-auto">
            <BotMessage text="Hi, how can I help you?" />
            <UserMessage text="How are you?" />
            <BotMessage text="I'm doing great, thanks!" />
          </div>
          <div className="mt-auto flex items-center border-t pt-2">
            <Input className="flex-1" placeholder="Ask your question..." />
            <Button className="ml-2">➤</Button>
          </div>
        </aside>
      </main>
    </div>
  );
}

// Message Components
function BotMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span>🤖</span>
      <p>{text}</p>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end text-right">
      <p className="bg-red-200 px-3 py-1 rounded-full">{text}</p>
    </div>
  );
}
