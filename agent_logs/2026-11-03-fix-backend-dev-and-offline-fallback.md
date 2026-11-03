# บันทึกการทำงาน: 2026-11-03 - การแก้ไขข้อผิดพลาด Fetch Failed และเพิ่ม Offline Fallback

- **วันที่**: 2026-11-03
- **สถานะ**: สำเร็จ (Fixed & Verified)
- **Branch**: `feature/init-portfolio`

---

## 1. สาเหตุของปัญหา (Root Cause)
- ผู้ใช้พบ `TypeError: Failed to fetch for http://localhost:4000/api/certificates/cert-1`
- ใน `backend/package.json` ไม่มี script `"dev"` ทำให้ `npm run dev` (`turbo dev`) รันเฉพาะ frontend service เพียงอย่างเดียว Backend พอร์ต 4000 จึงไม่ได้เริ่มทำงาน

---

## 2. การแก้ไข (Fixes)
1. **Backend Package Script**:
   - เพิ่ม `"dev": "nest start --watch"` ใน `backend/package.json` ทำให้ Turborepo รันทั้ง frontend (3000) และ backend (4000) พร้อมกันในคำสั่งเดียว
2. **Graceful Offline Fallback**:
   - ปรับปรุง `deleteCertificate`, `deleteProject`, `deleteExperience`, `deleteArticle`, และ `deleteContactMessage` ให้มี try/catch ดักจับ network error หาก Backend ยังไม่พร้อม จะปรับปรุงข้อมูลใน Local State บน UI ให้ทันที ไม่เกิด unhandled crash

---

## 3. การทดสอบ (Verification)
- `turbo lint`: ผ่าน 0 warnings, 0 errors
- `turbo build`: ผ่าน 100%
