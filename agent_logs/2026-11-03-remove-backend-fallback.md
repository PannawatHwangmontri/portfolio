# บันทึกการทำงาน: ตัดโหมด Fallback ออกจาก Backend (Supabase Only Architecture)

**วันที่**: 2026-11-03  
**ผู้รับผิดชอบ**: AI Coding Assistant (Ponytail & Caveman mode)  
**บริบท/คำสั่ง**: ผู้ใช้สั่ง "เอาโหมด Fallback ออก" หลังจากยืนยันแผนงานใน `implementation_plan.md`

---

## 1. วัตถุประสงค์ (Objectives)
- ตัด In-memory mock data arrays และ offline fallback logic ออกจาก NestJS Backend ทั้งหมด
- บังคับเชื่อมต่อ Supabase PostgreSQL & Auth โดยตรง 100%
- แจ้งเตือนข้อผิดพลาด HTTP 500 / 404 อย่างชัดเจนเมื่อขาด credentials หรือไม่พบข้อมูล แทนการ fallback ซ่อนความผิดพลาด
- จัดทำ `backend/supabase/seed.sql` สำหรับนำข้อมูลตั้งต้นไปกรอกลง Supabase ได้ทันที

---

## 2. รายละเอียดการเปลี่ยนแปลง (Changes Summary)

1. **`backend/src/supabase/supabase.service.ts`**:
   - ปรับ `getClient()` ให้ throw `InternalServerErrorException` ทันทีหากไม่มี `SUPABASE_URL` และคีย์
   - ปรับ `verifyToken()` ให้ตรวจสอบเฉพาะ Supabase Auth จริง (ตัด backdoor `dev-admin-token` ออก)

2. **`backend/src/modules/projects/projects.service.ts`**:
   - ลบ `memoryProjects` และ `initialProjects`
   - เชื่อมต่อ Supabase `projects` ตารางโดยตรงในทุกฟังก์ชัน (`findAll`, `findOne`, `create`, `update`, `delete`)
   - เพิ่มฟังก์ชัน mapper แปลงระหว่าง PostgreSQL snake_case (`demo_url`, `repo_url`, `created_at`) กับ TypeScript camelCase
   - เก็บฟังก์ชัน `fetchGithubRepos()` ไว้สำหรับดึงสดตามแท็บ `category === 'github'`

3. **`backend/src/modules/experience/experience.service.ts`**:
   - ลบ `memoryExperiences` และ `initialExperiences`
   - รัน query ตรงกับตาราง `experiences` ใน Supabase

4. **`backend/src/modules/certificates/certificates.service.ts`**:
   - ลบ `memoryCertificates` และ `initialCertificates`
   - รัน query ตรงกับตาราง `certificates` พร้อมแมป `issue_date`, `credential_url`

5. **`backend/src/modules/articles/articles.service.ts`**:
   - ลบ `memoryArticles` และ `initialArticles`
   - รัน query ตรงกับตาราง `articles` พร้อมแมป `read_time`, `published_at`

6. **`backend/src/modules/contact/contact.service.ts`**:
   - ลบ `memoryMessages` และ `initialMessages`
   - บันทึกและดึงข้อความจากตาราง `contacts` ใน Supabase ตรง

7. **`backend/src/modules/*/*.data.ts`**:
   - ลบ mock data arrays ที่ไม่ได้ใช้งาน (`initialProjects`, `initialExperiences`, `initialCertificates`, `initialArticles`, `initialMessages`)
   - คงไว้เฉพาะ Type/Interface เพื่อรักษาความสะอาดของ Codebase

8. **`backend/supabase/seed.sql`**:
   - สร้างสคริปต์ SQL สำหรับ Seed ข้อมูลโครงการ, ประสบการณ์, ใบรับรอง, และบทความ ลงฐานข้อมูล Supabase ด้วยคำสั่ง `INSERT INTO ... ON CONFLICT DO NOTHING`

---

## 3. ผลการตรวจสอบ (Verification Results)
- **Oxlint**: 0 errors, 0 warnings (`oxlint src/ test/`)
- **Backend NestJS Build**: สำเร็จสมบูรณ์ (`nest build`)
- **Vitest**: 1/1 passed
- **Frontend Next.js Build & Lint**: สำเร็จ 6/6 pages (`next build`, `eslint`)
