-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.readiness_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Programs policies (public read, admin write)
CREATE POLICY "Anyone can view active programs" ON public.programs FOR SELECT USING (status = 'active');

-- Program enrollments policies
CREATE POLICY "Users can view own enrollments" ON public.program_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own enrollments" ON public.program_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own enrollments" ON public.program_enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Applications policies
CREATE POLICY "Users can view own applications" ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON public.applications FOR UPDATE USING (auth.uid() = user_id);

-- Milestones policies
CREATE POLICY "Anyone can view milestones" ON public.milestones FOR SELECT USING (true);

-- User milestones policies
CREATE POLICY "Users can view own milestone progress" ON public.user_milestones FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own milestone progress" ON public.user_milestones FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own milestone progress" ON public.user_milestones FOR UPDATE USING (auth.uid() = user_id);

-- Resources policies
CREATE POLICY "Anyone can view resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create resources" ON public.resources FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own resources" ON public.resources FOR UPDATE USING (auth.uid() = author_id);

-- Readiness scores policies
CREATE POLICY "Users can view own scores" ON public.readiness_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores" ON public.readiness_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);

-- Event attendees policies
CREATE POLICY "Users can view own event attendance" ON public.event_attendees FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own event attendance" ON public.event_attendees FOR UPDATE USING (auth.uid() = user_id);

-- Forum categories policies
CREATE POLICY "Anyone can view forum categories" ON public.forum_categories FOR SELECT USING (true);

-- Forum threads policies
CREATE POLICY "Anyone can view forum threads" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create threads" ON public.forum_threads FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own threads" ON public.forum_threads FOR UPDATE USING (auth.uid() = author_id);

-- Forum replies policies
CREATE POLICY "Anyone can view forum replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON public.forum_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own replies" ON public.forum_replies FOR UPDATE USING (auth.uid() = author_id);

-- Admin roles policies
CREATE POLICY "Users can view own admin role" ON public.admin_roles FOR SELECT USING (auth.uid() = user_id);

-- Activity logs policies
CREATE POLICY "Users can view own activity" ON public.activity_logs FOR SELECT USING (auth.uid() = user_id);
