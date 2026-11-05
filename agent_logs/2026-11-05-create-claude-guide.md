# บันทึกการทำงาน: สร้างคู่มือบริบทและแนวทางปฏิบัติ CLAUDE.md สำหรับ Claude Code (2026-11-05)

**วันที่:** 2026-11-05  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** AI Guidelines & Project Documentation  

---

## 1. รายละเอียดความต้องการ (Requirements)
- สร้างไฟล์ `CLAUDE.md` โดยอิงบริบท สถาปัตยกรรม และกฎเหล็กจาก `GEMINI.md`
- ปรับเปลี่ยนบริบทและรายละเอียดให้เหมาะสมกับ **Claude Code / Anthropic AI Agent** โดยเฉพาะ

---

## 2. การดำเนินการ (Implementation)
1. **สร้างไฟล์ `CLAUDE.md`:**
   - **ภาพรวมและสแต็กเทคโนโลยี:** ระบุ Next.js 16 + NestJS + Supabase + Tailwind CSS (11x Editorial Desert) + GSAP ชัดเจน
   - **คำสั่งสำหรับ Claude Code:** สรุปคำสั่ง CLI สำคัญสำหรับการติดตั้ง, รัน Dev Servers แยกหรือรวม, คำสั่ง Build Turborepo และ Linting
   - **โครงสร้างโฟลเดอร์:** แสดงไดเรกทอรีมาตรฐานของโปรเจกต์ Monorepo
   - **กฎเหล็ก 6 ข้อ:**
     1. ถามก่อนทำ ห้ามคิดเอง (Ask Before Doing, Never Assume)
     2. เก็บบันทึกลง `agent_logs/` และ `AGENT_LOG.md` เสมอ
     3. รองรับ 2 ภาษา (i18n First)
     4. GSAP Context & Memory Leak Prevention
     5. ความปลอดภัยสูง ไม่แตะ `.env*` และ RLS Security
     6. Git Workflow (ห้ามแตะ main โดยตรง, ตรวจ diff และ build ก่อนเสมอ)
2. **การจัดเก็บใน Git:**
   - บันทึกเป็น Regular File (Mode `100644`) เพื่อให้ใช้งานได้อย่างราบรื่นทุกระบบปฏิบัติการ
