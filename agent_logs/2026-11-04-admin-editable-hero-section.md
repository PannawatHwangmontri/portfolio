# บันทึกการเพิ่มฟีเจอร์: จัดการเนื้อหาหน้าแรก (Hero Section CMS) ใน Admin Dashboard

- **วันที่**: 2026-11-04
- **สถานะ**: สำเร็จ (Ready to Merge & Deploy)
- **Branch**: `feature/init-portfolio`

---

## 1. บริบทและความต้องการ
- ผู้ใช้ต้องการให้สามารถแก้ไขข้อมูลในส่วนของ **Hero Section** (หน้าแรกของเว็บไซต์) ผ่านหน้า Admin Dashboard (`/admin`) ได้เช่นเดียวกับส่วนอื่นๆ (About, Skills, Contact Info)

---

## 2. สิ่งที่ได้รับการพัฒนาและแก้ไข
1. **Backend (NestJS API)**:
   - `site-content.data.ts`: เพิ่ม Interface `HeroContent` และค่าตั้งต้น `DEFAULT_HERO_CONTENT` (Location, StatusBadge TH/EN, Role TH/EN, Name TH/EN, Description TH/EN, GitHub URL, LinkedIn URL)
   - `profile.service.ts`: เพิ่มเมธอด `updateHero()` รองรับการบันทึกและ Upsert ข้อมูลลงตาราง `site_content` ด้วย key `hero` ใน Supabase
   - `profile.controller.ts`: เพิ่ม Endpoint `PUT /api/profile/hero` ป้องกันด้วย `AuthGuard`
2. **Frontend Service & Types**:
   - `profileService.ts`: เพิ่ม Interface `HeroContent`, `fallbackHeroContent`, และฟังก์ชัน `updateHeroContent()`
3. **Frontend Hero Section Component**:
   - `HeroSection.tsx`: เชื่อมต่อกับ `getSiteContent().hero` เพื่อดึงข้อมูลมาแสดงผลอัตโนมัติแบบ Reactive ตามภาษา TH/EN พร้อมมี Fallback ค่าตั้งต้น
4. **Frontend Admin Dashboard**:
   - `admin/page.tsx`: เพิ่มแท็บ **"หน้าแรก (Hero)"** (`LayoutTemplate` icon)
   - สร้างฟอร์มแก้ไขข้อมูลครอบคลุมทั้ง:
     - ตำแหน่งที่ตั้ง (Location Badge)
     - สถานะการรับงาน (Status Badge ทั้งภาษาไทยและอังกฤษ)
     - หัวข้อตำแหน่ง (Role ทั้งภาษาไทยและอังกฤษ)
     - ชื่อ-นามสกุล (Name ทั้งภาษาไทยและอังกฤษ)
     - คำอธิบายโปรไฟล์ย่อ (Short Description ทั้งภาษาไทยและอังกฤษ)
     - Social Profile URLs (GitHub, LinkedIn)
   - ฟังก์ชันบันทึกข้อมูลพร้อมแจ้งเตือนสถานะสำเร็จ (Toast Notification)
5. **การทดสอบความถูกต้อง**:
   - รัน `npm --workspace=backend run build` ผ่าน 100%
   - รัน `npm --workspace=frontend run build` (Turbopack) สร้าง Static Pages 6/6 ผ่าน 100%
