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





---

## กฎการบันทึก
1. ทุกครั้งที่มีการตัดสินใจสำคัญ หรือเสร็จสิ้นรอบการพัฒนา ให้สร้างไฟล์ใหม่ในโฟลเดอร์ `agent_logs/YYYY-MM-DD-<topic>.md`
2. อัปเดตตารางสารบัญในหน้านี้เสมอ
