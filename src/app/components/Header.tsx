"use client"
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/data/context/UserDetailContext'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import LoginDialog from './LoginDialog';
import { LogOut, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { userDetail, setUserDetail } = useContext<any>(UserDetailContext)
  const [openDialog, setOpenDialog] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter();

  const handleOpenDialog = () => {
    setOpenDialog(true)
    setShowMobileMenu(false)
  }

  const handleCloseDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen)
  }

  const handleLogout = () => {
    if(typeof window !== 'undefined'){
      localStorage.removeItem('user')
      setUserDetail(null)
    }
    setShowDropdown(false)
    router.push('/')
  }

  return (
    <div className='relative'>
      <div className='px-3 md:px-4 lg:px-6 py-2.5 md:py-3 flex items-center justify-between bg-cream-50 backdrop-blur-sm border-b border-cream-200 dot-grid-dense'>
        <a href='/' className='flex items-center gap-1.5 md:gap-2 group smooth-transition hover:scale-105'>
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Sloth Logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
          />
          <span className='text-lg md:text-xl lg:text-2xl font-bold text-amber-800 font-display'>Sloth</span>
        </a>
        
        {/* Desktop Navigation */}
        {!userDetail?.name && (
          <div className='hidden md:flex gap-2 lg:gap-3'>
            <Button 
              variant={'ghost'} 
              onClick={handleOpenDialog}
              className='text-cream-700 hover:text-cream-900 hover:bg-cream-100 border border-cream-200 text-sm px-3 py-1.5 h-8 bg-cream-100'
            >
              Sign up
            </Button>
            <Button 
              onClick={handleOpenDialog}
              className='clean-btn text-white font-medium text-sm px-3 py-1.5 h-8'
            >
              Sign in
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {!userDetail?.name && (
          <div className='md:hidden'>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-8 h-8 text-cream-700 hover:text-cream-900 hover:bg-cream-100"
            >
              {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        )}
        
        {userDetail?.name && (
          <div className='relative'>
            <div 
              className='flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg hover:bg-cream-100 cursor-pointer smooth-transition border border-cream-200'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Image
                src={userDetail?.picture}
                alt='User'
                width={24}
                height={24}
                className='rounded-full border border-cream-200 w-6 h-6 md:w-7 md:h-7'
              />
              <div className='hidden sm:block text-left'>
                <p className='text-xs font-semibold text-cream-900 truncate max-w-24 md:max-w-32'>{userDetail?.name}</p>
                <p className='text-xs text-cream-600 truncate max-w-24 md:max-w-32'>{userDetail?.email}</p>
              </div>
            </div>
            
            {showDropdown && (
              <div className='absolute right-0 mt-1 w-36 md:w-44 border border-cream-200 bg-cream-50 rounded-lg py-1 z-50 fade-in'>
                <button
                  onClick={handleLogout}
                  className='flex items-center w-full px-3 py-2 text-xs text-cream-800 hover:bg-cream-100 smooth-transition'
                >
                  <LogOut className='w-3 h-3 mr-2 text-cream-600' />
                  <span className='font-medium'>Sign out</span>
                </button>
              </div>
            )}
          </div>
        )}
        
        <LoginDialog openDialog={openDialog} closeDialog={handleCloseDialog} />
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && !userDetail?.name && (
        <div className='absolute top-full left-0 right-0 bg-cream-50 border-b border-cream-200 p-4 md:hidden z-40 slide-up'>
          <div className='flex flex-col gap-3'>
            <Button 
              variant={'ghost'} 
              onClick={handleOpenDialog}
              className='text-cream-700 hover:text-cream-900 hover:bg-cream-100 border border-cream-200 text-sm w-full justify-center bg-cream-100'
            >
              Sign up
            </Button>
            <Button 
              onClick={handleOpenDialog}
              className='clean-btn text-white font-medium text-sm w-full justify-center'
            >
              Sign in
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header