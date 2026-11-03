# STYLE.md

คู่มือระบบการออกแบบ (Design System), รหัสสี (Tokens), และมาตรฐานรูปแบบโค้ด (Code Style)

---

## 1. แนวทางการออกแบบและโทนสี (Visual Theme & Palette)

### สไตล์หลัก (Design Concept)
- **Flat Minimal**: สะอาดตา เรียบง่าย ขาวโปร่ง เน้นพื้นที่ว่าง (White Space) ขอบเส้นบางเฉียบ (Subtle Gray Borders) ไร้เงาหนาหนักและไม่ใช้ Glassmorphism ฟุ้งกระจาย
- **สีคู่เด่น (Primary Accent)**: **Sky Blue (ฟ้าท้องฟ้า)** — สว่าง สดใส ให้ความรู้สึกเป็นมิตรและกระฉับกระเฉง
- **โหมดการแสดงผล**: **Light Mode เป็นค่าเริ่มต้น (Default)** พร้อมสวิตช์เปิด **Dark Mode** ได้อย่างกลมกลืน

### โทเค็นสี (Color Tokens สำหรับ Tailwind CSS)

#### โหมดสว่าง (Light Mode — ค่าเริ่มต้น)
- **สีพื้นหลังหลัก (Background)**: `#ffffff` (`bg-white`) และ `#f8fafc` (`bg-slate-50`) สำหรับแถบสลับ Section
- **สีการ์ดและพื้นผิว (Card Surface)**: `#ffffff` (`bg-white`) แบบ Flat พื้นผิวทึบ ขอบเส้นบางเฉียบ `#e2e8f0` (`border-slate-200`) เงาบางเบามาก (`shadow-none` หรือ `shadow-sm`)
- **สีตัวอักษรหลัก (Text Primary)**: `#0f172a` (`text-slate-900`) — สีเทาเข้มเกือบดำ คมชัด อ่านง่ายสูงสุด
- **สีตัวอักษรรอง (Text Muted)**: `#64748b` (`text-slate-500`)
- **สีเน้นหลัก (Sky Blue Accent)**:
  - สีปกติ / Interactive: `#0284c7` (`sky-600`) หรือ `#0ea5e9` (`sky-500`)
  - โฮเวอร์ / สดใส: `#0369a1` (`sky-700`)
  - สีฟ้าอ่อนพื้นหลังป้ายแท็ก: `#f0f9ff` (`sky-50`) พร้อมขอบ `#bae6fd` (`sky-200`)
  - สีฟ้าสว่างไฮไลต์: `#38bdf8` (`sky-400`)

#### โหมดมืด (Dark Mode)
- **สีพื้นหลังหลัก (Background)**: `#090d16` (Deep Midnight Slate) หรือ `#020617` (`bg-slate-950`)
- **สีการ์ดและพื้นผิว (Card Surface)**: `#0f172a` (`bg-slate-900`) ขอบเส้น `#1e293b` (`border-slate-800`)
- **สีตัวอักษรหลัก (Text Primary)**: `#f8fafc` (`text-slate-50`)
- **สีตัวอักษรรอง (Text Muted)**: `#94a3b8` (`text-slate-400`)
- **สีเน้นหลัก (Accent)**: `#38bdf8` (`sky-400`)

---

## 2. แบบอักษรที่ยืนยันแล้ว (Confirmed Typography)

- **ภาษาไทย**: `IBM Plex Sans Thai`
- **ภาษาอังกฤษ**: `IBM Plex Sans`
- **Code / Monospace**: `IBM Plex Mono` หรือ system monospace (`font-mono`)
- **คุณลักษณะ**: สไตล์โมเดิร์น เรขาคณิต คมชัด สื่อถึงความเป็นวิศวกรซอฟต์แวร์และนักพัฒนามืออาชีพ

### ขนาดและน้ำหนักตัวอักษร (Typography Scale)
- **Hero Title**: `text-4xl` ถึง `text-6xl`, `font-bold`, `tracking-tight`
- **Section Heading**: `text-2xl` ถึง `text-3xl`, `font-bold`
- **Card Title**: `text-lg` ถึง `text-xl`, `font-semibold`
- **Body Text**: `text-sm` ถึง `text-base`, `leading-relaxed`
- **Badge & Meta**: `text-xs`, `font-medium`

---

## 3. รูปแบบ UI Components (Flat Minimal Guidelines)

### ปุ่ม (Buttons)
- **Primary**: พื้นหลังสีฟ้า Sky Blue (`bg-sky-500 hover:bg-sky-600`), ตัวหนังสือขาว, มุมมนกระชับ (`rounded-md` ถึง `rounded-lg`), ไม่มีเงาหนา
- **Secondary**: พื้นขาว ขอบเทาอ่อน (`bg-white hover:bg-slate-50 border border-slate-200 text-slate-700`), เรียบหรู
- **Language / Theme Switcher**: ดีไซน์ปุ่ม Pill เรียบง่าย ขอบบาง สถานะ Active ใช้พื้นหลังฟ้าอ่อนหรือเทาอ่อน

### การ์ด (Cards)
- พื้นหลังขาวเรียบสนิท (`bg-white`)
- เส้นขอบสีเทาบาง (`border border-slate-200 dark:border-slate-800`)
- ไม่ใช้เอฟเฟกต์ Glassmorphism เบลอ เพื่อให้ตรงกับคอนเซปต์ Flat Minimal
- เอฟเฟกต์ Hover: ขอบเปลี่ยนเป็นสีฟ้าอ่อนหรือยกตัวเล็กน้อย 2px (`hover:border-sky-300 transition-colors duration-200`)

### ป้ายกำกับทักษะ (Skill Badges)
- ทรงกระชับ (`rounded-md` หรือ `rounded-full`)
- พื้นหลังฟ้าอ่อนระเรื่อ (`bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800`)

---

## 4. มาตรฐานโค้ดและการจัดรูปแบบ (Code Style)

- **ESLint & Prettier**: Indent 2 spaces, Single Quotes, Semicolons ครบถ้วน
- **Tailwind Class Order**: จัดเรียงตามหลักการ Layout -> Display -> Spacing -> Typography -> Color -> State
- **การแยก Component**: จัดวางแบบ Atomic/Modular ไม่สร้างไฟล์ขนาดใหญ่เกิน 250 บรรทัด
