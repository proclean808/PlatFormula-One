import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  FileText, 
  Presentation, 
  Calculator, 
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Download,
  Upload,
  Users,
  Target
} from 'lucide-react'

export function ApplicationBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [applicationData, setApplicationData] = useState({
    companyProfile: {},
    pitchDeck: {},
    financials: {},
    team: {},
    market: {},
    review: {}
  })
  
  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      id: 1,
      title: "Company Profile",
      description: "Basic information about your startup",
      status: "completed",
      icon: FileText
    },
    {
      id: 2,
      title: "Pitch Deck",
      description: "Create and refine your presentation",
      status: "in-progress",
      icon: Presentation
    },
    {
      id: 3,
      title: "Financial Projections",
      description: "Revenue and growth forecasts",
      status: "pending",
      icon: Calculator
    },
    {
      id: 4,
      title: "Team Information",
      description: "Founder and team details",
      status: "pending",
      icon: Users
    },
    {
      id: 5,
      title: "Market Analysis",
      description: "Target market and competition",
      status: "pending",
      icon: Target
    },
    {
      id: 6,
      title: "Application Review",
      description: "Final review and submission",
      status: "pending",
      icon: CheckCircle
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  const handleUseTemplate = (templateType) => {
    alert(`Using ${templateType} template. This would open a template editor in a real application.`)
    setShowTemplateModal(false)
  }

  const handleContinueEditing = () => {
    alert('This would open the pitch deck editor with your current progress.')
  }

  const handleUploadDeck = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.ppt,.pptx'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        alert(`File "${file.name}" uploaded successfully! This would be processed in a real application.`)
      }
    }
    input.click()
  }

  const handleScheduleReview = () => {
    alert('This would open a calendar to schedule a review session with an expert.')
  }

  const handleScheduleReviewSession = () => {
    alert('This would open a calendar to book an expert review session.')
  }

  const handleJoinPeerReview = () => {
    alert('This would connect you to the peer review platform.')
  }

  const handleViewApplications = () => {
    alert('This would show your application tracking dashboard.')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Application Builder</h2>
        <p className="text-gray-600 mb-6">
          Guided step-by-step process to create compelling accelerator applications
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentStep} of {totalSteps} steps</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <Card 
              key={step.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                step.id === currentStep ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        step.status === 'completed' ? 'text-green-600' :
                        step.status === 'in-progress' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription className="text-sm">{step.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(step.status)}>
                    {getStatusIcon(step.status)}
                    <span className="ml-1 capitalize">{step.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Step {step.id}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Current Step Details */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Presentation className="w-5 h-5 text-blue-600" />
            <span>Current Step: Pitch Deck Creation</span>
          </CardTitle>
          <CardDescription>
            Create a compelling presentation that tells your startup's story
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Templates Available</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="text-sm">B2B SaaS Template</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUseTemplate('B2B SaaS')}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Use
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="text-sm">AI Startup Template</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUseTemplate('AI Startup')}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Use
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="text-sm">General Startup Template</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUseTemplate('General Startup')}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Use
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Your Progress</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Problem Statement</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Solution Overview</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Size</span>
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Business Model</span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financial Projections</span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleContinueEditing}
            >
              Continue Editing
            </Button>
            <Button 
              variant="outline"
              onClick={handleUploadDeck}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Existing Deck
            </Button>
            <Button 
              variant="outline"
              onClick={handleScheduleReview}
            >
              Schedule Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Expert Review</CardTitle>
            <CardDescription>Get feedback from successful founders</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={handleScheduleReviewSession}
            >
              Schedule Review Session
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Peer Feedback</CardTitle>
            <CardDescription>Exchange reviews with other founders</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={handleJoinPeerReview}
            >
              Join Peer Review
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Application Tracker</CardTitle>
            <CardDescription>Monitor your submission status</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={handleViewApplications}
            >
              View Applications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
