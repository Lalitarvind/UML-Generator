import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { chatActions } from '@/store/chat-slice';
import { useDiagramMutations, type DiagramMutation } from '@/hooks/useDiagramMutations';

function BotMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <Bot size={16} className="mt-0.5 shrink-0 text-purple-600" />
      <p className="text-sm">{text}</p>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 justify-end">
      <p className="text-sm bg-purple-100 px-3 py-1.5 rounded-2xl max-w-[80%]">{text}</p>
      <User size={16} className="mt-0.5 shrink-0 text-gray-500" />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <Bot size={16} className="mt-0.5 shrink-0 text-purple-600" />
      <div className="flex gap-1 items-center">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default function ChatbotPanel() {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);

  const { applyMutations } = useDiagramMutations();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  async function handleSend() {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    dispatch(chatActions.addMessage({ role: 'user', content: text }));
    setInputValue('');
    dispatch(chatActions.setLoading(true));
    dispatch(chatActions.setError(null));

    try {
      const token = localStorage.getItem('auth_token');
      const history = messages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message: text,
          diagram_state: { nodes, edges },
          history,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? 'Request failed');
      }

      const data = await res.json();
      dispatch(chatActions.addMessage({ role: 'assistant', content: data.reply }));

      if (data.mutations?.length) {
        applyMutations(data.mutations as DiagramMutation[]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';
      dispatch(chatActions.setError(message));
      dispatch(chatActions.addMessage({ role: 'assistant', content: `Error: ${message}` }));
    } finally {
      dispatch(chatActions.setLoading(false));
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <aside className="w-[400px] border-l border-gray-200 bg-white flex flex-col">
      <div className="text-lg font-semibold text-purple-700 p-4 pb-2 border-b border-gray-200 text-center">
        UML Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <BotMessage text="Hi! Describe your UML diagram and I'll help you build it. Try: 'Add an actor named Customer'" />
        )}
        {messages.map((msg) =>
          msg.role === 'user' ? (
            <UserMessage key={msg.id} text={msg.content} />
          ) : (
            <BotMessage key={msg.id} text={msg.content} />
          )
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-gray-200 p-3">
        <input
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-[#3A2990] focus:ring-1 focus:ring-[#3A2990] disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Ask your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className="p-2 bg-[#3A2990] text-white rounded-md hover:bg-[#2e2070] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
        >
          <Send size={16} />
        </button>
      </div>
    </aside>
  );
}
