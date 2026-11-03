# บันทึกการเชื่อมต่อ GitHub Projects Integration (2026-11-03)

## สรุปการดำเนินงาน
- เพิ่มความสามารถในการดึง Public Repositories จาก GitHub บัญชี `PannawatHwangmontri` มาแสดงผลในส่วน Featured Projects
- ผู้ใช้ตอบยืนยันการตั้งค่า: เพิ่มแท็บตัวกรอง "GitHub Repos", ดึงผ่าน NestJS Backend พร้อม In-memory Cache 10 นาที, และกรองเฉพาะ Non-fork repos

## การเปลี่ยนแปลงในระบบ
1. **Backend (`backend/src/modules/projects/`)**:
   - `projects.data.ts`: เพิ่มประเภทหมวดหมู่ `'github'` ใน `Project` interface
   - `projects.service.ts`: เพิ่มฟังก์ชัน `fetchGithubRepos()` เชื่อมต่อ GitHub REST API พร้อม cache 10 นาที กรอง `!repo.fork` และ fallback คำอธิบายกรณี `repo.description` ว่าง
2. **Frontend (`frontend/src/`)**:
   - `services/projectService.ts`: ปรับปรุงประเภท `category` และเพิ่ม offline fallback
   - `locales/th.json` & `en.json`: เพิ่มคำแปล `"filterGithub": "GitHub Repos"`
   - `components/sections/ProjectsSection.tsx`: เพิ่มแท็บ "GitHub Repos" ในตัวกรองหมวดหมู่

## ผลการทดสอบ
- Backend Integration: ดึงข้อมูลจริงสำเร็จ 6 Repos (กรอง Fork ออกถูกต้อง)
- Build & Lint: ผ่านทั้ง Backend (oxlint + nest build) และ Frontend (eslint + next build) 100%
- Hallmark Audit: `0 FAIL, 0 REFLEX, 0 WARN`
