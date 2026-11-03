# บันทึกการทำงาน: เพิ่ม WebGL GLSL Shader Background ใน Hero Section

**วันที่**: 2026-11-03  
**ผู้รับผิดชอบ**: AI Coding Assistant (Ponytail & Caveman mode)  
**บริบท/คำสั่ง**: ผู้ใช้นำโค้ด GLSL Fragment Shader (Animated Noise Background + Floating Rectangles) มาให้ใส่ลงในโปรเจกต์ โดยเลือกใส่ในส่วน Hero Section และใช้โทนสี Dark Navy Blue ตามโค้ดต้นฉบับ

---

## 1. วัตถุประสงค์ (Objectives)
- แปลงโค้ด Shadertoy GLSL ให้เป็นมาตรฐาน WebGL Fragment Shader
- สร้าง Component [HeroShaderBackground.tsx](file:///d:/Intren/portfolio/frontend/src/components/ui/HeroShaderBackground.tsx) ด้วย Native WebGL API (ไม่พึ่งพา Library ภายนอกขนาดใหญ่อย่าง Three.js)
- จัดการ Memory และประสิทธิภาพ:
  - ใช้ `requestAnimationFrame` สำหรับ Render Loop
  - ใช้ `IntersectionObserver` เพื่อหยุดการ Render ชั่วคราวเมื่อเลื่อนหน้าจอพ้นส่วน Hero Section ช่วยประหยัดแบตเตอรี่และลดภาระ GPU
  - ล้าง Shaders, Buffers, และ Programs เมื่อ Unmount
- ปรับแต่งการแสดงผลใน [HeroSection.tsx](file:///d:/Intren/portfolio/frontend/src/components/sections/HeroSection.tsx):
  - นำ Shader Canvas วางเป็นพื้นหลัง
  - ปรับสไตล์ตัวหนังสือและปุ่มเป็นโทนสีขาวและ Sky Blue เพื่อให้อ่านง่าย คมชัด (High Contrast)

---

## 2. รายละเอียดการเปลี่ยนแปลง (Changes Summary)
1. **`frontend/src/components/ui/HeroShaderBackground.tsx`**:
   - คอมไพล์ Vertex & Fragment Shaders
   - ส่ง Uniforms: `iResolution`, `iTime`
   - ปรับ DPR สูงสุดที่ 1.5 เท่า เพื่อความลื่นไหล 60 FPS
2. **`frontend/src/components/sections/HeroSection.tsx`**:
   - นำเข้าและวาง `<HeroShaderBackground />` ไว้ในเลเยอร์พื้นหลัง
   - ปรับสีตัวอักษรเป็น `text-white`, `text-slate-200`, `text-slate-300` และปุ่มหลักเป็น Sky Blue

---

## 3. ผลการตรวจสอบ (Verification Results)
- **Turbo Lint**: 0 warnings, 0 errors
- **Turbo Build**: ผ่าน 100% ทั้ง backend และ frontend
