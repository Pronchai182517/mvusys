# AI Governance & Vibe Coding Rules

## 1. Project Context
- **Name:** mvusys
- **Type:** Web Application (Admin Dashboard)
- **Tech Stack:** React (Vite, TS, Tailwind) + Node.js (Express) + Supabase

## 2. Coding Standards
- **UI/UX:** ใช้ Mobile-first Approach เสมอ (e.g., `flex-col sm:flex-row`, `p-4 sm:p-6`)
- **Tailwind:** หลีกเลี่ยง Custom CSS ให้ใช้ Utility classes ของ Tailwind เป็นหลัก
- **Docker:** เมื่อแก้โค้ดฝั่ง Frontend ต้องแนะนำให้ Build Docker ใหม่เสมอ (`docker compose up -d --build frontend`)

## 3. Security Guardrails
- **NEVER** hardcode real names, emails (e.g., `@mvu.ac.th`), or passwords (e.g., `admin1234`) in source code.
- ALWAYS use generic placeholders like `ผู้ดูแลระบบ (Admin)` or `admin@yourdomain.ac.th`.
- All secrets MUST be in `.env` and ignored in `.gitignore`.

## 4. Communication
- ตอบกลับด้วยภาษาไทยเสมอ
- สรุปสั้นๆ เข้าใจง่าย (Vibe Coding Style)
