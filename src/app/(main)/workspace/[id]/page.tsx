"use client"
import ChatView from '@/app/components/ChatView'
import CodeView from '@/app/components/CodeView'
import Sidebar from '@/app/components/Sidebar'
import React, { useState } from 'react'

const Workspace = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className='flex h-screen bg-background'>
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 p-2 md:p-3 lg:p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6 h-full'>
            <div className='lg:col-span-1 order-2 lg:order-1'>
              <ChatView />
            </div>
            <div className='lg:col-span-2 order-1 lg:order-2'>
              <CodeView />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace