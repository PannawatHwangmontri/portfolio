# AGENT.md

คู่มือข้อกำหนดและระเบียบปฏิบัติสำหรับ AI Coding Agents ในคลังโค้ดนี้

## 1. กฎความปลอดภัยและการจัดการ Git

1. **ห้ามแตะต้อง Branch `main`**:
   - พัฒนาบน Branch: `feature/init-portfolio` เป็นหลัก
   - แตก Branch ย่อยตามงาน เช่น `feat/frontend-setup`, `feat/backend-api`
   - ห้าม Commit หรือ Push หากผู้ใช้ไม่ได้สั่ง
2. **ห้ามแตะต้อง Secrets**:
   - ข้อมูล Supabase Keys, Database URLs, และ Environment Variables ต้องอ่านผ่าน `.env` เท่านั้น
   - ฝั่ง `frontend/` เข้าถึงเฉพาะ Public Anon Key ห้ามส่ง Service Role Key ออกไปนอก `backend/`
3. **คำสั่งอันตราย**:
   - ห้ามรันคำสั่งทำลายข้อมูล เช่น `rm -rf`, `DROP TABLE`, `git reset --hard` เด็ดขาด

## 2. กฎการบันทึกประวัติและการสื่อสาร (Logging & Clarification)

1. **บันทึกประวัติการตัดสินใจในโฟลเดอร์ `agent_logs/`**:
   - เมื่อมีการตัดสินใจเลือก Tech Stack, ปรับโครงสร้าง หรือเพิ่มฟีเจอร์ใหม่ ให้สร้างไฟล์บันทึกในโฟลเดอร์ `agent_logs/YYYY-MM-DD-<topic>.md` และอัปเดตสารบัญใน `AGENT_LOG.md` เสมอ
2. **สงสัยให้ถามทันที (Ask First, Never Assume)**:
   - หากข้อกำหนดของงานไม่ชัดเจน หรือมีทางเลือกมากกว่าหนึ่งวิธีที่มีผลกระทบต่อสถาปัตยกรรม ให้ตั้งคำถามอย่างชัดเจนกับผู้ใช้ก่อนเริ่มเขียนโค้ด

## 3. การจัดระเบียบโครงสร้างโค้ด (Clean Architecture Rules)

- **Frontend (`frontend/`)**: ใช้ Next.js App Router แยกชัดเจนระหว่าง UI Components (Dumb components) และ Logic/Data Fetching (Smart components/containers)
- **Backend (`backend/`)**: ใช้ NestJS แบบ Modular Architecture (Controller -> Service -> Supabase Repository) ห้ามเขียน Logic รวมใน Controller เดียว
- **ไม่มีโค้ดขยะ**: ลบไฟล์ที่ไม่ได้ใช้งาน ห้ามทิ้งไฟล์ชั่วคราวหรือคอมเมนต์รกรุงรัง

## 4. ลำดับขั้นตอนการทำงาน (Workflow)

1. **อ่านโค้ดและ Context**: สำรวจไฟล์เดิมและอ่าน `AGENT_LOG.md` ก่อนลงมือ
2. **แก้ไขแบบ Smallest Complete Diff**: ทำการเปลี่ยนแปลงเฉพาะจุดที่จำเป็น
3. **ตรวจสอบความสมบูรณ์**:
   - รัน Type Check (`tsc --noEmit`) ทั้งฝั่ง `frontend/` และ `backend/`
   - รัน Lint / Format Check (ESLint + Prettier)
   - รัน Build เพื่อยืนยันว่าไม่มี Error
4. **บันทึกผลลง `AGENT_LOG.md`**: ระบุสิ่งที่ทำเสร็จ สิ่งที่ข้าม และสิ่งที่ต้องทำต่อ
