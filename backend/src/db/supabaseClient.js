import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://supabase.palithaillm.in.th';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket }
});

// Initial Mock Data Store for Local Fallback & Fast Prototyping
export const mockData = {
  users: [
    { id: 'usr-1', name: 'พระพรชัย วรชโย', role: 'admin', title: 'นักวิชาการคอมพิวเตอร์', department: 'ส่วนงานบริหารองค์กร', email: 'worachayo@mvu.ac.th' },
    { id: 'usr-2', name: 'ผู้บริหาร มหาวชิราลงกรณฯ', role: 'executive', title: 'รองอธิการบดี / ผู้บริหาร', department: 'สำนักงานผู้บริหาร', email: 'exec@mvu.ac.th' },
    { id: 'usr-3', name: 'เจ้าหน้าที่แผนงานและงบประมาณ', role: 'project_lead', title: 'นักวิเคราะห์นโยบายและแผน', department: 'งานแผนและงบประมาณ', email: 'plan@mvu.ac.th' },
    { id: 'usr-4', name: 'เจ้าหน้าที่ติดตามประเมินผล', role: 'tracking_officer', title: 'เจ้าหน้าที่ประกันคุณภาพ', department: 'งานประกันคุณภาพและติดตามผล', email: 'qa@mvu.ac.th' }
  ],
  tasks: [
    {
      id: 1,
      title: 'จัดทำร่างรายงานผลการดำเนินงานประจำไตรมาสที่ 3',
      assignee: 'พระพรชัย วรชโย',
      deadline: '2026-09-15',
      priority: 'High',
      status: 'In Progress',
      evidence: 'https://mvu.ac.th/docs/q3-report-draft.pdf',
      category: 'บริหารงานทั่วไป'
    },
    {
      id: 2,
      title: 'ตรวจสอบระบบเครือข่ายและเครื่องเซิร์ฟเวอร์ Local AI',
      assignee: 'นักวิชาการคอมพิวเตอร์',
      deadline: '2026-09-10',
      priority: 'Urgent',
      status: 'In Progress',
      evidence: 'Log การทดสอบระบบ Ollama + GPU Server',
      category: 'เทคโนโลยีสารสนเทศ'
    },
    {
      id: 3,
      title: 'สรุปมติที่ประชุมสภาวิทยาลัย ครั้งที่ 4/2569',
      assignee: 'เลขานุการการประชุม',
      deadline: '2026-09-08',
      priority: 'Medium',
      status: 'Completed',
      evidence: 'รายงานการประชุมฉบับลงนาม',
      category: 'งานสารบรรณและประชุม'
    },
    {
      id: 4,
      title: 'ตรวจสอบเอกสารหลักฐานประกันคุณภาพการศึกษา (องค์ประกอบที่ 2)',
      assignee: 'เจ้าหน้าที่ประกันคุณภาพ',
      deadline: '2026-09-20',
      priority: 'Medium',
      status: 'In Progress',
      evidence: 'ไฟล์ประเมินตนเอง SAR_2569.pdf',
      category: 'ประกันคุณภาพ'
    },
    {
      id: 5,
      title: 'จัดทำคู่มือการใช้งาน Local AI Agent สำหรับบุคลากร',
      assignee: 'พระพรชัย วรชโย',
      deadline: '2026-09-05',
      priority: 'High',
      status: 'Delayed',
      evidence: 'อยู่ระหว่างทดสอบระบบ Vibe Coding Prototype',
      category: 'เทคโนโลยีสารสนเทศ'
    }
  ],
  projects: [
    {
      id: 1,
      name: 'โครงการพัฒนาระบบ Local AI Agent เพื่อการบริหารจัดการหน่วยงาน',
      objective: 'เพื่อนำเทคโนโลยี Generative AI แบบควบคุมข้อมูลภายในมาช่วยสืบค้น สรุป และสนับสนุนการตัดสินใจของผู้บริหาร',
      budget: 150000,
      progress: 65,
      status: 'On Track',
      owner: 'พระพรชัย วรชโย',
      kpis: '1. Web App Full Stack ใช้งานได้จริง 2. เชื่อมต่อ Local AI RAG ได้สำเร็จ 3. ลดเวลาจัดทำรายงาน 50%',
      obstacles: 'การเตรียมเครื่อง Server GPU สำหรับประมวลผลข้อมูลขนาดใหญ่ภายใน',
      start_date: '2026-08-01',
      end_date: '2026-10-31'
    },
    {
      id: 2,
      name: 'โครงการปรับปรุงและจัดทำระบบฐานความรู้ดิจิทัล มหาวชิราลงกรณบาลีเถรวาทฯ',
      objective: 'รวบรวมระเบียบ คำสั่ง มติสภา และคู่มือปฏิบัติงานเข้าสู่คลังข้อมูลดิจิทัลที่ค้นหาได้รวดเร็ว',
      budget: 80000,
      progress: 40,
      status: 'At Risk',
      owner: 'งานแผนและงบประมาณ',
      kpis: 'เอกสารเข้าสู่ระบบไม่น้อยกว่า 500 ฉบับ',
      obstacles: 'เอกสารเก่าบางส่วนยังไม่ได้แปลงเป็น PDF ที่เป็น Text Searchable',
      start_date: '2026-07-15',
      end_date: '2026-09-30'
    },
    {
      id: 3,
      name: 'โครงการอบรมเชิงปฏิบัติการพัฒนาบุคลากรด้าน AI Vibe Coding',
      objective: 'เสริมสร้างทักษะการประยุกต์ใช้ AI Studio และ Vibe Coding ให้บุคลากรสายสนับสนุน',
      budget: 50000,
      progress: 90,
      status: 'Completed',
      owner: 'นักวิชาการคอมพิวเตอร์',
      kpis: 'บุคลากรผ่านการอบรมอย่างน้อย 20 รูป/คน',
      obstacles: 'ไม่มี',
      start_date: '2026-08-15',
      end_date: '2026-09-02'
    }
  ],
  resolutions: [
    {
      id: 1,
      title: 'อนุมัติแนวทางการใช้ AI ช่วยงานบริหารภายในโดยห้ามนำข้อมูลลับส่ง AI ภายนอก',
      meeting_no: 'ครั้งที่ 3/2569',
      meeting_date: '2026-07-20',
      assignee: 'พระพรชัย วรชโย (นักวิชาการคอมพิวเตอร์)',
      deadline: '2026-08-31',
      status: 'Completed',
      details: 'ให้จัดหาโครงสร้างพื้นฐาน Local AI หรือควบคุมด้วยมาตรการความปลอดภัยข้อมูลของหน่วยงาน'
    },
    {
      id: 2,
      title: 'มอบหมายจัดทำระบบติดตามมติที่ประชุมและภารกิจแบบเรียลไทม์',
      meeting_no: 'ครั้งที่ 4/2569',
      meeting_date: '2026-08-25',
      assignee: 'งานแผนและงบประมาณ & ศูนย์คอมพิวเตอร์',
      deadline: '2026-09-15',
      status: 'In Progress',
      details: 'พัฒนาแดชบอร์ดสรุปภาพรวมโครงการ มติที่ต้องติดตาม และประเด็นความเสี่ยง'
    },
    {
      id: 3,
      title: 'กำหนดเกณฑ์ตรวจสอบความครบถ้วนของเอกสารหลักฐานโครงการก่อนอนุมัติงบ',
      meeting_no: 'ครั้งที่ 4/2569',
      meeting_date: '2026-08-25',
      assignee: 'เจ้าหน้าที่การเงินและพัสดุ',
      deadline: '2026-09-30',
      status: 'Pending',
      details: 'จัดทำ Checklists เอกสารตามระเบียบพัสดุและระเบียบการเงินใหม่'
    }
  ],
  knowledge_base: [
    {
      id: 1,
      title: 'ข้อบังคับมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ว่าด้วยการบริหารงานภายใน พ.ศ. 2568',
      category: 'ระเบียบ',
      file_type: 'PDF',
      source: 'สำนักงานสภาวิทยาลัย',
      content: 'กำหนดโครงสร้าง อำนาจหน้าที่ และการกำกับดูแลงานบริหาร มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย โดยให้มีระบบติดตามและประเมินผลการดำเนินงานอย่างเป็นระบบ',
      tags: 'ระเบียบ, บริหารงาน, สภาวิทยาลัย'
    },
    {
      id: 2,
      title: 'ประกาศแนวปฏิบัติการคุ้มครองข้อมูลส่วนบุคคลและความปลอดภัยด้าน AI',
      category: 'คำสั่ง',
      file_type: 'PDF',
      source: 'ศูนย์สารสนเทศ',
      content: 'ห้ามส่งข้อมูลนักศึกษา ข้อมูลบุคลากร ข้อมูลการเงิน และมติที่ประชุมที่เป็นลับเข้าสู่ AI Cloud ภายนอกที่ไม่ได้รับอนุญาต ให้ใช้ Local AI Agent หรือ Sandbox ที่ปลอดภัยเท่านั้น',
      tags: 'คำสั่ง, AI, PDPA, ความปลอดภัย'
    },
    {
      id: 3,
      title: 'รายงานการประชุมคณะกรรมการบริหารวิทยาลัย ครั้งที่ 4/2569',
      category: 'รายงานการประชุม',
      file_type: 'PDF',
      source: 'งานเลขานุการการประชุม',
      content: 'ที่ประชุมมีมติเห็นชอบโครงการ Local AI Agent สำหรับการบริหารหน่วยงาน และมอบหมายให้นักวิชาการคอมพิวเตอร์ดำเนินการเร่งรัดระบบ MVP ให้แล้วเสร็จภายในเดือนกุมภาพันธ์',
      tags: 'มติที่ประชุม, AI Agent, MVP'
    },
    {
      id: 4,
      title: 'คู่มือขั้นตอนการขออนุมัติโครงการและเบิกจ่ายงบประมาณ',
      category: 'คู่มือ',
      file_type: 'DOCX',
      source: 'งานการเงินและพัสดุ',
      content: 'อธิบายขั้นตอน 5 ขั้นตอนในการเสนอโครงการ การขออนุมัติหลักการ การจัดซื้อจัดจ้าง การแนบหลักฐาน และการเสนอรายงานสรุปผลหลังเสร็จสิ้นโครงการ',
      tags: 'คู่มือ, งบประมาณ, พัสดุ'
    }
  ]
};
