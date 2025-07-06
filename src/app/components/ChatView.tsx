"use client"
import { useConvex, useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { MessageContext } from '@/data/context/MessageContext';
import { UserDetailContext } from '@/data/context/UserDetailContext';
import Image from 'next/image';
import { ArrowUp, Loader2Icon, Bot } from 'lucide-react';
import Lookup from '@/data/Lookup';
import axios from 'axios';
import Prompt from '@/data/Prompt';

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext<any>(MessageContext);
  const { userDetail, setUserDetail } = useContext<any>(UserDetailContext);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages)
  const router = useRouter();

  useEffect(() => {
    if (!userDetail?.name) {
      router.push('/');
    }
  }, [userDetail, router]);

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id as any,
      });
      setMessages(result?.message || []);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === 'user') {
        GetAiResponse()
      }
    }
  }, [messages])
  
  const GetAiResponse = async () => {
    setLoading(true)
    try {
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT
      const result = await axios.post('/api/ai-chat', {
        prompt: PROMPT
      })
      const aiResponse = { role: 'ai', content: result.data.result }
      setMessages((prev: any) => [...prev, aiResponse]);
      await UpdateMessages({
        message: [...messages, aiResponse],
        workspaceId: id as any
      })
    } catch (error) {
      console.error("Error getting AI response:", error);
    }
    setLoading(false)
  }

  const onGenerate = (input: any) => {
    if (!input.trim()) return;
    setMessages((prev: any) => [...prev, { role: 'user', content: input }]);
    setUserInput('');
  }

  return (
    <div className='h-full flex flex-col bg-card rounded-xl border border-border'>
      {/* Header */}
      <div className='p-3 border-b border-border'>
        <h2 className='font-semibold text-foreground text-sm'>Chat</h2>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-3 space-y-3'>
        {Array.isArray(messages) && messages?.map((msg: any, index: number) => (
          <div key={index} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0'>
                <Bot className='w-3 h-3 text-white' />
              </div>
            )}
            
            <div className={`max-w-[80%] p-2.5 rounded-xl ${
              msg.role === 'user' 
                ? 'bg-primary text-white' 
                : 'bg-muted text-foreground'
            }`}>
              <p className='text-xs whitespace-pre-wrap'>{msg.content}</p>
            </div>
            
            {msg.role === 'user' && userDetail?.picture && (
              <Image
                src={userDetail.picture}
                alt='User'
                width={24}
                height={24}
                className='rounded-full flex-shrink-0'
              />
            )}
          </div>
        ))}
        
        {loading && (
          <div className='flex gap-2 justify-start'>
            <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0'>
              <Bot className='w-3 h-3 text-white' />
            </div>
            <div className='bg-muted p-2.5 rounded-xl flex items-center gap-1.5'>
              <Loader2Icon className='animate-spin w-3 h-3 text-muted-foreground'/>
              <span className='text-xs text-muted-foreground'>Thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="relative">
          <textarea
            placeholder="Ask me anything..."
            className="w-full p-2.5 pr-10 bg-background border border-border rounded-lg resize-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary smooth-transition text-xs"
            rows={2}
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onGenerate(userInput);
              }
            }}
          />
          <button
            onClick={() => onGenerate(userInput)}
            className={`absolute bottom-1.5 right-1.5 w-6 h-6 rounded-md flex items-center justify-center smooth-transition ${
              userInput.trim() 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            disabled={!userInput.trim()}
          >
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;