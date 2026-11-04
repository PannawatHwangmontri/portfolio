# บันทึกการแก้ไข: แก้ไขการ Sync ข้อมูล Hero Section สู่ Production (2026-11-04)

**วันที่:** 2026-11-04  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** Production Sync Fix & CI/CD Deployment  

---

## 1. สาเหตุของปัญหา (Root Cause Analysis)
- ในการทดสอบแก้ไขข้อมูลส่วนหัว (Hero Section) ผ่านหน้า `/admin` การเปลี่ยนแปลงไม่ถูกแสดงผลใน Production (`https://portfolio-pannawat.vercel.app`)
- **ตรวจพบ:**
  1. Service `portfolio-backend-service` บน Railway ยังคงรัน Deployment เก่า (`f0ee1e6`) ที่ยังไม่มี API `PUT /api/profile/hero` (ส่งผลให้ API ตอบกลับ 404 เมื่อกดบันทึก) และ `GET /api/profile` ยังไม่ได้ส่งฟิลด์ `hero`
  2. ทำให้หน้าบ้านใน Production ต้องใช้ค่า `fallbackHeroContent` ซึ่งมีค่าเริ่มต้นดั้งเดิม
  3. GitHub source บน Railway ไม่ได้ตั้งค่า auto-trigger deploy อัตโนมัติเมื่อ push เข้า `main`

---

## 2. วิธีการแก้ไข (Solution)
1. **เชื่อมต่อและ Trigger Deployment บน Railway:**
   - ใช้ `connect-service-source` เชื่อมต่อ Service `portfolio-backend-service` เข้ากับ GitHub Repo `PannawatHwangmontri/portfolio@main` อย่างสมบูรณ์ เพื่อให้ Build โค้ดล่าสุด (`5050b65`) และเปิดให้ Push เข้า main แล้ว Auto-deploy ในอนาคต
   - ตรวจสอบ Deployment `5842779f-a125-46e9-8671-d3d49b71216f` สถานะ `SUCCESS`
2. **ปรับปรุงค่าเริ่มต้น (Fallback Defaults):**
   - อัปเดต `fallbackHeroContent` ใน `frontend/src/services/profileService.ts` และ `DEFAULT_HERO_CONTENT` ใน `backend/src/modules/profile/site-content.data.ts` ให้สถานะภาษาไทยตรงกับ "พร้อมรับงาน"
3. **ตรวจสอบการทำงานบน Production:**
   - `PUT /api/profile/hero` ตอบกลับด้วย `401 Unauthorized` (AuthGuard ทำงานถูกต้อง ไม่ใช่ 404)
   - `GET /api/profile` ส่งคืนฟิลด์ `hero` ครบถ้วน รวมถึงสถานะ `"พร้อมรับงาน"` และชื่อภาษาไทย `"พัฒนวัชร์ หวังมนตรี"`
   - หน้าเว็บ Production ดึงข้อมูลสดจาก API มาแสดงผลได้ทันที
