# Google login (admin)

- Frontend: ปุ่ม "Continue with Google" ที่ /admin/login -> Supabase `/auth/v1/authorize?provider=google` -> /admin/auth/callback (อ่าน access_token จาก hash) -> `GET /api/auth/me`.
- Backend: `GET /auth/me`; `AuthGuard` เช็ค allowlist `ADMIN_EMAILS` (ถ้าไม่ตั้ง อนุญาตเฉพาะ provider `email` เดิม) กัน Google user แปลกหน้าเป็นแอดมิน.
- เก็บฟอร์มอีเมล/รหัสผ่านเดิมไว้.
- ต้องตั้งค่า: Google Cloud OAuth client + Supabase provider Google + Redirect URLs + env `ADMIN_EMAILS` บน Railway.
