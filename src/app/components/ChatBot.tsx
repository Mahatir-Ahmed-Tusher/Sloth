"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Send, Bot, User, Loader2 } from 'lucide-react'
import axios from 'axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you with Sloth. Ask me about our platform, subscription plans, features, or how to get started!',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await axios.post('/api/mistral-chat', {
        message: inputMessage
      })

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again later or contact our support team.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Window */}
      <div className="relative w-full max-w-sm md:max-w-md h-80 sm:h-96 md:h-[500px] bg-cream-50 border border-cream-200 rounded-2xl flex flex-col fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-cream-200 bg-cream-100 rounded-t-2xl">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Chatbot Sloth Logo */}
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center relative overflow-hidden'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='relative w-full h-full'>
                  <div className='absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cream-100 rounded-full'></div>
                  <div className='absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-0.5'>
                    <div className='w-0.5 h-0.5 bg-amber-800 rounded-full'></div>
                    <div className='w-0.5 h-0.5 bg-amber-800 rounded-full'></div>
                  </div>
                  <div className='absolute top-2.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-amber-700 rounded-full'></div>
                  <div className='absolute top-3 left-0.5 w-1 h-0.5 bg-cream-200 rounded-full transform rotate-45'></div>
                  <div className='absolute top-3 right-0.5 w-1 h-0.5 bg-cream-200 rounded-full transform -rotate-45'></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-cream-900 text-sm md:text-base">Sloth Assistant</h3>
              <p className="text-xs text-cream-600">Always here to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8 text-cream-600 hover:text-cream-800 hover:bg-cream-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 md:gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-2.5 md:p-3 rounded-xl text-xs md:text-sm ${
                  message.role === 'user'
                    ? 'bg-amber-600 text-white'
                    : 'bg-cream-200 text-cream-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 opacity-70 ${
                  message.role === 'user' ? 'text-amber-100' : 'text-cream-600'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-cream-300 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 md:w-3.5 md:h-3.5 text-cream-700" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 md:gap-3 justify-start">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
              </div>
              <div className="bg-cream-200 p-2.5 md:p-3 rounded-xl flex items-center gap-2">
                <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin text-cream-600" />
                <span className="text-xs md:text-sm text-cream-600">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 md:p-4 border-t border-cream-200">
          <div className="flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Sloth..."
              className="flex-1 p-2 md:p-2.5 text-xs md:text-sm bg-cream-100 border border-cream-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              rows={2}
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="clean-btn text-white px-3 py-2 h-auto"
            >
              <Send className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot