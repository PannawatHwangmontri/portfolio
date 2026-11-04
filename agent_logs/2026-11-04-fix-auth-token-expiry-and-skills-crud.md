# บันทึกการแก้ไข: แก้ไขปัญหา Invalid or expired token และเพิ่มระบบจัดการหมวดหมู่ทักษะ (Skills CRUD)

**วันที่:** 2026-11-04  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** Bug Fix & Feature Enhancement  

---

## 1. ปัญหาที่พบ (Issue Analysis)
1. **Invalid or expired token**:
   - ผู้ใช้เปิดหน้า Admin ค้างไว้หรือกลับมาใช้งานหลังจาก Token JWT ของ Supabase หมดอายุ (อายุ 1 ชั่วโมง)
   - หน้า `/admin` ตรวจสอบสถานะการล็อกอินผ่าน `getStoredAdmin()` ใน `localStorage` ซึ่งไม่มีการตรวจจับวันหมดอายุของ Token
   - เมื่อหน้ารันคำสั่งดึงข้อมูล เช่น `getAdminGithubRepos()` หรือบันทึกข้อมูล `/api/profile/*` Backend ปฏิเสธด้วย `401 Unauthorized: Invalid or expired token`
   - ฝั่ง Frontend ใน `fetchApi` โยนข้อผิดพลาดแต่ไม่ได้เคลียร์ Token และไม่ได้นำทางผู้ใช้ไปหน้าเข้าสู่ระบบ ทำให้หน้า Admin ค้างในสถานะล็อกอินหลอก และไม่สามารถทำ CRUD ใดๆ ได้
2. **การแจ้งเตือนข้อผิดพลาด (Error Masking)**:
   - บล็อก `catch` ใน `handleSaveAbout`, `handleSaveSkills`, `handleSaveContactInfo` แสดงผลข้อความตายตัว "เกิดข้อผิดพลาดในการบันทึกข้อมูล" ทำให้ไม่ทราบสาเหตุแท้จริง
   - Backend `profile.service.ts` ใช้ `throw new Error(...)` ทำให้ NestJS ซ่อนรายละเอียดเป็น 500 Generic Error
3. **ขาดความยืดหยุ่นในระบบทักษะ (Skills CRUD)**:
   - หมวดหมู่ทักษะเดิมถูกล็อคไว้ 4 หมวด ไม่สามารถเพิ่มหมวดหมู่ใหม่ หรือลบหมวดหมู่ที่ไม่ใช้งานได้

---

## 2. การดำเนินการแก้ไข (Changes Made)

### 2.1 จัดการ 401 Unauthorized และ Token หมดอายุอัตโนมัติ
- **`frontend/src/services/api.ts`**:
  - เมื่อพบสถานะ `401` ให้เคลียร์ `admin_token` และ `admin_user` ออกจาก `localStorage` ทันที พร้อม trigger `storage` event
  - หากอยู่ในหน้า Admin (`/admin/*`) ให้นำทางอัตโนมัติไปยัง `/admin/login?expired=1`
- **`frontend/src/app/admin/login/page.tsx`**:
  - เพิ่มการตรวจสอบพารามิเตอร์ `?expired=1` ผ่าน `useSearchParams` ภายใต้ `<Suspense>`
  - แสดงกล่องแจ้งเตือน "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง"
- **`frontend/src/app/admin/page.tsx`**:
  - เพิ่มการตรวจเช็ค `localStorage.getItem('admin_token')` ร่วมกับ `getStoredAdmin()` หากไม่มี Token ให้นำทางกลับหน้าเข้าสู่ระบบทันที

### 2.2 ปรับปรุงการรายงาน Error ให้โปร่งใส
- **`backend/src/modules/profile/profile.service.ts`**:
  - เปลี่ยนจากการโยน `new Error(...)` เป็น `new InternalServerErrorException('Database error: ...')` เพื่อให้ NestJS ส่ง Error Message ออกมาทาง HTTP Response
- **`frontend/src/app/admin/page.tsx`**:
  - ปรับปรุง `handleSaveAbout`, `handleSaveSkills`, `handleSaveContactInfo` ให้นำ `err.message` มาแสดงบน Toast Notification โดยตรง

### 2.3 เพิ่มระบบ CRUD เต็มรูปแบบสำหรับหมวดหมู่ทักษะ (Skill Groups CRUD)
- **`frontend/src/app/admin/page.tsx`**:
  - เพิ่มฟังก์ชัน `handleAddSkillGroup`: สุ่มสร้าง ID หมวดหมู่ใหม่ พร้อมชื่อเริ่มต้นภาษาไทย/อังกฤษ และเปิดให้เพิ่มทักษะได้อิสระ
  - เพิ่มฟังก์ชัน `handleRemoveSkillGroup`: ตรวจสอบยืนยันและลบหมวดหมู่ทักษะที่ไม่ต้องการออก
  - ปรับ UI ในแท็บทักษะ (Skills): เพิ่มปุ่ม `+ เพิ่มหมวดหมู่ใหม่` ด้านบน และปุ่มไอคอนถังขยะ `Trash2` ที่การ์ดแต่ละหมวดหมู่

---

## 3. การตรวจสอบความถูกต้อง (Verification)
- `npx turbo lint`: ผ่าน 100% (Backend: oxlint 0 warnings/0 errors, Frontend: eslint 0 errors)
- `npx turbo build`: ผ่าน 100% (Backend NestJS compile ผ่านสมบูรณ์, Frontend Next.js สร้าง Static Routes 6/6 ครบถ้วน)
