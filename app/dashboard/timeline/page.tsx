import { createClient } from "@/lib/supabase/server"
import { ProgramTimeline } from "@/components/timeline/program-timeline"
import type { Event, Milestone, UserMilestone, ProgramEnrollment, Program } from "@/lib/types/database"

export default async function TimelinePage() {
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

  // Fetch events
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("program_id", enrollment?.program_id || "")
    .order("start_time")

  // Fetch user's event attendance
  const { data: eventAttendees } = await supabase.from("event_attendees").select("*").eq("user_id", user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Program Timeline</h1>
        <p className="text-muted-foreground">Track your milestones and upcoming events</p>
      </div>

      <ProgramTimeline
        userId={user.id}
        enrollment={enrollment as (ProgramEnrollment & { programs: Program }) | null}
        milestones={milestones as Milestone[]}
        userMilestones={userMilestones as UserMilestone[]}
        events={events as Event[]}
        eventAttendees={eventAttendees || []}
      />
    </div>
  )
}
