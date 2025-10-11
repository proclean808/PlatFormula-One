-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  role TEXT DEFAULT 'founder',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  duration_weeks INTEGER DEFAULT 12,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create program_enrollments table
CREATE TABLE IF NOT EXISTS public.program_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active',
  progress_percentage INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, program_id)
);

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'draft',
  data JSONB DEFAULT '{}',
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  week_number INTEGER NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_milestones table (tracks completion)
CREATE TABLE IF NOT EXISTS public.user_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  milestone_id UUID NOT NULL REFERENCES public.milestones(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started',
  completed_at TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(user_id, milestone_id)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT,
  content TEXT,
  tags TEXT[],
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create readiness_scores table
CREATE TABLE IF NOT EXISTS public.readiness_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  feedback JSONB DEFAULT '{}',
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table (for calendar/timeline)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  is_virtual BOOLEAN DEFAULT TRUE,
  meeting_url TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create event_attendees table
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'invited',
  UNIQUE(event_id, user_id)
);

-- Create forum_categories table
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum_threads table
CREATE TABLE IF NOT EXISTS public.forum_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum_replies table
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_roles table
CREATE TABLE IF NOT EXISTS public.admin_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  permissions JSONB DEFAULT '{}',
  granted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create activity_logs table (for analytics)
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_program_enrollments_user ON public.program_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_program_enrollments_program ON public.program_enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_tags ON public.resources USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON public.forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_thread ON public.forum_replies(thread_id);
CREATE INDEX IF NOT EXISTS idx_events_program ON public.events(program_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON public.events(start_time);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.activity_logs(created_at);
