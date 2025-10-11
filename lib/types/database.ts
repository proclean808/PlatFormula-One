export type Profile = {
  id: string
  email: string
  full_name: string | null
  company_name: string | null
  role: string
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export type Program = {
  id: string
  name: string
  description: string | null
  duration_weeks: number
  start_date: string | null
  end_date: string | null
  status: string
  created_at: string
  updated_at: string
}

export type ProgramEnrollment = {
  id: string
  user_id: string
  program_id: string
  status: string
  progress_percentage: number
  enrolled_at: string
  completed_at: string | null
}

export type Application = {
  id: string
  user_id: string
  program_id: string
  status: string
  data: Record<string, unknown>
  submitted_at: string | null
  reviewed_at: string | null
  reviewer_notes: string | null
  created_at: string
  updated_at: string
}

export type Milestone = {
  id: string
  program_id: string
  title: string
  description: string | null
  week_number: number
  order_index: number
  created_at: string
}

export type UserMilestone = {
  id: string
  user_id: string
  milestone_id: string
  status: string
  completed_at: string | null
  notes: string | null
}

export type Resource = {
  id: string
  title: string
  description: string | null
  category: string
  type: string
  url: string | null
  content: string | null
  tags: string[]
  author_id: string | null
  is_featured: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export type ReadinessScore = {
  id: string
  user_id: string
  category: string
  score: number
  feedback: Record<string, unknown>
  calculated_at: string
}

export type Event = {
  id: string
  program_id: string | null
  title: string
  description: string | null
  event_type: string
  start_time: string
  end_time: string
  location: string | null
  is_virtual: boolean
  meeting_url: string | null
  created_by: string | null
  created_at: string
}

export type ForumCategory = {
  id: string
  name: string
  description: string | null
  slug: string
  order_index: number
  created_at: string
}

export type ForumThread = {
  id: string
  category_id: string
  author_id: string
  title: string
  content: string
  is_pinned: boolean
  is_locked: boolean
  view_count: number
  reply_count: number
  last_reply_at: string | null
  created_at: string
  updated_at: string
}

export type ForumReply = {
  id: string
  thread_id: string
  author_id: string
  content: string
  is_solution: boolean
  created_at: string
  updated_at: string
}
