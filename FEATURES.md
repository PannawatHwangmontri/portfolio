# FEATURES.md

สรุปฟีเจอร์ของเว็บไซต์ Portfolio และวิธีทำงานของแต่ละฟีเจอร์

## ภาพรวมการทำงาน

```text
Browser ──► Frontend (Next.js, Vercel) ──► Backend (NestJS, Railway) ──► Supabase (PostgreSQL + Storage + Auth)
                                                    └──► GitHub API (รายการ repo)
```

- Frontend เรียก Backend ผ่าน `frontend/src/services/*` (ฟังก์ชัน `fetchApi` ใน `api.ts`) โดย Backend ใช้ prefix `/api`
- ถ้าเรียก API ไม่สำเร็จ ฝั่ง Frontend ใช้ข้อมูลสำรอง (fallback) ในไฟล์ service เพื่อให้หน้าเว็บยังแสดงผลได้
- Endpoint ที่แก้ไขข้อมูลทุกตัวมี `@UseGuards(AuthGuard)` ต้องส่ง `Authorization: Bearer <token>`

---

## ฝั่งผู้เข้าชม (Public)

### 1. หน้าเดียวแบบหลาย Section (`frontend/src/app/page.tsx`)
Hero, About, Skills, Projects, Experience, Certificates, Contact เรียงในหน้าเดียว
แต่ละ Section อยู่ใน `frontend/src/components/sections/` และดึงข้อมูลจาก Backend ตอนโหลดหน้า
ระหว่างรอข้อมูลจะแสดง Skeleton (`ui/Skeleton.tsx`) ที่มี shimmer

### 2. สลับภาษา TH / EN (i18n)
- ข้อความคงที่ของหน้าเว็บอยู่ใน `frontend/src/locales/th.json` และ `en.json`
- `LanguageContext.tsx` เก็บภาษาปัจจุบัน และให้ทุก component เรียกใช้ผ่าน `useLanguage`
- ข้อมูลที่แอดมินแก้ (ชื่อโปรเจกต์ คำอธิบาย ฯลฯ) เก็บเป็นออบเจ็กต์ `{ th, en }` แล้วแสดงตามภาษาที่เลือก
- ปุ่ม TH / EN อยู่ใน Navbar

### 3. Navbar และดาวน์โหลดเรซูเม่
- เมนูลิงก์ไปแต่ละ Section และปุ่มสลับภาษา
- ปุ่ม "ดาวน์โหลดเรซูเม่" ดึงลิงก์จาก `GET /api/resumes/active` (ไฟล์ PDF เดียวใช้ทั้งสองภาษา) แล้วเปิดในแท็บใหม่
- ถ้ายังไม่มีเรซูเม่ที่ใช้งานอยู่ (หรือเรียก API ไม่สำเร็จ) ปุ่มจะถูกซ่อน
- ไอคอนโล่ใน Navbar เป็นทางเข้าหน้าแอดมิน

### 4. Hero พร้อมพื้นหลัง WebGL
- `HeroShaderBackground.tsx` วาดพื้นหลังพระอาทิตย์ตกด้วย GLSL shader บน canvas
- ใช้ `IntersectionObserver` หยุดวาดเมื่อ Hero ออกนอกจอ เพื่อไม่ให้กินทรัพยากร
- `HeroSection.tsx` ใช้ GSAP (`useGSAP`) ทำแอนิเมชันข้อความเข้า โดย hook จัดการ cleanup ให้อัตโนมัติ

### 5. About / Skills / Contact info
- ข้อความใน Section เหล่านี้มาจาก `GET /api/profile`
- Backend อ่านตาราง `site_content` ใน Supabase (key: `hero`, `about`, `skills`, `contact_info`)
- ถ้าตารางไม่มีข้อมูลหรือ Supabase ไม่พร้อม จะใช้ค่าเริ่มต้นจาก `site-content.data.ts`

### 6. Projects (โปรเจกต์ของฉัน + GitHub)
- `GET /api/projects` ดึงจากตาราง `projects` เรียงตามฟิลด์ `order` กรองตาม `category` ได้
- `GET /api/projects?category=github` ดึง repo จาก GitHub API ของผู้ใช้ `PannawatHwangmontri`
  - **แคช 10 นาที** ในหน่วยความจำ เพื่อลดการเรียก GitHub
  - แสดงเฉพาะ repo ที่แอดมินสลับเป็น "แสดง" (ตาราง `github_repos`, ค่าเริ่มต้นคือซ่อน)
  - ข้อมูล repo แปลงเป็นรูปแบบเดียวกับโปรเจกต์ (id `gh-<repoId>`, tag จากภาษาโปรแกรม)

### 7. Experience และ Certificates
- `GET /api/experience` และ `GET /api/certificates` ดึงจากตาราง `experiences` และ `certificates` เรียงตาม `order`
- Certificates มีรูปที่เก็บใน Supabase Storage bucket `certificates` และแสดงเป็นลิงก์ public URL

### 8. ฟอร์มติดต่อ
- ผู้เข้าชมกรอกชื่อ อีเมล ข้อความ แล้วส่งไป `POST /api/contact`
- Backend ตรวจ: ชื่อต้องไม่ว่าง, อีเมลตรง regex, ข้อความต้องไม่ว่าง ถ้าไม่ผ่านตอบ 400
- ผ่านแล้วบันทึกลงตาราง `contacts` (`read = false`) ไม่มีการส่งอีเมลออก ข้อความไปรออ่านในหน้าแอดมิน

### 9. ดีไซน์ "11x Editorial Desert"
สี Deep Teal / Sandstone, ป้าย pill, การ์ดมุมโค้ง 16px, การ์ดมี hover lift แบบ spring overshoot
ฟอนต์ IBM Plex Sans Thai, IBM Plex Sans, Playfair Display

---

## ฝั่งแอดมิน (`/admin`)

### 10. การเข้าสู่ระบบแอดมิน (2 วิธี)

**อีเมล/รหัสผ่าน**
1. ฟอร์มที่ `/admin/login` ส่งไป `POST /api/auth/login`
2. Backend เรียก `supabase.auth.signInWithPassword` แล้วส่ง `access_token` กลับ
3. Frontend เก็บ `admin_token` และ `admin_user` ใน `localStorage`

**Google**
1. กดปุ่ม "Continue with Google" → `startGoogleLogin()` เปลี่ยนหน้าไป `NEXT_PUBLIC_SUPABASE_URL/auth/v1/authorize?provider=google&redirect_to=<site>/admin/auth/callback`
2. Google ให้ผู้ใช้เลือกบัญชี แล้ว Supabase ส่งกลับ `/admin/auth/callback` พร้อม `access_token` ใน URL hash (`#access_token=...`)
3. หน้า callback อ่าน token ลบ hash ออกจาก URL แล้วเรียก `completeGoogleLogin(token)` ซึ่งเก็บ token และเรียก `GET /api/auth/me` เพื่อตรวจสิทธิ์
4. ผ่าน → เก็บข้อมูลผู้ใช้แล้วเข้า `/admin` / ไม่ผ่าน (เช่น `Not an admin account`) → ลบ token แล้วแสดงข้อความผิดพลาด

### 11. การป้องกัน Endpoint ของแอดมิน (`AuthGuard`)
1. อ่าน header `Authorization: Bearer <token>` ถ้าไม่มีตอบ 401
2. ถามยืนยัน token กับ Supabase (`auth.getUser`) ถ้าไม่ถูกต้องตอบ 401
3. ตรวจสิทธิ์แอดมิน:
   - ถ้าตั้ง `ADMIN_EMAILS` (คั่นด้วย `,`) อีเมลของผู้ใช้ต้องอยู่ในรายการ
   - ถ้าไม่ตั้ง อนุญาตเฉพาะบัญชีที่สมัครด้วย provider `email` (แอดมินเดิม)
   - ไม่ผ่านตอบ 403 `Not an admin account`
   เหตุผล: เปิด Google provider แล้วใครก็ล็อกอินด้วย Google ได้ ถ้าไม่เช็ค allowlist จะกลายเป็นแอดมินทันที
4. เมื่อ API ตอบ 401 Frontend ลบ token และพาไป `/admin/login?expired=1`

### 12. แดชบอร์ดจัดการเนื้อหา (`frontend/src/app/admin/page.tsx`)
มี 10 แท็บ:

| แท็บ | ทำอะไร | API |
|---|---|---|
| Projects | เพิ่ม/แก้/ลบโปรเจกต์ | `POST/PUT/DELETE /api/projects` |
| GitHub | ดู repo ทั้งหมด สลับแสดง/ซ่อนบนเว็บ | `GET /api/projects/github/admin`, `PUT /api/projects/github/:repoId/visibility` |
| Experience | จัดการประวัติการทำงาน | `POST/PUT/DELETE /api/experience` |
| Certificates | จัดการใบรับรอง + อัปโหลดรูป | `POST/PUT/DELETE /api/certificates`, `POST /api/certificates/upload` |
| Resume | อัปโหลด PDF, ดูประวัติ, เลือกฉบับที่ใช้งาน, ลบ | `GET/POST /api/resumes`, `PUT /api/resumes/:id/activate`, `DELETE /api/resumes/:id` |
| Messages | อ่าน/ลบข้อความจากฟอร์มติดต่อ | `GET/DELETE /api/contact` |
| Hero / About / Skills / Contact info | แก้ข้อความ 2 ภาษาของแต่ละ Section | `PUT /api/profile/hero\|about\|skills\|contact-info` |

**GitHub toggle:** กดสลับ → `upsert` ลงตาราง `github_repos` (`repo_id`, `is_visible`) แล้วล้างแคช 10 นาที ให้หน้าเว็บสาธารณะเห็นผลทันที

**อัปโหลดรูปใบรับรอง:** Frontend ส่งไฟล์เป็น base64 → Backend แปลงเป็น buffer, ตั้งชื่อไม่ซ้ำ, อัปโหลดเข้า bucket `certificates` ใน Supabase Storage แล้วส่ง public URL กลับ (Backend ขยาย body parser limit ใน `main.ts` ให้รับรูปได้)

**อัปโหลดเรซูเม่:**
1. Frontend ตรวจว่าเป็น PDF ขนาดไม่เกิน 5MB แล้วส่งเป็น base64 ไป `POST /api/resumes`
2. Backend ตรวจ magic bytes `%PDF-` (ไม่เชื่อนามสกุลหรือ content-type) แล้วอัปโหลดเข้า bucket `resumes` ใน Supabase Storage
3. บันทึกแถวในตาราง `resumes` (`id`, `filename`, `path`, `url`, `is_active`, `created_at`) แล้วตั้งไฟล์ใหม่เป็น active อัตโนมัติ (มี active ได้ทีละไฟล์เดียว)
4. ไฟล์เก่าเก็บเป็นประวัติ กด "ใช้ฉบับนี้" เพื่อย้อนกลับได้ การลบจะลบทั้งแถวและไฟล์ใน Storage
5. `GET /api/resumes/active` เป็น endpoint สาธารณะ ส่วน endpoint อื่นของ resumes ต้องล็อกอินแอดมิน

---

## Backend อื่นๆ
- `GET /health` และ `GET /api/status` สำหรับตรวจว่าเซิร์ฟเวอร์ทำงาน
- CORS อนุญาตเฉพาะ origin ที่ตั้งใน `FRONTEND_URL`
- สถาปัตยกรรม Controller → Service → Supabase แยกเป็นโมดูล: `auth`, `projects`, `experience`, `certificates`, `contact`, `profile`, `resumes`

## ตัวแปรสภาพแวดล้อม
ดู `frontend/.env.example` และ `backend/.env.example` (Next.js อ่านจาก `frontend/` และ NestJS อ่านจาก `backend/`)

## ข้อจำกัดที่ทราบ
- Token แอดมินเก็บใน `localStorage` (เสี่ยง XSS มากกว่า cookie แบบ httpOnly)
- แคช GitHub อยู่ในหน่วยความจำของ process รีสตาร์ท Backend แคชหาย
- ฟอร์มติดต่อไม่มี rate limit และไม่แจ้งเตือนอีเมล
