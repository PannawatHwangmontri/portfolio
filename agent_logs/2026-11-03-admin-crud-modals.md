# บันทึกการทำงาน: เพิ่ม Modal และปุ่มสร้างข้อมูลสำหรับ Experience, Certificates, Articles ใน Admin Center

**วันที่**: 2026-11-03  
**ผู้รับผิดชอบ**: AI Coding Assistant (Ponytail & Caveman mode)  
**บริบท/คำสั่ง**: ผู้ใช้แจ้งว่าตอนออกแบบระบบไม่มีปุ่มสำหรับสร้างข้อมูลใหม่ในหมวดหมู่ Experience, Certificates, และ Articles มีเพียง Projects

---

## 1. วัตถุประสงค์ (Objectives)
- เพิ่มปุ่ม "+ เพิ่มประวัติใหม่" และ Modal Form สำหรับ `Experience`
- เพิ่มปุ่ม "+ เพิ่มใบรับรองใหม่" และ Modal Form สำหรับ `Certificate`
- เพิ่มปุ่ม "+ เพิ่มบทความใหม่" และ Modal Form สำหรับ `Article`
- รองรับการกรอกข้อมูล 2 ภาษา (ไทย/อังกฤษ) และส่งคำขอผ่าน JWT Supabase Auth ไปยัง NestJS Backend

---

## 2. รายละเอียดการเปลี่ยนแปลง (Changes Summary)

1. **`frontend/src/app/admin/page.tsx`**:
   - นำเข้า Service Functions: `createExperience`, `createCertificate`, `createArticle`
   - เพิ่ม State สำหรับ Form และ Modal Visibility:
     - `showExpModal`, `newExp`, `handleCreateExperience`
     - `showCertModal`, `newCert`, `handleCreateCertificate`
     - `showArticleModal`, `newArticle`, `handleCreateArticle`
   - เพิ่มปุ่ม "+ เพิ่มข้อมูลใหม่" บน Header ของแต่ละแท็บ
   - เพิ่ม UI Modal Pop-up สไตล์ Flat Minimal สะอาดตา พร้อมฟิลด์ข้อมูลตรงตาม Supabase Table Schema และ i18n

2. **`backend/supabase/schema.sql`**:
   - เพิ่มคำสั่ง `DROP POLICY IF EXISTS` สำหรับทุก Policy ก่อน `CREATE POLICY` เพื่อป้องกันข้อผิดพลาด 42710 เมื่อรันสคริปต์ซ้ำ

---

## 3. ผลการตรวจสอบ (Verification Results)
- **Turbo Build**: ผ่าน 100% ทั้ง backend (NestJS) และ frontend (Next.js)
- **Turbo Lint**: 0 warnings, 0 errors ทั้ง backend (`oxlint`) และ frontend (`eslint`)
