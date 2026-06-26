export default function PlaygroundHeader() {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between bg-[#3A2990] px-4 py-3 text-white shrink-0">
            <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold">Auto UML</h1>
            </div>
            <div>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </header>
    );
}