# บันทึกการเพิ่มฟีเจอร์: Skeleton Placeholder Lines พร้อม Shimmer Sweep Animation (2026-11-04)

**วันที่:** 2026-11-04  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** Frontend UI / UX & Loading State Design  

---

## 1. รายละเอียดความต้องการ (Requirements)
- สร้าง Skeleton placeholder lines พร้อมแอนิเมชัน Shimmer กวาดผ่าน (Shimmer sweep):
  - พื้นหลัง 3-stop linear-gradient ขนาด 200% (`background-size: 200% 100%`)
  - แอนิเมชันเลื่อน `background-position` จาก `200% 0` ไปยัง `-200% 0`
  - ทำงานวนซ้ำแบบ Infinite Loop ด้วยจังหวะ `ease-in-out` ระยะเวลาประมาณ `1.4s`
  - แสดงผลเฉพาะตอนสลับหมวดหมู่และโหลดข้อมูลในหน้าเว็บหลัก (Public Landing Page) ตามที่ผู้ใช้ระบุ

---

## 2. การดำเนินการ (Implementation)
1. **เพิ่มสไตล์ Shimmer Keyframes & Utilities (`frontend/src/app/globals.css`):**
   - `@keyframes shimmer-sweep`: เลื่อนจาก `200% 0` สู่ `-200% 0`
   - `.skeleton-shimmer-dark`: แสงกวาด 3 สต็อปโทน Teal สำหรับพื้นหลังธีมมืด (`#0b252a`)
   - `.skeleton-shimmer`: แสงกวาด 3 สต็อปโทน Stone/Bone สำหรับพื้นหลังธีมสว่าง
   - Timing: `animation: shimmer-sweep 1.4s ease-in-out infinite`
2. **สร้าง Reusable Component (`frontend/src/components/ui/Skeleton.tsx`):**
   - สร้าง Component `<Skeleton />` พร้อมรับขนาด, ความสูง, มุมโค้ง และ Variant (`dark` / `light`)
3. **ปรับใช้ในหน้าเว็บหลัก (`frontend/src/components/sections/ProjectsSection.tsx`):**
   - สร้าง `ProjectCardSkeleton` จำลองเส้น Skeleton Placeholder Lines ครบทุกส่วน (Index, Category, Multi-line Title, Description, Tech Tag Pills, Action Buttons)
   - เมื่อผู้ใช้กดสลับฟิลเตอร์หมวดหมู่ (All, Web, Mobile, Backend, GitHub) ระบบจะแสดง Skeleton Shimmer ระหว่างโหลดข้อมูลโครงการใหม่
4. **การตรวจสอบ (Verification):**
   - Next.js Webpack Build ผ่าน 100% (0 errors, 0 warnings)
