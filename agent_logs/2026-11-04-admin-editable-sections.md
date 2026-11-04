# 2026-11-04 — Admin Editable Sections (About Me, Skills, Contact Info)

## 1. บริบทและความต้องการ (Context & Requirements)
ผู้ใช้ร้องขอให้เพิ่มระบบแก้ไขข้อมูลในหน้า **Admin Dashboard** สำหรับ 3 ส่วนที่เดิมเคยเป็นข้อความคงที่ (Hardcoded):
1. **เกี่ยวกับฉัน (About Me)**: คำนำย่อย, หัวข้อ, ข้อความแนะนำตัว (Bio), และสถิติผลงาน (จำนวนปี และ จำนวนโปรเจกต์)
2. **ทักษะและความเชี่ยวชาญ (Skills)**: ชื่อหมวดหมู่ และรายการแท็กเทคโนโลยีในแต่ละหมวดหมู่ (เพิ่มและลบแท็กได้อย่างยืดหยุ่น)
3. **ติดต่อฉัน (Contact Info)**: อีเมลสำหรับติดต่อโดยตรง (`contact@...`) และข้อความหมายเหตุแจ้งระยะเวลาตอบกลับ

---

## 2. การเปลี่ยนแปลงทางสถาปัตยกรรม (Architectural Changes)

### 2.1 ฐานข้อมูล (Supabase)
- อัปเดต `backend/supabase/schema.sql`:
  - สร้างตาราง `public.site_content (key TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ)`
  - กำหนด Row Level Security (RLS):
    - `Public Read Site Content`: เปิดให้บุคคลทั่วไปอ่านข้อมูลได้ (`SELECT`)
    - `Admin Full Access Site Content`: เฉพาะ Admin ที่ยืนยันตัวตนแล้วจึงแก้ไขได้ (`ALL TO authenticated`)
- อัปเดต `backend/supabase/seed.sql`:
  - เพิ่มข้อมูลเริ่มต้นสำหรับคีย์ `'about'`, `'skills'`, และ `'contact_info'`

### 2.2 Backend (NestJS)
- สร้างโมดูลใหม่ `ProfileModule` ภายใต้ `backend/src/modules/profile/`:
  - `site-content.data.ts`: นิยาม Interfaces (`AboutContent`, `SkillsContent`, `ContactInfoContent`, `SiteContent`) พร้อม Default Fallback Values
  - `profile.service.ts`: ดึงข้อมูลจากตาราง `site_content` ใน Supabase และมีฟังก์ชัน `updateAbout`, `updateSkills`, `updateContactInfo` พร้อม Fallback ป้องกันระบบล่ม
  - `profile.controller.ts`:
    - `GET /api/profile` (Public): ส่งข้อมูลทั้งหมดของ About, Skills, Contact Info
    - `PUT /api/profile/about` (Protected with `AuthGuard`): อัปเดตเนื้อหา About Me
    - `PUT /api/profile/skills` (Protected with `AuthGuard`): อัปเดตเนื้อหา Skills
    - `PUT /api/profile/contact-info` (Protected with `AuthGuard`): อัปเดต Contact Info
  - `profile.module.ts`: นำเข้า `SupabaseModule` และลงทะเบียนใน `app.module.ts`

### 2.3 Frontend (Next.js)
- สร้าง Service `frontend/src/services/profileService.ts`:
  - ฟังก์ชัน `getSiteContent()`, `updateAboutContent()`, `updateSkillsContent()`, `updateContactInfoContent()` พร้อม Offline Fallback
- ปรับปรุง Component แสดงผลหน้าแรก:
  - `AboutSection.tsx`: ดึงข้อมูล `about` จาก `getSiteContent()` แสดงผลแบบ Dynamic ทั้งภาษาไทยและอังกฤษ
  - `SkillsSection.tsx`: ดึงข้อมูล `skills` จาก `getSiteContent()` แสดงการ์ด 4 สีพาสเทลและแท็กเทคโนโลยีแบบ Dynamic
  - `ContactSection.tsx`: ดึงข้อมูล `email` และ `responseNote` จาก `getSiteContent()`
- ปรับปรุงหน้า Admin Dashboard (`frontend/src/app/admin/page.tsx`):
  - เพิ่ม 3 แท็บใหม่ในแถบเมนู:
    1. **เกี่ยวกับฉัน (About)**: ฟอร์มแก้ไขข้อความ TH/EN และสถิติผลงาน
    2. **ทักษะ (Skills)**: การ์ดจัดการ 4 หมวดหมู่ พร้อมระบบเพิ่มแท็กใหม่ และกดลบแท็ก (X)
    3. **ข้อมูลติดต่อ (Contact Info)**: ฟอร์มแก้ไขอีเมลโดยตรง และข้อความหมายเหตุระยะเวลาตอบกลับ

---

## 3. ผลการทดสอบ (Verification)
- `npx turbo lint`: ผ่าน 100% (2/2 packages, 0 errors)
- `npx turbo build`: ผ่าน 100% (ทั้ง 6 Static Routes ของ Next.js และ NestJS API)
- ทุกลิงก์และระบบสองภาษา (i18n TH/EN) ทำงานสัมพันธ์กันอย่างสมบูรณ์
