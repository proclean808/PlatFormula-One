import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { YCResources } from './YCResources.jsx'
import { ComprehensiveInvestorDatabase } from './ComprehensiveInvestorDatabase.jsx'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Clock,
  Star,
  Search,
  Play,
  Download,
  ExternalLink,
  TrendingUp,
  Target,
  DollarSign,
  Scale,
  Lightbulb,
  Award,
  Building2,
  GraduationCap
} from 'lucide-react'

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const learningPaths = [
    {
      title: "Pre-Seed Startup Fundamentals",
      description: "Essential knowledge for early-stage founders",
      duration: "4 weeks",
      modules: 12,
      level: "Beginner",
      rating: 4.8,
      enrolled: 1250,
      category: "fundamentals"
    },
    {
      title: "B2B SaaS Go-to-Market Strategy",
      description: "Build and execute winning GTM strategies",
      duration: "3 weeks",
      modules: 9,
      level: "Intermediate",
      rating: 4.9,
      enrolled: 890,
      category: "growth"
    },
    {
      title: "Fundraising Masterclass",
      description: "From pitch deck to term sheet negotiation",
      duration: "5 weeks",
      modules: 15,
      level: "Advanced",
      rating: 4.7,
      enrolled: 2100,
      category: "fundraising"
    }
  ]

  const videos = [
    {
      title: "How to Build a Compelling Pitch Deck",
      speaker: "Sarah Chen, YC Partner",
      duration: "45 min",
      views: "125K",
      rating: 4.9,
      thumbnail: "pitch-deck",
      category: "fundraising"
    },
    {
      title: "Finding Product-Market Fit",
      speaker: "Marcus Rodriguez, Founder of TechFlow",
      duration: "38 min",
      views: "89K",
      rating: 4.8,
      thumbnail: "pmf",
      category: "product"
    },
    {
      title: "Scaling Your B2B Sales Process",
      speaker: "Jennifer Kim, VP Sales at CloudCorp",
      duration: "52 min",
      views: "67K",
      rating: 4.7,
      thumbnail: "sales",
      category: "growth"
    },
    {
      title: "Legal Essentials for Startups",
      speaker: "David Park, Startup Attorney",
      duration: "41 min",
      views: "45K",
      rating: 4.6,
      thumbnail: "legal",
      category: "legal"
    }
  ]

  const guides = [
    {
      title: "The Complete Guide to Accelerator Applications",
      author: "PlatFormula.One Team",
      pages: 45,
      downloads: "15K",
      rating: 4.9,
      category: "applications",
      type: "PDF Guide"
    },
    {
      title: "Financial Modeling for SaaS Startups",
      author: "Finance Experts Collective",
      pages: 32,
      downloads: "12K",
      rating: 4.8,
      category: "finance",
      type: "Excel Template"
    },
    {
      title: "Customer Discovery Playbook",
      author: "Lean Startup Institute",
      pages: 28,
      downloads: "18K",
      rating: 4.7,
      category: "product",
      type: "PDF Guide"
    },
    {
      title: "Term Sheet Negotiation Checklist",
      author: "Venture Law Group",
      pages: 12,
      downloads: "8K",
      rating: 4.6,
      category: "legal",
      type: "Checklist"
    }
  ]

  const mentors = [
    {
      name: "Alex Thompson",
      title: "Former YC Partner, 3x Founder",
      expertise: ["Fundraising", "Product Strategy", "Team Building"],
      rating: 4.9,
      sessions: 150,
      price: "$200/hour",
      available: true
    },
    {
      name: "Maria Santos",
      title: "B2B SaaS Expert, Ex-Salesforce VP",
      expertise: ["Go-to-Market", "Sales Strategy", "Customer Success"],
      rating: 4.8,
      sessions: 200,
      price: "$180/hour",
      available: true
    },
    {
      name: "James Liu",
      title: "AI Startup Founder, Technical Advisor",
      expertise: ["AI/ML", "Technical Architecture", "Product Development"],
      rating: 4.9,
      sessions: 95,
      price: "$220/hour",
      available: false
    }
  ]

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700'
      case 'Intermediate': return 'bg-blue-100 text-blue-700'
      case 'Advanced': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Learning Resources</h2>
        <p className="text-gray-600 mb-6">
          Comprehensive educational content to accelerate your startup journey
        </p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="yc-resources" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="yc-resources" className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>YC Resources</span>
          </TabsTrigger>
          <TabsTrigger value="investors" className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Investors</span>
          </TabsTrigger>
          <TabsTrigger value="paths" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Learning Paths</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Guides</span>
          </TabsTrigger>
          <TabsTrigger value="mentors" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Mentors</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="yc-resources" className="space-y-6">
          <YCResources />
        </TabsContent>

        <TabsContent value="investors" className="space-y-6">
          <ComprehensiveInvestorDatabase />
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </div>
                    <Badge className={getLevelColor(path.level)}>
                      {path.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span>{path.modules} modules</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{path.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{path.enrolled} enrolled</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{video.title}</CardTitle>
                      <CardDescription>{video.speaker}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{video.duration}</span>
                    </span>
                    <span>{video.views} views</span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{video.rating}</span>
                    </span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{guide.title}</CardTitle>
                      <CardDescription>by {guide.author}</CardDescription>
                    </div>
                    <Badge variant="outline">{guide.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{guide.pages} pages</span>
                    <span>{guide.downloads} downloads</span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{guide.rating}</span>
                    </span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.title}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{mentor.rating}</span>
                    </div>
                    <div>{mentor.sessions} sessions</div>
                    <div className="font-semibold text-green-600">{mentor.price}</div>
                    <div className={`text-xs ${mentor.available ? 'text-green-600' : 'text-red-600'}`}>
                      {mentor.available ? 'Available' : 'Busy'}
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={!mentor.available}
                    variant={mentor.available ? "default" : "outline"}
                  >
                    {mentor.available ? 'Book Session' : 'Join Waitlist'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Resources */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Featured This Week</span>
          </CardTitle>
          <CardDescription>
            Hand-picked resources from our expert team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">SaaS Metrics That Matter</p>
                <p className="text-sm text-gray-600">Essential KPIs for B2B startups</p>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-600 ml-auto" />
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">AI Startup Playbook 2025</p>
                <p className="text-sm text-gray-600">Latest trends and strategies</p>
              </div>
              <ExternalLink className="w-4 h-4 text-purple-600 ml-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
