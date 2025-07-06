"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Code, Zap, Shield, Users, Rocket, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ServicesPage = () => {
  const router = useRouter()

  const services = [
    {
      icon: Code,
      title: "AI Code Generation",
      description: "Transform your ideas into production-ready code using advanced AI technology. Support for React, Next.js, and modern web frameworks.",
      features: ["Natural language to code", "Multiple frameworks", "Best practices included", "Instant generation"]
    },
    {
      icon: Zap,
      title: "Live Development Environment",
      description: "Edit and preview your applications in real-time with our integrated development environment. No setup required.",
      features: ["Live code editor", "Instant preview", "Hot reloading", "Browser-based IDE"]
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your projects and data are protected with enterprise-grade security. 99.9% uptime guarantee.",
      features: ["Data encryption", "Secure hosting", "Regular backups", "Privacy protection"]
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Organize and manage all your projects in one place. Access your work from anywhere, anytime.",
      features: ["Project history", "Cloud storage", "Easy access", "Version control"]
    },
    {
      icon: Rocket,
      title: "Deployment Ready",
      description: "Export your code or deploy directly to popular hosting platforms. Get your apps live in minutes.",
      features: ["One-click export", "Multiple formats", "Deployment guides", "Production ready"]
    },
    {
      icon: Heart,
      title: "Community Support",
      description: "Join a growing community of developers and creators. Get help, share ideas, and collaborate.",
      features: ["Active community", "Expert support", "Regular updates", "Feature requests"]
    }
  ]

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out Sloth",
      features: ["5 projects per month", "Basic AI generation", "Community support", "Code export"]
    },
    {
      name: "Pro",
      price: "$19/month",
      description: "For serious developers",
      features: ["Unlimited projects", "Advanced AI models", "Priority support", "Team collaboration", "Custom templates"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations",
      features: ["Custom deployment", "Dedicated support", "SLA guarantee", "Advanced security", "Custom integrations"]
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
            <span className="text-xl font-semibold text-amber-900 font-display">Sloth Services</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-amber-900 mb-6 font-display">
            Our Services
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Discover how Sloth can transform your development workflow with AI-powered tools and services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="vintage-border rounded-2xl p-6 vintage-shadow hover:vintage-shadow-lg smooth-transition hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center mb-4 vintage-shadow">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-amber-900 mb-3 font-display">
                {service.title}
              </h3>
              
              <p className="text-amber-700 mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-amber-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-8 font-display">
            Choose Your Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`vintage-border rounded-2xl p-6 vintage-shadow hover:vintage-shadow-lg smooth-transition ${index === 1 ? 'scale-105 border-amber-400' : ''}`}>
                {index === 1 && (
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2 font-display">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-amber-900 mb-2">
                    {plan.price}
                  </div>
                  <p className="text-amber-700 text-sm">
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-amber-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className={`w-full ${index === 1 ? 'vintage-btn text-white' : 'border border-amber-300 text-amber-800 hover:bg-amber-100'}`}>
                  {index === 2 ? 'Contact Sales' : 'Get Started'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center vintage-border rounded-2xl p-12 vintage-shadow-lg">
          <h2 className="text-3xl font-bold text-amber-900 mb-4 font-display">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using Sloth to bring their ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/')}
              className="vintage-btn text-white font-medium text-lg px-8 py-3"
            >
              Start Building Now
            </Button>
            <Button 
              onClick={() => router.push('/subscription')}
              variant="outline"
              className="border-amber-300 text-amber-800 hover:bg-amber-100 text-lg px-8 py-3"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage