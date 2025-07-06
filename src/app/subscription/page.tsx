"use client"
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ArrowLeft, CreditCard } from 'lucide-react'
import { UserDetailContext } from '@/data/context/UserDetailContext'
import { useRouter } from 'next/navigation'

const SubscriptionPage = () => {
  const { userDetail } = useContext<any>(UserDetailContext)
  const router = useRouter()

  const pricingOptions = [
    {
      name: 'Basic',
      tokens: '50K',
      value: 50000,
      desc: 'Ideal for hobbyists and casual users for light, exploratory use.',
      priceBDT: 599,
      priceUSD: 4.99
    },
    {
      name: 'Starter',
      tokens: '120K',
      value: 120000,
      desc: 'Designed for professionals who need to use Sloth a few times per week.',
      priceBDT: 1199,
      priceUSD: 9.99
    },
    {
      name: 'Pro',
      tokens: '2.5M',
      value: 2500000,
      desc: 'Designed for professionals who need to use Sloth regularly.',
      priceBDT: 2399,
      priceUSD: 19.99
    },
    {
      name: 'Unlimited',
      tokens: 'Unlimited',
      value: 999999999,
      desc: 'For power users and teams who need unlimited access.',
      priceBDT: 5999,
      priceUSD: 49.99
    }
  ]

  return (
    <div className="min-h-screen bg-background dot-grid">
      <div className="container mx-auto px-4 py-6 md:py-8">
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
            <span className="text-lg md:text-xl font-semibold text-cream-900 font-display">Sloth</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-cream-900 mb-3 md:mb-4 font-display">
            Choose Your Plan
          </h1>
          <p className="text-base md:text-xl text-cream-700 max-w-2xl mx-auto px-4">
            Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mb-8 md:mb-12">
          {pricingOptions.map((plan, index) => (
            <div
              key={index}
              className={`border border-cream-200 bg-cream-50 rounded-2xl p-4 md:p-6 relative smooth-transition ${
                plan.name === 'Pro' 
                  ? 'scale-105 border-amber-400' 
                  : 'hover:scale-105'
              }`}
            >
              {plan.name === 'Pro' && (
                <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-3 md:px-4 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-cream-900 mb-2 font-display">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-2xl md:text-3xl font-bold text-cream-900">
                    ৳{plan.priceBDT}
                  </span>
                  <span className="text-cream-700 text-sm">/month</span>
                </div>
                <p className="text-xs text-cream-600">
                  (${plan.priceUSD} USD)
                </p>
                <p className="text-xs text-cream-600 mt-1">
                  {plan.tokens} tokens
                </p>
              </div>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                  <span className="text-xs md:text-sm text-cream-800">
                    {plan.tokens} AI generations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                  <span className="text-xs md:text-sm text-cream-800">
                    Unlimited projects
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                  <span className="text-xs md:text-sm text-cream-800">
                    Code export
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                  <span className="text-xs md:text-sm text-cream-800">
                    24/7 support
                  </span>
                </div>
              </div>

              <Button
                className={`w-full text-xs md:text-sm ${
                  plan.name === 'Pro'
                    ? 'clean-btn text-white'
                    : 'border border-cream-300 text-cream-800 hover:bg-cream-100'
                }`}
              >
                {plan.name === 'Basic' ? 'Start Free' : 'Get Started'}
              </Button>

              <p className="text-xs text-cream-600 mt-2 md:mt-3 text-center">
                {plan.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pro Plan Benefits Section */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12">
          <div className="border border-cream-200 bg-cream-50 rounded-2xl p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center">
                <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3 md:mb-4 font-display">
                bKash Payment Integration
              </h2>
              <p className="text-cream-700 text-sm md:text-base">
                Seamless payment processing for Bangladesh users
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-cream-900 font-display">
                  Why Choose bKash?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-cream-800 text-sm">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                    Instant payment processing
                  </li>
                  <li className="flex items-center gap-2 text-cream-800 text-sm">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                    Secure transactions
                  </li>
                  <li className="flex items-center gap-2 text-cream-800 text-sm">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                    Local currency support
                  </li>
                  <li className="flex items-center gap-2 text-cream-800 text-sm">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                    24/7 customer support
                  </li>
                </ul>
              </div>

              <div className="border border-cream-200 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-cream-900 mb-3 md:mb-4 font-display">
                  Pro Plan Benefits
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-pink-500"></div>
                    <span className="text-xs md:text-sm text-cream-800">High-quality web app generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-pink-500"></div>
                    <span className="text-xs md:text-sm text-cream-800">Access to Anthropic models (Claude)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-pink-500"></div>
                    <span className="text-xs md:text-sm text-cream-800">Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-pink-500"></div>
                    <span className="text-xs md:text-sm text-cream-800">Unlimited projects</span>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-pink-200">
                  <p className="text-xs text-cream-700">
                    <strong>Free tier:</strong> Access to Gemini models
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-center">
              <Button className="clean-btn text-white font-medium px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                Subscribe with bKash
              </Button>
              <p className="text-xs text-cream-600 mt-2">
                *Demo version - Payment integration coming soon
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center text-cream-900 mb-6 md:mb-8 font-display">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 md:space-y-6">
            <div className="border border-cream-200 bg-cream-50 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-cream-900 mb-2 font-display text-sm md:text-base">
                What are tokens?
              </h3>
              <p className="text-cream-700 text-sm md:text-base">
                Tokens are used for AI generations. Each time you generate code or chat with AI, it consumes tokens based on the complexity of your request.
              </p>
            </div>
            
            <div className="border border-cream-200 bg-cream-50 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-cream-900 mb-2 font-display text-sm md:text-base">
                Can I change my plan anytime?
              </h3>
              <p className="text-cream-700 text-sm md:text-base">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div className="border border-cream-200 bg-cream-50 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-cream-900 mb-2 font-display text-sm md:text-base">
                Do unused tokens roll over?
              </h3>
              <p className="text-cream-700 text-sm md:text-base">
                No, tokens reset each month. We recommend choosing a plan that fits your monthly usage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage