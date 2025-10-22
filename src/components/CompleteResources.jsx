import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ExternalLink } from 'lucide-react';

const CompleteResources = () => {
  const resources = [
    {
      category: "Startup Resources",
      color: "orange",
      items: [
        {
          name: "Y Combinator",
          description: "The world's most prestigious startup accelerator",
          url: "https://www.ycombinator.com"
        },
        {
          name: "Startup School",
          description: "Free online program for founders",
          url: "https://www.startupschool.org"
        },
        {
          name: "YC Startup Library",
          description: "Essential reading and resources for founders",
          url: "https://www.ycombinator.com/library"
        },
        {
          name: "Techstars",
          description: "Global startup accelerator and venture capital firm",
          url: "https://www.techstars.com"
        },
        {
          name: "500 Global",
          description: "Venture capital firm and startup accelerator",
          url: "https://500.co"
        },
        {
          name: "Plug and Play",
          description: "Global innovation platform connecting startups with corporations",
          url: "https://www.plugandplaytechcenter.com"
        },
        {
          name: "On Deck Founding",
          description: "Community and accelerator for early-stage founders",
          url: "https://www.beondeck.com/founders"
        },
        {
          name: "Antler",
          description: "Global early-stage VC enabling people to start companies",
          url: "https://www.antler.co"
        },
        {
          name: "South Park Commons",
          description: "Community of technologists, founders, and researchers",
          url: "https://www.southparkcommons.com"
        },
        {
          name: "Indie Hackers",
          description: "Community for founders building profitable businesses",
          url: "https://www.indiehackers.com"
        },
        {
          name: "Product Hunt",
          description: "Platform to discover and launch new products",
          url: "https://www.producthunt.com"
        },
        {
          name: "Hacker News",
          description: "Tech news and discussion community",
          url: "https://news.ycombinator.com"
        },
        {
          name: "YC Startup School",
          description: "Free online course for founders",
          url: "https://www.startupschool.org"
        }
      ]
    },
    {
      category: "Accelerators & Incubators",
      color: "blue",
      items: [
        {
          name: "YCombinator",
          description: "World's leading startup accelerator",
          url: "https://www.ycombinator.com/apply"
        },
        {
          name: "Techstars Accelerator",
          description: "Mentorship-driven accelerator program",
          url: "https://www.techstars.com/accelerators"
        },
        {
          name: "Alchemist Accelerator",
          description: "B2B/Enterprise Software - Deadline: November 21, 2025",
          url: "https://www.alchemistaccelerator.com/apply"
        },

        {
          name: "Founder Institute",
          description: "Pre-seed startup accelerator",
          url: "https://fi.co"
        },
        {
          name: "ERA",
          description: "NYC-based accelerator for early-stage startups",
          url: "https://www.eranyc.com"
        },
        {
          name: "Berkeley SkyDeck",
          description: "Deep Tech, UC Berkeley - Batch 22 opens January 2026",
          url: "https://skydeck.berkeley.edu/apply"
        },
        {
          name: "AWS Generative AI Accelerator",
          description: "Generative AI startups - Monitor for 2026 cohort",
          url: "https://aws.amazon.com/startups/programs/generative-ai"
        },
        {
          name: "Google for Startups Accelerator: AI-First",
          description: "AI-First startups - Monitor for 2026 cohort",
          url: "https://startup.google.com/programs/accelerator/ai-first/"
        },
        {
          name: "AngelPad",
          description: "Seed-stage accelerator - Currently closed, check for updates",
          url: "https://angelpad.com/more/"
        },
        {
          name: "NVIDIA Inception",
          description: "AI and data science startups - Rolling applications",
          url: "https://programs.nvidia.com/phoenix/application/"
        }
      ]
    },
    {
      category: "Venture Capital & Seed Networks",
      color: "green",
      items: [
        {
          name: "AngelList",
          description: "Platform for startups, investors, and job seekers",
          url: "https://www.angellist.com"
        },
        {
          name: "Crunchbase",
          description: "Business information platform about private and public companies",
          url: "https://www.crunchbase.com"
        },
        {
          name: "Gust",
          description: "Platform connecting startups with investors",
          url: "https://gust.com"
        },
        {
          name: "SeedInvest",
          description: "Equity crowdfunding platform",
          url: "https://www.seedinvest.com"
        },
        {
          name: "Republic",
          description: "Investment platform for startups",
          url: "https://republic.com"
        },
        {
          name: "Wefunder",
          description: "Crowdfunding platform for startups",
          url: "https://wefunder.com"
        },
        {
          name: "First Round Capital",
          description: "Seed-stage venture capital firm",
          url: "https://firstround.com"
        },
        {
          name: "Sequoia Capital",
          description: "Leading venture capital firm",
          url: "https://www.sequoiacap.com"
        },
        {
          name: "Andreessen Horowitz",
          description: "Silicon Valley venture capital firm",
          url: "https://a16z.com"
        },
        {
          name: "Kleiner Perkins",
          description: "Venture capital firm investing in technology companies",
          url: "https://www.kleinerperkins.com"
        },
        {
          name: "Greylock Partners",
          description: "Leading venture capital firm",
          url: "https://greylock.com"
        },
        {
          name: "Lightspeed Venture Partners",
          description: "Multi-stage venture capital firm",
          url: "https://lsvp.com"
        },
        {
          name: "Bessemer Venture Partners",
          description: "Global venture capital firm",
          url: "https://www.bvp.com"
        },
        {
          name: "Accel",
          description: "Venture capital firm",
          url: "https://www.accel.com"
        },
        {
          name: "Benchmark",
          description: "Venture capital firm for early-stage startups",
          url: "https://www.benchmark.com"
        },
        {
          name: "Founders Fund",
          description: "San Francisco-based venture capital firm",
          url: "https://foundersfund.com"
        },
        {
          name: "Index Ventures",
          description: "International venture capital firm",
          url: "https://www.indexventures.com"
        },
        {
          name: "NEA",
          description: "New Enterprise Associates - venture capital firm",
          url: "https://www.nea.com"
        },
        {
          name: "Insight Partners",
          description: "Global software investor",
          url: "https://www.insightpartners.com"
        },
        {
          name: "General Catalyst",
          description: "Venture capital firm",
          url: "https://www.generalcatalyst.com"
        },
        {
          name: "GV (Google Ventures)",
          description: "Venture capital arm of Alphabet Inc.",
          url: "https://www.gv.com"
        },
        {
          name: "Initialized Capital",
          description: "Early-stage venture capital firm",
          url: "https://initialized.com"
        },
        {
          name: "Lowercase Capital",
          description: "Seed-stage venture capital firm",
          url: "https://lowercasecapital.com"
        },
        {
          name: "SV Angel",
          description: "San Francisco-based angel fund",
          url: "https://svangel.com"
        },
        {
          name: "Craft Ventures",
          description: "Early-stage venture capital firm",
          url: "https://www.craftventures.com"
        },
        {
          name: "Lux Capital",
          description: "Venture capital firm investing in emerging science and technology",
          url: "https://www.luxcapital.com"
        },
        {
          name: "8VC",
          description: "Technology investment firm",
          url: "https://8vc.com"
        },
        {
          name: "Khosla Ventures",
          description: "Venture capital firm focused on technology",
          url: "https://www.khoslaventures.com"
        },
        {
          name: "Spark Capital",
          description: "Venture capital firm",
          url: "https://www.sparkcapital.com"
        },
        {
          name: "Union Square Ventures",
          description: "New York-based venture capital firm",
          url: "https://www.usv.com"
        },
        {
          name: "Felicis Ventures",
          description: "Early-stage venture capital firm",
          url: "https://www.felicis.com"
        },
        {
          name: "Forerunner Ventures",
          description: "Early-stage venture capital firm",
          url: "https://forerunnerventures.com"
        },
        {
          name: "Notation Capital",
          description: "Pre-seed venture capital firm",
          url: "https://notationcapital.com"
        },
        {
          name: "Floodgate",
          description: "Seed-stage venture capital firm",
          url: "https://www.floodgate.com"
        },
        {
          name: "Homebrew",
          description: "Seed-stage venture capital firm",
          url: "https://www.homebrew.co"
        },
        {
          name: "Cowboy Ventures",
          description: "Seed-stage venture capital firm",
          url: "https://cowboy.vc"
        },
        {
          name: "Bloomberg Beta",
          description: "Early-stage venture capital firm",
          url: "https://www.bloombergbeta.com"
        },
        {
          name: "Susa Ventures",
          description: "Early-stage venture capital firm",
          url: "https://www.susaventures.com"
        },
        {
          name: "Haystack",
          description: "Early-stage venture capital firm",
          url: "https://www.haystack.vc"
        },
        {
          name: "Precursor Ventures",
          description: "Pre-seed venture capital firm",
          url: "https://precursorvc.com"
        },
        {
          name: "Uncork Capital",
          description: "Early-stage venture capital firm",
          url: "https://www.uncorkcapital.com"
        },
        {
          name: "Upfront Ventures",
          description: "Los Angeles-based venture capital firm",
          url: "https://www.upfront.com"
        },
        {
          name: "Freestyle Capital",
          description: "Early-stage venture capital firm",
          url: "https://freestyle.vc"
        },
        {
          name: "Amplify Partners",
          description: "Venture capital firm focused on data and infrastructure",
          url: "https://www.amplifypartners.com"
        },
        {
          name: "Forgeup.vc",
          description: "Venture capital and startup resources",
          url: "https://forgeup.vc"
        }
      ]
    }
  ];

  const getButtonColor = (color) => {
    switch(color) {
      case 'orange':
        return 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600';
      case 'blue':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600';
      case 'green':
        return 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600';
      default:
        return 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent mb-2">
          Startup Resources
        </h2>
        <p className="text-muted-foreground">
          Curated collection of accelerators, investors, and startup tools
        </p>
      </div>

      {resources.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">{section.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item, itemIdx) => (
              <Card key={itemIdx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition-all ${getButtonColor(section.color)}`}
                  >
                    Visit Resource
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompleteResources;

