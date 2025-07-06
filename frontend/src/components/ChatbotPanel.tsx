import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

export default function ChatbotPanel(){
    return (
        <>
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
        </>
    )
}