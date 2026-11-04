# บันทึกการ Deploy: Deploy Backend สู่ Railway และเชื่อมต่อ Vercel Frontend (2026-11-04)

**วันที่:** 2026-11-04  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** Backend Infrastructure & Production Deployment  

---

## 1. การดำเนินการบน Railway
1. **สร้าง Project & Service:**
   - Project: `portfolio-backend` (`59bcb9e0-3af8-415c-bffe-49743d7f3703`) ใน Workspace `Pannawat's Projects`
   - Service: `portfolio-backend-service` (`fe7f72ff-3332-46f6-8e0b-45190c9ad3b0`)
   - GitHub Source: `PannawatHwangmontri/portfolio` (Branch: `main`)
2. **การตั้งค่า Monorepo:**
   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Start Command: `npm run start:prod`
3. **Environment Variables เริ่มต้นบน Railway:**
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://portfolio-pannawat.vercel.app`
4. **Public Domain:**
   - Live URL: [https://portfolio-backend-service-production-08f6.up.railway.app](https://portfolio-backend-service-production-08f6.up.railway.app)
   - สถานะ: `SUCCESS` (HTTP 200 OK ที่ `/api/profile`)

---

## 2. การเชื่อมโยง Vercel Frontend
- เพิ่ม Environment Variable บน Vercel Project `portfolio-pannawat`:
  - `NEXT_PUBLIC_API_URL`: `https://portfolio-backend-service-production-08f6.up.railway.app`
- Trigger Redeploy บน Vercel Production สำเร็จ (`READY`) ที่ [https://portfolio-pannawat.vercel.app](https://portfolio-pannawat.vercel.app)
