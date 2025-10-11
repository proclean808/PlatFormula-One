"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import type { ReadinessScore } from "@/lib/types/database"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ReadinessScoringProps {
  userId: string
  existingScores: ReadinessScore[]
}

const CATEGORIES = [
  { id: "product", name: "Product Readiness", description: "Product-market fit and development stage" },
  { id: "market", name: "Market Opportunity", description: "Market size and competitive positioning" },
  { id: "team", name: "Team Strength", description: "Team composition and expertise" },
  { id: "business", name: "Business Model", description: "Revenue model and unit economics" },
  { id: "traction", name: "Traction", description: "Customer acquisition and growth metrics" },
]

export function ReadinessScoring({ userId, existingScores }: ReadinessScoringProps) {
  const [isCalculating, setIsCalculating] = useState(false)
  const router = useRouter()

  // Get latest scores by category
  const latestScores = CATEGORIES.map((category) => {
    const score = existingScores.find((s) => s.category === category.id)
    return {
      ...category,
      score: score?.score || 0,
      feedback: score?.feedback || {},
      calculated_at: score?.calculated_at,
    }
  })

  const overallScore =
    latestScores.length > 0 ? Math.round(latestScores.reduce((sum, s) => sum + s.score, 0) / latestScores.length) : 0

  const handleCalculateScore = async () => {
    setIsCalculating(true)
    const supabase = createClient()

    try {
      // Simulate AI scoring calculation
      // In production, this would call an AI service
      const newScores = CATEGORIES.map((category) => ({
        user_id: userId,
        category: category.id,
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        feedback: {
          strengths: ["Strong foundation", "Clear vision"],
          improvements: ["Need more validation", "Expand team"],
        },
      }))

      // Insert new scores
      const { error } = await supabase.from("readiness_scores").insert(newScores)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error calculating scores:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Work"
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overall Readiness Score</CardTitle>
              <CardDescription>Comprehensive assessment across all categories</CardDescription>
            </div>
            <Button onClick={handleCalculateScore} disabled={isCalculating}>
              {isCalculating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Recalculate Score
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <Badge variant={overallScore >= 80 ? "default" : overallScore >= 60 ? "secondary" : "outline"}>
                {getScoreLabel(overallScore)}
              </Badge>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to Excellence</span>
                  <span className="font-medium">{overallScore}%</span>
                </div>
                <Progress value={overallScore} />
              </div>
              {latestScores[0]?.calculated_at && (
                <p className="text-xs text-muted-foreground mt-2">
                  Last updated: {new Date(latestScores[0].calculated_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <div className="grid gap-4 md:grid-cols-2">
        {latestScores.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{category.name}</CardTitle>
                <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>{category.score}</span>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={category.score} />
              {category.feedback && Object.keys(category.feedback).length > 0 && (
                <div className="space-y-3">
                  {(category.feedback as { strengths?: string[]; improvements?: string[] }).strengths && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Strengths
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                        {(category.feedback as { strengths: string[] }).strengths.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(category.feedback as { strengths?: string[]; improvements?: string[] }).improvements && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        Areas for Improvement
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                        {(category.feedback as { improvements: string[] }).improvements.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Actions to improve your readiness score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Complete your application</h4>
                <p className="text-sm text-muted-foreground">
                  Finish your program application to get personalized feedback
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Engage with resources</h4>
                <p className="text-sm text-muted-foreground">Explore our resource directory to strengthen weak areas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Join community discussions</h4>
                <p className="text-sm text-muted-foreground">
                  Connect with other founders in the forums to learn and share
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
