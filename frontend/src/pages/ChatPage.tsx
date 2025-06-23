import { Home, FileText, FilePlus, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#3C2A92] text-white flex flex-col px-4 py-6">
        <div className="text-2xl font-bold mb-10">
          <span className="text-purple-200">Logo</span>
          <span className="text-pink-300">Name</span>
        </div>
        <nav className="space-y-4">
          <SidebarLink icon={<Home size={18} />} text="Home" />
          <SidebarLink icon={<FileText size={18} />} text="Documents" />
          <SidebarLink icon={<FilePlus size={18} />} text="Templates" />
          <SidebarLink icon={<Puzzle size={18} />} text="Integrations" />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="text-center text-red-500 text-lg font-semibold mb-6">
          Ask Whatever you want!
        </div>

        <div className="flex justify-end">
          <div className="bg-white w-[400px] shadow-lg rounded border">
            <div className="bg-red-300 px-4 py-2 text-white font-semibold">
              ChatBot <span className="text-sm">🟢 Online</span>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <BotMessage text="Hi, how can I help you?" />
              <UserMessage text="How are you?" />
              <BotMessage text="Fine thanks!" />
              <UserMessage text="Where are you?" />
              <BotMessage text="I'm in Shampipour College!" />
            </div>
            <div className="border-t p-2 flex items-center">
              <Input className="flex-1" placeholder="Ask your question..." />
              <Button className="ml-2">➤</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function SidebarLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-white hover:text-purple-300 cursor-pointer">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

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
