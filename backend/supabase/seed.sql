-- Seed Data for Portfolio & Resume
-- Run this in Supabase SQL Editor after running schema.sql

-- 1. Insert Initial Projects
INSERT INTO public.projects (id, title, description, category, tags, demo_url, repo_url, featured, "order")
VALUES
  (
    'portfolio-monorepo',
    '{"th": "ระบบ Portfolio Monorepo สไตล์ Flat Minimal", "en": "Flat Minimal Portfolio Monorepo"}'::jsonb,
    '{"th": "เว็บพอร์ตโฟลิโอแบบ Full-stack แยก Frontend (Next.js + GSAP) และ Backend (NestJS + Supabase) จัดการด้วย Turborepo", "en": "Full-stack portfolio separating Frontend (Next.js + GSAP) and Backend (NestJS + Supabase) managed with Turborepo."}'::jsonb,
    'web',
    ARRAY['Next.js', 'NestJS', 'Supabase', 'Tailwind CSS', 'GSAP', 'Turborepo'],
    'https://portfolio.pannawat.dev',
    'https://github.com/PannawatHwangmontri/portfolio',
    true,
    1
  ),
  (
    'task-flow-api',
    '{"th": "ระบบ Task Management & Realtime Notification API", "en": "Task Management & Realtime Notification API"}'::jsonb,
    '{"th": "RESTful API พัฒนาด้วย NestJS เชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน Supabase พร้อมระบบ Authentication & RLS", "en": "Robust RESTful API built with NestJS and PostgreSQL on Supabase featuring JWT Auth & Row Level Security."}'::jsonb,
    'backend',
    ARRAY['NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'Swagger'],
    '',
    'https://github.com/PannawatHwangmontri',
    true,
    2
  ),
  (
    'smart-iot-dashboard',
    '{"th": "สมาร์ทแดชบอร์ดตรวจสอบพลังงานและ IoT Real-time", "en": "Smart Energy & IoT Real-time Monitoring Dashboard"}'::jsonb,
    '{"th": "แอปพลิเคชันมอนิเตอร์เซนเซอร์อัจฉริยะ แสดงกราฟวิเคราะห์ข้อมูลแบบ Realtime ผ่าน WebSocket และ Supabase Realtime", "en": "Realtime sensor monitoring web application with live analytics via WebSocket and Supabase Realtime."}'::jsonb,
    'web',
    ARRAY['Next.js', 'React', 'Tailwind CSS', 'Chart.js', 'Supabase'],
    '',
    'https://github.com/PannawatHwangmontri',
    false,
    3
  )
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Initial Experiences
INSERT INTO public.experiences (id, type, title, organization, period, description, skills, "order")
VALUES
  (
    'exp-1',
    'work',
    '{"th": "Full-Stack Developer Intern", "en": "Full-Stack Developer Intern"}'::jsonb,
    '{"th": "Tech Innovation Co., Ltd.", "en": "Tech Innovation Co., Ltd."}'::jsonb,
    '2024 - 2025',
    '{"th": "พัฒนาเว็บแอปพลิเคชันด้วย Next.js และ NestJS ออกแบบ RESTful API และเชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน Supabase พร้อมติดตั้งระบบ CI/CD", "en": "Developed web applications using Next.js and NestJS, architected RESTful APIs, integrated PostgreSQL via Supabase, and set up CI/CD workflows."}'::jsonb,
    ARRAY['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'TypeScript'],
    1
  ),
  (
    'exp-2',
    'work',
    '{"th": "Frontend & UI Developer (Freelance)", "en": "Frontend & UI Developer (Freelance)"}'::jsonb,
    '{"th": "Independent Projects", "en": "Independent Projects"}'::jsonb,
    '2023 - 2024',
    '{"th": "ออกแบบและพัฒนา Landing Page และ Dashboard สไตล์ Flat Minimal เน้น Performance และ Micro-interactions ด้วย GSAP และ Tailwind CSS", "en": "Crafted Flat Minimal landing pages and dashboards focused on web performance and smooth micro-interactions using GSAP and Tailwind CSS."}'::jsonb,
    ARRAY['React', 'GSAP', 'Tailwind CSS', 'Figma'],
    2
  ),
  (
    'edu-1',
    'education',
    '{"th": "ปริญญาตรี วิทยาการคอมพิวเตอร์ / เทคโนโลยีสารสนเทศ", "en": "Bachelor of Science in Computer Science / IT"}'::jsonb,
    '{"th": "มหาวิทยาลัยชั้นนำ", "en": "Leading University"}'::jsonb,
    '2022 - 2026',
    '{"th": "ศึกษาโครงสร้างข้อมูล อัลกอริทึม การออกแบบระบบซอฟต์แวร์ และการพัฒนาเว็บแอปพลิเคชันสมัยใหม่ เกรดเฉลี่ยดีเด่น", "en": "Focused on Data Structures, Algorithms, Software Architecture, and Modern Web Application Development with high honors."}'::jsonb,
    ARRAY['Software Engineering', 'Algorithms', 'Database Design'],
    3
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Initial Certificates
INSERT INTO public.certificates (id, title, issuer, issue_date, credential_url, category, "order")
VALUES
  (
    'cert-1',
    '{"th": "Full-Stack Web Development Professional Certificate", "en": "Full-Stack Web Development Professional Certificate"}'::jsonb,
    'Coursera / Meta',
    '2024',
    'https://coursera.org',
    'Full-Stack',
    1
  ),
  (
    'cert-2',
    '{"th": "NestJS Backend Architecture Mastery", "en": "NestJS Backend Architecture Mastery"}'::jsonb,
    'Official NestJS Courses',
    '2024',
    'https://nestjs.com',
    'Backend',
    2
  ),
  (
    'cert-3',
    '{"th": "PostgreSQL Database Administration & Performance Tuning", "en": "PostgreSQL Database Administration & Performance Tuning"}'::jsonb,
    'Supabase Academy',
    '2023',
    'https://supabase.com',
    'Database',
    3
  )
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Initial Site Content (About, Skills, Contact Info)
INSERT INTO public.site_content (key, data)
VALUES
  (
    'about',
    '{
      "title": {"th": "เกี่ยวกับฉัน", "en": "About Me"},
      "subtitle": {"th": "เรื่องราวและความมุ่งมั่นในเส้นทางวิศวกรรมซอฟต์แวร์", "en": "Background, journey, and craft in software engineering"},
      "bio": {"th": "ผมเป็นนักพัฒนาซอฟต์แวร์ที่หลงใหลในการสร้างสรรค์โซลูชันที่มีประสิทธิภาพ ชอบการเขียนโค้ดที่สะอาด เป็นระเบียบ (Clean Code) และเรียนรู้เทคโนโลยีใหม่ๆ อยู่เสมอ โดยให้ความสำคัญกับทั้งระบบหลังบ้านที่มั่นคงและหน้าบ้านที่ตอบสนองผู้ใช้ได้เป็นอย่างดี", "en": "I am a dedicated software engineer passionate about crafting robust, high-performance web applications. I care deeply about clean code, modern engineering practices, and resilient architecture spanning scalable backend APIs to responsive interfaces."},
      "statYears": "03+",
      "statYearsLabel": {"th": "ปีแห่งการพัฒนาซอฟต์แวร์", "en": "Years of Engineering"},
      "statProjects": "15+",
      "statProjectsLabel": {"th": "โปรเจกต์ที่สำเร็จ", "en": "Completed Projects"}
    }'::jsonb
  ),
  (
    'skills',
    '{
      "title": {"th": "ทักษะและความเชี่ยวชาญ", "en": "Skills & Expertise"},
      "subtitle": {"th": "เทคโนโลยีและเครื่องมือที่ใช้งานเป็นประจำ", "en": "Technologies and engineering tools used daily"},
      "groups": [
        {
          "id": "languages",
          "name": {"th": "ภาษาเขียนโปรแกรม", "en": "Languages"},
          "skills": ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"]
        },
        {
          "id": "frontend",
          "name": {"th": "ฟรอนต์เอนด์ & แอนิเมชัน", "en": "Frontend & Motion"},
          "skills": ["Next.js", "React", "Tailwind CSS", "GSAP", "Turbopack"]
        },
        {
          "id": "backend",
          "name": {"th": "แบ็กเอนด์ & ฐานข้อมูล", "en": "Backend & Database"},
          "skills": ["NestJS", "Node.js", "Supabase", "PostgreSQL", "RESTful API", "RLS Security"]
        },
        {
          "id": "devops",
          "name": {"th": "DevOps & เครื่องมือ", "en": "DevOps & Tools"},
          "skills": ["Docker", "Git & GitHub", "Railway", "Linux", "CI/CD", "Postman"]
        }
      ]
    }'::jsonb
  ),
  (
    'contact_info',
    '{
      "email": "contact@pannawat.dev",
      "responseNote": {
        "th": "ตอบกลับภายใน 24 ถึง 48 ชั่วโมงสำหรับโอกาสงานวิศวกรรม ระบบฟรีแลนซ์ หรือการร่วมมือทางเทคโนโลยี",
        "en": "Typically responds within 24 to 48 hours for engineering inquiries, freelance systems, or collaboration opportunities."
      }
    }'::jsonb
  )
ON CONFLICT (key) DO UPDATE
SET data = EXCLUDED.data, updated_at = now();
