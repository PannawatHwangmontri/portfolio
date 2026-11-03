# AGENT_LOG.md

ดัชนีรวบรวมประวัติการตัดสินใจ ข้อตกลง และความคืบหน้าระหว่างผู้ใช้กับ AI Coding Agent

ประวัติการทำงานแบบละเอียดถูกจัดเก็บแยกเป็นไฟล์ในโฟลเดอร์ [`agent_logs/`](file:///d:/Intren/portfolio/agent_logs/)

---

## สารบัญบันทึกประวัติ (Log Directory)

| วันที่ | หัวข้อ | ลิงก์บันทึกฉบับเต็ม | สรุปประเด็นสำคัญ |
|---|---|---|---|
| 2026-11-03 | Project Setup & Monorepo Architecture | [2026-11-03-project-setup.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-project-setup.md) | เลือกสถาปัตยกรรม Next.js + NestJS (Node.js) + Supabase, Turborepo + npm, สไตล์ Flat Minimal ขาว-ฟ้า, ฟอนต์ IBM Plex Sans Thai, จัดเก็บ Log ใน `agent_logs/` |
| 2026-11-03 | Public Front & Admin Dashboard System | [2026-11-03-admin-and-public-system.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-admin-and-public-system.md) | แก้ไข Build/Lint 100%, สร้างหน้า Public ครบ 12 Sections สไตล์ Flat Minimal, สร้างหน้า Admin Dashboard (/admin) สำหรับจัดการ Projects, Experience, Certificates, Articles และ Messages, เชื่อมต่อ NestJS API & Supabase Schema |
| 2026-11-03 | Frontend Redesign via frontend-design Skill | [2026-11-03-frontend-redesign.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-frontend-redesign.md) | ติดตั้ง skill `frontend-design`, ยกเครื่อง UI ทุก Section กำจัด AI Clichés (SaaS card kit, ป้าย Pill กระพริบ, หัวข้อเน้นสีคำ) ปรับเป็นสไตล์ Editorial & Engineering Matrix |
| 2026-11-03 | Fix Backend Dev & Offline Fallback | [2026-11-03-fix-backend-dev-and-offline-fallback.md](file:///d:/Intren/portfolio/agent_logs/2026-11-03-fix-backend-dev-and-offline-fallback.md) | แก้ไข `TypeError: Failed to fetch` โดยเพิ่ม script `"dev"` ใน `backend/package.json` และทำ Offline Fallback ใน Frontend Services |

---

## กฎการบันทึก
1. ทุกครั้งที่มีการตัดสินใจสำคัญ หรือเสร็จสิ้นรอบการพัฒนา ให้สร้างไฟล์ใหม่ในโฟลเดอร์ `agent_logs/YYYY-MM-DD-<topic>.md`
2. อัปเดตตารางสารบัญในหน้านี้เสมอ
