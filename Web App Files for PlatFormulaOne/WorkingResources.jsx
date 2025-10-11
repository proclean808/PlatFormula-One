import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { ExternalLink, Building2, Rocket } from 'lucide-react'

export function WorkingResources() {
  const accelerators = [
    {
      name: "500 Global",
      url: "https://500.co/",
      description: "Global venture capital firm and accelerator with a strong focus on early-stage companies."
    },
    {
      name: "Alchemist Accelerator", 
      url: "https://www.alchemistaccelerator.com/",
      description: "A top program for seed-stage ventures that sell to large enterprises."
    },
    {
      name: "Plug and Play Tech Center",
      url: "https://www.plugandplaytechcenter.com/",
      description: "An innovation platform connecting startups with corporations across numerous industry-specific programs."
    },
    {
      name: "Techstars",
      url: "https://www.techstars.com/",
      description: "A global network that provides investment and mentorship to early-stage founders."
    },
    {
      name: "Berkeley SkyDeck",
      url: "https://skydeck.berkeley.edu/",
      description: "The official accelerator for UC Berkeley, with a hybrid program model for startups with university ties."
    },
    {
      name: "AngelPad",
      url: "https://angelpad.com/",
      description: "A seed-stage accelerator known for its hands-on approach and small cohort sizes."
    },
    {
      name: "Founder Institute",
      url: "https://fi.co/",
      description: "A global pre-seed startup accelerator providing structured guidance and a massive network."
    },
    {
      name: "HAX",
      url: "https://hax.co/",
      description: "A venture firm focused on hard tech startups with a presence in San Francisco."
    }
  ]

  const vcFirms = [
    {
      name: "AngelList",
      url: "https://www.angellist.com/",
      description: "The primary platform for connecting with individual angel investors and venture syndicates."
    },
    {
      name: "Andreessen Horowitz (a16z)",
      url: "https://a16z.com/",
      description: "A leading venture firm investing in seed to growth-stage technology companies."
    },
    {
      name: "Sequoia Capital",
      url: "https://www.sequoiacap.com/",
      description: "One of the world's most influential VC firms with deep roots in Silicon Valley."
    },
    {
      name: "Lightspeed Venture Partners",
      url: "https://lsvp.com/",
      description: "A multi-stage venture firm that focuses on enterprise, fintech, and consumer sectors."
    },
    {
      name: "Greylock",
      url: "https://greylock.com/",
      description: "A classic venture capital firm with a focus on enterprise software and consumer internet."
    },
    {
      name: "First Round Capital",
      url: "https://firstround.com/",
      description: "A top-tier seed-stage firm with a robust content platform, the 'First Round Review.'"
    },
    {
      name: "Bessemer Venture Partners",
      url: "https://www.bvp.com/",
      description: "A consistent, cross-stage investor with depth in AI, cloud, and healthcare."
    },
    {
      name: "Founders Fund",
      url: "https://foundersfund.com/",
      description: "A San Francisco-based firm known for investing in revolutionary technology companies."
    },
    {
      name: "Kleiner Perkins",
      url: "https://www.kleinerperkins.com/",
      description: "A storied venture firm with a long history of investing in iconic companies."
    }
  ]

  const ycResources = [
    {
      name: "YC Application",
      url: "https://www.ycombinator.com/apply",
      description: "Apply to Y Combinator's accelerator program"
    },
    {
      name: "Startup School",
      url: "https://www.startupschool.org",
      description: "Free 7-week online course on how to start a startup"
    },
    {
      name: "Co-Founder Matching",
      url: "https://www.ycombinator.com/cofounder-matching",
      description: "World's largest co-founder matching platform"
    },
    {
      name: "Startup Jobs",
      url: "https://www.ycombinator.com/jobs",
      description: "Job board for YC companies and startups"
    },
    {
      name: "YC Startup Directory",
      url: "https://www.ycombinator.com/companies",
      description: "Directory of all YC companies"
    },
    {
      name: "Requests for Startups (RFS)",
      url: "https://www.ycombinator.com/rfs",
      description: "A list of startup ideas YC is actively looking to fund"
    },
    {
      name: "Safe Financing Documents",
      url: "https://www.ycombinator.com/documents",
      description: "Standard legal documents for startup funding"
    },
    {
      name: "Hacker News",
      url: "https://news.ycombinator.com",
      description: "Tech community news and discussion"
    },
    {
      name: "YC Blog",
      url: "https://www.ycombinator.com/blog",
      description: "Latest insights and updates from Y Combinator"
    },
    {
      name: "YC Startup Library",
      url: "https://www.ycombinator.com/library",
      description: "Comprehensive collection of startup advice"
    },
    {
      name: "YC YouTube Channel",
      url: "https://www.youtube.com/c/ycombinator",
      description: "Video content from YC partners and founders"
    },
    {
      name: "YC Podcast",
      url: "https://www.ycombinator.com/podcast",
      description: "Weekly interviews with successful founders"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Y Combinator Resources */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Rocket className="w-6 h-6 mr-2 text-orange-500" />
          Y Combinator Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ycResources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{resource.name}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => window.open(resource.url, '_blank')}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Visit Site <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Accelerators & Incubators */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Rocket className="w-6 h-6 mr-2 text-blue-500" />
          Accelerators & Incubators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accelerators.map((accelerator, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{accelerator.name}</CardTitle>
                <CardDescription>{accelerator.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => window.open(accelerator.url, '_blank')}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Visit Site <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Venture Capital & Investor Networks */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-green-500" />
          Venture Capital & Investor Networks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vcFirms.map((firm, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{firm.name}</CardTitle>
                <CardDescription>{firm.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => window.open(firm.url, '_blank')}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Visit Site <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
