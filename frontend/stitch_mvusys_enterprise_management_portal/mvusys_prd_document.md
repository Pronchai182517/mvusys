# Product Requirements Document (PRD): mvusys
ระบบบริหารจัดการองค์กรแบบครบวงจร (mvusys) สำหรับมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
เป้าหมายเพื่อเป็นระบบศูนย์กลาง (Local AI Agent Vibe Coding MVP) ในการจัดการภารกิจ, แผนงาน, มติที่ประชุม, องค์ความรู้, และการจองยานพาหนะ

## User Roles (RBAC)
- admin: ผู้ดูแลระบบสูงสุด
- executive: ดู Dashboard ภาพรวม
- project_lead: จัดการและติดตามโครงการ
- tracking_officer: ติดตามประเมินผล
- vehicle_admin: จัดการและอนุมัติยานพาหนะ

## Core Modules & Features
1. Dashboard ภาพรวมบริหารจัดการ
2. ระบบจัดการภารกิจและติดตามโครงการ (Tasks & Projects)
3. ระบบจองยานพาหนะ (Vehicle Booking & Fleet Dispatch)
4. มติที่ประชุม (Meeting Resolutions) & คลังความรู้ AI Agent (RAG)
5. การจัดการผู้ใช้งาน (User & Role Management)

## Design Reference
- Column.com aesthetics: Ultra-clean, refined typography, crisp architectural borders, subtle warm/cool neutrals, elegant badges, data density with breathing room.
- Platform: Mobile format (~390px portrait) with sleek drawer navigation, tactile cards, clean status tags, and clear Thai typography.