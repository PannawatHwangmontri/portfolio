# บันทึกการแก้ไข Admin Hydration Mismatch (2026-11-03)

## ปัญหาที่พบ
- ในหน้า `/admin` เกิดข้อผิดพลาด React Hydration Failed:
  `Hydration failed because the server rendered HTML didn't match the client`
- **สาเหตุ**:
  `useState<AdminUser | null>(() => getStoredAdmin())`
  - ฝั่ง Server (SSR): `typeof window === 'undefined'` ทำให้ `getStoredAdmin()` คืนค่า `null` และหน้าเว็บเรนเดอร์ `null` (empty)
  - ฝั่ง Client (Hydration pass): `localStorage.getItem('admin_user')` มีข้อมูล admin อยู่ ทำให้ `user` ถูกกำหนดค่าทันทีและเรนเดอร์ `<div className="...">...</div>`
  - ผลคือ HTML ฝั่ง Server กับ Client ในรอบแรกไม่ตรงกัน

## วิธีการแก้ไข
1. **ใช้ `useSyncExternalStore`**:
   - ปรับการอ่านค่า `localStorage` ผ่าน `useSyncExternalStore` พร้อม hook `useAdminUser()`
   - ฝั่ง Server: คืนค่า `null` ผ่าน `getServerSnapshot`
   - ฝั่ง Client: คืนค่า raw string จาก `localStorage` แล้วใช้ `useMemo` parse เพื่อป้องกัน reference mismatch
   - ดักจับ `storage` event เมื่อมีการล็อกเอาท์
2. **เรนเดอร์ Loading Placeholder สอดคล้องกัน**:
   - เปลี่ยนจาก `if (!user) return null;` เป็น fallback container ที่เหมือนกันทั้งบน Server และ Client
   - ป้องกันอาการ Flash of Unstyled Content (FOUC)
3. **ผลการทดสอบ**:
   - `npm run lint`: ผ่าน 0 warnings/errors (ไม่มีปัญหา `react-hooks/set-state-in-effect`)
   - `npm run build`: ผ่านการ prerender ทุกหน้า `/`, `/admin`, `/admin/login` สะอาด 100%
