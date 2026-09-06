# Product Requirements Document (PRD): mvusys

## 1. Project Overview & Goals
ระบบบริหารจัดการองค์กรแบบครบวงจร (mvusys) สำหรับมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย 
เป้าหมายเพื่อเป็นระบบศูนย์กลาง (Local AI Agent Vibe Coding MVP) ในการจัดการภารกิจ, แผนงาน, มติที่ประชุม, องค์ความรู้, และการจองยานพาหนะ

## 2. Target Audience (User Roles)
ระบบใช้ Role-Based Access Control (RBAC):
- **admin (ผู้ดูแลระบบสูงสุด):** จัดการสมาชิก, อนุมัติข้อมูล, ดูภาพรวมทั้งหมด
- **executive (ผู้บริหาร):** ดู Dashboard สรุปผล
- **project_lead (เจ้าหน้าที่แผนงาน):** จัดการและติดตามโครงการ
- **tracking_officer (เจ้าหน้าที่ติดตามประเมินผล):** ตรวจสอบความคืบหน้า
- **vehicle_admin (เจ้าหน้าที่ยานพาหนะ):** อนุมัติการจองรถ สรุปคิวรถ

## 3. Core Features
1. **ระบบล็อกอิน (Auth):** SSO ผ่าน Google (Gmail)
2. **Dashboard:** สรุปข้อมูลภาพรวมผู้บริหาร
3. **ระบบจัดการภารกิจ (Tasks):** แบ่งหน้า Pagination
4. **ระบบจองยานพาหนะ (Vehicle Booking):**
   - จองรถตู้, ปิคอัพ, 6 ล้อ
   - บันทึกเลขไมล์เดินทาง
   - อนุมัติโดย vehicle_admin
5. **ระบบบริหารโครงการ (Projects)**
6. **ระบบมติที่ประชุม (Resolutions)**
7. **ฐานความรู้ (Knowledge) & Local AI Agent (RAG)**
8. **ระบบจัดการผู้ใช้ (User Management)**

## 4. Non-functional Requirements
- **Responsive Design:** รองรับ Mobile (Hamburger Menu, Drawer Sidebar)
- **Security:** ไม่ฝัง Password หรือ Token จริงลงใน Source Code
