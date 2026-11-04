# AGENT_LOG.md

ดัชนีรวบรวมประวัติการตัดสินใจ ข้อตกลง และความคืบหน้าระหว่างผู้ใช้กับ AI Coding Agent

ประวัติการทำงานแบบละเอียดถูกจัดเก็บแยกเป็นไฟล์ในโฟลเดอร์ [`agent_logs/`](file:///d:/Intren/portfolio/agent_logs/)

---

## สารบัญบันทึกประวัติ (Log Directory)

| วันที่ | หัวข้อ | ลิงก์บันทึกฉบับเต็ม | สรุปประเด็นสำคัญ |
|---|---|---|---|
| 2026-11-03 | Project Setup & Monorepo Architecture | [2026-11-03-project-setup.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-project-setup.md) | เลือกสถาปัตยกรรม Next.js + NestJS (Node.js) + Supabase, Turborepo + npm, สไตล์ Flat Minimal ขาว-ฟ้า, ฟอนต์ IBM Plex Sans Thai, จัดเก็บ Log ใน `agent_logs/` |
| 2026-11-03 | Public Front & Admin Dashboard System | [2026-11-03-admin-and-public-system.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-admin-and-public-system.md) | แก้ไข Build/Lint 100%, สร้างหน้า Public ครบ 12 Sections สไตล์ Flat Minimal, สร้างหน้า Admin Dashboard (/admin) สำหรับจัดการ Projects, Experience, Certificates, Articles และ Messages, เชื่อมต่อ NestJS API & Supabase Schema |
| 2026-11-03 | Frontend Redesign via frontend-design Skill | [2026-11-03-frontend-redesign.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-frontend-redesign.md) | ติดตั้ง skill `frontend-design`, ยกเครื่อง UI ทุก Section กำจัด AI Clichés (SaaS card kit, ป้าย Pill กระพริบ, หัวข้อเน้นสีคำ) ปรับเป็นสไตล์ Editorial & Engineering Matrix |
| 2026-11-03 | Fix Backend Dev & Offline Fallback | [2026-11-03-fix-backend-dev-and-offline-fallback.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-fix-backend-dev-and-offline-fallback.md) | แก้ไข `TypeError: Failed to fetch` โดยเพิ่ม script `"dev"` ใน `backend/package.json` และทำ Offline Fallback ใน Frontend Services |
| 2026-11-03 | Fix Admin Hydration Mismatch | [2026-11-03-fix-admin-hydration.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-fix-admin-hydration.md) | แก้ไข React Hydration mismatch ใน `/admin` ด้วย `useSyncExternalStore` ซิงก์ auth state ระหว่าง SSR และ Client อย่างสมบูรณ์ |
| 2026-11-03 | Install Hallmark Skill | [2026-11-03-install-hallmark-skill.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-install-hallmark-skill.md) | ติดตั้ง skill `hallmark` จาก `nutlope/hallmark` ลงใน `.agents/skills/hallmark` เพื่อยกระดับการดีไซน์ UI |
| 2026-11-03 | Hallmark Full Redesign | [2026-11-03-hallmark-full-redesign.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-hallmark-full-redesign.md) | ดำเนินการ Full Redesign ทั้งระบบหน้าบ้านและหลังบ้านตาม Hallmark Floor: ผ่าน sloplint 0 FAIL, ESLint 0 errors, Next.js build ผ่าน 100% |
| 2026-11-03 | GitHub Projects Integration | [2026-11-03-github-projects-integration.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-github-projects-integration.md) | เพิ่มระบบดึง Public Repositories จาก GitHub ผ่าน NestJS Backend พร้อม Cache 10 นาที และแสดงผลในแท็บ GitHub Repos |
| 2026-11-03 | Remove Backend Fallback Mode | [2026-11-03-remove-backend-fallback.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-remove-backend-fallback.md) | ตัดโหมด In-memory fallback ใน Backend ออกทั้งหมด บังคับต่อ Supabase 100% พร้อมสร้าง `backend/supabase/seed.sql` และแมปคอลัมน์ DB ครบถ้วน |
| 2026-11-03 | Real Supabase Auth & All Tab GitHub Merge | [2026-11-03-real-supabase-auth-and-all-tab.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-real-supabase-auth-and-all-tab.md) | รวม GitHub Projects ในแท็บ All, Normalize URL `/api`, สร้าง Backend `AuthModule` เชื่อมต่อ Supabase Auth จริง 100% |
| 2026-11-03 | Admin CRUD Modals Expansion | [2026-11-03-admin-crud-modals.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-admin-crud-modals.md) | เพิ่มปุ่มและ Modal สำหรับสร้างข้อมูล Experience, Certificates และ Articles ใน Admin Center รองรับ i18n และ Supabase Auth |
| 2026-11-03 | Remove Testimonials & Articles | [2026-11-03-remove-testimonials-and-articles.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-remove-testimonials-and-articles.md) | นำส่วน Testimonials และ Articles ออกจากระบบถาวรทุกระดับ (Landing page, Navbar, Admin Dashboard, NestJS Module, Database Schema & Seed) |
| 2026-11-03 | GitHub Repos Visibility in Admin | [2026-11-03-github-repos-admin-visibility.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-github-repos-admin-visibility.md) | เพิ่มแท็บ GitHub Repos ในหน้า Admin ให้เลือกเปิด/ปิดการแสดงผลแต่ละ Repo บนหน้าเว็บ พร้อมบันทึกลงตาราง `github_repos` ใน Supabase |
| 2026-11-03 | Hero GLSL WebGL Background | [2026-11-03-hero-glsl-shader-background.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-hero-glsl-shader-background.md) | นำโค้ด GLSL Fragment Shader มาสร้างเป็น WebGL Background ในส่วน Hero Section สไตล์ Dark Navy Blue พร้อมระบบหยุดเรนเดอร์เมื่อพ้นจอเพื่อประหยัด GPU |
| 2026-11-03 | Certificate Image Upload & Lightbox | [2026-11-03-certificate-image-upload.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-certificate-image-upload.md) | ปรับหน้า Admin ให้สามารถอัปโหลดไฟล์รูปภาพเกียรติบัตรเข้า Supabase Storage (`certificates` bucket) แทนการใส่ลิงก์ และแสดงผล Thumbnail พร้อม Lightbox Modal ดูรูปเต็มบนหน้าพอร์ตโฟลิโอ |
| 2026-11-04 | Remove Activities & Hackathons Section | [2026-11-04-remove-activities-section.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-remove-activities-section.md) | นำส่วนกิจกรรมและการแข่งขัน (Activities & Hackathons) ออกจากหน้าเว็บพอร์ตโฟลิโอ ลบ Component และนำสถิติ Hackathons ในส่วน About Me ออก |
| 2026-11-04 | Letter Style Redesign | [2026-11-04-letter-style-redesign.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-letter-style-redesign.md) | ยกเครื่อง UI ทั้งเว็บตามสเปก Letter — Style Reference: สเตจมืด Vault Ink, หัวข้อ Serif นิตยสาร, ผนังแกลเลอรีพาสเทล Peach/Mint/Lavender, มุมปุ่ม 2px การ์ด 0px, ไร้เงาตกกระทบ 100% |
| 2026-11-04 | 11x Cinematic Editorial Desert Redesign | [2026-11-04-11x-cinematic-editorial-redesign.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-11x-cinematic-editorial-redesign.md) | ยกเครื่อง Redesign ทั้งเว็บตามสเปก 11x — Digital workers: สเตจ Deep Teal (#0b252a) สลับหน้ากระดาษสว่าง, ปุ่มทรง Pill (999px), การ์ดพาสเทล 4 สีมุมโค้ง 16px, WebGL Sunset Shader, ไร้เงาตกกระทบ 100% |
| 2026-11-04 | Admin Editable Sections (About, Skills, Contact) | [2026-11-04-admin-editable-sections.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-admin-editable-sections.md) | เพิ่มระบบจัดการเนื้อหา (CMS) ในหน้า Admin สำหรับ 3 ส่วน: เกี่ยวกับฉัน (About Me), ทักษะและความเชี่ยวชาญ (Skills), และข้อมูลติดต่อ (Contact Info) เชื่อมต่อ Supabase & NestJS API พร้อม Offline Fallback |
| 2026-11-04 | Fix Auth Token Expiry & Skills CRUD | [2026-11-04-fix-auth-token-expiry-and-skills-crud.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-fix-auth-token-expiry-and-skills-crud.md) | จัดการ 401 Token หมดอายุ นำทางกลับหน้า Login อัตโนมัติ, ปรับปรุง Error Logging ใน Profile Service และเพิ่มระบบ CRUD เพิ่ม/ลบหมวดหมู่ทักษะ (Skill Groups) |
| 2026-11-04 | Install webapp-testing Skill | [2026-11-04-install-webapp-testing-skill.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-install-webapp-testing-skill.md) | ติดตั้ง skill `webapp-testing` จาก anthropics/skills สำหรับทดสอบเว็บแอปและดีบัก UI ด้วย Playwright |
| 2026-11-04 | E2E Web Application Testing | [2026-11-04-e2e-webapp-testing-playwright.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-e2e-webapp-testing-playwright.md) | รันการทดสอบ E2E อัตโนมัติด้วย Playwright: ตรวจสอบ Landing Page ครบ 7 Sections, สลับภาษา TH/EN, ฟอร์ม Login ดักจับ 401 และแท็บ Admin CRUD ผ่าน 100% |
| 2026-11-04 | Merge Main & Vercel Production Deploy | [2026-11-04-merge-main-and-vercel-deployment.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-merge-main-and-vercel-deployment.md) | รวมโค้ดเข้า branch `main` และ Push สู่ GitHub พร้อมสร้างโปรเจกต์และ Deploy สู่ Vercel Production สำเร็จ ([https://portfolio-pannawat.vercel.app](https://portfolio-pannawat.vercel.app)) |
| 2026-11-04 | Railway Backend Production Deploy | [2026-11-04-railway-backend-deployment.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-railway-backend-deployment.md) | สร้างโปรเจกต์และ Service บน Railway Deploy NestJS Backend จาก branch `main` พร้อม Gen Public Domain สำเร็จ และผูก `NEXT_PUBLIC_API_URL` เข้ากับ Vercel Frontend เรียบร้อย |
| 2026-11-04 | Fix Empty Section Flash & Merge Main | [2026-11-04-fix-empty-section-flash-and-merge-main.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-fix-empty-section-flash-and-merge-main.md) | เพิ่ม Fallback State ใน Experience/Projects/Certificates ป้องกันหน้าเว็บกะพริบช่องว่างระหว่างรอ API, ผ่าน Turbopack build และ Merge เข้าสู่ `main` พร้อม Push ขึ้น GitHub สำเร็จ |
| 2026-11-04 | Admin Editable Hero Section (CMS) | [2026-11-04-admin-editable-hero-section.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-admin-editable-hero-section.md) | เพิ่มระบบจัดการเนื้อหา Hero Section ใน Admin Dashboard (Location, Status, Role, Name, Bio, Social Links) รองรับ i18n เชื่อมต่อ NestJS API & Supabase พร้อม Fallback |
| 2026-11-04 | Fix Contact Messages & Supabase RLS Auth | [2026-11-04-fix-contact-messages-and-rls-auth.md](file:///d:/Intren/portfolio/agent_logs/2026-11-04-fix-contact-messages-and-rls-auth.md) | แก้ไขระบบ Contact Form และการส่งต่อ Admin Token ไปยัง Supabase RLS แก้ปัญหาข้อความไม่แสดงในหน้า Admin Dashboard และลบ Silent Catch ออก |





---

## กฎการบันทึก
1. ทุกครั้งที่มีการตัดสินใจสำคัญ หรือเสร็จสิ้นรอบการพัฒนา ให้สร้างไฟล์ใหม่ในโฟลเดอร์ `agent_logs/YYYY-MM-DD-<topic>.md`
2. อัปเดตตารางสารบัญในหน้านี้เสมอ
