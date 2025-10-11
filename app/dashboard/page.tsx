import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Target, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { Program } from "@/lib/types/database"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch user's program enrollment
  const { data: enrollment } = await supabase
    .from("program_enrollments")
    .select("*, programs(*)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single()

  // Fetch milestones for the program
  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("program_id", enrollment?.program_id || "")
    .order("order_index")

  // Fetch user's milestone progress
  const { data: userMilestones } = await supabase.from("user_milestones").select("*").eq("user_id", user.id)

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from("events")
    .select("*")
    .gte("start_time", new Date().toISOString())
    .order("start_time")
    .limit(3)

  // Fetch readiness scores
  const { data: readinessScores } = await supabase
    .from("readiness_scores")
    .select("*")
    .eq("user_id", user.id)
    .order("calculated_at", { ascending: false })
    .limit(1)

  const completedMilestones = userMilestones?.filter((m) => m.status === "completed").length || 0
  const totalMilestones = milestones?.length || 0
  const progressPercentage = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0

  const program = enrollment?.programs as unknown as Program

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">Here&apos;s your progress overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {completedMilestones} of {totalMilestones} milestones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Readiness Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readinessScores?.[0]?.score || 0}/100</div>
            <p className="text-xs text-muted-foreground">Last updated recently</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents?.length || 0}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{program?.duration_weeks ? program.duration_weeks * 7 : 0}</div>
            <p className="text-xs text-muted-foreground">In program</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Program */}
        <Card>
          <CardHeader>
            <CardTitle>Current Program</CardTitle>
            <CardDescription>Your active accelerator program</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrollment ? (
              <>
                <div>
                  <h3 className="font-semibold text-lg">{program?.name}</h3>
                  <p className="text-sm text-muted-foreground">{program?.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} />
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/dashboard/timeline">View Timeline</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href="/dashboard/application">Continue Application</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You&apos;re not enrolled in any program yet</p>
                <Button asChild>
                  <Link href="/dashboard/application">Apply Now</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Track your progress through the program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones?.slice(0, 4).map((milestone) => {
                const userMilestone = userMilestones?.find((um) => um.milestone_id === milestone.id)
                const isCompleted = userMilestone?.status === "completed"
                const isInProgress = userMilestone?.status === "in_progress"

                return (
                  <div key={milestone.id} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : isInProgress ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{milestone.title}</p>
                        <Badge variant={isCompleted ? "default" : "secondary"} className="text-xs">
                          Week {milestone.week_number}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                )
              })}
              {milestones && milestones.length > 4 && (
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/dashboard/timeline">View All Milestones</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Don&apos;t miss these important sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between border-l-4 border-primary pl-4 py-2">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.start_time).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge>{event.event_type}</Badge>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/dashboard/timeline">View Full Calendar</Link>
              </Button>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No upcoming events scheduled</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
