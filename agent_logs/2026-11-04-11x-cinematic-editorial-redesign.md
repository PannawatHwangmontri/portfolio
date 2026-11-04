# 2026-11-04 — 11x Cinematic Editorial Desert Redesign

## 1. บริบทและเป้าหมาย (Context & Objective)
ผู้ใช้ร้องขอการ Redesign หน้าเว็บไซต์พอร์ตโฟลิโอใหม่ทั้งหมดตามสไตล์อ้างอิง **11x — Digital workers Style Reference**:
- **ธีมหลัก**: Cinematic Editorial Desert เสมือนหน้านิตยสารหรูหรา (Luxury Magazine Spread)
- **จังหวะการเล่าเรื่อง (Editorial Cadence)**: สลับระหว่างสเตจมืด Deep Teal (`#0b252a`) กับหน้าคู่กระดาษสว่าง Paper White (`#ffffff`), Bone (`#f6f5f5`) และ Sandstone (`#f5ece5`)
- **การ์ดพาสเทล 4 สี (Sun-Bleached Pastels)**:
  - Desert Clay (`#e7d3bf`) สำหรับ Languages
  - Dusty Sky (`#c5d5e8`) สำหรับ Frontend
  - Wisteria (`#efe5f9`) สำหรับ Backend
  - Mist Mint (`#d4e6eb`) สำหรับ Cloud & DevOps
- **รูปทรงและเรขาคณิต**:
  - ปุ่มทรง Pill: `rounded-full` (999px radius), padding `px-6 py-3`
  - การ์ด: `rounded-2xl` (16px radius)
  - แท็กและป้าย: `rounded-lg` (8px radius)
  - ไร้เงาตกกระทบ 100% (Zero decorative shadows, flat tonal contrast)
- **Hero Visual**: WebGL Fragment Shader ปรับโทนแสงคลื่นทะเลทรายยามเย็น Warm Sunset Terracotta & Golden Amber เหนือขอบฟ้า Deep Teal (`#0b252a`)

---

## 2. การเปลี่ยนแปลงในแต่ละคอมโพเนนต์ (Component Changes)

### 2.1 Design Tokens & Global CSS
- `frontend/src/app/globals.css`:
  - ประกาศ CSS Variables สำหรับ 11x: `--color-obsidian`, `--color-paper-white`, `--color-deep-teal`, `--color-bone`, `--color-sandstone`, `--color-ash-blush`, `--color-stone`, `--color-iron`, `--color-pewter`, `--color-charcoal`, `--color-dusty-sky`, `--color-mist-mint`, `--color-wisteria`, `--color-desert-clay`, `--color-slate-teal`, `--color-saddle-brown`
  - บังคับใช้เงาตกกระทบเป็น 0 ทั้งระบบ (`box-shadow: none !important`)
- `DESIGN.md`: อัปเดตสเปกดีไซน์ซิสเต็ม 11x ครบทุก Section

### 2.2 UI Primitives
- `frontend/src/components/ui/Button.tsx`:
  - เปลี่ยนรัศมีขอบปุ่มเป็น `rounded-full` (Pill shape)
  - ปรับขนาด `md` เป็น `px-6 py-3`
  - เพิ่ม variants สำหรับสเตจสว่าง (`primary`: ดำขอบใส) และสเตจมืด (`dark`: ขาวขอบใส)
- `frontend/src/components/ui/Badge.tsx`:
  - เปลี่ยนรัศมีเป็น `rounded-lg` (8px radius)
  - เพิ่ม variants พาสเทล 11x: `slate-teal`, `dusty-sky`, `mist-mint`, `wisteria`, `desert-clay`
- `frontend/src/components/ui/HeroShaderBackground.tsx`:
  - ปรับสี GLSL Shader เป็น `bgColor = vec3(0.043, 0.145, 0.165)` (Deep Teal `#0b252a`) และ `rectColor = vec3(0.78, 0.48, 0.30)` (Sunset Amber)

### 2.3 Sections & Layout
- `Navbar.tsx`: พื้นหลังสีขาว Paper White `#ffffff`, ขอบเส้น hairline `#e1dad9`, ปุ่มสลับภาษาและปุ่ม Resume ทรง Pill
- `HeroSection.tsx`: สเตจ Deep Teal `#0b252a`, Display Serif ขนาดมหึมา 88px พร้อม tracking `-0.04em`, ปุ่มแอ็กชันทรง Pill สีขาว Paper White
- `AboutSection.tsx`: หน้าคู่กระดาษสว่าง Paper White `#ffffff`, หัวข้อ Serif 54px tracking `-0.04em`, บล็อกสถิติสถาปัตยกรรมมุมโค้ง 16px บนพื้น Bone `#f6f5f5` และ Sandstone `#f5ece5`
- `SkillsSection.tsx`: การ์ดพาสเทล 4 สีมุมโค้ง 16px (Desert Clay, Dusty Sky, Wisteria, Mist Mint) พร้อมแท็กเทคโนโลยีมุมมน 8px
- `ProjectsSection.tsx`: Dark narrative band สเตจ Deep Teal `#0b252a`, การ์ดสี `#0e2c32` มุมโค้ง 16px, แท็กสี Slate Teal (`#406e7a`), ปุ่ม Live Demo ทรง Pill สีขาว
- `ExperienceSection.tsx`: ไทม์ไลน์กระดาษ Sandstone `#f5ece5`, เส้นคั่น hairline `#e1dad9`, แท็กมุมโค้ง 8px
- `CertificatesSection.tsx`: การ์ดสีขาว Paper White มุมโค้ง 16px, Lightbox Modal มุมโค้ง 16px ไร้เงา พร้อมปุ่มปิดทรง Pill
- `ContactSection.tsx`: สเตจ Deep Teal `#0b252a` เป็นฉากปิด, ฟอร์มการ์ดมุมโค้ง 16px, ปุ่ม Submit ทรง Pill สีขาว
- `Footer.tsx`: พื้นหลังสี `#081d21` ขอบบน `#143e46`, ข้อความสี Pewter `#afaeae`

---

## 3. การตรวจสอบและทดสอบ (Verification)
- `npx turbo lint`: สำเร็จ 100% (2/2 packages, 0 errors)
- `npx turbo build`: สำเร็จ 100% (2/2 packages, Next.js static pages generated)
- การทดสอบทางสถาปัตยกรรม:
  - ฟอนต์ Playfair Display + IBM Plex Sans Thai แสดงผลสมบูรณ์
  - รัศมีปุ่มทรง Pill (999px) และการ์ด (16px) ถูกต้องตรงตาม 11x Style Reference
  - ระบบสองภาษา (TH/EN) ใช้งานได้ปกติทุกจุด
