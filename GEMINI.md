# GEMINI.md

คู่มือบริบทและแนวทางปฏิบัติสำหรับ Gemini และ AI Agents ในโปรเจกต์ Portfolio นี้

## 1. ภาพรวมโครงการ (Project Overview)
- **เจ้าของโปรเจกต์**: Pannawat Hwangmontri
- **ประเภท**: เว็บไซต์ Portfolio & Resume ส่วนตัว (Full-stack Monorepo)
- **ภาษาที่รองรับ**: 2 ภาษา (i18n) โดยมี **ภาษาไทย (TH)** เป็นภาษาหลัก และ **ภาษาอังกฤษ (EN)** เป็นภาษารอง

## 2. สแต็กเทคโนโลยีที่ยืนยันแล้ว (Confirmed Tech Stack)
- **สถาปัตยกรรม**: Monorepo ด้วย **Turborepo** + **npm workspaces**
  - **Frontend (`frontend/`)**: Next.js (App Router, TypeScript) + GSAP (ScrollTrigger) + Tailwind CSS + Lucide React
  - **Backend (`backend/`)**: Node.js ด้วย **NestJS** (TypeScript, RESTful API) + Supabase
- **ฐานข้อมูลและ CMS**: Supabase (PostgreSQL, Storage, Auth/RLS)
- **การจัดสไตล์**: Tailwind CSS — สไตล์ **Flat Minimal** (ขาวเรียบ สะอาด ขอบเทาบาง)
- **สีคู่เด่น (Primary Accent)**: **Sky Blue** (`#0284c7` / `#38bdf8`)
- **แบบอักษร (Typography)**: `IBM Plex Sans Thai` + `IBM Plex Sans`
- **ชุดไอคอน**: Lucide React
- **มาตรฐานโค้ด**: ESLint + Prettier
- **การ Deploy**: Railway (แยก Service สำหรับ Frontend และ Backend)
- **บันทึกการทำงาน**: จัดเก็บประวัติลงในโฟลเดอร์ `agent_logs/` และดัชนีใน `AGENT_LOG.md`

## 3. โครงสร้างโฟลเดอร์มาตรฐาน (Clean Directory Structure)
```text
portfolio/
├── frontend/                     # Next.js Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router (i18n routing)
│   │   ├── components/           # UI Components (ui/, layout/, sections/)
│   │   ├── animations/           # GSAP timelines และ hooks
│   │   ├── services/             # ดึงข้อมูลจาก NestJS API
│   │   ├── locales/              # ไฟล์แปลภาษา th.json, en.json
│   │   └── types/                # TypeScript Interfaces
│   ├── public/                   # Static assets (images, webp, pdf resumes)
│   └── tailwind.config.ts        # Sky Blue + Flat Minimal tokens
├── backend/                      # NestJS API Application
│   ├── src/
│   │   ├── modules/              # แยกตามโมดูล (projects, experience, contact, auth)
│   │   ├── common/               # Guards, interceptors, filters
│   │   ├── supabase/             # Supabase Client & Service
│   │   └── main.ts
│   └── test/
├── AGENT_LOG.md                  # บันทึกประวัติการตัดสินใจและการคุยกับ Agent
├── GEMINI.md
├── AGENT.md
├── SKILL.md
├── DESIGN.md
└── STYLE.md
```

## 4. กฎเหล็กสำหรับ AI Agent
1. **เวลาให้ทำอะไรให้ถามก่อนทำ ห้ามคิดเอง (Ask Before Doing, Never Assume)**: ทุกครั้งที่ได้รับมอบหมายงานหรือต้องเปลี่ยนแปลงแก้ไข ให้สอบถามและยืนยันกับผู้ใช้ก่อนเริ่มลงมือทำเสมอ ห้ามคิดหรือเดาเอาเองเด็ดขาด
2. **เก็บบันทึกเสมอ (Log Always)**: ทุกครั้งที่มีข้อสรุป ปรับเปลี่ยนสถาปัตยกรรม หรือเพิ่มฟีเจอร์ ให้บันทึกลง `AGENT_LOG.md`
3. **i18n First**: ทุกข้อความบนหน้าเว็บต้องมีทั้งภาษาไทยและอังกฤษ ห้ามฮาร์ดโค้ด
4. **ทำความสะอาด GSAP**: ใช้ Context / Cleanup เพื่อป้องกัน Memory Leak บน Frontend เสมอ
5. **ความปลอดภัยสูง**: ห้ามแตะต้อง `.env*` หรือคีย์ Supabase Service Role ในฝั่ง Client
