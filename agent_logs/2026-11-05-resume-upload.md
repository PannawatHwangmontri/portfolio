# Resume Upload (Admin → Public Download)

## สิ่งที่ทำ
- Backend: โมดูลใหม่ `backend/src/modules/resumes/` (Controller → Service → Supabase)
  - `GET /api/resumes/active` (public), `GET/POST /api/resumes`, `PUT /api/resumes/:id/activate`, `DELETE /api/resumes/:id` (AuthGuard)
  - อัปโหลดเป็น base64 → ตรวจ magic bytes `%PDF-` → เก็บใน Storage bucket `resumes` → ตั้งเป็น active อัตโนมัติ
- DB: ตาราง `resumes` + bucket `resumes` เพิ่มใน `backend/supabase/schema.sql` (section 12)
- Frontend: `services/resumeService.ts`, แท็บ "เรซูเม่" ใน `/admin` (อัปโหลด/ใช้ฉบับนี้/ลบ/ประวัติ), Navbar ดึง URL จาก API แทน `/resume-*.pdf`

## การตัดสินใจ
- ไฟล์เดียวใช้ทั้ง TH/EN, ปุ่มอยู่ที่ Navbar, เก็บประวัติและเลือก active ได้
- ปุ่มใน Navbar ซ่อนถ้ายังไม่มี resume (กันลิงก์ 404)
- จำกัด PDF ≤ 5MB (body limit ของ backend 10MB)

## ต้องทำต่อ
- รัน SQL section 12 ใน Supabase (ยังไม่ได้รัน)
- ทดสอบอัปโหลดจริงหลังรัน SQL
