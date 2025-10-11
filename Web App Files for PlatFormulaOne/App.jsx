import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { ThemeToggle } from './components/ThemeToggle.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ApplicationBuilder } from './components/ApplicationBuilder.jsx'
import { WorkingResources } from './components/WorkingResources.jsx'
import { NexusYCLaunch } from './components/NexusYCLaunch.jsx'
import { CoFounderMatching } from './components/CoFounderMatching.jsx'
import { 
  BarChart3, 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Search,
  Filter,
  Star,
  Calendar,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  Globe,
  Building2,
  Rocket,
  Brain
} from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for demonstration
  const readinessScore = 78
  const applicationsSubmitted = 5
  const acceptanceRate = 12

  const accelerators = [
    {
      name: "Y Combinator",
      type: "Generalist",
      stage: "Pre-seed to Seed",
      acceptanceRate: "1.5%",
      funding: "$500K",
      location: "San Francisco",
      deadline: "2025-10-15",
      focus: ["B2B SaaS", "AI", "Consumer"],
      rating: 4.9
    },
    {
      name: "Forum Ventures",
      type: "B2B SaaS Specialist",
      stage: "Pre-seed",
      acceptanceRate: "3%",
      funding: "$250K",
      location: "San Francisco",
      deadline: "2025-11-01",
      focus: ["B2B SaaS", "Enterprise"],
      rating: 4.7
    },
    {
      name: "500 Global",
      type: "Generalist",
      stage: "Seed",
      acceptanceRate: "2%",
      funding: "$150K",
      location: "Global",
      deadline: "2025-10-30",
      focus: ["SaaS", "Fintech", "AI"],
      rating: 4.6
    },
    {
      name: "Techstars",
      type: "Industry Focused",
      stage: "Pre-seed to Seed",
      acceptanceRate: "1%",
      funding: "$120K",
      location: "Multiple",
      deadline: "2025-11-15",
      focus: ["B2B", "Healthcare", "Fintech"],
      rating: 4.8
    }
  ]

  const filteredAccelerators = accelerators.filter(acc => 
    acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.focus.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PlatFormula.One
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">B2B SaaS AI Startup Accelerator Program</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ready to Apply
              </Badge>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="directory" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Directory</span>
            </TabsTrigger>
            <TabsTrigger value="builder" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Builder</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Readiness Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700 mb-2">{readinessScore}%</div>
                  <Progress value={readinessScore} className="mb-2" />
                  <p className="text-sm text-blue-600">Strong foundation, ready for top-tier programs</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700 mb-2">{applicationsSubmitted}</div>
                  <p className="text-sm text-green-600">Submitted this cycle</p>
                  <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                    View Status
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 mb-2">{acceptanceRate}%</div>
                  <p className="text-sm text-purple-600">Above industry average (3%)</p>
                  <Badge className="mt-2 bg-purple-100 text-purple-700">Excellent</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>Next steps to improve your application success</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Complete pitch deck review</p>
                      <p className="text-sm text-gray-600">Get expert feedback on your presentation</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 ml-auto" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Update financial projections</p>
                      <p className="text-sm text-gray-600">Ensure your numbers are investor-ready</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-600 ml-auto" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Schedule mentor session</p>
                      <p className="text-sm text-gray-600">Connect with successful alumni</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-600 ml-auto" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Don't miss these important dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Y Combinator</p>
                        <p className="text-sm text-gray-600">Application deadline</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      Oct 15
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">500 Global</p>
                        <p className="text-sm text-gray-600">Application deadline</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      Oct 30
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Forum Ventures</p>
                        <p className="text-sm text-gray-600">Application deadline</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Nov 1
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Directory Tab */}
          <TabsContent value="directory" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Accelerator Directory</h2>
                <p className="text-gray-600">Discover and compare 700+ accelerator programs worldwide</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search accelerators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccelerators.map((accelerator, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{accelerator.name}</CardTitle>
                        <CardDescription>{accelerator.type}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{accelerator.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Stage</p>
                        <p className="font-medium">{accelerator.stage}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Funding</p>
                        <p className="font-medium">{accelerator.funding}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Acceptance</p>
                        <p className="font-medium text-red-600">{accelerator.acceptanceRate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium">{accelerator.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-2">Focus Areas</p>
                      <div className="flex flex-wrap gap-1">
                        {accelerator.focus.map((focus, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        Deadline: {new Date(accelerator.deadline).toLocaleDateString()}
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Application Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <ApplicationBuilder />
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            {/* Featured: NexusYC v1.0 Launch */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-white/20 text-white mb-3">🚀 JUST LAUNCHED</Badge>
                    <h2 className="text-2xl font-bold mb-2">NexusYC v1.0 - Human Capital Intelligence</h2>
                    <p className="text-blue-100 mb-4">
                      Production-grade Co-Founder & Partner Matching Engine with JoyceGPT intelligence
                    </p>
                    <p className="text-lg font-medium italic">
                      "Execute faster, decide smarter, grow bigger."
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold mb-1">Sept 22, 2025</div>
                    <div className="text-blue-100">Release Date</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NexusYC Launch Details */}
            <NexusYCLaunch />

            {/* Live Co-Founder Matching */}
            <div id="cofounder-matching" className="mt-8">
              <CoFounderMatching />
            </div>

            {/* Working Resources Content */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Startup Resources</h3>
              <WorkingResources />
            </div>
          </TabsContent>

          {/* Success Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Success Tracking</h2>
              <p className="text-gray-600 mb-6">Analytics and insights to measure your progress</p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                View Analytics
              </Button>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Community & Support</h2>
              <p className="text-gray-600 mb-6">Connect with founders, mentors, and experts</p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Join Community
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">PlatFormula.One</span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering startups to succeed in accelerator programs through guided assistance and expert insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Dashboard</a></li>
                <li><a href="#" className="hover:text-emerald-600">Directory</a></li>
                <li><a href="#" className="hover:text-emerald-600">Application Builder</a></li>
                <li><a href="#" className="hover:text-emerald-600">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-600">Community</a></li>
                <li><a href="mailto:Jonathan@Behrendterprizes.com" className="text-emerald-600 hover:text-emerald-700 font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-600">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="tel:+14156954606" className="text-emerald-600 hover:text-emerald-700 font-medium">(415) 695-4606</a></li>
                <li><a href="mailto:Jonathan@Behrendterprizes.com" className="text-emerald-600 hover:text-emerald-700 font-medium">Jonathan@Behrendterprizes.com</a></li>
                <li><a href="https://linkedin.com/in/Jonathan-Behrendt" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">LinkedIn Profile</a></li>
                <li><a href="https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=jonathan-behrendt" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">Follow on LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 PlatFormula.One. All rights reserved. Empowering startup success through guided accelerator acceptance.</p>
            <p className="mt-2">
              Created by <a href="https://linkedin.com/in/Jonathan-Behrendt" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">Jonathan Behrendt</a>
            </p>
            <p className="mt-1 space-x-4">
              <a href="tel:+14156954606" className="text-emerald-600 hover:text-emerald-700 font-medium">(415) 695-4606</a>
              <span className="text-gray-400">•</span>
              <a href="mailto:Jonathan@Behrendterprizes.com" className="text-emerald-600 hover:text-emerald-700 font-medium">Jonathan@Behrendterprizes.com</a>
              <span className="text-gray-400">•</span>
              <a href="https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=jonathan-behrendt" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Follow on LinkedIn →
              </a>
            </p>
          </div>
        </div>
      </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
