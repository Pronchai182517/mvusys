# Local AI Agent for Mahaajiralongkorn Pali Theravada Rajavidyalaya Administration (mvusys)

ระบบบริหารงานและ Local AI Agent สำหรับมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย

---

## 🌟 คุณสมบัติเด่นของระบบ (Features)

1. **📊 Executive Dashboard (แดชบอร์ดภาพรวมผู้บริหาร)**
   - แสดงสถิติโครงการ, ภารกิจ, มติที่ประชุมสภาวิทยาลัย, งบประมาณรวม และความก้าวหน้าเฉลี่ย (%)
   - แสดงกราฟแนวโน้มความก้าวหน้าและสัดส่วนสถานะโครงการด้วย Recharts
   - รวบรวมภารกิจเร่งด่วน/ล่าช้า และประเด็นความเสี่ยงโครงการเพื่อให้ผู้บริหารติดตามได้ทันที

2. **📋 Tasks & Assignments Management (ระบบบริหารภารกิจและงานที่ได้รับมอบหมาย)**
   - ติดตามงาน กำหนดผู้รับผิดชอบ (Assignees) วันส่งงาน (Deadline) ระดับความเร่งด่วน (Priority)
   - บันทึกและแสดงหลักฐานการดำเนินงาน (Evidence) พร้อมการอัปเดตสถานะ

3. **🚀 Projects & Action Plans Management (ระบบบริหารแผนงานและโครงการ)**
   - บริหารโครงการ ติดตามวัตถุประสงค์ (Objectives), งบประมาณ (Budget), ตัวชี้วัด (KPIs), และปัญหาอุปสรรค (Obstacles)
   - ปรับระดับความก้าวหน้าโครงการ (Progress Slider %) และเปลี่ยนสถานะโดยอัตโนมัติ

4. **📜 Meeting Resolutions Tracking (ระบบบันทึกและติดตามมติที่ประชุม)**
   - บันทึกมติที่ประชุมสภา/คณะกรรมการ เชื่อมโยงครั้งที่ประชุม วันที่ ผู้รับผิดชอบ และกำหนดเวลาส่งงาน

5. **📚 Internal Knowledge Base (คลังเอกสารและฐานความรู้ภายใน)**
   - จัดเก็บระเบียบ คำสั่ง รายงานการประชุม คู่มือปฏิบัติงาน และแบบฟอร์ม
   - รองรับระบบค้นหาข้อความ และทำงานเป็นคลังข้อมูลต้นทางสำหรับ Local AI Agent

6. **🤖 Local AI Agent RAG Assistant (ผู้ช่วยปัญญาประดิษฐ์ประมวลผลภายใน)**
   - ระบบ RAG (Retrieval-Augmented Generation) ค้นหาข้อมูลเชิงบริบทจากคลังเอกสาร มติ และโครงการ
   - ร่างรายงานสรุปผลการบริหารงานสำหรับผู้บริหาร (Executive Report Generation) พร้อมแสดงแหล่งอ้างอิงข้อมูล (Citations)
   - ทำงานบนโครงสร้างข้อมูลภายใน ปลอดภัยตามมาตรการคุ้มครองข้อมูลส่วนบุคคล (PDPA/AI Security)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, Lucide Icons, Recharts, Nginx
- **Backend**: Node.js, Express, RESTful API Services
- **Database**: PostgreSQL / Supabase Client (`https://supabase.palithaillm.in.th`) + Local Data Store Fallback
- **Containerization**: Docker & Docker Compose (Multi-stage builds)
- **Network / Hosting**: Cloudflare Tunnel + Local Server IP (`192.168.1.57`)

---

## 🐳 วิธีการรันโปรเจกต์ด้วย Docker (Recommended)

```bash
cd /home/iamvj/workspace/antigravity-ide/projects/mvusys

# สร้างและสั่งรัน Container ในแบบ Background
docker compose up -d --build
```
- **Frontend App & API Proxy**: เข้าใช้งานได้ที่ `http://192.168.1.57:3000` หรือผ่าน Cloudflare Tunnel

---

## 🔄 การตั้งค่าให้ระบบทำงานอัตโนมัติเมื่อรีบูทเครื่อง (Autostart on Reboot)

ในไฟล์ `docker-compose.yml` ได้กำหนด `restart: unless-stopped` ไว้เรียบร้อยแล้ว ดังนั้นเมื่อเครื่องรีบูทและบริการ Docker ทำงานขึ้นมา คอนเทนเนอร์ระบบ `mvusys` จะถูกสั่งรันขึ้นมาอัตโนมัติทันที

นอกจากนี้ คุณสามารถเปิดใช้งาน **Systemd Service** เพิ่มเติมได้ด้วยสคริปต์อัตโนมัติ:

```bash
cd /home/iamvj/workspace/antigravity-ide/projects/mvusys
sudo bash setup-autostart.sh
```

---

## 🌐 การตั้งค่าร่วมกับ Cloudflare Tunnel

ระบบถูกปรับจูนให้รองรับ Cloudflare Tunnel โดย Nginx ภายใน Frontend Container จะทำหน้าที่เป็น Reverse Proxy ส่งต่อคำสั่ง `/api/*` ไปยัง Backend Container โดยอัตโนมัติ

### ขั้นตอนตั้งค่าบน Cloudflare Zero Trust Dashboard:
1. ไปที่ **Networks** -> **Tunnels** -> เลือกลิงก์ Tunnel ของคุณ
2. เพิ่ม **Public Hostname**:
   - **Subdomain / Domain**: เช่น `mvusys.palithaillm.in.th` (หรือโดเมนของคุณ)
   - **Service Type**: `HTTP`
   - **URL**: `192.168.1.57:3000` (หรือ `localhost:3000` บนเครื่อง Host)
