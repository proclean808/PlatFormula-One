import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Building2, 
  User, 
  Search, 
  ExternalLink,
  MapPin,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Filter,
  Globe,
  Mail,
  Linkedin,
  Twitter,
  Rocket,
  Target,
  Zap
} from 'lucide-react'

export function ComprehensiveInvestorDatabase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStage, setSelectedStage] = useState('all')

  const acceleratorsIncubators = [
    {
      name: "500 Global",
      type: "Global VC & Accelerator",
      focus: "Early-stage companies worldwide",
      website: "https://500.co/",
      description: "Global venture capital firm and accelerator with a strong focus on early-stage companies",
      programs: ["Accelerator Program", "Venture Capital", "Global Network"],
      locations: "San Francisco, 70+ countries",
      investment: "$150K - $250K",
      duration: "4 months"
    },
    {
      name: "Alchemist Accelerator",
      type: "Enterprise-focused Accelerator",
      focus: "B2B startups selling to enterprises",
      website: "https://www.alchemistaccelerator.com/",
      description: "A top program for seed-stage ventures that sell to large enterprises",
      programs: ["6-month program", "Enterprise mentorship", "Demo Day"],
      locations: "San Francisco",
      investment: "$250K",
      duration: "6 months"
    },
    {
      name: "Plug and Play Tech Center",
      type: "Innovation Platform",
      focus: "Corporate innovation & startups",
      website: "https://www.plugandplaytechcenter.com/",
      description: "An innovation platform connecting startups with corporations across numerous industry-specific programs",
      programs: ["Industry-specific accelerators", "Corporate partnerships", "Global network"],
      locations: "Silicon Valley, 50+ locations globally",
      investment: "Varies by program",
      duration: "3-6 months"
    },
    {
      name: "Techstars",
      type: "Global Accelerator Network",
      focus: "Early-stage startups",
      website: "https://www.techstars.com/",
      description: "A global network that provides investment and mentorship to early-stage founders",
      programs: ["3-month accelerator", "$120K investment", "Lifetime network"],
      locations: "150+ cities worldwide",
      investment: "$120K",
      duration: "3 months"
    },
    {
      name: "Berkeley SkyDeck",
      type: "University Accelerator",
      focus: "UC Berkeley-affiliated startups",
      website: "https://skydeck.berkeley.edu/",
      description: "The official accelerator for UC Berkeley, with a hybrid program model for startups with university ties",
      programs: ["Cohort program", "University resources", "Alumni network"],
      locations: "Berkeley, California",
      investment: "$50K - $100K",
      duration: "6 months"
    },
    {
      name: "AngelPad",
      type: "Seed Accelerator",
      focus: "Early-stage technology startups",
      website: "https://angelpad.com/",
      description: "A seed-stage accelerator known for its hands-on approach and small cohort sizes",
      programs: ["10-week program", "Small cohorts", "Hands-on mentorship"],
      locations: "San Francisco, New York",
      investment: "$120K",
      duration: "10 weeks"
    },
    {
      name: "Founder Institute",
      type: "Pre-seed Accelerator",
      focus: "Pre-seed startup acceleration",
      website: "https://fi.co/",
      description: "A global pre-seed startup accelerator providing structured guidance and a massive network",
      programs: ["4-month program", "Global network", "Equity-based"],
      locations: "200+ cities globally",
      investment: "Equity only",
      duration: "4 months"
    },
    {
      name: "HAX",
      type: "Hard Tech Accelerator",
      focus: "Hardware & deep tech startups",
      website: "https://hax.co/",
      description: "A venture firm focused on hard tech startups with a presence in San Francisco",
      programs: ["Hardware acceleration", "Manufacturing support", "Deep tech focus"],
      locations: "San Francisco, Shenzhen",
      investment: "$250K",
      duration: "6 months"
    }
  ]

  const topVCFirms = [
    {
      name: "Andreessen Horowitz (a16z)",
      aum: "$35B",
      checkSize: "$250K - $100M+",
      focus: ["Software", "Crypto", "Bio", "Consumer"],
      portfolio: ["Facebook", "Twitter", "Coinbase", "Airbnb"],
      website: "https://a16z.com/",
      description: "A leading venture firm investing in seed to growth-stage technology companies",
      founded: "2009",
      location: "Menlo Park, CA"
    },
    {
      name: "Sequoia Capital",
      aum: "$85B",
      checkSize: "$1M - $100M+",
      focus: ["All stages", "Technology"],
      portfolio: ["Apple", "Google", "WhatsApp", "Stripe"],
      website: "https://www.sequoiacap.com/",
      description: "One of the world's most influential VC firms with deep roots in Silicon Valley",
      founded: "1972",
      location: "Menlo Park, CA"
    },
    {
      name: "Lightspeed Venture Partners",
      aum: "$18B",
      checkSize: "$1M - $20M",
      focus: ["Enterprise", "Fintech", "Consumer"],
      portfolio: ["Snapchat", "Affirm", "Mulesoft", "AppDynamics"],
      website: "https://lsvp.com/",
      description: "A multi-stage venture firm that focuses on enterprise, fintech, and consumer sectors",
      founded: "2000",
      location: "Menlo Park, CA"
    },
    {
      name: "Greylock Partners",
      aum: "$15B",
      checkSize: "$1M - $15M",
      focus: ["Enterprise software", "Consumer internet"],
      portfolio: ["LinkedIn", "Workday", "Airbnb", "Discord"],
      website: "https://greylock.com/",
      description: "A classic venture capital firm with a focus on enterprise software and consumer internet",
      founded: "1965",
      location: "Menlo Park, CA"
    },
    {
      name: "First Round Capital",
      aum: "$1.5B",
      checkSize: "$500K - $5M",
      focus: ["Seed stage", "Early stage"],
      portfolio: ["Uber", "Square", "Warby Parker", "Notion"],
      website: "https://firstround.com/",
      description: "A top-tier seed-stage firm with a robust content platform, the 'First Round Review'",
      founded: "2004",
      location: "San Francisco, CA"
    },
    {
      name: "Bessemer Venture Partners",
      aum: "$20B",
      checkSize: "$500K - $50M",
      focus: ["AI", "Cloud", "Healthcare"],
      portfolio: ["LinkedIn", "Shopify", "Twilio", "Pinterest"],
      website: "https://www.bvp.com/",
      description: "A consistent, cross-stage investor with depth in AI, cloud, and healthcare",
      founded: "1911",
      location: "Menlo Park, CA"
    },
    {
      name: "Founders Fund",
      aum: "$12B",
      checkSize: "$1M - $100M",
      focus: ["Revolutionary technology"],
      portfolio: ["Facebook", "SpaceX", "Palantir", "Stripe"],
      website: "https://foundersfund.com/",
      description: "A San Francisco-based firm known for investing in revolutionary technology companies",
      founded: "2005",
      location: "San Francisco, CA"
    },
    {
      name: "Kleiner Perkins",
      aum: "$9B",
      checkSize: "$1M - $50M",
      focus: ["Technology", "Life sciences"],
      portfolio: ["Google", "Amazon", "Genentech", "Twitter"],
      website: "https://www.kleinerperkins.com/",
      description: "A storied venture firm with a long history of investing in iconic companies",
      founded: "1972",
      location: "Menlo Park, CA"
    }
  ]

  const angelInvestors = [
    {
      name: "Naval Ravikant",
      title: "Co-founder of AngelList",
      location: "San Francisco, CA",
      checkSize: "$25K - $100K",
      focus: ["Consumer", "Enterprise", "Crypto"],
      notable: ["Twitter", "Uber", "Yammer"],
      linkedin: "https://linkedin.com/in/naval",
      twitter: "@naval",
      description: "Prolific angel investor and startup advisor"
    },
    {
      name: "Jason Calacanis",
      title: "Founder of Launch",
      location: "San Francisco, CA",
      checkSize: "$25K - $250K",
      focus: ["Consumer", "Enterprise", "Media"],
      notable: ["Uber", "Robinhood", "Thumbtack"],
      linkedin: "https://linkedin.com/in/jasoncalacanis",
      twitter: "@jason",
      description: "Serial entrepreneur and angel investor"
    },
    {
      name: "Reid Hoffman",
      title: "Co-founder of LinkedIn",
      location: "Palo Alto, CA",
      checkSize: "$50K - $500K",
      focus: ["Enterprise", "Consumer", "AI"],
      notable: ["Facebook", "Airbnb", "Zynga"],
      linkedin: "https://linkedin.com/in/reidhoffman",
      twitter: "@reidhoffman",
      description: "LinkedIn founder and Greylock partner"
    },
    {
      name: "Elad Gil",
      title: "Entrepreneur & Investor",
      location: "San Francisco, CA",
      checkSize: "$25K - $200K",
      focus: ["Enterprise", "Consumer", "AI"],
      notable: ["Airbnb", "Coinbase", "Stripe"],
      linkedin: "https://linkedin.com/in/eladgil",
      twitter: "@eladgil",
      description: "Former Google exec and high-growth company advisor"
    },
    {
      name: "Balaji Srinivasan",
      title: "Former CTO of Coinbase",
      location: "San Francisco, CA",
      checkSize: "$25K - $100K",
      focus: ["Crypto", "Enterprise", "Healthcare"],
      notable: ["Coinbase", "Earn.com", "21.co"],
      linkedin: "https://linkedin.com/in/balajis",
      twitter: "@balajis",
      description: "Tech entrepreneur and crypto thought leader"
    }
  ]

  const investmentPlatforms = [
    {
      name: "AngelList",
      description: "The primary platform for connecting with individual angel investors and venture syndicates",
      url: "https://www.angellist.com/",
      type: "Platform",
      investors: "100,000+",
      startups: "50,000+",
      features: ["Syndicates", "Rolling funds", "Talent platform"]
    },
    {
      name: "Gust",
      description: "Global platform connecting entrepreneurs with investors",
      url: "https://gust.com",
      type: "Platform",
      investors: "50,000+",
      startups: "30,000+",
      features: ["Global reach", "Investor matching", "Due diligence tools"]
    },
    {
      name: "SeedInvest",
      description: "Equity crowdfunding platform for accredited investors",
      url: "https://seedinvest.com",
      type: "Crowdfunding",
      investors: "25,000+",
      startups: "1,000+",
      features: ["Equity crowdfunding", "Due diligence", "Portfolio management"]
    },
    {
      name: "Republic",
      description: "Investment platform for retail and accredited investors",
      url: "https://republic.co",
      type: "Crowdfunding",
      investors: "1M+",
      startups: "500+",
      features: ["Retail investing", "Crypto projects", "Real estate"]
    }
  ]

  const investorDatabases = [
    {
      name: "Crunchbase",
      description: "Comprehensive database of investors and funding rounds",
      url: "https://crunchbase.com",
      type: "Database",
      coverage: "Global",
      pricing: "Freemium",
      features: ["Company profiles", "Funding data", "Investor tracking"]
    },
    {
      name: "PitchBook",
      description: "Professional-grade private market data",
      url: "https://pitchbook.com",
      type: "Database",
      coverage: "Global",
      pricing: "Paid",
      features: ["Market research", "Deal sourcing", "Portfolio monitoring"]
    },
    {
      name: "Angel Match",
      description: "Database of 110,000+ investors with contact details",
      url: "https://angelmatch.io",
      type: "Database",
      coverage: "Global",
      pricing: "Paid",
      features: ["Contact details", "Investment preferences", "Outreach tools"]
    },
    {
      name: "Gritt",
      description: "Free investor database with search and filtering",
      url: "https://gritt.io",
      type: "Database",
      coverage: "Global",
      pricing: "Free",
      features: ["Free access", "Search filters", "Contact information"]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Comprehensive Investor & Accelerator Database</h2>
        <p className="text-gray-600 mb-6">
          Complete directory of accelerators, VCs, angels, and funding platforms for startup success
        </p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search investors and accelerators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="accelerators" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="accelerators" className="flex items-center space-x-2">
            <Rocket className="w-4 h-4" />
            <span>Accelerators</span>
          </TabsTrigger>
          <TabsTrigger value="vc-firms" className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>VC Firms</span>
          </TabsTrigger>
          <TabsTrigger value="angels" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Angels</span>
          </TabsTrigger>
          <TabsTrigger value="platforms" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Platforms</span>
          </TabsTrigger>
          <TabsTrigger value="databases" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Databases</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accelerators" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {acceleratorsIncubators.map((accelerator, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-orange-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{accelerator.name}</CardTitle>
                      <CardDescription>{accelerator.type}</CardDescription>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{accelerator.locations}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-orange-300">{accelerator.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{accelerator.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Investment:</span>
                      <p className="text-gray-600">{accelerator.investment}</p>
                    </div>
                    <div>
                      <span className="font-medium">Focus:</span>
                      <p className="text-gray-600">{accelerator.focus}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Programs:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {accelerator.programs.map((program, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700" 
                    onClick={() => window.open(accelerator.website, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit {accelerator.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vc-firms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topVCFirms.map((firm, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-blue-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{firm.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{firm.location}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-blue-300">AUM: {firm.aum}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{firm.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Check Size:</span>
                      <p className="text-gray-600">{firm.checkSize}</p>
                    </div>
                    <div>
                      <span className="font-medium">Founded:</span>
                      <p className="text-gray-600">{firm.founded}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Focus Areas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {firm.focus.map((area, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-blue-300">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Notable Portfolio:</span>
                    <p className="text-sm text-gray-600 mt-1">{firm.portfolio.join(", ")}</p>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    onClick={() => window.open(firm.website, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="angels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {angelInvestors.map((angel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-green-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{angel.name}</CardTitle>
                      <CardDescription>{angel.title}</CardDescription>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{angel.location}</span>
                      </CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{angel.description}</p>
                  
                  <div>
                    <span className="font-medium text-sm">Check Size:</span>
                    <p className="text-gray-600 text-sm">{angel.checkSize}</p>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Focus Areas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {angel.focus.map((area, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-green-300">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Notable Investments:</span>
                    <p className="text-sm text-gray-600 mt-1">{angel.notable.join(", ")}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-green-300 hover:bg-green-50"
                      onClick={() => window.open(angel.linkedin, '_blank')}
                    >
                      <Linkedin className="w-4 h-4 mr-1" />
                      LinkedIn
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-green-300 hover:bg-green-50"
                      onClick={() => window.open(`https://twitter.com/${angel.twitter.replace('@', '')}`, '_blank')}
                    >
                      <Twitter className="w-4 h-4 mr-1" />
                      Twitter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentPlatforms.map((platform, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-purple-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <CardDescription>{platform.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-purple-300">{platform.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Investors:</span>
                      <p className="text-gray-600">{platform.investors}</p>
                    </div>
                    <div>
                      <span className="font-medium">Startups:</span>
                      <p className="text-gray-600">{platform.startups}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Key Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {platform.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    onClick={() => window.open(platform.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Access Platform
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="databases" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investorDatabases.map((database, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{database.name}</CardTitle>
                      <CardDescription>{database.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{database.pricing}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Coverage:</span>
                      <p className="text-gray-600">{database.coverage}</p>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <p className="text-gray-600">{database.type}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {database.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => window.open(database.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Access Database
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
