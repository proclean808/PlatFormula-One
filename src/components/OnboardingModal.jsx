import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X, 
  User, 
  Building2, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Rocket,
  Users,
  TrendingUp,
  Brain
} from 'lucide-react'

export function OnboardingModal({ isOpen, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyStage: '',
    industry: '',
    role: '',
    goals: '',
    experience: '',
    lookingFor: []
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const companyStages = [
    'Idea Stage',
    'MVP Development',
    'Pre-Seed',
    'Seed',
    'Series A',
    'Series B+',
    'Established'
  ]

  const industries = [
    'B2B SaaS',
    'AI/ML',
    'Fintech',
    'Healthcare',
    'E-commerce',
    'EdTech',
    'CleanTech',
    'Consumer',
    'Enterprise',
    'Other'
  ]

  const roles = [
    'Founder/CEO',
    'Co-Founder',
    'CTO',
    'Product Manager',
    'Engineer',
    'Designer',
    'Marketing',
    'Sales',
    'Operations',
    'Other'
  ]

  const lookingForOptions = [
    'Accelerator Programs',
    'Investor Connections',
    'Co-Founder Matching',
    'Mentorship',
    'Networking',
    'Resources & Tools',
    'Community Support',
    'Application Help'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLookingForToggle = (option) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(option)
        ? prev.lookingFor.filter(item => item !== option)
        : [...prev.lookingFor, option]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Save user data to localStorage for demo purposes
    localStorage.setItem('platformula_user', JSON.stringify(formData))
    localStorage.setItem('platformula_onboarded', 'true')
    
    onComplete(formData)
    onClose()
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email
      case 2:
        return formData.companyName && formData.companyStage && formData.industry
      case 3:
        return formData.role && formData.experience
      case 4:
        return formData.lookingFor.length > 0
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome to PlatFormula.One</CardTitle>
              <CardDescription>Let's personalize your startup acceleration journey</CardDescription>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <User className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Building2 className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold">Company Information</h3>
                <p className="text-gray-600">Tell us about your startup</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Stage</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.companyStage}
                    onChange={(e) => handleInputChange('companyStage', e.target.value)}
                  >
                    <option value="">Select stage</option>
                    {companyStages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Role & Experience */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Target className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold">Role & Experience</h3>
                <p className="text-gray-600">Help us understand your background</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your Role</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                >
                  <option value="">Select your role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                >
                  <option value="">Select experience</option>
                  <option value="first-time">First-time founder</option>
                  <option value="experienced">Experienced founder</option>
                  <option value="serial">Serial entrepreneur</option>
                  <option value="employee">Startup employee</option>
                  <option value="corporate">Corporate background</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Goals (Optional)</label>
                <Textarea
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  placeholder="What are your main goals for the next 6-12 months?"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: What are you looking for */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Brain className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold">What are you looking for?</h3>
                <p className="text-gray-600">Select all that apply to personalize your experience</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {lookingForOptions.map(option => (
                  <div
                    key={option}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.lookingFor.includes(option)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleLookingForToggle(option)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{option}</span>
                      {formData.lookingFor.includes(option) && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep === totalSteps ? (
                <>
                  Complete Setup <CheckCircle className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
