# CLAUDE.md

คู่มือบริบทและแนวทางปฏิบัติสำหรับ Claude Code และ Anthropic AI Agents ในโปรเจกต์ Portfolio นี้

## 1. ภาพรวมโครงการ (Project Overview)
- **เจ้าของโปรเจกต์**: Pannawat Hwangmontri
- **ประเภท**: เว็บไซต์ Portfolio & Resume ส่วนตัว (Full-stack Monorepo)
- **ภาษาที่รองรับ**: 2 ภาษา (i18n) โดยมี **ภาษาไทย (TH)** เป็นภาษาหลัก และ **ภาษาอังกฤษ (EN)** เป็นภาษารอง
- **Production URL**:
  - Frontend: [https://portfolio-pannawat.vercel.app](https://portfolio-pannawat.vercel.app)
  - Backend: [https://portfolio-backend-service-production-08f6.up.railway.app](https://portfolio-backend-service-production-08f6.up.railway.app)

## 2. สแต็กเทคโนโลยีที่ยืนยันแล้ว (Confirmed Tech Stack)
- **สถาปัตยกรรม Monorepo**: Turborepo + npm workspaces
  - **Frontend (`frontend/`)**: Next.js 16 (App Router, TypeScript) + Tailwind CSS + GSAP (ScrollTrigger) + Lucide React
  - **Backend (`backend/`)**: Node.js + NestJS (TypeScript, RESTful API) + Supabase
- **ฐานข้อมูลและ CMS**: Supabase (PostgreSQL, Storage bucket `certificates`, Auth / Row Level Security)
- **การจัดสไตล์ (Design System)**: 11x Editorial Desert — Deep Teal (`#0b252a`), Warm Bone/Sandstone, ป้าย Pill (999px), การ์ดมุมโค้ง 16px, WebGL Sunset GLSL Background, และ Overshooting Spring Hover Lift
- **แบบอักษร (Typography)**: `IBM Plex Sans Thai` + `IBM Plex Sans` + `Playfair Display`
- **ชุดไอคอน**: Lucide React
- **มาตรฐานโค้ด**: ESLint + Prettier
- **การ Deploy (CI/CD)**:
  - Frontend: Vercel (Auto-deploy เมื่อ push เข้า `main`)
  - Backend: Railway (Service `portfolio-backend-service` บน branch `main`)
- **การบันทึกการทำงาน**: จัดเก็บประวัติลงในโฟลเดอร์ `agent_logs/` และดัชนีใน `AGENT_LOG.md`

## 3. คำสั่งที่ใช้บ่อยสำหรับ Claude (Common Commands)
```bash
# ติดตั้ง dependencies
npm install

# รัน Development Servers พร้อมกันทั้ง Monorepo
npm run dev

# รันแยกเฉพาะส่วน
npm run dev:frontend   # Next.js (port 3000)
npm run dev:backend    # NestJS (port 4000)

# Build ตรวจสอบความถูกต้องก่อนส่งมอบ
npm run build          # Turborepo build ทั้งระบบ
npm --prefix backend run build
npm --prefix frontend run build -- --webpack

# Linting & Formatting
npm run lint
```

## 4. โครงสร้างโฟลเดอร์มาตรฐาน (Clean Directory Structure)
```text
portfolio/
├── frontend/                     # Next.js Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router (i18n routing, admin)
│   │   ├── components/           # UI Components (ui/, layout/, sections/)
│   │   ├── animations/           # GSAP timelines และ hooks
│   │   ├── services/             # API services เชื่อมต่อ NestJS Backend
│   │   ├── locales/              # ไฟล์แปลภาษา th.json, en.json
│   │   └── types/                # TypeScript Interfaces
│   ├── public/                   # Static assets (images, webp, pdf resumes)
│   └── tailwind.config.ts
├── backend/                      # NestJS API Application
│   ├── src/
│   │   ├── modules/              # แยกตามโมดูล (projects, experience, contact, auth, profile)
│   │   ├── common/               # Guards (AuthGuard), interceptors, filters
│   │   ├── supabase/             # Supabase Client & Service
│   │   └── main.ts
│   └── test/
├── agent_logs/                   # บันทึกประวัติการตัดสินใจแต่ละรอบ
├── AGENT_LOG.md                  # สารบัญประวัติการพัฒนา
├── GEMINI.md                     # บริบทสำหรับ Gemini
└── CLAUDE.md                     # บริบทสำหรับ Claude Code
```

## 5. กฎเหล็กสำหรับ Claude Code (Core Rules)
1. **เวลาให้ทำอะไรให้ถามก่อนทำ ห้ามคิดเอง (Ask Before Doing, Never Assume)**: ทุกครั้งที่ได้รับมอบหมายงานหรือต้องเปลี่ยนแปลงแก้ไข ให้สอบถามและยืนยันกับผู้ใช้ก่อนเริ่มลงมือทำเสมอ ห้ามคิดหรือเดาเอาเองเด็ดขาด
2. **เก็บบันทึกเสมอ (Log Always)**: ทุกครั้งที่มีข้อสรุป ปรับเปลี่ยนสถาปัตยกรรม หรือเพิ่มฟีเจอร์ ให้สร้างบันทึกลงใน `agent_logs/YYYY-MM-DD-<topic>.md` และอัปเดตตารางดัชนีใน `AGENT_LOG.md`
3. **i18n First**: ทุกข้อความบนหน้าเว็บต้องมีทั้งภาษาไทย (TH) และภาษาอังกฤษ (EN) ห้ามฮาร์ดโค้ด
4. **ทำความสะอาด GSAP**: ใช้ Context / Cleanup เพื่อป้องกัน Memory Leak บน Frontend เสมอ
5. **ความปลอดภัยสูง**:
   - ห้ามแตะต้อง, อ่าน หรือแก้ไขไฟล์ `.env*` หรือคีย์ลับเด็ดขาด
   - ห้ามนำ Supabase Service Role Key หรือ JWT ลับไปเปิดเผยใน Client Code
   - ตรวจสอบ Row Level Security (RLS) และส่งผ่าน Admin Token เสมอเมื่อเรียก API ที่ต้องระบุตัวตน
6. **Git Workflow**:
   - ห้าม Commit ตรงเข้า `main` ให้ทำงานบน Branch `feature/init-portfolio` ก่อนเสมอ
   - ตรวจสอบ `git diff` และรัน Build ให้ผ่าน 100% ก่อน Commit
   - เมสเสจ Commit ต้องระบุเหตุผลชัดเจน เช่น `feat:`, `fix:`, `chore:`
