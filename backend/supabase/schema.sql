-- Supabase Schema for Portfolio & Admin System
-- Run this script in the Supabase SQL Editor

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL, -- {"th": "...", "en": "..."}
  description JSONB NOT NULL, -- {"th": "...", "en": "..."}
  category TEXT NOT NULL DEFAULT 'web', -- 'web', 'mobile', 'backend'
  tags TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT DEFAULT '',
  repo_url TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'work', -- 'work' | 'education'
  title JSONB NOT NULL,
  organization JSONB NOT NULL,
  period TEXT NOT NULL,
  description JSONB NOT NULL,
  skills TEXT[] DEFAULT '{}',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_url TEXT DEFAULT '',
  category TEXT DEFAULT 'General',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Contacts Table
CREATE TABLE IF NOT EXISTS public.contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. GitHub Repos Settings Table
CREATE TABLE IF NOT EXISTS public.github_repos (
  repo_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_repos ENABLE ROW LEVEL SECURITY;

-- 7. Public Read Policies
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Experiences" ON public.experiences;
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Certificates" ON public.certificates;
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read GitHub Repos" ON public.github_repos;
CREATE POLICY "Public Read GitHub Repos" ON public.github_repos FOR SELECT USING (true);

-- 8. Public Insert Contacts
DROP POLICY IF EXISTS "Public Insert Contacts" ON public.contacts;
CREATE POLICY "Public Insert Contacts" ON public.contacts FOR INSERT WITH CHECK (true);

-- 9. Admin Full Access Policies (Authenticated Users via Supabase Auth)
DROP POLICY IF EXISTS "Admin Full Access Projects" ON public.projects;
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Experiences" ON public.experiences;
CREATE POLICY "Admin Full Access Experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Certificates" ON public.certificates;
CREATE POLICY "Admin Full Access Certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Contacts" ON public.contacts;
CREATE POLICY "Admin Full Access Contacts" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access GitHub Repos" ON public.github_repos;
CREATE POLICY "Admin Full Access GitHub Repos" ON public.github_repos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. Supabase Storage for Certificate Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Certificate Images" ON storage.objects;
CREATE POLICY "Public Read Certificate Images" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Admin Full Access Certificate Images" ON storage.objects;
CREATE POLICY "Admin Full Access Certificate Images" ON storage.objects
  FOR ALL TO authenticated USING (bucket_id = 'certificates') WITH CHECK (bucket_id = 'certificates');

-- 11. Site Content Table (About, Skills, Contact Info)
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Site Content" ON public.site_content;
CREATE POLICY "Public Read Site Content" ON public.site_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Full Access Site Content" ON public.site_content;
CREATE POLICY "Admin Full Access Site Content" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 12. Resumes (upload history; one active at a time) + Storage bucket
CREATE TABLE IF NOT EXISTS public.resumes (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  path TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Resumes" ON public.resumes;
CREATE POLICY "Public Read Resumes" ON public.resumes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Full Access Resumes" ON public.resumes;
CREATE POLICY "Admin Full Access Resumes" ON public.resumes FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Resume Files" ON storage.objects;
CREATE POLICY "Public Read Resume Files" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes');


