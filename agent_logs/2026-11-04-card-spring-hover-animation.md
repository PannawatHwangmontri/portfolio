# บันทึกการเพิ่มฟีเจอร์: Overshooting Spring Hover Lift บนการ์ดทุกส่วน (2026-11-04)

**วันที่:** 2026-11-04  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** Frontend UI / Micro-interaction & Motion Design  

---

## 1. รายละเอียดความต้องการ (Requirements)
- เพิ่มเอฟเฟกต์แอนิเมชันเมื่อเมาส์ชี้ (Hover) ที่ตัวการ์ด:
  - ยกตัวขึ้นในแกน Y: `transform: translateY(-10px)`
  - เงาตกกระทบขนาดใหญ่นุ่มลึก: `box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.7)`
  - ควบคุมการเคลื่อนไหวร่วมกันทั้ง `transform` และ `box-shadow` ด้วยเวลาประมาณ `0.5s`
  - ใช้ Timing Function สไตล์ Spring แบบ Overshoot: `cubic-bezier(0.34, 1.56, 0.64, 1)` เพื่อให้การ์ดเด้งลอยขึ้นและดึ๋งลงอย่างนุ่มนวลเป็นธรรมชาติ

---

## 2. การดำเนินการ (Implementation)
1. **สร้างคลาสสไตล์กลาง (`frontend/src/app/globals.css`):**
   - เพิ่มคลาส `.card-spring-hover` จัดการ `transition` และ `box-shadow` ตามสเปก
   - เพิ่ม `will-change: transform, box-shadow` เพื่อประสิทธิภาพในการเรนเดอร์ระดับ 60 FPS
   - รองรับ Accessibility มาตรฐาน `prefers-reduced-motion` เพื่อปิดแอนิเมชันสำหรับผู้ใช้ที่ต้องการ
2. **ประยุกต์ใช้กับการ์ดทุกส่วนบนหน้าเว็บตามที่ยืนยัน:**
   - **Projects Section (`ProjectsSection.tsx`):** การ์ดแสดงผลงานทุกชิ้น
   - **Skills Section (`SkillsSection.tsx`):** การ์ดหมวดหมู่ทักษะทุกหมวดหมู่
   - **Certificates Section (`CertificatesSection.tsx`):** การ์ดใบรับรองและเกียรติบัตรทุกใบ
3. **การตรวจสอบ (Verification):**
   - Next.js Build ผ่าน 100% (0 errors, 0 warnings)
