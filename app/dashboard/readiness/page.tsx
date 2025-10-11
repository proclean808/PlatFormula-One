import { createClient } from "@/lib/supabase/server"
import { ReadinessScoring } from "@/components/readiness/readiness-scoring"
import type { ReadinessScore } from "@/lib/types/database"

export default async function ReadinessPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch user's readiness scores
  const { data: scores } = await supabase
    .from("readiness_scores")
    .select("*")
    .eq("user_id", user.id)
    .order("calculated_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Readiness Score</h1>
        <p className="text-muted-foreground">AI-powered assessment of your startup&apos;s readiness</p>
      </div>

      <ReadinessScoring userId={user.id} existingScores={scores as ReadinessScore[]} />
    </div>
  )
}
