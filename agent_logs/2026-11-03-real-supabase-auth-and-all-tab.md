# บันทึกการทำงาน: เชื่อมต่อ Supabase Auth จริง และรวม GitHub Projects เข้าแท็บ All

**วันที่**: 2026-11-03  
**ผู้รับผิดชอบ**: AI Coding Assistant (Ponytail & Caveman mode)  
**บริบท/คำสั่ง**: ผู้ใช้เลือก 1. แบบ A (รวม GitHub ในแท็บ All) และ 2. ตัวเลือก B (เชื่อมต่อ Supabase Auth จริง)

---

## 1. วัตถุประสงค์ (Objectives)
- รวมผลลัพธ์ GitHub Repos เข้ากับโปรเจกต์จาก Supabase ในแท็บ "ทั้งหมด (All)"
- แก้ไขปัญหา API Path ของ `API_BASE_URL` ใน `frontend/src/services/api.ts` ให้ normalize เติม `/api` อัตโนมัติ (แก้ปัญหา 404 เมื่อชี้ไปที่ `http://localhost:4000`)
- สร้าง Backend `AuthModule` เพื่อจัดการการยืนยันตัวตนผ่าน Supabase Auth (`client.auth.signInWithPassword`)
- ปรับปรุง Frontend `authService.ts` ให้เรียกใช้งาน Supabase Auth จริง และเก็บ JWT Token สำหรับแนบ `Authorization: Bearer <token>` ไปกับคำขอ CRUD

---

## 2. รายละเอียดการเปลี่ยนแปลง (Changes Summary)

1. **`frontend/src/services/api.ts`**:
   - ปรับ `API_BASE_URL` ให้ตรวจสอบและเติม `/api` เสมอ ไม่ว่าใน `.env.local` จะใส่ URL แบบมีหรือไม่มี `/api`

2. **`backend/src/modules/auth/`**:
   - `auth.service.ts`: ตรวจสอบ email และ password กับ `SupabaseService.getClient().auth.signInWithPassword` และคืนค่า session access token
   - `auth.controller.ts`: สร้าง endpoint `POST /api/auth/login`
   - `auth.module.ts`: นำเข้า `SupabaseModule` และลงทะเบียนใน `app.module.ts`

3. **`frontend/src/services/authService.ts`**:
   - ปรับ `loginAdmin()` ให้เรียก `fetchApi('/auth/login')` เพื่อรับ Token จริงจาก Supabase Auth
   - บันทึก Token ลง `localStorage` ภายใต้ชื่อ `admin_token`

4. **`backend/src/modules/projects/projects.service.ts`**:
   - ปรับ `findAll(category)`: หาก `category === 'all'` หรือไม่ระบุหมวดหมู่ จะทำการดึงข้อมูลทั้งจาก Supabase และ GitHub REST API มารวมกัน (`[...dbProjects, ...githubProjects]`)

---

## 3. ผลการตรวจสอบ (Verification Results)
- **Oxlint (Backend)**: 0 errors (`oxlint src/ test/`)
- **ESLint (Frontend)**: 0 errors (`eslint`)
- **Backend Build**: `nest build` สำเร็จ 100%
- **Frontend Build**: `next build` ผ่านการ prerender 6/6 หน้า
