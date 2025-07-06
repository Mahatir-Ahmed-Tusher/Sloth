"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lightbulb, Code, Zap, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

const HelpPage = () => {
  const router = useRouter()

  const features = [
    {
      icon: Lightbulb,
      title: "AI-Powered Generation",
      description: "Simply describe what you want to build, and our AI will generate complete, functional code for your project."
    },
    {
      icon: Code,
      title: "Live Code Editor",
      description: "Edit your generated code in real-time with our integrated code editor and see changes instantly in the preview."
    },
    {
      icon: Zap,
      title: "Instant Preview",
      description: "See your app come to life immediately with our live preview feature. No setup or configuration required."
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Keep track of all your projects in one place. Access your recent work and continue where you left off."
    }
  ]

  const steps = [
    {
      step: "1",
      title: "Describe Your Idea",
      description: "Type what you want to build in natural language. Be as detailed or as simple as you like."
    },
    {
      step: "2",
      title: "AI Generates Code",
      description: "Our AI analyzes your request and generates complete, production-ready code using modern frameworks."
    },
    {
      step: "3",
      title: "Edit & Customize",
      description: "Use our live code editor to make changes, add features, or customize the design to your liking."
    },
    {
      step: "4",
      title: "Deploy & Share",
      description: "Export your code or deploy directly to share your creation with the world."
    }
  ]

  return (
    <div className="min-h-screen bg-background dot-grid">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center vintage-shadow">
              <div className="w-4 h-4 bg-amber-50 rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-xl font-semibold text-amber-900 font-display">Sloth Help Center</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4 font-display">
            How to Use Sloth
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Learn how to build amazing web applications with the power of AI
          </p>
        </div>

        {/* Getting Started Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center font-display">
            Getting Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="vintage-border rounded-2xl p-6 text-center vintage-shadow hover:vintage-shadow-lg smooth-transition">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 vintage-shadow">
                  {step.step}
                </div>
                <h3 className="font-semibold text-amber-900 mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-amber-700 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center font-display">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="vintage-border rounded-2xl p-6 vintage-shadow hover:vintage-shadow-lg smooth-transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center flex-shrink-0 vintage-shadow">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2 font-display">
                      {feature.title}
                    </h3>
                    <p className="text-amber-700">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="vintage-border rounded-2xl p-8 vintage-shadow-lg">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 font-display">
            💡 Pro Tips
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
              <p className="text-amber-800">
                <strong>Be specific:</strong> The more detailed your description, the better the AI can understand and generate what you need.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
              <p className="text-amber-800">
                <strong>Iterate:</strong> Don't hesitate to ask for modifications or improvements to your generated code.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
              <p className="text-amber-800">
                <strong>Explore examples:</strong> Try the suggested prompts to see what's possible and get inspiration.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
              <p className="text-amber-800">
                <strong>Save your work:</strong> Your projects are automatically saved and accessible from the sidebar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage