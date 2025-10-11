-- Insert default programs
INSERT INTO public.programs (id, name, description, duration_weeks, status) VALUES
  ('00000000-0000-0000-0000-000000000001', 'AI Startup Accelerator', 'Comprehensive 12-week program for AI-powered startups', 12, 'active'),
  ('00000000-0000-0000-0000-000000000002', 'B2B SaaS Bootcamp', 'Intensive program focused on B2B SaaS business models', 8, 'active');

-- Insert milestones for AI Startup Accelerator
INSERT INTO public.milestones (program_id, title, description, week_number, order_index) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Ideation & Validation', 'Define your AI product and validate market fit', 1, 1),
  ('00000000-0000-0000-0000-000000000001', 'MVP Development', 'Build your minimum viable product', 3, 2),
  ('00000000-0000-0000-0000-000000000001', 'User Testing', 'Conduct user testing and gather feedback', 6, 3),
  ('00000000-0000-0000-0000-000000000001', 'Go-to-Market Strategy', 'Develop your launch and marketing strategy', 9, 4),
  ('00000000-0000-0000-0000-000000000001', 'Fundraising Prep', 'Prepare pitch deck and investor materials', 11, 5);

-- Insert forum categories
INSERT INTO public.forum_categories (name, description, slug, order_index) VALUES
  ('General Discussion', 'General topics and introductions', 'general', 1),
  ('Product Development', 'Discuss product strategy and development', 'product', 2),
  ('Fundraising', 'Questions about raising capital', 'fundraising', 3),
  ('Marketing & Growth', 'Marketing strategies and growth hacking', 'marketing', 4),
  ('Technical Help', 'Technical questions and troubleshooting', 'technical', 5);

-- Insert sample resources
INSERT INTO public.resources (title, description, category, type, url, tags, is_featured) VALUES
  ('The Lean Startup Methodology', 'Essential reading for all founders', 'Business', 'article', 'https://example.com/lean-startup', ARRAY['startup', 'methodology', 'business'], true),
  ('AI Product Development Guide', 'Comprehensive guide to building AI products', 'Technology', 'guide', 'https://example.com/ai-guide', ARRAY['ai', 'product', 'development'], true),
  ('Pitch Deck Template', 'Professional pitch deck template for fundraising', 'Fundraising', 'template', 'https://example.com/pitch-template', ARRAY['fundraising', 'pitch', 'template'], true),
  ('Growth Marketing Playbook', 'Proven strategies for startup growth', 'Marketing', 'playbook', 'https://example.com/growth', ARRAY['marketing', 'growth', 'strategy'], false);
