# บันทึกการแก้ไข: ระบบรับข้อความติดต่อ (Contact Form) และการส่งต่อ Auth Token ผ่าน Supabase RLS

- **วันที่**: 2026-11-04
- **สถานะ**: สำเร็จ (Ready to Merge & Deploy)
- **Branch**: `feature/init-portfolio`

---

## 1. บริบทและปัญหาที่พบ
- ผู้ใช้แจ้งว่าเมื่อกรอกข้อมูลใน Contact Form หน้าบ้านแล้วกดส่ง ข้อความไม่ปรากฏในหน้า Admin Dashboard (แท็บข้อความติดต่อ)
- **การวิเคราะห์หาสาเหตุ**:
  1. **Supabase RLS Policy**: ตาราง `contacts` กำหนด RLS ไว้ว่าเฉพาะ Role `authenticated` เท่านั้นที่ `SELECT` ข้อความได้ แต่ NestJS Backend เดิมไม่ได้ส่ง Admin Token ต่อไปยัง Supabase ทำให้เชื่อมต่อด้วย Role `anon` ส่งผลให้ Supabase ส่งค่ากลับมาเป็นลิสต์ว่าง `[]` เสมอ
  2. **Silent Catch**: ฟังก์ชัน `submitContact` ฝั่ง Frontend เดิมมี Try/Catch ดักซ่อน Error ส่งผลให้แม้การบันทึกจะล้มเหลว (เช่น Backend บังคับความยาวข้อความเกิน 5 ตัวอักษร) ก็ยังแสดงผลว่าสำเร็จ
  3. **Data Length Restriction**: Backend มีเงื่อนไขบังคับข้อความขั้นต่ำ 5 ตัวอักษร

---

## 2. การดำเนินการแก้ไข
1. **Backend (`supabase.service.ts`)**:
   - ปรับเมธอด `getClient(token?: string)` ให้รองรับการรับ Admin JWT Token เพื่อสร้าง Scoped Supabase Client ส่ง `Authorization: Bearer <token>` ทำให้ Supabase ประเมินสิทธิ์ RLS เป็น `authenticated` สำเร็จ
2. **Backend (`auth.guard.ts`)**:
   - บันทึก `request.token = token` จาก Header เพื่อให้ Controller เรียกใช้ต่อได้
3. **Backend (`contact.controller.ts` & `contact.service.ts`)**:
   - ปรับ `findAll(token)` และ `delete(id, token)` ให้ใช้ Scoped Supabase Client
   - ปรับความยาวข้อความใน `submitMessage` ให้ยืดหยุ่นขึ้น (อนุญาตข้อความสั้น)
4. **Frontend (`contactService.ts`)**:
   - นำ Fake Success ใน Try/Catch ออก ให้ส่ง Error ที่แท้จริงไปยัง UI
   - ปรับ `getContactMessages` ให้ Fallback อาร์เรย์ว่าง `[]` แทน Mock Recruiter
5. **การทดสอบความถูกต้อง**:
   - Next.js Turbopack build ผ่าน 100%
   - NestJS backend build ผ่าน 100%
   - ทดสอบผ่าน Supabase SQL RLS Simulation: `SET ROLE authenticated` อ่านข้อมูลสำเร็จ
