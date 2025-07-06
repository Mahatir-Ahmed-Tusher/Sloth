"use client";
import { Button } from '@/components/ui/button';
import { MessageContext } from '@/data/context/MessageContext';
import { UserDetailContext } from '@/data/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import { ArrowUp, Paperclip } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import LoginDialog from './LoginDialog';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Footer from './Footer';

const Hero = () => {
  const [userInput, setUserInput] = useState('');
  const messageContext = useContext(MessageContext);
  const userDetailContext = useContext(UserDetailContext);

  if (!messageContext || !userDetailContext) {
    throw new Error('MessageContext or UserDetailContext is not provided');
  }

  const { messages, setMessages } = messageContext;
  const { userDetail, setUserDetail } = userDetailContext;
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkSpace);
  const getUserData = useQuery(api.user.GetUser, 
    userDetail?.email ? { email: userDetail.email } : "skip"
  );
  const router = useRouter();

  const onGenerate = async (input: string) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    const msg = {
      role: 'user',
      content: input,
    };
    setMessages(msg as any);
    try {
      if (!getUserData?._id) {
        console.error("User not found in database");
        return;
      }
      const workspaceId = await CreateWorkspace({
        user: getUserData._id,
        message: [msg],
      });
      if (workspaceId) {
        router.push('/workspace/' + workspaceId);
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  const suggestions = [
    { emoji: '📺', text: 'Build a Netflix clone' },
    { emoji: '🛡️', text: 'Build an admin dashboard' },
    { emoji: '📋', text: 'Build a kanban board' },
    { emoji: '📁', text: 'Build a file manager' },
    { emoji: '📺', text: 'Build a YouTube clone' },
    { emoji: '🏪', text: 'Build a store page' },
    { emoji: '🏠', text: 'Build an Airbnb clone' },
    { emoji: '🎵', text: 'Build a Spotify clone' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dot-grid-dense">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8 lg:py-12">
        <div className="text-center space-y-2 md:space-y-3 max-w-3xl lg:max-w-4xl mb-4 md:mb-6">
          <div className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-2">
            <img
              src="/sloth.png"
              alt="Sloth Logo"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
          <h1 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 px-4 text-gray-900">
            Build Any Website with Sloth
          </h1>

          <pre
            className="font-sans text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 text-center mb-2 mt-0 text-gray-500"
            style={{ background: "transparent" }}
          >{`Transform your Idea into Reality with the power of AI`}</pre>

        </div>

        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mb-4 md:mb-6 px-4">
          <div
            className="relative rounded-2xl p-1.5 shadow-xl"
            style={{
              background: "#f8f5ee", // deep creamy background
              boxShadow: "0 4px 24px 0 rgba(180, 150, 100, 0.10)", // subtle shadow
              border: "1px solid #000", // thin black border
            }}
          >
            <textarea
              placeholder="Describe your app idea..."
              className="w-full h-24 sm:h-28 md:h-32 p-3 md:p-4 pr-10 md:pr-12 text-sm bg-transparent border-none resize-none outline-none placeholder:text-cream-600/60 text-cream-900 font-sans"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (userInput.trim()) {
              onGenerate(userInput);
            }
          }
              }}
            />
            <button
              onClick={() => userInput.trim() && onGenerate(userInput)}
              className={`absolute bottom-2 md:bottom-3 right-2 md:right-3 w-7 h-7 md:w-8 md:h-8 rounded-xl flex items-center justify-center smooth-transition clean-btn ${
          userInput.trim() 
            ? 'text-white hover:scale-105' 
            : 'bg-cream-200 text-cream-400 cursor-not-allowed'
              }`}
              disabled={!userInput.trim()}
            >
              <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            
            {/* Command indicator */}
            <div className="absolute bottom-2 md:bottom-3 left-3 md:left-4 flex items-center gap-1 md:gap-1.5 text-xs text-cream-600/70">
              <Paperclip className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span className="font-mono hidden sm:inline">⌘ Enter to submit</span>
              <span className="font-mono sm:hidden">Enter</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl px-4">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onGenerate(suggestion.text)}
              className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 border border-cream-200 bg-cream-100 rounded-xl text-xs text-cream-800 hover:bg-cream-200 smooth-transition hover:scale-105"
            >
              <span className="text-sm">{suggestion.emoji}</span>
              <span className="font-medium hidden sm:inline">{suggestion.text}</span>
              <span className="font-medium sm:hidden">{suggestion.text.split(' ').slice(0, 2).join(' ')}</span>
            </button>
          ))}
        </div>
        
        <LoginDialog openDialog={openDialog} closeDialog={(v: boolean) => setOpenDialog(v)} />
      </div>
      
      <div className="mt-6 md:mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Hero;