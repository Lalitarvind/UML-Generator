import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3A2990] text-white flex flex-col items-center py-6 space-y-8">
        <div className="flex items-center space-x-2">
          <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Auto UML</h1>
        </div>
        <nav className="space-y-4 text-left w-full px-6">
          <a href="#" className="block hover:underline">
            🏠 Home
          </a>
          <a href="#" className="block hover:underline">
            📄 Documents
          </a>
          <a href="#" className="block hover:underline">
            📃 Templates
          </a>
          <a href="#" className="block hover:underline">
            📄 Integrations
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center w-1/2">
            <Search className="text-gray-500 mr-2" />
            <Input placeholder="Search" className="w-full" />
          </div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        {/* Welcome & Dummy Content */}
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
                Welcome <span className="text-purple-700">Username</span>,
            </h2>
        <div className="flex space-x-4">
            {/* New Chat Card */}
            <Link to="/dashboard/chat" className="w-40">
            <Card className="p-4 flex flex-col items-center bg-white shadow-md rounded-lg hover:shadow-xl transition w-40">
                <span className="text-4xl">💬</span>
                <p className="mt-2 font-medium">New Chat</p>
            </Card>
            </Link>

            {/* Playground Card */}
            <Link to="/dashboard/playground" className="w-40">
            <Card className="p-4 flex flex-col items-center bg-white shadow-md rounded-lg hover:shadow-xl transition w-40">
                <span className="text-4xl">🛠️</span>
                <p className="mt-2 font-medium">New Playground</p>
            </Card>
            </Link>

            
        </div>
        </div>


        {/* Recent Documents */}
        <div>
          <h3 className="text-xl font-medium mb-4">
            Recent <span className="text-red-500">Documents</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition relative"
              >
                <div className="absolute top-2 right-2 text-red-400">
                  <Star fill="currentColor" size={16} />
                </div>
                <p className="text-sm font-semibold mb-2">File Name</p>
                <img
                  src="https://via.placeholder.com/120x100.png?text=UML+TYPE"
                  alt="uml preview"
                  className="rounded-lg border"
                />
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
