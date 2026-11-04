# DESIGN.md — 11x Style Reference

> Cinematic editorial desert — full-bleed terrain photography and deep teal stages against monumental serif headlines, where the page reads like a luxury magazine spread.

---

## 1. วัตถุประสงค์และสไตล์หลัก (Objective & Aesthetic)
- **สไตล์การออกแบบ**: **11x (Cinematic Editorial Desert)**
- **ลักษณะเด่น**: สลับจังหวะการเล่าเรื่อง (Editorial Cadence) ระหว่างแบนด์มืดสนิท Deep Teal (`#0b252a`) กับหน้าคู่กระดาษสว่าง Paper White (`#ffffff`), Bone (`#f6f5f5`) และ Sandstone (`#f5ece5`)
- **การ์ดพาสเทล 4 สี (Sun-Bleached Pastels for Feature Cards)**:
  - **Desert Clay**: `#e7d3bf` (ข้อความ `#4c312b`, ขอบ `#d8beaa`) — สำหรับ Languages & Core Stack
  - **Dusty Sky**: `#c5d5e8` (ข้อความ `#1e3448`, ขอบ `#b0c4db`) — สำหรับ Frontend Engineering
  - **Wisteria**: `#efe5f9` (ข้อความ `#3c2a50`, ขอบ `#ded0ed`) — สำหรับ Backend Systems
  - **Mist Mint**: `#d4e6eb` (ข้อความ `#0b252a`, ขอบ `#bed7dd`) — สำหรับ Cloud & DevOps
- **สีคู่เด่นสำหรับ Action & Highlights**:
  - **Slate Teal**: `#406e7a` (Highlight tags, badge pills บน dark sections)
  - **Deep Teal**: `#0b252a` (Flagship dark stage canvas)
  - **Obsidian**: `#000000` (High contrast text & primary light-stage pill button)
  - **Paper White**: `#ffffff` (Bright canvas & dark section pill buttons)
- **แบบอักษร (Typography)**:
  - **Headlines & Display**: High-contrast Serif (`Playfair Display` + `IBM Plex Sans Thai`) พร้อม tight tracking (`-0.04em`) ขนาดอลังการ (74px–100px สำหรับ Hero, 54px สำหรับ Sections)
  - **Body & Navigation**: Working Sans (`IBM Plex Sans` + `IBM Plex Sans Thai`)
- **รูปทรงและเรขาคณิต (Zero Shadows & Pill Geometry)**:
  - **ปุ่ม (Buttons)**: Pill shape `rounded-full` (`999px` radius), padding `12px 24px` (`px-6 py-3`)
  - **การ์ด (Cards)**: `rounded-2xl` (`16px` radius)
  - **แท็กและป้ายสถานะ (Badges & Tags)**: `rounded-lg` (`8px` radius)
  - **การ์ดรูปภาพ/พอร์ตเทรต**: `rounded-3xl` (`32px` radius)
  - **ไร้เงา 100% (Zero Decorative Shadows)**: แบนราบ สมบูรณ์แบบด้วย tonal contrast และ hairline borders `#e1dad9`

---

## 2. Tokens — Colors

| Name | Hex Value | Token | Role |
|------|-----------|-------|------|
| Obsidian | `#000000` | `--color-obsidian` | Maximum contrast typography, primary light-stage pill button |
| Paper White | `#ffffff` | `--color-paper-white` | Editorial page canvas, light card surface, dark-stage pill button |
| Deep Teal | `#0b252a` | `--color-deep-teal` | Full-bleed narrative dark band, hero stage, contact stage |
| Bone | `#f6f5f5` | `--color-bone` | Off-white subtle card surface, skills section background |
| Sandstone | `#f5ece5` | `--color-sandstone` | Warm off-white timeline section, metrics ledger |
| Ash Blush | `#ede2d7` | `--color-ash-blush` | Subtle warm accent, pill hover state |
| Stone | `#d7cecc` | `--color-stone` | Secondary hairline, footer element |
| Iron | `#e1dad9` | `--color-iron` | 1px hairline border across all light sections |
| Pewter | `#afaeae` | `--color-pewter` | Muted text and metadata on dark teal surfaces |
| Charcoal | `#222222` | `--color-charcoal` | Secondary body text on light backgrounds |
| Slate Teal | `#406e7a` | `--color-slate-teal` | Tag pills and badges on dark teal surfaces |
| Desert Clay | `#e7d3bf` | `--color-desert-clay` | Sun-bleached pastel card (Languages) |
| Dusty Sky | `#c5d5e8` | `--color-dusty-sky` | Sun-bleached pastel card (Frontend) |
| Wisteria | `#efe5f9` | `--color-wisteria` | Sun-bleached pastel card (Backend) |
| Mist Mint | `#d4e6eb` | `--color-mist-mint` | Sun-bleached pastel card (DevOps & Cloud) |

---

## 3. Tokens — Spacing & Radii

- **Border Radius**:
  - Buttons: `999px` (`rounded-full`)
  - Cards: `16px` (`rounded-2xl`)
  - Badges & Pills: `8px` (`rounded-lg`)
  - Portrait & Large Media: `32px` (`rounded-3xl`)
- **Button Padding**: `12px` vertical, `24px` horizontal (`px-6 py-3`)
- **Page Max Width**: `1200px`
- **Section Spacing**: `96px - 128px` (`py-24 md:py-32`)
- **Elevation**: Shadowless (`box-shadow: none !important`)

---

## 4. โครงสร้างแต่ละ Section (Magazine Cadence)

### 4.1 Navbar
- พื้นหลังสีขาว Paper White `#ffffff` ขอบล่างเส้น hairline `#e1dad9`
- ตัวอักษรสีดำ Obsidian `#000000`, โลโก้ Serif หนาสง่างาม
- สวิตช์สลับภาษาทรง Pill (`rounded-full`), ปุ่ม Resume สีดำ Obsidian ทรง Pill

### 4.2 Hero Section (Deep Teal Stage)
- พื้นหลัง Deep Teal `#0b252a` ผสานกับ WebGL Shader แสงระยิบระยับสีทะเลทรายยามเย็น (Warm Sunset Terracotta & Golden Amber)
- Monumental Serif Headline ขนาด 74px–100px พร้อม tracking `-0.04em`
- Subheading Serif 28px–32px สีขาว 85% opacity
- ปุ่มแอ็กชันทรง Pill สีขาว Paper White ตัดกับพื้นหลังสีเข้ม

### 4.3 About Section (Paper White Spread)
- พื้นหลัง Paper White `#ffffff` ขอบล่าง hairline `#e1dad9`
- หัวข้อ Serif 54px tracking `-0.04em`
- สถิติผลงานในกรอบการ์ดสถาปัตยกรรมมุมโค้ง 16px พื้นหลัง Bone `#f6f5f5` และ Sandstone `#f5ece5`

### 4.4 Skills Section (Sun-Bleached Pastel Cards)
- พื้นหลัง Bone `#f6f5f5`
- การ์ดฟีเจอร์พาสเทล 4 สีมุมโค้ง 16px (Desert Clay, Dusty Sky, Wisteria, Mist Mint)
- แท็กเทคโนโลยีมุมโค้ง 8px ไร้เงา

### 4.5 Projects Section (Deep Teal Dark Narrative Band)
- พื้นหลัง Deep Teal `#0b252a` สร้างจังหวะตัดสลับหน้ากระดาษ
- การ์ดโปรเจกต์มุมโค้ง 16px พื้นสี `#0e2c32` ขอบเส้นบาง `#1d4c55`
- แท็กเทคโนโลยีสี Slate Teal (`#406e7a`)
- ปุ่ม Live Demo ทรง Pill สีขาว Paper White

### 4.6 Experience Section (Sandstone Editorial Timeline)
- พื้นหลัง Sandstone `#f5ece5`
- เส้นแบ่ง Ledger เส้นบาง `#e1dad9`
- หัวข้อย่อย Serif 24px พร้อมแท็กเทคโนโลยีมุมโค้ง 8px

### 4.7 Certificates Section (Verified Editorial Gallery)
- พื้นหลัง Paper White `#ffffff`
- การ์ดเกียรติบัตรมุมโค้ง 16px พร้อมพรีวิวรูปภาพมุมมน 12px
- Lightbox Modal มุมโค้ง 16px ไร้เงา พร้อมปุ่มปิดทรง Pill

### 4.8 Contact Section (Deep Teal Final Stage)
- พื้นหลัง Deep Teal `#0b252a` เป็นฉากปิดที่สมบูรณ์แบบ
- ฟอร์มการ์ดมุมโค้ง 16px สี `#0e2c32`
- ช่องกรอกข้อมูลมุมมน 12px สี `#081d21`
- ปุ่มส่งข้อความทรง Pill กว้างเต็มแถวสีขาว Paper White

### 4.9 Footer
- พื้นหลังสี `#081d21` ขอบบน `#143e46`
- ตัวอักษรสี Pewter `#afaeae` และไอคอนโซเชียลมีเดียสะอาดตา
