# SKILL.md

คู่มือทักษะและขั้นตอนปฏิบัติงานเฉพาะทาง (Skills & Workflows) สำหรับโปรเจกต์ Portfolio

---

## 1. ทักษะ: จัดการฐานข้อมูลและ CMS ด้วย Supabase & NestJS

### หน้าที่
สร้างและจัดการ Tables, Data Fetching, และ RESTful API ระหว่าง Supabase กับ NestJS

### ขั้นตอนปฏิบัติ
1. ออกแบบตารางใน Supabase:
   - `projects` (id, title_th, title_en, description_th, description_en, tags, image_url, demo_url, repo_url, sort_order)
   - `experiences` (id, role_th, role_en, company, start_date, end_date, highlights_th, highlights_en)
   - `certificates` (id, title_th, title_en, issuer, issue_date, credential_url, image_url)
   - `blogs` (id, title_th, title_en, slug, content_th, content_en, cover_image, published_at)
   - `contacts` (id, name, email, subject, message, created_at)
2. สร้าง Module ใน NestJS (`projects.module.ts`, `experience.module.ts`, ฯลฯ)
3. ใช้งาน Supabase Client ในระดับ Service เพื่อดึงข้อมูลพร้อม Filter ตามภาษา
4. ตั้งค่า Row Level Security (RLS) ให้อ่านได้สาธารณะ (Public Read) แต่การเขียน/แก้ไขต้องผ่านสิทธิ์ผู้ดูแล

---

## 2. ทักษะ: บันทึกประวัติและข้อตกลงงาน (Agent Session Logging)

### หน้าที่
เก็บบันทึกประวัติการตัดสินใจ ปัญหาที่พบ และความคืบหน้าของโครงการลงใน `AGENT_LOG.md` อย่างเป็นระเบียบ

### ขั้นตอนปฏิบัติ
1. ก่อนจบแต่ละรอบที่มีการตัดสินใจสำคัญ ให้เปิดไฟล์ `AGENT_LOG.md`
2. บันทึกในรูปแบบ:
   ```markdown
   ### [YYYY-MM-DD HH:mm] - หัวข้อการทำงาน
   - **การตัดสินใจ (Decisions)**: สิ่งที่ผู้ใช้และ Agent ตกลงกัน
   - **สิ่งที่ดำเนินการ (Actions Taken)**: ไฟล์ที่สร้างหรือแก้ไข
   - **สิ่งที่ค้างอยู่/ความเสี่ยง (Pending & Risks)**: สิ่งที่ยังไม่ได้ทำหรือข้อควรระวัง
   ```
3. จัดหมวดหมู่ประวัติให้กระชับ ชัดเจน และอ่านเข้าใจได้ในรอบเดียว

---

## 3. ทักษะ: ปรับแต่งและบีบอัดไฟล์สื่อ (Media & Asset Optimization)

### หน้าที่
จัดการไฟล์รูปภาพและเอกสารให้โหลดได้รวดเร็วที่สุด

### ขั้นตอนปฏิบัติ
1. แปลงรูปภาพโปรเจกต์และกิจกรรมเป็น `.webp` โดยเก็บไว้ที่ `frontend/public/assets/`
2. ไฟล์เรซูเม่จัดเก็บแยก 2 ไฟล์: `frontend/public/resume-th.pdf` และ `frontend/public/resume-en.pdf`
3. รองรับการอัปโหลดไฟล์ขึ้น Supabase Storage Bucket ในกรณีที่ต้องการจัดการผ่านหลังบ้าน

---

## 4. ทักษะ: แอนิเมชัน GSAP สำหรับ Next.js (GSAP Integration)

### หน้าที่
สร้างแอนิเมชัน ScrollTrigger ให้ลื่นไหล ไร้ Memory Leak

### ขั้นตอนปฏิบัติ
1. ใช้งานผ่าน `@gsap/react` หรือ `useGSAP()` เพื่อให้แน่ใจว่า Context Cleanup ทำงานอย่างสมบูรณ์เมื่อเปลี่ยนหน้า
2. แยก Animation Hooks ไว้ใน `frontend/src/animations/`
3. เคารพค่า `prefers-reduced-motion` เพื่อปิดแอนิเมชันสำหรับผู้ใช้ที่ต้องการ

---

## 5. ทักษะ: ระบบ 2 ภาษา (i18n Parity)

### หน้าที่
รักษาความสอดคล้องของข้อความระหว่างภาษาไทยและภาษาอังกฤษ

### ขั้นตอนปฏิบัติ
1. โครงสร้างไฟล์แปลภาษา: `frontend/src/locales/th.json` และ `en.json`
2. การเพิ่มข้อความใหม่ต้องทำคู่กันทั้งสองไฟล์เสมอ ห้ามตกหล่น
3. ป้ายกำกับบน UI (Buttons, Placeholders, Form Labels) ต้องผูกกับคีย์ i18n ทุกจุด
