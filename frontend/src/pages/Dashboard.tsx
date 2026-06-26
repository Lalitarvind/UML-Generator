import { Search, Star, Home, Inbox, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

type Item = {
  title: string;
  url: string;
  Icon: React.ElementType;
};

const navItems: Item[] = [
  {
    title: 'Home',
    url: '#',
    Icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    Icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    Icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    Icon: Search,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <nav className="w-56 shrink-0 border-r border-gray-200 bg-gray-50 flex flex-col p-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">
          Application
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.url}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <item.Icon size={18} />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 w-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center w-1/2 border border-gray-300 rounded-md px-3 py-2 bg-white">
            <Search className="text-gray-500 mr-2" size={16} />
            <input
              placeholder="Search"
              className="flex-1 text-sm outline-none bg-transparent"
            />
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
              <div className="p-4 flex flex-col items-center bg-white shadow-md rounded-lg hover:shadow-xl transition w-40 border border-gray-100">
                <span className="text-4xl">💬</span>
                <p className="mt-2 font-medium">New Chat</p>
              </div>
            </Link>

            {/* Playground Card */}
            <Link to="/dashboard/playground" className="w-40">
              <div className="p-4 flex flex-col items-center bg-white shadow-md rounded-lg hover:shadow-xl transition w-40 border border-gray-100">
                <span className="text-4xl">🛠️</span>
                <p className="mt-2 font-medium">New Playground</p>
              </div>
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
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition relative bg-white"
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
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
