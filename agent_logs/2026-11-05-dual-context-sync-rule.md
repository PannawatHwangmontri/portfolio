# บันทึกการเพิ่มกฎ: Dual Context Sync Rule ระหว่าง GEMINI.md และ CLAUDE.md (2026-11-05)

**วันที่:** 2026-11-05  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** AI Governance & Multi-Agent Context Synchronization  

---

## 1. รายละเอียดความต้องการ (Requirements)
- จัดการให้ Claude Code อ่าน `AGENT.md` ร่วมด้วย โดยเพิ่มการอ้างอิง `@AGENT.md` ไว้ที่ส่วนหัวของ `CLAUDE.md`
- เพิ่มกฎเหล็ก **"การซิงก์คู่ขนาน (Dual Context Sync Rule)"** ระบุว่า:
  - หากมีการเปลี่ยนแปลงหรือแก้ไขเนื้อหาใน `GEMINI.md` หรือ `CLAUDE.md` จะต้องอัปเดตและเปลี่ยนแปลงทั้ง 2 ไฟล์นี้ให้สอดคล้องกันเสมอในบริบทของตัวเอง

---

## 2. การดำเนินการ (Implementation)
1. **อัปเดต `AGENT.md`:**
   - เพิ่มกฎข้อที่ 3 ในหมวด 2: การซิงก์คู่ขนานระหว่าง `GEMINI.md` และ `CLAUDE.md`
2. **อัปเดต `GEMINI.md`:**
   - เพิ่ม `CLAUDE.md` ลงในโครงสร้างไฟล์ไดเรกทอรี
   - เพิ่มกฎเหล็กข้อ 6: Dual Context Sync Rule
3. **อัปเดต `CLAUDE.md`:**
   - เพิ่ม `@AGENT.md` ไว้ที่บรรทัดแรกสุด เพื่อให้ Claude Code นำเข้ากฎทั้งหมดจาก `AGENT.md` อัตโนมัติทุกครั้งที่สั่งงาน
   - เพิ่มกฎเหล็กข้อ 7: Dual Context Sync Rule กับ `GEMINI.md`
