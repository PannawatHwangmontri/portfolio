# DESIGN.md

ข้อกำหนดการออกแบบ UX/UI สถาปัตยกรรมข้อมูล และโครงสร้างหน้าเว็บ Portfolio

---

## 1. วัตถุประสงค์และสไตล์หลัก (Objective & Aesthetic)
- **กลุ่มเป้าหมาย**: Tech Recruiters, Engineering Managers, ลูกค้า และเพื่อนร่วมงานสายไอที
- **สไตล์การออกแบบ**: **Flat Minimal (ขาวเรียบ สะอาด ขอบเทาบาง Accent ด้วยฟ้า Sky Blue)**
- **แบบอักษร**: `IBM Plex Sans Thai` (ภาษาไทย) + `IBM Plex Sans` (ภาษาอังกฤษ)
- **ระบบ 2 ภาษา**: มีสวิตช์สลับ **ภาษาไทย (ค่าเริ่มต้น)** และ **ภาษาอังกฤษ** พร้อมเพรียงกันทุกจุด

---

## 2. การไหลของข้อมูลและสถาปัตยกรรมระบบ (Data Flow Architecture)
```text
[ Supabase (DB & Storage) ]
             ▲
             │ (Service Role / Supabase Client)
             ▼
[ NestJS Backend API (Railway) ]
             ▲
             │ (RESTful Endpoints / JSON)
             ▼
[ Next.js Frontend (GSAP, Tailwind, i18n) ]
             ▲
             │ (Browser Render)
             ▼
       [ ผู้ใช้งาน (User) ]
```

---

## 3. โครงสร้างหน้าเว็บครบ 12 ส่วน (Page Sections)

### 3.1 แถบเมนูด้านบน (Sticky Navigation Bar)
- สไตล์ Flat Minimal: พื้นหลังสีขาวทึบพร้อมขอบล่างสีเทาบางเฉียบ (`border-b border-slate-200`)
- โลโก้ / ชื่อย่อ: `Pannawat H.`
- ลิงก์นำทาง: เกี่ยวกับฉัน, ทักษะ, ผลงาน, ประสบการณ์, เกียรติบัตร, กิจกรรม, บทความ, ติดต่อ
- **ปุ่มควบคุมสำคัญ**:
  - **Language Switcher**: ปุ่ม Pill สลับ `TH` (Active สีฟ้า) / `EN`
  - **Theme Switcher**: สลับ `Light` (ค่าเริ่มต้น) / `Dark`
  - **Resume Download CTA**: ปุ่มขอบฟ้าสำหรับดาวน์โหลด PDF เรซูเม่ตรงตามภาษาที่เลือก

### 3.2 ส่วนต้อนรับ (Hero Section)
- คำทักทายและข้อความแนะนำตัวแบบกระชับ ชัดเจน
- ระบุตำแหน่ง: Full-Stack Developer / Software Engineer
- สรุปเป้าหมายการทำงานใน 1–2 ประโยค
- ปุ่ม Action หลัก: "ดูผลงานทั้งหมด (Primary Sky Blue)" และ "ติดต่อฉัน (Secondary White)"
- ลิงก์โซเชียล: GitHub, LinkedIn, Email พร้อมไอคอน Lucide

### 3.3 เกี่ยวกับฉัน (About Me Section)
- เรื่องราวสั้นๆ เกี่ยวกับเส้นทางนักพัฒนา ความสนใจเทคโนโลยี และความมุ่งมั่น
- สถิติเด่น (Quick Highlights): จำนวนโปรเจกต์ที่ทำสำเร็จ, กิจกรรม Hackathon, ประสบการณ์ฝึกงาน

### 3.4 ทักษะและความเชี่ยวชาญ (Skills & Tech Stack)
- จัดหมวดหมู่ในรูปแบบ Flat Badges:
  - **Languages**: TypeScript, JavaScript, Python, SQL, HTML5/CSS3
  - **Frontend**: Next.js, React, Tailwind CSS, GSAP
  - **Backend & DB**: NestJS, Node.js, Supabase, PostgreSQL, RESTful APIs
  - **DevOps & Tools**: Git, Docker, Railway, Postman, Figma, Linux

### 3.5 ผลงานเด่น (Featured Projects Section)
- ตัวกรองประเภท: ทั้งหมด, Web Apps, Mobile, Backend/API
- การ์ดผลงาน Flat Minimal (พื้นขาว ขอบเทาบาง):
  - ภาพตัวอย่างในอัตราส่วนที่เหมาะสม
  - ชื่อโปรเจกต์และคำอธิบาย 2 ภาษา
  - แท็กเทคโนโลยีที่ใช้
  - ลิงก์ "Live Demo" และ "Source Code"

### 3.6 ประวัติการทำงานและการศึกษา (Experience & Education Timeline)
- ไทม์ไลน์แนวตั้งแบบเรียบง่าย ไม่เกะกะสายตา
- แยกหมวดหมู่: **ประสบการณ์ทำงาน (Work Experience)** และ **ประวัติการศึกษา (Education)**
- ระบุช่วงเวลา องค์กร ตำแหน่ง และสรุปผลลัพธ์ที่สร้างได้

### 3.7 เกียรติบัตรและใบรับรอง (Certificates & Awards)
- การ์ดแสดงใบรับรองจากสถาบันที่ผ่านการอบรม
- ระบุหน่วยงานผู้ออกใบรับรอง, วันที่ได้รับ, และลิงก์ตรวจหลักฐาน (Credential Link)

### 3.8 กิจกรรมและการแข่งขัน (Activities & Hackathons)
- บันทึกการแข่งขัน Hackathon และค่ายเทคโนโลยี
- แสดงรูปถ่ายกิจกรรม บทบาทความรับผิดชอบ และรางวัลที่ได้รับ

### 3.9 ส่วนติดต่อ (Contact Section) — ครบทั้ง 2 รูปแบบ
1. **แบบฟอร์มส่งข้อความ (Contact Form)**: ส่งข้อมูลผ่าน NestJS API ไปบันทึกลง Supabase หรือส่งแจ้งเตือนทางอีเมล
2. **ช่องทางติดต่อโดยตรง (Direct Info)**: ปุ่มคลิกเพื่อคัดลอกอีเมล (Copy to Clipboard) และลิงก์ Social Media ทุกช่องทาง

### 3.10 ส่วนท้ายเว็บ (Footer)
- ข้อความลิขสิทธิ์ © Pannawat Hwangmontri
- ข้อมูล Stack: "Built with Next.js, NestJS, Supabase & Tailwind CSS"

---

## 4. แอนิเมชัน GSAP (Clean Micro-interactions)
- แอนิเมชันต้องนุ่มนวลและไม่รบกวนการอ่านเนื้อหา
- **ScrollTrigger**: ค่อยๆ ดันเนื้อหาขึ้นเล็กน้อย (Fade In Up) เมื่อเลื่อนจอมาถึง
- **Card Hover**: เปลี่ยนสีเส้นขอบเป็นสีฟ้าอ่อนแบบทันที (`transition-colors duration-200`) สอดคล้องกับสไตล์ Flat Minimal
