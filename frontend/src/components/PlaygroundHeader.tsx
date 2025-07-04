import { Input } from '@/components/ui/input';

export default function PlaygroundHeader(){
    return (
        <>
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
        </>
    )
}