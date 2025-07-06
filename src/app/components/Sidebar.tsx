"use client"
import React, { useState, useContext, useEffect } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  History, 
  CreditCard, 
  Settings,
  Trash2,
  Calendar,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/data/context/UserDetailContext'
import { useConvex, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { userDetail } = useContext<any>(UserDetailContext)
  const router = useRouter()
  const convex = useConvex()
  const [workspaces, setWorkspaces] = useState<any[]>([])

  const getUserData = useQuery(api.user.GetUser, 
    userDetail?.email ? { email: userDetail.email } : "skip"
  );

  useEffect(() => {
    if (getUserData?._id) {
      fetchUserWorkspaces()
    }
  }, [getUserData])

  const fetchUserWorkspaces = async () => {
    if (!getUserData || !getUserData._id) return;
    try {
      const result = await convex.query(api.workspace.GetUserWorkspaces, {
        userId: getUserData._id
      });
      setWorkspaces(result || [])
    } catch (error) {
      console.error('Error fetching workspaces:', error)
    }
  }

  const handleNewProject = () => {
    router.push('/')
  }

  const menuItems = [
    { icon: History, label: 'Recent Projects', href: '#' },
    { icon: HelpCircle, label: 'Help Center', href: '/help' },
    { icon: CreditCard, label: 'Subscription', href: '/subscription' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ]

  return (
    <div className={`${isCollapsed ? 'w-12' : 'w-40 sm:w-48 md:w-56'} h-screen border border-cream-200 bg-cream-50 border-r-2 flex flex-col smooth-transition`}>
      {/* Header */}
      <div className="p-2 md:p-3 border-b border-cream-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Sidebar Sloth Logo */}
            <img
              src="/logo.png"
              alt="Sloth Logo"
              className="w-5 h-5 md:w-6 md:h-6 rounded-md object-contain"
            />
            <span className="font-bold text-cream-900 text-sm md:text-base font-display">Sloth</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-5 h-5 md:w-6 md:h-6 text-cream-700 hover:text-cream-900 hover:bg-cream-100"
        >
          {isCollapsed ? <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <ChevronLeft className="w-2.5 h-2.5 md:w-3 md:h-3" />}
        </Button>
      </div>

      {/* New Project Button */}
      <div className="p-2 md:p-3">
        <Button
          onClick={handleNewProject}
          className={`w-full ${isCollapsed ? 'px-0' : 'px-2 md:px-3'} clean-btn text-white font-medium text-xs h-7 md:h-8`}
        >
          <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
          {!isCollapsed && <span className="ml-1 md:ml-1.5 truncate">New Project</span>}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2 md:px-3 space-y-1">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className={`flex items-center gap-2 px-2 py-1.5 md:py-2 rounded-lg hover:bg-cream-100 cursor-pointer smooth-transition ${isCollapsed ? 'justify-center' : ''}`}>
              <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-cream-700 flex-shrink-0" />
              {!isCollapsed && <span className="text-xs text-cream-800 font-medium truncate">{item.label}</span>}
            </div>
          </Link>
        ))}

        {/* Recent Projects List */}
        {!isCollapsed && (
          <div className="mt-3 md:mt-4">
            <h3 className="text-xs font-semibold text-cream-600 uppercase tracking-wider mb-2 px-2">
              Recent Projects
            </h3>
            {workspaces.length === 0 ? (
              <div className="px-2 py-2 md:py-3 text-center">
                <p className="text-xs text-cream-600">No recent projects</p>
              </div>
            ) : (
              workspaces.slice(0, 5).map((workspace, index) => (
                <div key={workspace._id} className="flex items-center gap-2 px-2 py-1 md:py-1.5 rounded-md hover:bg-cream-100 cursor-pointer smooth-transition group">
                  <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3 text-cream-600 flex-shrink-0" />
                  <span className="text-xs text-cream-800 flex-1 truncate font-medium">
                    {workspace.message?.[0]?.content?.slice(0, 15) || `Project ${index + 1}`}...
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 smooth-transition text-cream-600 hover:text-cream-800"
                  >
                    <Trash2 className="w-2 h-2 md:w-2.5 md:h-2.5" />
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar