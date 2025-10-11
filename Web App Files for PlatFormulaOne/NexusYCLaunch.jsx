import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Rocket, 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  TrendingUp,
  Sparkles,
  Lock,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  ExternalLink
} from 'lucide-react'

export function NexusYCLaunch() {
  const coreFeatures = [
    {
      title: "Privacy-First Matching",
      description: "Secure, tokenized profile schema with Row-Level Security (RLS) and attribute-level visibility",
      icon: Shield,
      details: ["Your data remains under your control", "Connect only when you choose", "Enterprise-grade security", "Tokenized profile system"]
    },
    {
      title: "Intelligent Reasoning",
      description: "JoyceGPT-powered MCP layer scores matches beyond just skills",
      icon: Brain,
      details: ["Psychological fit analysis", "Work style compatibility", "Goal alignment scoring", "Multi-modal compute & perception"]
    },
    {
      title: "Real-Time Recommendations",
      description: "Top-tier matches with AI explanations and immediate next steps",
      icon: Zap,
      details: ["Instant match scoring", "AI-powered explanations", "Clear action paths", "Remove guesswork completely"]
    }
  ]

  const beneficiaries = [
    {
      title: "For Founders",
      description: "The fastest, most effective way to find your next co-founder or strategic partner",
      icon: Users,
      benefits: ["Stop sifting through directories", "Get intelligent recommendations", "Clear path forward", "High-leverage connections"],
      color: "blue"
    },
    {
      title: "For YC Partners", 
      description: "Proves core architecture and operational readiness for the entire founder cockpit",
      icon: Target,
      benefits: ["Reusable template for future modules", "Proven ingestion → reasoning → persistence pattern", "Scalable system architecture", "Foundation for investor graphs & market intelligence"],
      color: "green"
    },
    {
      title: "For Investors",
      description: "Demonstrates tangible progress of core IP and ability to monetize proprietary data",
      icon: TrendingUp,
      benefits: ["Live, scalable system", "High-value problem solving", "Proprietary data assets", "Proven monetization capability"],
      color: "purple"
    }
  ]

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Human Capital Intelligence Launch",
      status: "LIVE",
      description: "Co-Founder & Partner Matching Engine with JoyceGPT integration",
      features: ["Privacy-first matching", "Intelligent reasoning", "Real-time recommendations"],
      statusColor: "green"
    },
    {
      phase: "Phase 2", 
      title: "YC Integration",
      status: "IN PROGRESS",
      description: "Integration with YC's proprietary Bookface and Alumni directories",
      features: ["Expanded match pool", "YC alumni access", "Bookface integration", "Enhanced network reach"],
      statusColor: "blue"
    },
    {
      phase: "Phase 3",
      title: "Dynamic Feedback Loop",
      status: "PLANNED",
      description: "Real-time match quality refinement based on user interaction and success metrics",
      features: ["Success metric tracking", "Match quality optimization", "User feedback integration", "Continuous improvement"],
      statusColor: "orange"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
        <div className="flex items-center justify-center mb-4">
          <Rocket className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">NexusYC v1.0</h1>
          <Badge className="ml-3 bg-green-600 text-white">LIVE</Badge>
        </div>
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">Human Capital Intelligence Launch</h2>
        <p className="text-lg text-gray-600 mb-4">Release Date: September 22, 2025</p>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block">
          <p className="text-xl font-medium text-gray-800 italic">
            "Execute faster, decide smarter, grow bigger."
          </p>
        </div>
      </div>

      {/* What's New */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            What's New
          </CardTitle>
          <CardDescription className="text-base">
            We've launched the first production-grade, end-to-end module of the NexusYC OS: the Human Capital Intelligence vertical. 
            This build is not a simple feature; it's the foundational architecture that will power the future of the founder journey on our platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Brain className="w-5 h-5 text-purple-600 mr-2" />
              Core Module: Co-Founder & Partner Matching Engine
            </h3>
            <p className="text-gray-700 mb-4">
              This is a poly-modal, intelligent agent designed to solve the most critical, unsolved problem in the startup ecosystem: 
              finding the right human capital with speed and precision.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Core Features */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="w-6 h-6 text-yellow-600 mr-2" />
          Core Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Target className="w-6 h-6 text-green-600 mr-2" />
          Why This Matters for You
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          This isn't just a new feature; it's the first live service of the NexusYC ecosystem.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {beneficiaries.map((beneficiary, index) => {
            const Icon = beneficiary.icon
            const colorClasses = {
              blue: "border-blue-200 bg-blue-50",
              green: "border-green-200 bg-green-50", 
              purple: "border-purple-200 bg-purple-50"
            }
            const iconColors = {
              blue: "text-blue-600",
              green: "text-green-600",
              purple: "text-purple-600"
            }
            return (
              <Card key={index} className={`hover:shadow-lg transition-shadow duration-200 ${colorClasses[beneficiary.color]}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className={`w-6 h-6 ${iconColors[beneficiary.color]}`} />
                    <CardTitle className="text-lg">{beneficiary.title}</CardTitle>
                  </div>
                  <CardDescription>{beneficiary.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {beneficiary.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <ArrowRight className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Calendar className="w-6 h-6 text-orange-600 mr-2" />
          Next Up: Roadmap
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          This launch is a beachhead. The Human Capital Intelligence module will evolve rapidly.
        </p>
        <div className="space-y-6">
          {roadmapPhases.map((phase, index) => {
            const statusColors = {
              green: "bg-green-100 text-green-800 border-green-300",
              blue: "bg-blue-100 text-blue-800 border-blue-300",
              orange: "bg-orange-100 text-orange-800 border-orange-300"
            }
            return (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sm">{phase.phase}</Badge>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </div>
                    <Badge className={statusColors[phase.statusColor]}>{phase.status}</Badge>
                  </div>
                  <CardDescription>{phase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {phase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Mission Statement */}
      <Card className="bg-gradient-to-r from-gray-900 to-blue-900 text-white border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-xl mb-6">
            The mission is to accelerate founder outcomes. This build is a significant step toward that goal.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">We're Live</Badge>
            <Button 
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => {
                // Scroll to co-founder matching section
                const matchingSection = document.getElementById('cofounder-matching')
                if (matchingSection) {
                  matchingSection.scrollIntoView({ behavior: 'smooth' })
                } else {
                  window.open('https://www.ycombinator.com/cofounder-matching', '_blank')
                }
              }}
            >
              <Users className="w-4 h-4 mr-2" />
              Try Live Matching
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Technical Architecture Note */}
      <Card className="border-gray-300 bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MessageCircle className="w-5 h-5 text-gray-600 mr-2" />
            Technical Foundation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            The <strong>ingestion → reasoning → persistence → observability</strong> pattern is now a reusable template 
            for every future module, from investor graphs to market intelligence. It's the engine for the entire founder cockpit.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-medium text-blue-600">Ingestion</div>
              <div className="text-gray-600">Data Collection</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-medium text-green-600">Reasoning</div>
              <div className="text-gray-600">JoyceGPT Analysis</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-medium text-purple-600">Persistence</div>
              <div className="text-gray-600">Secure Storage</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-medium text-orange-600">Observability</div>
              <div className="text-gray-600">Performance Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
