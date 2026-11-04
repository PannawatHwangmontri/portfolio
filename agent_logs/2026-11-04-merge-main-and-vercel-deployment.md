# บันทึกการ Deploy: Merge เข้า main และ Deploy สู่ Vercel (2026-11-04)

**วันที่:** 2026-11-04  
**ผู้รับผิดชอบ:** Pannawat Hwangmontri & Antigravity Agent  
**ประเภทงาน:** Release & Deployment  

---

## 1. การดำเนินการ Git & GitHub
1. **Commit การเปลี่ยนแปลง:**
   - รวมการ Redesign สไตล์ 11x, ระบบ Admin CMS (About, Skills Full CRUD, Contact Info), การจัดการ Auth Token Expiry (401 Auto-logout/Redirect) และสคริปต์ Playwright E2E
   - Commit SHA: `63e6ab0`
2. **Merge & Push:**
   - Fast-forward merge branch `feature/init-portfolio` เข้า branch `main`
   - Push ทั้ง `main` และ `feature/init-portfolio` สู่ GitHub Remote (`origin`) สำเร็จ

---

## 2. การ Deploy สู่ Vercel
1. **สร้าง Project บน Vercel:**
   - Project Name: `portfolio-pannawat` (ID: `prj_lRgwV1Z4uuGL8NgImJAQOqLNP3io`)
   - Framework: `Next.js`
   - Root Directory: `frontend`
   - Linked Repository: `PannawatHwangmontri/portfolio` (Branch: `main`)
2. **สถานะการ Deploy:**
   - Deployment ID: `dpl_9HApiduqFELcrb9UPuoZKFnuTWX8`
   - สถานะ: `READY` (HTTP 200 OK)
   - Live URL: [https://portfolio-pannawat.vercel.app](https://portfolio-pannawat.vercel.app)
