import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Building2,
  Target,
  FileText,
  Upload,
  AlertCircle,
  Rocket
} from 'lucide-react'

export function ApplicationModal({ isOpen, onClose, accelerator }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationData, setApplicationData] = useState({
    companyName: '',
    companyDescription: '',
    problemStatement: '',
    solution: '',
    marketSize: '',
    businessModel: '',
    traction: '',
    teamSize: '',
    fundingNeeded: '',
    useOfFunds: '',
    pitchDeckUrl: '',
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Save application data
    const applications = JSON.parse(localStorage.getItem('platformula_applications') || '[]')
    const newApplication = {
      id: Date.now(),
      accelerator: accelerator.name,
      data: applicationData,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      deadline: accelerator.deadline
    }
    
    applications.push(newApplication)
    localStorage.setItem('platformula_applications', JSON.stringify(applications))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return applicationData.companyName && applicationData.companyDescription && applicationData.problemStatement
      case 2:
        return applicationData.solution && applicationData.marketSize && applicationData.businessModel
      case 3:
        return applicationData.traction && applicationData.teamSize && applicationData.fundingNeeded
      default:
        return false
    }
  }

  const handleExternalApplication = () => {
    // For real accelerators, redirect to their application page
    const applicationUrls = {
      'Y Combinator': 'https://www.ycombinator.com/apply',
      '500 Global': 'https://500.co/apply',
      'Techstars': 'https://www.techstars.com/apply',
      'Forum Ventures': 'https://www.forumvc.com/apply'
    }
    
    const url = applicationUrls[accelerator.name] || accelerator.website
    if (url) {
      window.open(url, '_blank')
    }
    onClose()
  }

  if (!isOpen || !accelerator) return null

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Application Submitted!</CardTitle>
            <CardDescription>
              Your application to {accelerator.name} has been successfully submitted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Review process typically takes 2-4 weeks</li>
                <li>• Track your application status in the dashboard</li>
                <li>• Complete your profile for better matching</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Return to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExternalApplication}
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Directly to {accelerator.name}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">Apply to {accelerator.name}</CardTitle>
              <CardDescription className="mt-1">
                {accelerator.type} • {accelerator.stage} • {accelerator.funding} funding
              </CardDescription>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  <Calendar className="w-3 h-3 mr-1" />
                  Deadline: {new Date(accelerator.deadline).toLocaleDateString()}
                </Badge>
                <Badge variant="outline" className="text-red-600 border-red-200">
                  {accelerator.acceptanceRate} acceptance rate
                </Badge>
              </div>
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
          {/* Step 1: Company Basics */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Rocket className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold">Company Basics</h3>
                <p className="text-gray-600">Tell us about your startup</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Company Name *</label>
                <Input
                  value={applicationData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Company Description *</label>
                <Textarea
                  value={applicationData.companyDescription}
                  onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                  placeholder="Describe what your company does in 1-2 sentences"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Problem Statement *</label>
                <Textarea
                  value={applicationData.problemStatement}
                  onChange={(e) => handleInputChange('problemStatement', e.target.value)}
                  placeholder="What problem are you solving? Why is it important?"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 2: Solution & Market */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Target className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold">Solution & Market</h3>
                <p className="text-gray-600">Describe your solution and market opportunity</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Solution *</label>
                <Textarea
                  value={applicationData.solution}
                  onChange={(e) => handleInputChange('solution', e.target.value)}
                  placeholder="How does your product/service solve the problem?"
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Market Size *</label>
                <Textarea
                  value={applicationData.marketSize}
                  onChange={(e) => handleInputChange('marketSize', e.target.value)}
                  placeholder="What's the size of your target market? Include TAM, SAM, SOM if available"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Business Model *</label>
                <Textarea
                  value={applicationData.businessModel}
                  onChange={(e) => handleInputChange('businessModel', e.target.value)}
                  placeholder="How do you make money? What's your revenue model?"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Traction & Funding */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <FileText className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold">Traction & Funding</h3>
                <p className="text-gray-600">Share your progress and funding needs</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Traction *</label>
                <Textarea
                  value={applicationData.traction}
                  onChange={(e) => handleInputChange('traction', e.target.value)}
                  placeholder="What traction do you have? Users, revenue, partnerships, etc."
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Team Size *</label>
                  <Input
                    value={applicationData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', e.target.value)}
                    placeholder="e.g., 3 full-time, 2 part-time"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Funding Needed *</label>
                  <Input
                    value={applicationData.fundingNeeded}
                    onChange={(e) => handleInputChange('fundingNeeded', e.target.value)}
                    placeholder="e.g., $500K"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Use of Funds</label>
                <Textarea
                  value={applicationData.useOfFunds}
                  onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
                  placeholder="How will you use the funding?"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Pitch Deck URL</label>
                <Input
                  value={applicationData.pitchDeckUrl}
                  onChange={(e) => handleInputChange('pitchDeckUrl', e.target.value)}
                  placeholder="https://drive.google.com/..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Additional Information</label>
                <Textarea
                  value={applicationData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Anything else you'd like to share?"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Warning about external application */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Important Note</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  This is a practice application to help you prepare. For official submission to {accelerator.name}, 
                  you'll need to apply directly through their website.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button
                variant="outline"
                onClick={handleExternalApplication}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Directly
              </Button>
            </div>
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : currentStep === totalSteps ? (
                <>
                  Submit Application <CheckCircle className="w-4 h-4 ml-2" />
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
