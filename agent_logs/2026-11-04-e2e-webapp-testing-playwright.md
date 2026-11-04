# บันทึกการทดสอบระบบ: E2E Web Application Testing ด้วย Playwright (2026-11-04)

**วันที่:** 2026-11-04  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** Automated E2E Testing  

---

## 1. วัตถุประสงค์ (Objectives)
- ทดสอบระบบหน้าเว็บ Portfolio และ Admin Dashboard แบบ End-to-End ผ่าน skill `webapp-testing` ด้วย Python Playwright
- ตรวจสอบความถูกต้องของการเรนเดอร์, ฟังก์ชันสลับภาษา, แท็บกรองผลงาน, หน้าล็อกอิน, การดักจับ Session Timeout (401), และระบบเพิ่ม/ลบหมวดหมู่ทักษะ (Skills CRUD)

---

## 2. ขอบเขตการทดสอบ (Test Scope)
1. **Public Portfolio Landing Page (`http://localhost:3000`)**:
   - ตรวจสอบ Page Title และการมีอยู่ของครบทุก Section (`#hero`, `#about`, `#skills`, `#projects`, `#experience`, `#certificates`, `#contact`)
   - ทดสอบการสลับภาษา (TH <-> EN)
   - ตรวจสอบการแสดงผลการ์ดทักษะ 4 หมวดหมู่
   - ทดสอบระบบแท็บคัดกรองโปรเจกต์ (ทั้งหมด / เว็บแอปพลิเคชัน)
   - บันทึกภาพหน้าจอ: [`tests/screenshots/public_landing.png`](file:///d:/Intren/portfolio/tests/screenshots/public_landing.png)
2. **Admin Login Page & Security (`http://localhost:3000/admin/login`)**:
   - ตรวจสอบฟอร์มเข้าสู่ระบบ (Email, Password, Submit button)
   - ทดสอบส่งข้อมูล Credentials ไม่ถูกต้อง ตรวจพบและแสดงผล Error Alert ใน UI
3. **Admin Dashboard & CRUD Tabs (`http://localhost:3000/admin`)**:
   - ยืนยันการทำงานของ Auto-logout เมื่อ Token หมดอายุ (401)
   - ตรวจสอบการแสดงผลและสลับแท็บทั้ง 8 แท็บ
   - ทดสอบแท็บ `เกี่ยวกับฉัน (About)` และ `ข้อมูลติดต่อ (Contact Info)`
   - ทดสอบแท็บ `ทักษะ (Skills)`: ตรวจสอบปุ่ม `+ เพิ่มหมวดหมู่ใหม่`, การกดเพิ่มหมวดหมู่ และปุ่มลบหมวดหมู่
   - บันทึกภาพหน้าจอ: [`tests/screenshots/admin_dashboard.png`](file:///d:/Intren/portfolio/tests/screenshots/admin_dashboard.png)

---

## 3. ผลการทดสอบ (Test Results)
- **สถานะ:** `ALL TESTS PASSED!` (Exit code: 0, 0 critical browser errors)
- **สคริปต์ทดสอบ:** [`tests/test_webapp.py`](file:///d:/Intren/portfolio/tests/test_webapp.py)
