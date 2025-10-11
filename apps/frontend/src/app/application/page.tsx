'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ApplicationBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    industry: '',
    stage: '',
    teamSize: '',
    funding: '',
    problem: '',
    solution: '',
    targetMarket: '',
    competitors: '',
  })

  const steps = [
    { id: 1, name: 'Company Info', fields: ['companyName', 'description', 'industry'] },
    { id: 2, name: 'Stage & Team', fields: ['stage', 'teamSize', 'funding'] },
    { id: 3, name: 'Business Model', fields: ['problem', 'solution'] },
    { id: 4, name: 'Market Analysis', fields: ['targetMarket', 'competitors'] },
  ]

  // Autosave functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      localStorage.setItem('applicationDraft', JSON.stringify(formData))
      console.log('Application autosaved')
    }, 2000)

    return () => clearTimeout(autoSaveTimer)
  }, [formData])

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('applicationDraft')
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft))
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    alert('Application submitted successfully!')
    localStorage.removeItem('applicationDraft')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PlatFormula.One
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Application Builder</h1>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{step.name}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-24 h-1 bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="space-y-6">
            {currentStep === 1 && (
              <>
                <FormField
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(value) => handleInputChange('companyName', value)}
                  placeholder="Enter your company name"
                />
                <FormField
                  label="Description"
                  value={formData.description}
                  onChange={(value) => handleInputChange('description', value)}
                  placeholder="Brief description of your company"
                  textarea
                />
                <FormField
                  label="Industry"
                  value={formData.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  placeholder="e.g., FinTech, HealthTech, EdTech"
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <FormField
                  label="Current Stage"
                  value={formData.stage}
                  onChange={(value) => handleInputChange('stage', value)}
                  placeholder="e.g., Idea, MVP, Early Revenue"
                />
                <FormField
                  label="Team Size"
                  value={formData.teamSize}
                  onChange={(value) => handleInputChange('teamSize', value)}
                  placeholder="Number of team members"
                />
                <FormField
                  label="Funding Raised"
                  value={formData.funding}
                  onChange={(value) => handleInputChange('funding', value)}
                  placeholder="Amount of funding raised (if any)"
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                <FormField
                  label="Problem Statement"
                  value={formData.problem}
                  onChange={(value) => handleInputChange('problem', value)}
                  placeholder="What problem are you solving?"
                  textarea
                />
                <FormField
                  label="Solution"
                  value={formData.solution}
                  onChange={(value) => handleInputChange('solution', value)}
                  placeholder="How does your product/service solve this problem?"
                  textarea
                />
              </>
            )}

            {currentStep === 4 && (
              <>
                <FormField
                  label="Target Market"
                  value={formData.targetMarket}
                  onChange={(value) => handleInputChange('targetMarket', value)}
                  placeholder="Describe your target market"
                  textarea
                />
                <FormField
                  label="Key Competitors"
                  value={formData.competitors}
                  onChange={(value) => handleInputChange('competitors', value)}
                  placeholder="Who are your main competitors?"
                  textarea
                />
              </>
            )}
          </div>

          {/* Auto-save indicator */}
          <p className="text-sm text-gray-500 mt-4">
            ✓ Changes are automatically saved
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder: string
  textarea?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  )
}
