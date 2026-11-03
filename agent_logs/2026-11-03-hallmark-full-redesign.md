# บันทึกการ Full Redesign ด้วย Hallmark (2026-11-03)

## สรุปการดำเนินงาน
- ดำเนินการ Full Redesign ทั้งระบบหน้าบ้าน (`/`) และระบบหลังบ้าน (`/admin`, `/admin/login`) ภายใต้แนวทาง **Hallmark (The Floor & Editorial Guidelines)**
- คงเอกลักษณ์ **Flat Minimal ขาว-ฟ้า Sky Blue**, ฟอนต์ **IBM Plex Sans Thai**, ระบบ 2 ภาษา (TH/EN) และ Function/Wiring เดิมไว้ทั้งหมด 100%

## รายละเอียดการปรับปรุง
1. **Globals & Tokens (`globals.css`)**:
   - เพิ่ม Hallmark Stamp บรรทัดแรก
   - กำหนด `overflow-x: clip` บน `html` และ `body`
   - กำหนด Semantic Tokens สำหรับ Surface, Border, Text และ Accent (Sky Blue) ขจัด Color literals ทั้งหมด
   - กำหนด Focus Ring และ Reduced Motion Fallback
2. **Components & Sections**:
   - ปรับ Hero Section ให้แสดงผล Headline, ประโยคแนะนำตัว และ CTA ครบในจอ 1280x800
   - ขจัด `transition-all` แทนที่ด้วย `transition-colors` ใน Card และ Projects
   - ขจัด Tracked Uppercase ในหมวดหมู่และไทม์ไลน์
   - ขจัด Dash ในเนื้อหาภาษาอังกฤษตาม Rule 19
   - เพิ่ม `aria-hidden="true"` ให้ SVG icons
3. **Admin Dashboard & Login**:
   - ปรับเป็น Clean Editorial App Screen
   - ขจัดการ์ดซ้อนการ์ดใน Modal และหน้ารายการ
   - รองรับ Focus-visible ring บน Input และ Button ทุกตัว

## ผลการทดสอบ
- `sloplint` Floor rules: **0 FAIL, 0 REFLEX, 0 WARN** (เดิม 36 FAIL)
- `npm run lint`: **0 errors, 0 warnings**
- `npm run build`: Static prerender **6/6 pages pass** สะอาด 100%
