# บันทึกการทำงาน: ระบบอัปโหลดรูปภาพเกียรติบัตรและใบรับรอง (Certificate Image Upload)

**วันที่**: 2026-11-03  
**สถานะ**: เสร็จสมบูรณ์ (Verified: Lint 0 errors, Build 100% pass)

---

## 1. วัตถุประสงค์ (Objective)
- ปรับปรุงหน้า Admin Dashboard ในส่วนเกียรติบัตรและใบรับรอง (Certificates) ให้สามารถอัปโหลดไฟล์รูปภาพเกียรติบัตร (PNG, JPG, WebP) เข้าสู่ Supabase Storage ได้โดยตรง แทนการกรอกเฉพาะ URL ข้อความ
- ปรับปรุงหน้าเว็บไซต์ส่วนบุคคล (Public Site) ให้แสดงรูปตัวอย่าง (Thumbnail) ของเกียรติบัตร และสามารถคลิกเพื่อดูรูปภาพขนาดเต็มแบบ Lightbox Modal ได้

---

## 2. การตัดสินใจทางสถาปัตยกรรม (Architectural Decisions)
1. **Supabase Storage Bucket**:
   - ใช้ Public Bucket ชื่อ `certificates`
   - กำหนด RLS Policies: ทุกคนอ่านได้ (Public Read) แต่เฉพาะ Admin (Authenticated) ที่สามารถอัปโหลดและจัดการไฟล์ได้
2. **Backend Upload Endpoint (NestJS)**:
   - ขยายขีดจำกัด Payload ใน `main.ts` เป็น `10mb` ทั้ง `json` และ `urlencoded` เพื่อรองรับการส่ง base64
   - เพิ่ม `POST /certificates/upload` ใน `CertificatesController` ป้องกันด้วย `AuthGuard`
   - แปลง Base64 เป็น Buffer และเรียก `@supabase/supabase-js` storage API (`client.storage.from('certificates').upload(...)`)
   - ส่งคืน Public URL สำหรับนำไปบันทึกในฟิลด์ `credential_url`
3. **Frontend Admin Dashboard**:
   - เพิ่ม Dropzone/File Picker พร้อมจำกัดขนาดไม่เกิน 10MB
   - แสดงกล่อง Thumbnail Preview พร้อมปุ่มยกเลิก/ลบรูป
   - แสดงรูปตัวอย่างในตารางรายการเกียรติบัตร พร้อมลิงก์เปิดดูรูป
   - ยังคงมีช่องกรอก URL เผื่อกรณีต้องการอ้างอิง External Credential Verification Link
4. **Public Site (`CertificatesSection`)**:
   - ตรวจจับว่า `credentialUrl` เป็นไฟล์รูปภาพหรือไม่
   - แสดง Thumbnail อัตราส่วน 16:9 สวยงามบนการ์ดใบรับรอง
   - คลิกที่รูปเพื่อเปิด Lightbox Modal ขนาดใหญ่ พร้อมปุ่มเปิดดูรูปต้นฉบับในแท็บใหม่ และรองรับการกดปุ่ม `Escape` เพื่อปิด

---

## 3. ไฟล์ที่มีการแก้ไข (Modified Files)
1. `backend/src/main.ts`: เพิ่ม `limit: '10mb'` ใน body parser
2. `backend/src/modules/certificates/certificates.service.ts`: เพิ่มฟังก์ชัน `uploadImage`
3. `backend/src/modules/certificates/certificates.controller.ts`: เพิ่ม endpoint `@Post('upload')`
4. `backend/supabase/schema.sql`: เพิ่ม SQL สร้าง Bucket `certificates` และ RLS Policies
5. `frontend/src/services/certificateService.ts`: เพิ่มฟังก์ชัน `uploadCertificateImage`
6. `frontend/src/app/admin/page.tsx`: เพิ่ม UI เลือกไฟล์, แสดง Preview, อัปโหลด และแสดง Thumbnail
7. `frontend/src/components/sections/CertificatesSection.tsx`: เพิ่มการแสดงผลรูปภาพและ Lightbox Modal

---

## 4. คำสั่ง SQL สำหรับ Supabase Storage (SQL Setup)
หากยังไม่ได้รันใน Supabase Dashboard ให้รันคำสั่งนี้ใน Supabase SQL Editor:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Certificate Images" ON storage.objects;
CREATE POLICY "Public Read Certificate Images" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Admin Full Access Certificate Images" ON storage.objects;
CREATE POLICY "Admin Full Access Certificate Images" ON storage.objects
  FOR ALL TO authenticated USING (bucket_id = 'certificates') WITH CHECK (bucket_id = 'certificates');
```

---

## 5. ผลการตรวจสอบ (Verification)
- `npm run lint`: ผ่าน 0 errors (ทั้ง frontend และ backend)
- `npm run build`: Monorepo build สำเร็จ 100% ผ่านทุก Service
