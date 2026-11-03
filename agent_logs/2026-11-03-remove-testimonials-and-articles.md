# บันทึกการทำงาน: นำหมวดหมู่ "คำรับรองและความคิดเห็น" และ "บทความและบันทึกความรู้" ออกถาวร

**วันที่**: 2026-11-03  
**ผู้รับผิดชอบ**: AI Coding Assistant (Ponytail & Caveman mode)  
**บริบท/คำสั่ง**: ผู้ใช้ต้องการนำส่วน "คำรับรองและความคิดเห็น" (Testimonials) และ "บทความและบันทึกความรู้" (Articles) ออกจากระบบถาวรทุกส่วน

---

## 1. วัตถุประสงค์ (Objectives)
- นำส่วนแสดงผลออกจากหน้าเว็บหลัก (Homepage `page.tsx`) และเมนูบาร์ (Navbar)
- ลบไฟล์ Component และ Service ที่เกี่ยวข้อง: `TestimonialsSection.tsx`, `ArticlesSection.tsx`, `articleService.ts`
- ลบการจัดการในหน้า Admin Center (`/admin`): เอาแท็บ Articles, การ์ดสถิติ, และฟอร์ม Modal สร้าง/ลบ ออก
- ลบโมดูลฝั่ง Backend API: นำ `ArticlesModule` ออกจาก `app.module.ts` และลบโฟลเดอร์ `backend/src/modules/articles/`
- ปรับปรุง Schema & Seed Database: ลบตาราง `public.articles` และ Policies ออกจาก `schema.sql` และ `seed.sql`

---

## 2. รายละเอียดการเปลี่ยนแปลง (Changes Summary)

1. **Frontend Landing Page & Navbar**:
   - `frontend/src/app/page.tsx`: ตัด `<ArticlesSection />` และ `<TestimonialsSection />` ออก
   - `frontend/src/components/layout/Navbar.tsx`: ตัดลิงก์ `#articles` ออกจากเมนูนำทาง
   - `frontend/src/locales/th.json` & `en.json`: ลบคีย์ `nav.articles`, `articles`, และ `testimonials`
   - ลบไฟล์:
     - `frontend/src/components/sections/TestimonialsSection.tsx`
     - `frontend/src/components/sections/ArticlesSection.tsx`
     - `frontend/src/services/articleService.ts`

2. **Frontend Admin CMS**:
   - `frontend/src/app/admin/page.tsx`:
     - ตัด `Tab` type ให้เหลือ `'projects' | 'experience' | 'certificates' | 'messages'`
     - ปรับ Overview Stats Grid ให้เป็น 4 คอลัมน์ (`lg:grid-cols-4`) และลบกล่องสถิติบทความ
     - ตัดแท็บ Articles และปุ่มสลับแท็บออก
     - ลบฟังก์ชันจัดการ `handleCreateArticle`, `handleDeleteArticle`
     - ลบ Modal Form สร้างบทความ (`showArticleModal`)

3. **Backend NestJS API**:
   - `backend/src/app.module.ts`: ถอด `ArticlesModule` ออก
   - ลบโฟลเดอร์ `backend/src/modules/articles/` ทั้งหมด

4. **Database & Documentation**:
   - `backend/supabase/schema.sql`: ลบ `CREATE TABLE public.articles`, RLS, และ Policies ที่เกี่ยวข้อง
   - `backend/supabase/seed.sql`: ลบ Initial data insertion สำหรับ `public.articles`
   - `DESIGN.md`: ปรับผังหัวข้อให้เหลือ 10 ส่วน (ตัด 3.9 และ 3.10 ออก)

---

## 3. ผลการตรวจสอบ (Verification Results)
- **Turbo Lint**: ผ่าน 100% (0 errors, 0 warnings across backend & frontend)
- **Turbo Build**: ผ่าน 100% (NestJS build สำเร็จ, Next.js static prerender 6/6 หน้า)
