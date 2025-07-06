"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ChatBot from '../components/ChatBot'

const FAQPage = () => {
  const router = useRouter()
  const [openItems, setOpenItems] = useState<number[]>([])
  const [isChatBotOpen, setIsChatBotOpen] = useState(false)

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      question: "What is Sloth?",
      answer: "Sloth is an AI-powered web development platform that allows you to create full-stack web applications by simply describing what you want to build in natural language."
    },
    {
      question: "How does the AI code generation work?",
      answer: "Our AI analyzes your natural language description and generates complete, functional code using modern frameworks like React, Next.js, and Tailwind CSS. The code is production-ready and follows best practices."
    },
    {
      question: "What types of applications can I build?",
      answer: "You can build a wide variety of web applications including dashboards, e-commerce sites, social media platforms, productivity tools, games, and much more. If you can describe it, Sloth can help build it."
    },
    {
      question: "Do I need coding experience to use Sloth?",
      answer: "No! Sloth is designed for both beginners and experienced developers. You can create applications using natural language, but you can also edit the generated code if you have programming knowledge."
    },
    {
      question: "What technologies does Sloth use?",
      answer: "Sloth generates code using modern web technologies including React, Next.js, Tailwind CSS, TypeScript, and various popular libraries. The generated code follows current best practices and standards."
    },
    {
      question: "Can I export my code?",
      answer: "Yes! You can export your generated code and use it in your own development environment. You own the code that's generated for your projects."
    },
    {
      question: "How much does Sloth cost?",
      answer: "Sloth offers multiple pricing tiers including a free tier for getting started. Check our Subscription page for detailed pricing information and features included in each plan."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All data is encrypted in transit and at rest. We follow industry-standard security practices to protect your information and projects."
    },
    {
      question: "Can I collaborate with others on projects?",
      answer: "Currently, Sloth is designed for individual use, but we're working on collaboration features for future releases. Stay tuned for updates!"
    },
    {
      question: "What if I need help or support?",
      answer: "We offer comprehensive support through our Help Center, documentation, and customer support team. You can also reach out through our GitHub repository for community support."
    }
  ]

  return (
    <div className="min-h-screen bg-background dot-grid">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 md:gap-2 text-cream-700 hover:text-cream-900 hover:bg-cream-100 text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Header Sloth Logo */}
            <img
              src="/logo.png"
              alt="Sloth Logo"
              className="w-6 h-6 md:w-8 md:h-8 rounded-lg object-contain"
            />
            <span className="text-lg md:text-xl font-semibold text-cream-900 font-display">Sloth FAQ</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-cream-900 mb-3 md:mb-4 font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-xl text-cream-700 px-4">
            Find answers to common questions about Sloth
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-cream-200 bg-cream-50 rounded-2xl smooth-transition hover:bg-cream-100">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-cream-100 rounded-2xl smooth-transition"
              >
                <h3 className="font-semibold text-cream-900 font-display text-sm md:text-base pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-cream-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-cream-600 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="border-t border-cream-200 pt-3 md:pt-4">
                    <p className="text-cream-800 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-8 md:mt-12 text-center border border-cream-200 bg-cream-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3 md:mb-4 font-display">
            Still have questions?
          </h2>
          <p className="text-cream-700 mb-4 md:mb-6 text-sm md:text-base">
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              onClick={() => router.push('/help')}
              className="clean-btn text-white font-medium text-sm md:text-base"
            >
              Visit Help Center
            </Button>
            <Button 
              variant="outline"
              className="border-cream-300 text-cream-800 hover:bg-cream-100 text-sm md:text-base"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsChatBotOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 rounded-full clean-btn text-white z-40 hover:scale-110"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {/* ChatBot */}
      <ChatBot 
        isOpen={isChatBotOpen} 
        onClose={() => setIsChatBotOpen(false)} 
      />
    </div>
  )
}

export default FAQPage