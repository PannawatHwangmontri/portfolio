# บันทึกการทำงาน: เพิ่มระบบจัดการแสดง/ซ่อน GitHub Repositories ใน Admin Dashboard

**วันที่**: 2026-11-03  
**ผู้รับผิดชอบ**: AI Coding Assistant (Ponytail & Caveman mode)  
**บริบท/คำสั่ง**: ผู้ใช้ต้องการให้หน้า Admin แสดงรายการ Repositories ทั้งหมดจาก GitHub พร้อมปุ่มเลือกเปิด "โชว์" หรือ "ซ่อน" แต่ละโปรเจกต์บนหน้าเว็บสาธารณะ

---

## 1. ข้อกำหนดที่ตกลง (Confirmed Specifications)
1. **การจัดเก็บสถานะ**: บันทึกลงในตาราง `github_repos` ใน Supabase อย่างถาวร
2. **ค่าเริ่มต้น (Default)**: Repositories ใหม่ให้ **ซ่อนไว้เป็นค่าเริ่มต้น (Hide by default)** จนกว่าจะกดเปิด
3. **หน้า Admin**: เพิ่มแท็บแยกเฉพาะชื่อ **"GitHub Repos"**
4. **หน้าเว็บหลัก**: แสดง **ทุก Repository ที่กดเปิดโชว์** โดยไม่จำกัดจำนวน 6 รายการ

---

## 2. รายละเอียดการเปลี่ยนแปลง (Changes Summary)

1. **`backend/supabase/schema.sql`**:
   - เพิ่มคำสั่งสร้างตาราง `public.github_repos`
   - เพิ่มคำสั่ง RLS Policies สำหรับ Public Read และ Admin Full Access

2. **`backend/src/modules/projects/`**:
   - `projects.service.ts`:
     - เพิ่มฟังก์ชันดึง Public Repos ทั้งหมดจาก GitHub
     - เพิ่มฟังก์ชันอ่านและจับคู่ค่า `is_visible` จาก Supabase
     - ปรับให้หน้าบ้านดึงเฉพาะ Repo ที่ถูกเปิดโชว์
     - เพิ่มฟังก์ชัน `findAllGithubReposAdmin()` และ `toggleGithubRepoVisibility()`
   - `projects.controller.ts`:
     - เพิ่ม endpoint `GET /api/projects/github/admin` (AuthGuard)
     - เพิ่ม endpoint `PUT /api/projects/github/:repoId/visibility` (AuthGuard)

3. **`frontend/src/`**:
   - `services/projectService.ts`:
     - เพิ่ม Interface `GitHubRepoAdminItem`
     - เพิ่มฟังก์ชัน `getAdminGithubRepos()` และ `toggleGithubRepoVisibility()`
   - `app/admin/page.tsx`:
     - เพิ่มแท็บ "GitHub Repos" พร้อมการ์ดสถิติใน Overview
     - สร้างหน้ารายการ Repositories ทั้งหมด พร้อมปุ่มสลับสถานะเปิดโชว์/ซ่อนแบบคลิกเดียว

---

## 3. ผลการตรวจสอบ (Verification Results)
- **Turbo Lint**: 0 warnings, 0 errors
- **Turbo Build**: ผ่าน 100% ทั้ง backend และ frontend
