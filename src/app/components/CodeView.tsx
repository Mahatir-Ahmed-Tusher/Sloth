"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import axios from 'axios';
import { MessageContext } from '@/data/context/MessageContext';
import Prompt from '@/data/Prompt';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon, Code, Eye } from 'lucide-react';
import JSZip from 'jszip';

const CodeView = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('code')
  const [Files, setFiles] = useState(Lookup.DEFAULT_FILE)
  const { messages, setMessages } = useContext<any>(MessageContext)
  const [loading, setLoading] = useState(false)
  const UpdateFiles = useMutation(api.workspace.UpdateFiles)
  const convex = useConvex();

  useEffect(() => {
    id && GetFiles()
  }, [id])

  const GetFiles = async () => {
    setLoading(true)
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id as any
      })
      const mergeFiles = { ...result?.fileData }
      setFiles(mergeFiles)
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    setLoading(false)
  }

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === 'user') {
        GenerateAiCode()
      }
    }
  }, [messages])
  
  const GenerateAiCode = async () => {
    setActiveTab('code')
    setLoading(true)
    try {
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT
      const result = await axios.post('/api/ai-code', {
        prompt: PROMPT
      })
      console.log("ai-code", result.data)
      const aiResponse = result.data

      const mergeFiles = { ...Files, ...aiResponse?.files }
      setFiles(mergeFiles)
      await UpdateFiles({
        workspaceId: id as any,
        fileData: aiResponse?.files
      })
    } catch (error) {
      console.error("Error generating code:", error);
    }
    setLoading(false)
  }

  // Download ZIP handler
  const handleDownloadZip = async () => {
    const zip = new JSZip();
    // Only include files with a 'code' property
    Object.entries(Files).forEach(([filename, fileObj]: any) => {
      if (fileObj && typeof fileObj.code === 'string') {
        // Remove leading slash for zip root
        const cleanName = filename.startsWith('/') ? filename.slice(1) : filename;
        zip.file(cleanName, fileObj.code);
      }
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sloth-generated-code.zip';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className='h-full flex flex-col bg-card rounded-xl border border-border overflow-hidden'>
      {/* Header */}
      <div className='p-3 border-b border-border flex justify-between items-center'>
        <div className='flex gap-1.5 items-center'>
          <button 
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md smooth-transition ${
              activeTab === 'code' 
                ? 'bg-primary text-white' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            onClick={() => setActiveTab('code')}
          >
            <Code className='w-3 h-3' />
            Code
          </button>
          <button 
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md smooth-transition ${
              activeTab === 'preview' 
                ? 'bg-primary text-white' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye className='w-3 h-3' />
            Preview
          </button>
        </div>
        <button
          onClick={handleDownloadZip}
          className='ml-auto px-3 py-1.5 rounded-md bg-amber-700 text-cream-50 font-semibold text-xs shadow hover:bg-amber-800 transition-colors duration-150'
          title='Download all code as ZIP'
        >
          Download ZIP
        </button>
      </div>
      
      {/* Content */}
      <div className='flex-1 relative'>
        <SandpackProvider 
          template='react' 
          theme="light"
          files={Files}
          options={{
            externalResources: ['https://unpkg.com/@tailwindcss/browser@4']
          }}
          customSetup={{
            dependencies: {
              ...Lookup.DEPENDENCY
            }
          }}
        >
          <SandpackLayout>
            {activeTab === 'code' && (
              <>
                <SandpackFileExplorer 
                  style={{ height: 'calc(100vh - 140px)' }} 
                  initialCollapsedFolder={["components/", "/public/"]} 
                />
                <SandpackCodeEditor style={{ height: 'calc(100vh - 140px)' }} />
              </>
            )}

            {activeTab === 'preview' && (
              <SandpackPreview 
                style={{ height: 'calc(100vh - 140px)' }} 
                showNavigator={true}
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
        
        {loading && (
          <div className='absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-card border border-border p-4 rounded-xl flex items-center gap-3'>
              <Loader2Icon className='animate-spin h-4 w-4 text-primary'/>
              <div>
                <h3 className='font-semibold text-foreground text-sm'>Generating code...</h3>
                <p className='text-xs text-muted-foreground'>This may take a moment</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeView