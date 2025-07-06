"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TermsPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background dot-grid">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
            <span className="text-xl font-semibold text-amber-900 font-display">Sloth</span>
          </div>
        </div>

        {/* Content */}
        <div className="vintage-border rounded-2xl p-8 vintage-shadow-lg">
          <h1 className="text-3xl font-bold text-amber-900 mb-6 font-display">
            Terms of Service & Privacy Policy
          </h1>
          
          <div className="space-y-8 text-amber-800">
            <section>
              <h2 className="text-xl font-semibold text-amber-900 mb-4 font-display">
                Terms of Service
              </h2>
              <div className="space-y-4">
                <p>
                  By using Sloth, you agree to these terms of service. Sloth is an AI-powered web development platform that helps you create applications through natural language descriptions.
                </p>
                <p>
                  <strong>Acceptable Use:</strong> You may use Sloth to create web applications for personal, educational, or commercial purposes. You may not use the service to create harmful, illegal, or malicious content.
                </p>
                <p>
                  <strong>Intellectual Property:</strong> You retain ownership of the code and applications you create using Sloth. However, you grant us the right to use anonymized data to improve our AI models.
                </p>
                <p>
                  <strong>Service Availability:</strong> We strive to maintain high availability but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue features with notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-amber-900 mb-4 font-display">
                Privacy Policy
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>Data Collection:</strong> We collect information you provide when creating an account, using our services, and interacting with our platform. This includes your prompts, generated code, and usage patterns.
                </p>
                <p>
                  <strong>Data Usage:</strong> We use your data to provide and improve our services, including training our AI models. We may analyze usage patterns to enhance user experience and platform performance.
                </p>
                <p>
                  <strong>Data Protection:</strong> We implement industry-standard security measures to protect your data. Your personal information is encrypted and stored securely.
                </p>
                <p>
                  <strong>Data Sharing:</strong> We do not sell your personal data to third parties. We may share anonymized, aggregated data for research and improvement purposes.
                </p>
                <p>
                  <strong>Your Rights:</strong> You have the right to access, modify, or delete your personal data. Contact us if you wish to exercise these rights.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-amber-900 mb-4 font-display">
                Cookie Policy
              </h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. By using Sloth, you consent to our use of cookies as described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-amber-900 mb-4 font-display">
                Contact Information
              </h2>
              <p>
                If you have questions about these terms or our privacy practices, please contact us through our support channels or visit our Help Center.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-amber-200">
            <p className="text-sm text-amber-600">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage