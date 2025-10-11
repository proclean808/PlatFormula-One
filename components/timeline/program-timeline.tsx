"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle2, Circle, Clock, MapPin, Video, ExternalLink } from "lucide-react"
import type { Event, Milestone, UserMilestone, ProgramEnrollment, Program } from "@/lib/types/database"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ProgramTimelineProps {
  userId: string
  enrollment: (ProgramEnrollment & { programs: Program }) | null
  milestones: Milestone[]
  userMilestones: UserMilestone[]
  events: Event[]
  eventAttendees: { event_id: string; status: string }[]
}

export function ProgramTimeline({
  userId,
  enrollment,
  milestones,
  userMilestones,
  events,
  eventAttendees,
}: ProgramTimelineProps) {
  const [activeTab, setActiveTab] = useState("milestones")
  const router = useRouter()

  const handleMilestoneToggle = async (milestoneId: string, currentStatus: string) => {
    const supabase = createClient()
    const newStatus = currentStatus === "completed" ? "not_started" : "completed"

    const existingMilestone = userMilestones.find((um) => um.milestone_id === milestoneId)

    if (existingMilestone) {
      await supabase
        .from("user_milestones")
        .update({
          status: newStatus,
          completed_at: newStatus === "completed" ? new Date().toISOString() : null,
        })
        .eq("id", existingMilestone.id)
    } else {
      await supabase.from("user_milestones").insert({
        user_id: userId,
        milestone_id: milestoneId,
        status: newStatus,
        completed_at: newStatus === "completed" ? new Date().toISOString() : null,
      })
    }

    router.refresh()
  }

  const handleEventRSVP = async (eventId: string, currentStatus: string) => {
    const supabase = createClient()
    const newStatus = currentStatus === "attending" ? "declined" : "attending"

    const existingAttendee = eventAttendees.find((ea) => ea.event_id === eventId)

    if (existingAttendee) {
      await supabase.from("event_attendees").update({ status: newStatus }).eq("event_id", eventId).eq("user_id", userId)
    } else {
      await supabase.from("event_attendees").insert({
        event_id: eventId,
        user_id: userId,
        status: newStatus,
      })
    }

    router.refresh()
  }

  // Group events by date
  const upcomingEvents = events.filter((e) => new Date(e.start_time) >= new Date())
  const pastEvents = events.filter((e) => new Date(e.start_time) < new Date())

  return (
    <div className="space-y-6">
      {/* Program Overview */}
      {enrollment && (
        <Card>
          <CardHeader>
            <CardTitle>{enrollment.programs.name}</CardTitle>
            <CardDescription>
              {enrollment.programs.duration_weeks} week program • {enrollment.progress_percentage}% complete
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  Started {enrollment.enrolled_at ? new Date(enrollment.enrolled_at).toLocaleDateString() : "Recently"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {
                    milestones.filter((m) =>
                      userMilestones.find((um) => um.milestone_id === m.id && um.status === "completed"),
                    ).length
                  }{" "}
                  of {milestones.length} milestones completed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Milestones</CardTitle>
              <CardDescription>Track your progress through the program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => {
                  const userMilestone = userMilestones.find((um) => um.milestone_id === milestone.id)
                  const isCompleted = userMilestone?.status === "completed"

                  return (
                    <div key={milestone.id} className="relative">
                      {index !== milestones.length - 1 && (
                        <div className="absolute left-4 top-10 h-full w-0.5 bg-border" />
                      )}
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleMilestoneToggle(milestone.id, userMilestone?.status || "not_started")}
                          className="relative z-10 mt-1"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-8 w-8 text-green-500 fill-green-500" />
                          ) : (
                            <Circle className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
                          )}
                        </button>
                        <div className="flex-1 pb-8">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-lg">{milestone.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                            </div>
                            <Badge variant="outline">Week {milestone.week_number}</Badge>
                          </div>
                          {isCompleted && userMilestone?.completed_at && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Completed on {new Date(userMilestone.completed_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Don&apos;t miss these important sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const attendee = eventAttendees.find((ea) => ea.event_id === event.id)
                    const isAttending = attendee?.status === "attending"

                    return (
                      <Card key={event.id} className="border-l-4 border-l-primary">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{event.title}</h4>
                                <Badge variant="secondary">{event.event_type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                              <div className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {new Date(event.start_time).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {new Date(event.start_time).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(event.end_time).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                                {event.is_virtual ? (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Video className="h-4 w-4" />
                                    <span>Virtual Event</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                variant={isAttending ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleEventRSVP(event.id, attendee?.status || "")}
                              >
                                {isAttending ? "Attending" : "RSVP"}
                              </Button>
                              {event.meeting_url && (
                                <Button asChild variant="ghost" size="sm">
                                  <a href={event.meeting_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No upcoming events scheduled</p>
              )}
            </CardContent>
          </Card>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Past Events</CardTitle>
                <CardDescription>Events you&apos;ve attended</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pastEvents.slice(0, 5).map((event) => {
                    const attendee = eventAttendees.find((ea) => ea.event_id === event.id)
                    const attended = attendee?.status === "attending"

                    return (
                      <div key={event.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.start_time).toLocaleDateString()}
                          </p>
                        </div>
                        {attended && <Badge variant="secondary">Attended</Badge>}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Calendar View Tab */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Visual timeline of milestones and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Week-by-week view */}
                {Array.from({ length: enrollment?.programs.duration_weeks || 12 }, (_, i) => i + 1).map((week) => {
                  const weekMilestones = milestones.filter((m) => m.week_number === week)
                  const weekEvents = events.filter((e) => {
                    const eventWeek = Math.ceil(
                      (new Date(e.start_time).getTime() - new Date(enrollment?.enrolled_at || Date.now()).getTime()) /
                        (7 * 24 * 60 * 60 * 1000),
                    )
                    return eventWeek === week
                  })

                  if (weekMilestones.length === 0 && weekEvents.length === 0) return null

                  return (
                    <div key={week} className="border-l-2 border-primary pl-4 pb-4">
                      <h4 className="font-semibold mb-2">Week {week}</h4>
                      <div className="space-y-2">
                        {weekMilestones.map((milestone) => {
                          const userMilestone = userMilestones.find((um) => um.milestone_id === milestone.id)
                          const isCompleted = userMilestone?.status === "completed"
                          return (
                            <div key={milestone.id} className="flex items-center gap-2 text-sm">
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                                {milestone.title}
                              </span>
                            </div>
                          )
                        })}
                        {weekEvents.map((event) => (
                          <div key={event.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {event.title} - {new Date(event.start_time).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
