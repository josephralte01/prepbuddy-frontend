// === File: frontend/pages/chat/[username].tsx ===
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/useUser';
import { useChatSocket } from '@/hooks/useChatSocket';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const { user } = useUser();
  const router = useRouter();
  const { username } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleIncoming = (msg: Message) => {
    if (msg.from === username || msg.to === username) {
      setMessages((prev) => [...prev, msg]);
    }
  };

  const { sendMessage } = useChatSocket(handleIncoming);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = {
      from: user?.username,
      to: username as string,
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    sendMessage(username as string, input);
    setInput('');
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 flex flex-col h-[90vh]">
      <h1 className="text-xl font-bold mb-4">Chat with @{username}</h1>

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs text-sm ${
              msg.from === user?.username ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            <p>{msg.content}</p>
            <span className="block text-[10px] text-gray-500 text-right">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2 pt-4 border-t mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
