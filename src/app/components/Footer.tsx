"use client"
import React from 'react'
import { Github } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-shadow bg-cream-50 backdrop-blur-sm dot-grid-dense py-3 md:py-4">
      <div className="container mx-auto px-3 md:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
          {/* Left side - GitHub */}
          <div className="flex items-center gap-2 md:gap-3 order-2 sm:order-1">
            <a
              href="https://github.com/Mahatir-Ahmed-Tusher/Sloth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-1.5 text-cream-700 hover:text-cream-900 smooth-transition text-xs"
            >
              <Github className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center gap-1.5 md:gap-2 order-1 sm:order-2">
            {/* Small Sloth Logo */}
            <img
              src="/logo.png"
              alt="Sloth Logo"
              className="w-4 h-4 md:w-5 md:h-5 rounded-md object-contain"
            />
            <span className="text-sm font-semibold text-cream-900 font-display">Sloth</span>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-3 md:gap-4 order-3">
            <Link 
              href="/terms" 
              className="text-cream-700 hover:text-cream-900 smooth-transition font-medium text-xs"
            >
              Terms
            </Link>
            <Link 
              href="/faq" 
              className="text-cream-700 hover:text-cream-900 smooth-transition font-medium text-xs"
            >
              FAQ
            </Link>
            <Link 
              href="/services" 
              className="text-cream-700 hover:text-cream-900 smooth-transition font-medium text-xs"
            >
              Services
            </Link>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-cream-200 text-center">
          <p className="text-cream-600 text-xs">
            © 2024 Sloth. Built with care for developers who love to create.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer