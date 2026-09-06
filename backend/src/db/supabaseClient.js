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
// Expanded to 80 highly realistic items (20 per section) for deep analysis and RAG testing
export const mockData = {
  users: [
    {
        "id": "usr-1",
        "name": "พระพรชัย วรชโย (Admin)",
        "role": "admin",
        "title": "ผู้ดูแลระบบสูงสุด",
        "department": "ส่วนงานบริหารองค์กร",
        "email": "admin@mvu.ac.th",
        "status": "Active",
        "access_scope": "all",
        "allowed_departments": [
            "งานแผนและงบประมาณ",
            "ส่วนงานบริหารองค์กร",
            "สำนักงานผู้บริหาร",
            "งานประกันคุณภาพและติดตามผล",
            "งานสารบรรณและประชุม",
            "ศูนย์เทคโนโลยีสารสนเทศ",
            "งานการเงินและพัสดุ",
            "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
            "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
            "คณะพุทธศาสตร์",
            "คณะครุศาสตร์",
            "คณะมนุษยศาสตร์",
            "คณะสังคมศาสตร์",
            "บัณฑิตวิทยาลัย",
            "สถาบันวิจัยพุทธศาสตร์",
            "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
        ]
    },
    {
        "id": "usr-2",
        "name": "เจ้าหน้าที่ งานแผนและงบประมาณ ท่านที่ 1",
        "role": "project_lead",
        "title": "บุคลากรทั่วไป",
        "department": "งานแผนและงบประมาณ",
        "email": "staff2@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานแผนและงบประมาณ"
        ]
    },
    {
        "id": "usr-3",
        "name": "เจ้าหน้าที่ งานแผนและงบประมาณ ท่านที่ 2",
        "role": "project_lead",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "งานแผนและงบประมาณ",
        "email": "staff3@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานแผนและงบประมาณ"
        ]
    },
    {
        "id": "usr-4",
        "name": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "ส่วนงานบริหารองค์กร",
        "email": "staff4@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "ส่วนงานบริหารองค์กร"
        ]
    },
    {
        "id": "usr-5",
        "name": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "ส่วนงานบริหารองค์กร",
        "email": "staff5@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "ส่วนงานบริหารองค์กร"
        ]
    },
    {
        "id": "usr-6",
        "name": "เจ้าหน้าที่ สำนักงานผู้บริหาร ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "สำนักงานผู้บริหาร",
        "email": "staff6@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "สำนักงานผู้บริหาร"
        ]
    },
    {
        "id": "usr-7",
        "name": "เจ้าหน้าที่ สำนักงานผู้บริหาร ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "สำนักงานผู้บริหาร",
        "email": "staff7@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "สำนักงานผู้บริหาร"
        ]
    },
    {
        "id": "usr-8",
        "name": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล ท่านที่ 1",
        "role": "tracking_officer",
        "title": "บุคลากรทั่วไป",
        "department": "งานประกันคุณภาพและติดตามผล",
        "email": "staff8@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานประกันคุณภาพและติดตามผล"
        ]
    },
    {
        "id": "usr-9",
        "name": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล ท่านที่ 2",
        "role": "tracking_officer",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "งานประกันคุณภาพและติดตามผล",
        "email": "staff9@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานประกันคุณภาพและติดตามผล"
        ]
    },
    {
        "id": "usr-10",
        "name": "เจ้าหน้าที่ งานสารบรรณและประชุม ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "งานสารบรรณและประชุม",
        "email": "staff10@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานสารบรรณและประชุม"
        ]
    },
    {
        "id": "usr-11",
        "name": "เจ้าหน้าที่ งานสารบรรณและประชุม ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "งานสารบรรณและประชุม",
        "email": "staff11@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานสารบรรณและประชุม"
        ]
    },
    {
        "id": "usr-12",
        "name": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "ศูนย์เทคโนโลยีสารสนเทศ",
        "email": "staff12@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "ศูนย์เทคโนโลยีสารสนเทศ"
        ]
    },
    {
        "id": "usr-13",
        "name": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "ศูนย์เทคโนโลยีสารสนเทศ",
        "email": "staff13@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "ศูนย์เทคโนโลยีสารสนเทศ"
        ]
    },
    {
        "id": "usr-14",
        "name": "เจ้าหน้าที่ งานการเงินและพัสดุ ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "งานการเงินและพัสดุ",
        "email": "staff14@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานการเงินและพัสดุ"
        ]
    },
    {
        "id": "usr-15",
        "name": "เจ้าหน้าที่ งานการเงินและพัสดุ ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "งานการเงินและพัสดุ",
        "email": "staff15@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "งานการเงินและพัสดุ"
        ]
    },
    {
        "id": "usr-16",
        "name": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง) ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
        "email": "staff16@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
        ]
    },
    {
        "id": "usr-17",
        "name": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง) ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
        "email": "staff17@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
        ]
    },
    {
        "id": "usr-18",
        "name": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
        "email": "staff18@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
        ]
    },
    {
        "id": "usr-19",
        "name": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
        "email": "staff19@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
        ]
    },
    {
        "id": "usr-20",
        "name": "เจ้าหน้าที่ คณะพุทธศาสตร์ ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "คณะพุทธศาสตร์",
        "email": "staff20@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะพุทธศาสตร์"
        ]
    },
    {
        "id": "usr-21",
        "name": "เจ้าหน้าที่ คณะพุทธศาสตร์ ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "คณะพุทธศาสตร์",
        "email": "staff21@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะพุทธศาสตร์"
        ]
    },
    {
        "id": "usr-22",
        "name": "เจ้าหน้าที่ คณะครุศาสตร์ ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "คณะครุศาสตร์",
        "email": "staff22@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะครุศาสตร์"
        ]
    },
    {
        "id": "usr-23",
        "name": "เจ้าหน้าที่ คณะครุศาสตร์ ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "คณะครุศาสตร์",
        "email": "staff23@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะครุศาสตร์"
        ]
    },
    {
        "id": "usr-24",
        "name": "เจ้าหน้าที่ คณะมนุษยศาสตร์ ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "คณะมนุษยศาสตร์",
        "email": "staff24@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะมนุษยศาสตร์"
        ]
    },
    {
        "id": "usr-25",
        "name": "เจ้าหน้าที่ คณะมนุษยศาสตร์ ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "คณะมนุษยศาสตร์",
        "email": "staff25@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะมนุษยศาสตร์"
        ]
    },
    {
        "id": "usr-26",
        "name": "เจ้าหน้าที่ คณะสังคมศาสตร์ ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "คณะสังคมศาสตร์",
        "email": "staff26@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะสังคมศาสตร์"
        ]
    },
    {
        "id": "usr-27",
        "name": "เจ้าหน้าที่ คณะสังคมศาสตร์ ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "คณะสังคมศาสตร์",
        "email": "staff27@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "คณะสังคมศาสตร์"
        ]
    },
    {
        "id": "usr-28",
        "name": "เจ้าหน้าที่ บัณฑิตวิทยาลัย ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "บัณฑิตวิทยาลัย",
        "email": "staff28@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "บัณฑิตวิทยาลัย"
        ]
    },
    {
        "id": "usr-29",
        "name": "เจ้าหน้าที่ บัณฑิตวิทยาลัย ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "บัณฑิตวิทยาลัย",
        "email": "staff29@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "บัณฑิตวิทยาลัย"
        ]
    },
    {
        "id": "usr-30",
        "name": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์ ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "สถาบันวิจัยพุทธศาสตร์",
        "email": "staff30@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "สถาบันวิจัยพุทธศาสตร์"
        ]
    },
    {
        "id": "usr-31",
        "name": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์ ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "สถาบันวิจัยพุทธศาสตร์",
        "email": "staff31@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "สถาบันวิจัยพุทธศาสตร์"
        ]
    },
    {
        "id": "usr-32",
        "name": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม ท่านที่ 1",
        "role": "executive",
        "title": "บุคลากรทั่วไป",
        "department": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
        "email": "staff32@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
        ]
    },
    {
        "id": "usr-33",
        "name": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม ท่านที่ 2",
        "role": "executive",
        "title": "เจ้าหน้าที่ปฏิบัติการ",
        "department": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
        "email": "staff33@mvu.ac.th",
        "status": "Active",
        "access_scope": "department_only",
        "allowed_departments": [
            "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
        ]
    }
],
  tasks: [
  {
    "id": 1,
    "title": "งานที่ 1 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-01",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 2,
    "title": "งานที่ 2 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-24",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 3,
    "title": "งานที่ 3 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-02",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 4,
    "title": "งานที่ 4 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-12",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_4.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 5,
    "title": "งานที่ 5 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-27",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 6,
    "title": "งานที่ 6 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-14",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_6.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 7,
    "title": "งานที่ 7 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-15",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_7.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 8,
    "title": "งานที่ 8 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-17",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 9,
    "title": "งานที่ 9 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-08",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_9.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 10,
    "title": "งานที่ 10 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-20",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_10.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 11,
    "title": "งานที่ 11 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-17",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_11.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 12,
    "title": "งานที่ 12 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-21",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_12.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 13,
    "title": "งานที่ 13 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-18",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 14,
    "title": "งานที่ 14 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-23",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 15,
    "title": "งานที่ 15 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-26",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_15.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 16,
    "title": "งานที่ 16 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-26",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_16.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 17,
    "title": "งานที่ 17 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-03",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 18,
    "title": "งานที่ 18 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-11",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_18.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 19,
    "title": "งานที่ 19 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-27",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_19.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 20,
    "title": "งานที่ 20 ของ งานแผนและงบประมาณ",
    "assignee": "เจ้าหน้าที่ งานแผนและงบประมาณ",
    "deadline": "2026-10-21",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานแผนและงบประมาณ_task_20.pdf",
    "category": "งานแผนและงบประมาณ"
  },
  {
    "id": 21,
    "title": "งานที่ 1 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-27",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/ส่วนงานบริหารองค์กร_task_1.pdf",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 22,
    "title": "งานที่ 2 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-04",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 23,
    "title": "งานที่ 3 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-13",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 24,
    "title": "งานที่ 4 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-18",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 25,
    "title": "งานที่ 5 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-06",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/ส่วนงานบริหารองค์กร_task_5.pdf",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 26,
    "title": "งานที่ 6 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-13",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 27,
    "title": "งานที่ 7 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-24",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 28,
    "title": "งานที่ 8 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-17",
    "priority": "Low",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/ส่วนงานบริหารองค์กร_task_8.pdf",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 29,
    "title": "งานที่ 9 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-08",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 30,
    "title": "งานที่ 10 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-27",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 31,
    "title": "งานที่ 11 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-22",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/ส่วนงานบริหารองค์กร_task_11.pdf",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 32,
    "title": "งานที่ 12 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-19",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 33,
    "title": "งานที่ 13 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-21",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/ส่วนงานบริหารองค์กร_task_13.pdf",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 34,
    "title": "งานที่ 14 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-19",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 35,
    "title": "งานที่ 15 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-15",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/ส่วนงานบริหารองค์กร_task_15.pdf",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 36,
    "title": "งานที่ 16 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-16",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 37,
    "title": "งานที่ 17 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-27",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 38,
    "title": "งานที่ 18 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-24",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 39,
    "title": "งานที่ 19 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-21",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 40,
    "title": "งานที่ 20 ของ ส่วนงานบริหารองค์กร",
    "assignee": "เจ้าหน้าที่ ส่วนงานบริหารองค์กร",
    "deadline": "2026-10-24",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/ส่วนงานบริหารองค์กร_task_20.pdf",
    "category": "ส่วนงานบริหารองค์กร"
  },
  {
    "id": 41,
    "title": "งานที่ 1 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-17",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 42,
    "title": "งานที่ 2 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-04",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 43,
    "title": "งานที่ 3 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-12",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 44,
    "title": "งานที่ 4 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-24",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_4.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 45,
    "title": "งานที่ 5 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-02",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_5.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 46,
    "title": "งานที่ 6 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-12",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_6.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 47,
    "title": "งานที่ 7 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-24",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_7.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 48,
    "title": "งานที่ 8 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-08",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 49,
    "title": "งานที่ 9 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-13",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 50,
    "title": "งานที่ 10 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-07",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 51,
    "title": "งานที่ 11 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-15",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 52,
    "title": "งานที่ 12 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-20",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_12.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 53,
    "title": "งานที่ 13 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-15",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_13.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 54,
    "title": "งานที่ 14 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-27",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 55,
    "title": "งานที่ 15 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-09",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 56,
    "title": "งานที่ 16 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-26",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 57,
    "title": "งานที่ 17 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-24",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_17.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 58,
    "title": "งานที่ 18 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-10",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 59,
    "title": "งานที่ 19 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-11",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_19.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 60,
    "title": "งานที่ 20 ของ สำนักงานผู้บริหาร",
    "assignee": "เจ้าหน้าที่ สำนักงานผู้บริหาร",
    "deadline": "2026-10-10",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สำนักงานผู้บริหาร_task_20.pdf",
    "category": "สำนักงานผู้บริหาร"
  },
  {
    "id": 61,
    "title": "งานที่ 1 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-10",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 62,
    "title": "งานที่ 2 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-05",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 63,
    "title": "งานที่ 3 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-15",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 64,
    "title": "งานที่ 4 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-27",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 65,
    "title": "งานที่ 5 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-25",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 66,
    "title": "งานที่ 6 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-03",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานประกันคุณภาพและติดตามผล_task_6.pdf",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 67,
    "title": "งานที่ 7 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-23",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 68,
    "title": "งานที่ 8 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-28",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานประกันคุณภาพและติดตามผล_task_8.pdf",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 69,
    "title": "งานที่ 9 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-23",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 70,
    "title": "งานที่ 10 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-26",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 71,
    "title": "งานที่ 11 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-10",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานประกันคุณภาพและติดตามผล_task_11.pdf",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 72,
    "title": "งานที่ 12 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-05",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 73,
    "title": "งานที่ 13 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-14",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานประกันคุณภาพและติดตามผล_task_13.pdf",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 74,
    "title": "งานที่ 14 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-25",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 75,
    "title": "งานที่ 15 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-11",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/งานประกันคุณภาพและติดตามผล_task_15.pdf",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 76,
    "title": "งานที่ 16 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-16",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 77,
    "title": "งานที่ 17 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-23",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/งานประกันคุณภาพและติดตามผล_task_17.pdf",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 78,
    "title": "งานที่ 18 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-27",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 79,
    "title": "งานที่ 19 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-10",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานประกันคุณภาพและติดตามผล_task_19.pdf",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 80,
    "title": "งานที่ 20 ของ งานประกันคุณภาพและติดตามผล",
    "assignee": "เจ้าหน้าที่ งานประกันคุณภาพและติดตามผล",
    "deadline": "2026-10-27",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "งานประกันคุณภาพและติดตามผล"
  },
  {
    "id": 81,
    "title": "งานที่ 1 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-07",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 82,
    "title": "งานที่ 2 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-28",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 83,
    "title": "งานที่ 3 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-05",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_3.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 84,
    "title": "งานที่ 4 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-15",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 85,
    "title": "งานที่ 5 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-02",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_5.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 86,
    "title": "งานที่ 6 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-14",
    "priority": "High",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_6.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 87,
    "title": "งานที่ 7 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-04",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_7.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 88,
    "title": "งานที่ 8 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-24",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_8.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 89,
    "title": "งานที่ 9 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-12",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 90,
    "title": "งานที่ 10 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-20",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_10.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 91,
    "title": "งานที่ 11 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-05",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_11.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 92,
    "title": "งานที่ 12 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-04",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_12.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 93,
    "title": "งานที่ 13 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-07",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 94,
    "title": "งานที่ 14 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-02",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_14.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 95,
    "title": "งานที่ 15 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-13",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_15.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 96,
    "title": "งานที่ 16 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-10",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_16.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 97,
    "title": "งานที่ 17 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-09",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 98,
    "title": "งานที่ 18 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-11",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 99,
    "title": "งานที่ 19 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-06",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 100,
    "title": "งานที่ 20 ของ งานสารบรรณและประชุม",
    "assignee": "เจ้าหน้าที่ งานสารบรรณและประชุม",
    "deadline": "2026-10-21",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานสารบรรณและประชุม_task_20.pdf",
    "category": "งานสารบรรณและประชุม"
  },
  {
    "id": 101,
    "title": "งานที่ 1 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-28",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 102,
    "title": "งานที่ 2 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-14",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 103,
    "title": "งานที่ 3 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-04",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 104,
    "title": "งานที่ 4 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-01",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 105,
    "title": "งานที่ 5 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-28",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 106,
    "title": "งานที่ 6 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-17",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_6.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 107,
    "title": "งานที่ 7 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-08",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_7.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 108,
    "title": "งานที่ 8 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-15",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 109,
    "title": "งานที่ 9 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-25",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_9.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 110,
    "title": "งานที่ 10 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-28",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 111,
    "title": "งานที่ 11 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-07",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_11.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 112,
    "title": "งานที่ 12 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-28",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_12.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 113,
    "title": "งานที่ 13 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-05",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 114,
    "title": "งานที่ 14 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-25",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_14.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 115,
    "title": "งานที่ 15 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-16",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_15.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 116,
    "title": "งานที่ 16 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-21",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_16.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 117,
    "title": "งานที่ 17 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-11",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_17.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 118,
    "title": "งานที่ 18 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-07",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 119,
    "title": "งานที่ 19 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-24",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/ศูนย์เทคโนโลยีสารสนเทศ_task_19.pdf",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 120,
    "title": "งานที่ 20 ของ ศูนย์เทคโนโลยีสารสนเทศ",
    "assignee": "เจ้าหน้าที่ ศูนย์เทคโนโลยีสารสนเทศ",
    "deadline": "2026-10-15",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "ศูนย์เทคโนโลยีสารสนเทศ"
  },
  {
    "id": 121,
    "title": "งานที่ 1 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-02",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_1.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 122,
    "title": "งานที่ 2 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-18",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_2.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 123,
    "title": "งานที่ 3 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-18",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_3.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 124,
    "title": "งานที่ 4 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-09",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 125,
    "title": "งานที่ 5 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-10",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 126,
    "title": "งานที่ 6 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-05",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_6.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 127,
    "title": "งานที่ 7 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-03",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 128,
    "title": "งานที่ 8 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-12",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 129,
    "title": "งานที่ 9 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-17",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_9.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 130,
    "title": "งานที่ 10 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-01",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 131,
    "title": "งานที่ 11 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-18",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_11.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 132,
    "title": "งานที่ 12 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-11",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_12.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 133,
    "title": "งานที่ 13 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-21",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 134,
    "title": "งานที่ 14 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-28",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 135,
    "title": "งานที่ 15 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-08",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 136,
    "title": "งานที่ 16 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-10",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_16.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 137,
    "title": "งานที่ 17 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-08",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_17.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 138,
    "title": "งานที่ 18 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-16",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 139,
    "title": "งานที่ 19 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-13",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 140,
    "title": "งานที่ 20 ของ งานการเงินและพัสดุ",
    "assignee": "เจ้าหน้าที่ งานการเงินและพัสดุ",
    "deadline": "2026-10-23",
    "priority": "High",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/งานการเงินและพัสดุ_task_20.pdf",
    "category": "งานการเงินและพัสดุ"
  },
  {
    "id": 141,
    "title": "งานที่ 1 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-23",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_1.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 142,
    "title": "งานที่ 2 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-20",
    "priority": "High",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_2.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 143,
    "title": "งานที่ 3 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-04",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_3.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 144,
    "title": "งานที่ 4 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-24",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_4.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 145,
    "title": "งานที่ 5 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-12",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_5.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 146,
    "title": "งานที่ 6 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-10",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_6.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 147,
    "title": "งานที่ 7 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-19",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 148,
    "title": "งานที่ 8 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-27",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 149,
    "title": "งานที่ 9 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-13",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_9.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 150,
    "title": "งานที่ 10 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-09",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 151,
    "title": "งานที่ 11 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-14",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_11.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 152,
    "title": "งานที่ 12 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-05",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 153,
    "title": "งานที่ 13 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-20",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_13.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 154,
    "title": "งานที่ 14 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-07",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 155,
    "title": "งานที่ 15 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-04",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_15.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 156,
    "title": "งานที่ 16 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-12",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 157,
    "title": "งานที่ 17 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-12",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 158,
    "title": "งานที่ 18 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-07",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_18.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 159,
    "title": "งานที่ 19 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-11",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_19.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 160,
    "title": "งานที่ 20 ของ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "assignee": "เจ้าหน้าที่ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)",
    "deadline": "2026-10-14",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)_task_20.pdf",
    "category": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)"
  },
  {
    "id": 161,
    "title": "งานที่ 1 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-06",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 162,
    "title": "งานที่ 2 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-16",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 163,
    "title": "งานที่ 3 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-17",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 164,
    "title": "งานที่ 4 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-11",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 165,
    "title": "งานที่ 5 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-17",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 166,
    "title": "งานที่ 6 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-21",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 167,
    "title": "งานที่ 7 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-11",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 168,
    "title": "งานที่ 8 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-25",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 169,
    "title": "งานที่ 9 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-05",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_9.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 170,
    "title": "งานที่ 10 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-26",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_10.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 171,
    "title": "งานที่ 11 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-25",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_11.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 172,
    "title": "งานที่ 12 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-10",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 173,
    "title": "งานที่ 13 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-01",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_13.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 174,
    "title": "งานที่ 14 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-08",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 175,
    "title": "งานที่ 15 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-08",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_15.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 176,
    "title": "งานที่ 16 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-16",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_16.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 177,
    "title": "งานที่ 17 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-18",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_17.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 178,
    "title": "งานที่ 18 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-07",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 179,
    "title": "งานที่ 19 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-19",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย_task_19.pdf",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 180,
    "title": "งานที่ 20 ของ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "assignee": "เจ้าหน้าที่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "deadline": "2026-10-11",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
  },
  {
    "id": 181,
    "title": "งานที่ 1 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-18",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 182,
    "title": "งานที่ 2 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-09",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_2.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 183,
    "title": "งานที่ 3 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-14",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 184,
    "title": "งานที่ 4 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-12",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_4.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 185,
    "title": "งานที่ 5 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-19",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_5.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 186,
    "title": "งานที่ 6 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-18",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_6.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 187,
    "title": "งานที่ 7 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-14",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 188,
    "title": "งานที่ 8 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-04",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_8.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 189,
    "title": "งานที่ 9 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-03",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_9.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 190,
    "title": "งานที่ 10 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-27",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_10.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 191,
    "title": "งานที่ 11 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-06",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 192,
    "title": "งานที่ 12 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-11",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_12.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 193,
    "title": "งานที่ 13 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-28",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 194,
    "title": "งานที่ 14 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-16",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_14.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 195,
    "title": "งานที่ 15 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-10",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 196,
    "title": "งานที่ 16 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-15",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 197,
    "title": "งานที่ 17 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-23",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 198,
    "title": "งานที่ 18 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-01",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 199,
    "title": "งานที่ 19 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-07",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 200,
    "title": "งานที่ 20 ของ คณะพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะพุทธศาสตร์",
    "deadline": "2026-10-24",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะพุทธศาสตร์_task_20.pdf",
    "category": "คณะพุทธศาสตร์"
  },
  {
    "id": 201,
    "title": "งานที่ 1 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-15",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_1.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 202,
    "title": "งานที่ 2 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-26",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 203,
    "title": "งานที่ 3 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-01",
    "priority": "Low",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_3.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 204,
    "title": "งานที่ 4 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-03",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_4.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 205,
    "title": "งานที่ 5 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-03",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_5.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 206,
    "title": "งานที่ 6 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-16",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 207,
    "title": "งานที่ 7 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-10",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_7.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 208,
    "title": "งานที่ 8 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-04",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 209,
    "title": "งานที่ 9 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-04",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 210,
    "title": "งานที่ 10 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-18",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 211,
    "title": "งานที่ 11 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-07",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_11.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 212,
    "title": "งานที่ 12 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-27",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_12.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 213,
    "title": "งานที่ 13 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-15",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 214,
    "title": "งานที่ 14 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-21",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 215,
    "title": "งานที่ 15 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-01",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 216,
    "title": "งานที่ 16 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-14",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 217,
    "title": "งานที่ 17 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-28",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 218,
    "title": "งานที่ 18 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-27",
    "priority": "High",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_18.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 219,
    "title": "งานที่ 19 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-09",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะครุศาสตร์_task_19.pdf",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 220,
    "title": "งานที่ 20 ของ คณะครุศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะครุศาสตร์",
    "deadline": "2026-10-16",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะครุศาสตร์"
  },
  {
    "id": 221,
    "title": "งานที่ 1 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-25",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_1.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 222,
    "title": "งานที่ 2 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-09",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 223,
    "title": "งานที่ 3 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-22",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_3.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 224,
    "title": "งานที่ 4 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-15",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 225,
    "title": "งานที่ 5 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-15",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_5.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 226,
    "title": "งานที่ 6 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-25",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_6.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 227,
    "title": "งานที่ 7 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-24",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 228,
    "title": "งานที่ 8 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-26",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 229,
    "title": "งานที่ 9 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-02",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_9.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 230,
    "title": "งานที่ 10 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-24",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_10.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 231,
    "title": "งานที่ 11 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-13",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 232,
    "title": "งานที่ 12 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-16",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 233,
    "title": "งานที่ 13 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-02",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 234,
    "title": "งานที่ 14 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-27",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 235,
    "title": "งานที่ 15 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-04",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_15.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 236,
    "title": "งานที่ 16 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-06",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 237,
    "title": "งานที่ 17 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-26",
    "priority": "Low",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_17.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 238,
    "title": "งานที่ 18 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-22",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_18.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 239,
    "title": "งานที่ 19 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-15",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_19.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 240,
    "title": "งานที่ 20 ของ คณะมนุษยศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะมนุษยศาสตร์",
    "deadline": "2026-10-03",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะมนุษยศาสตร์_task_20.pdf",
    "category": "คณะมนุษยศาสตร์"
  },
  {
    "id": 241,
    "title": "งานที่ 1 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-09",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 242,
    "title": "งานที่ 2 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-06",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_2.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 243,
    "title": "งานที่ 3 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-05",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_3.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 244,
    "title": "งานที่ 4 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-02",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 245,
    "title": "งานที่ 5 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-04",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 246,
    "title": "งานที่ 6 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-26",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_6.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 247,
    "title": "งานที่ 7 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-05",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_7.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 248,
    "title": "งานที่ 8 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-15",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 249,
    "title": "งานที่ 9 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-11",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_9.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 250,
    "title": "งานที่ 10 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-02",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 251,
    "title": "งานที่ 11 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-16",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 252,
    "title": "งานที่ 12 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-24",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_12.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 253,
    "title": "งานที่ 13 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-08",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_13.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 254,
    "title": "งานที่ 14 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-23",
    "priority": "High",
    "status": "Pending",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 255,
    "title": "งานที่ 15 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-27",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 256,
    "title": "งานที่ 16 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-25",
    "priority": "High",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_16.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 257,
    "title": "งานที่ 17 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-26",
    "priority": "High",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_17.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 258,
    "title": "งานที่ 18 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-03",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/คณะสังคมศาสตร์_task_18.pdf",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 259,
    "title": "งานที่ 19 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-05",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 260,
    "title": "งานที่ 20 ของ คณะสังคมศาสตร์",
    "assignee": "เจ้าหน้าที่ คณะสังคมศาสตร์",
    "deadline": "2026-10-16",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "คณะสังคมศาสตร์"
  },
  {
    "id": 261,
    "title": "งานที่ 1 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-12",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 262,
    "title": "งานที่ 2 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-10",
    "priority": "Low",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_2.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 263,
    "title": "งานที่ 3 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-16",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 264,
    "title": "งานที่ 4 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-01",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_4.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 265,
    "title": "งานที่ 5 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-01",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 266,
    "title": "งานที่ 6 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-15",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 267,
    "title": "งานที่ 7 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-18",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 268,
    "title": "งานที่ 8 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-16",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_8.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 269,
    "title": "งานที่ 9 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-16",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 270,
    "title": "งานที่ 10 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-05",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_10.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 271,
    "title": "งานที่ 11 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-23",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 272,
    "title": "งานที่ 12 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-17",
    "priority": "Urgent",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_12.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 273,
    "title": "งานที่ 13 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-27",
    "priority": "High",
    "status": "Delayed",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 274,
    "title": "งานที่ 14 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-17",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_14.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 275,
    "title": "งานที่ 15 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-08",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_15.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 276,
    "title": "งานที่ 16 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-27",
    "priority": "High",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_16.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 277,
    "title": "งานที่ 17 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-16",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 278,
    "title": "งานที่ 18 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-12",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/บัณฑิตวิทยาลัย_task_18.pdf",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 279,
    "title": "งานที่ 19 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-20",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 280,
    "title": "งานที่ 20 ของ บัณฑิตวิทยาลัย",
    "assignee": "เจ้าหน้าที่ บัณฑิตวิทยาลัย",
    "deadline": "2026-10-06",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "บัณฑิตวิทยาลัย"
  },
  {
    "id": 281,
    "title": "งานที่ 1 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-11",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 282,
    "title": "งานที่ 2 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-27",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_2.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 283,
    "title": "งานที่ 3 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-23",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_3.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 284,
    "title": "งานที่ 4 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-09",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 285,
    "title": "งานที่ 5 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-07",
    "priority": "Low",
    "status": "Delayed",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 286,
    "title": "งานที่ 6 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-24",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_6.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 287,
    "title": "งานที่ 7 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-23",
    "priority": "High",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_7.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 288,
    "title": "งานที่ 8 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-13",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_8.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 289,
    "title": "งานที่ 9 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-21",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 290,
    "title": "งานที่ 10 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-25",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 291,
    "title": "งานที่ 11 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-14",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 292,
    "title": "งานที่ 12 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-26",
    "priority": "High",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_12.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 293,
    "title": "งานที่ 13 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-26",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_13.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 294,
    "title": "งานที่ 14 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-21",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_14.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 295,
    "title": "งานที่ 15 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-08",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 296,
    "title": "งานที่ 16 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-18",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 297,
    "title": "งานที่ 17 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-26",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_17.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 298,
    "title": "งานที่ 18 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-21",
    "priority": "Medium",
    "status": "In Progress",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_18.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 299,
    "title": "งานที่ 19 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-20",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_19.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 300,
    "title": "งานที่ 20 ของ สถาบันวิจัยพุทธศาสตร์",
    "assignee": "เจ้าหน้าที่ สถาบันวิจัยพุทธศาสตร์",
    "deadline": "2026-10-07",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "https://mvu.ac.th/docs/สถาบันวิจัยพุทธศาสตร์_task_20.pdf",
    "category": "สถาบันวิจัยพุทธศาสตร์"
  },
  {
    "id": 301,
    "title": "งานที่ 1 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-16",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 302,
    "title": "งานที่ 2 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-18",
    "priority": "Medium",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม_task_2.pdf",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 303,
    "title": "งานที่ 3 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-11",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 304,
    "title": "งานที่ 4 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-17",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 305,
    "title": "งานที่ 5 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-28",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 306,
    "title": "งานที่ 6 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-09",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 307,
    "title": "งานที่ 7 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-15",
    "priority": "Urgent",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 308,
    "title": "งานที่ 8 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-13",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม_task_8.pdf",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 309,
    "title": "งานที่ 9 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-09",
    "priority": "High",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 310,
    "title": "งานที่ 10 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-22",
    "priority": "Medium",
    "status": "Delayed",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 311,
    "title": "งานที่ 11 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-05",
    "priority": "Low",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 312,
    "title": "งานที่ 12 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-21",
    "priority": "Low",
    "status": "Completed",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 313,
    "title": "งานที่ 13 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-02",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 314,
    "title": "งานที่ 14 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-14",
    "priority": "High",
    "status": "In Progress",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 315,
    "title": "งานที่ 15 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-05",
    "priority": "Urgent",
    "status": "Delayed",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 316,
    "title": "งานที่ 16 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-06",
    "priority": "Low",
    "status": "Completed",
    "evidence": "https://mvu.ac.th/docs/สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม_task_16.pdf",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 317,
    "title": "งานที่ 17 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-28",
    "priority": "Low",
    "status": "Pending",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 318,
    "title": "งานที่ 18 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-06",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 319,
    "title": "งานที่ 19 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-24",
    "priority": "Medium",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม_task_19.pdf",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  },
  {
    "id": 320,
    "title": "งานที่ 20 ของ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "assignee": "เจ้าหน้าที่ สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม",
    "deadline": "2026-10-03",
    "priority": "Urgent",
    "status": "Pending",
    "evidence": "https://mvu.ac.th/docs/สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม_task_20.pdf",
    "category": "สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม"
  }
],
  projects: [
    { id: 1, name: 'โครงการพัฒนาระบบ Local AI Agent เพื่อการบริหารจัดการหน่วยงาน', objective: 'เพื่อนำเทคโนโลยี Generative AI แบบควบคุมข้อมูลภายในมาช่วยสืบค้น สรุป และสนับสนุนการตัดสินใจของผู้บริหาร', budget: 150000, progress: 65, status: 'On Track', owner: 'พระพรชัย วรชโย', kpis: '1. Web App ใช้งานได้จริง 2. ลดเวลาจัดทำรายงาน 50%', obstacles: 'การเตรียมเครื่อง Server GPU', start_date: '2026-08-01', end_date: '2026-10-31' },
    { id: 2, name: 'โครงการปรับปรุงและจัดทำระบบฐานความรู้ดิจิทัล มหาวชิราลงกรณบาลีเถรวาทฯ', objective: 'รวบรวมระเบียบ คำสั่ง มติสภา และคู่มือปฏิบัติงานเข้าสู่คลังข้อมูลดิจิทัลที่ค้นหาได้รวดเร็ว', budget: 80000, progress: 40, status: 'At Risk', owner: 'เจ้าหน้าที่แผนงานและงบประมาณ', kpis: 'เอกสารเข้าสู่ระบบไม่น้อยกว่า 500 ฉบับ', obstacles: 'เอกสารเก่าบางส่วนยังไม่ได้แปลงเป็น PDF ที่เป็น Text Searchable', start_date: '2026-07-15', end_date: '2026-09-30' },
    { id: 3, name: 'โครงการอบรมเชิงปฏิบัติการพัฒนาบุคลากรด้าน AI Vibe Coding', objective: 'เสริมสร้างทักษะการประยุกต์ใช้ AI Studio และ Vibe Coding ให้บุคลากรสายสนับสนุน', budget: 50000, progress: 90, status: 'Completed', owner: 'นักวิชาการคอมพิวเตอร์', kpis: 'บุคลากรผ่านการอบรมอย่างน้อย 20 รูป/คน', obstacles: 'ไม่มี', start_date: '2026-08-15', end_date: '2026-09-02' },
    { id: 4, name: 'โครงการพัฒนาหลักสูตรพระไตรปิฎกศึกษา (หลักสูตรปรับปรุง พ.ศ. 2570)', objective: 'เพื่อให้หลักสูตรมีความทันสมัยและสอดคล้องกับเกณฑ์มาตรฐานหลักสูตรระดับอุดมศึกษา', budget: 120000, progress: 30, status: 'In Progress', owner: 'ฝ่ายวิชาการ', kpis: 'หลักสูตรผ่านการอนุมัติจากสภาวิทยาลัย', obstacles: 'รอผู้ทรงคุณวุฒิตรวจสอบโครงสร้างหลักสูตร', start_date: '2026-06-01', end_date: '2026-12-31' },
    { id: 5, name: 'โครงการปรับปรุงภูมิทัศน์และพื้นที่สีเขียวภายในวิทยาลัย', objective: 'สร้างสภาพแวดล้อมที่เอื้อต่อการศึกษาและการปฏิบัติธรรม', budget: 300000, progress: 15, status: 'Delayed', owner: 'ส่วนงานบริหารองค์กร', kpis: 'พื้นที่สีเขียวเพิ่มขึ้น 20%', obstacles: 'ผู้รับเหมาเข้าพื้นที่ล่าช้าเนื่องจากฝนตกหนัก', start_date: '2026-08-01', end_date: '2026-11-30' },
    { id: 6, name: 'โครงการพัฒนาระบบ e-Saraban สำนักงานอิเล็กทรอนิกส์', objective: 'ลดการใช้กระดาษและเพิ่มความรวดเร็วในการส่งผ่านเอกสารภายใน', budget: 200000, progress: 80, status: 'On Track', owner: 'นักวิชาการคอมพิวเตอร์', kpis: 'ลดปริมาณกระดาษ 70%, ความเร็วในการเซ็นอนุมัติเพิ่มขึ้น 2 เท่า', obstacles: 'บุคลากรบางส่วนยังไม่คุ้นเคยกับระบบลายเซ็นดิจิทัล', start_date: '2026-05-10', end_date: '2026-10-15' },
    { id: 7, name: 'โครงการบรรพชาสามเณรภาคฤดูร้อนเฉลิมพระเกียรติ', objective: 'ปลูกฝังคุณธรรมจริยธรรมให้เยาวชนและสืบทอดพระพุทธศาสนา', budget: 250000, progress: 100, status: 'Completed', owner: 'ฝ่ายกิจการนิสิต', kpis: 'มีเยาวชนเข้าร่วม 100 รูป', obstacles: 'ไม่มี', start_date: '2026-03-01', end_date: '2026-05-15' },
    { id: 8, name: 'โครงการวิจัย "พุทธธรรมกับการพัฒนาคุณภาพชีวิตในยุคดิจิทัล"', objective: 'เพื่อสร้างองค์ความรู้ใหม่ทางพระพุทธศาสนาบูรณาการกับสังคมยุคใหม่', budget: 95000, progress: 50, status: 'In Progress', owner: 'สถาบันวิจัยพุทธศาสตร์', kpis: 'ตีพิมพ์บทความวิจัยในวารสารระดับ TCI กลุ่ม 1', obstacles: 'การเก็บข้อมูลแบบสอบถามกลุ่มตัวอย่างล่าช้า', start_date: '2026-04-01', end_date: '2026-12-31' },
    { id: 9, name: 'โครงการจัดหาและติดตั้งระบบโซล่าเซลล์ (Solar Rooftop)', objective: 'ลดค่าใช้จ่ายพลังงานไฟฟ้าและส่งเสริมการอนุรักษ์สิ่งแวดล้อม', budget: 1500000, progress: 10, status: 'Pending', owner: 'ส่วนงานบริหารองค์กร', kpis: 'ลดค่าไฟฟ้าได้ 30% ต่อเดือน', obstacles: 'อยู่ระหว่างรอการพิจารณาอนุมัติงบประมาณจากส่วนกลาง', start_date: '2026-10-01', end_date: '2027-03-31' },
    { id: 10, name: 'โครงการประเมินคุณภาพการศึกษาภายใน ประจำปีการศึกษา 2568', objective: 'เพื่อตรวจสอบและประเมินผลการดำเนินงานตามตัวชี้วัด QA', budget: 40000, progress: 75, status: 'On Track', owner: 'เจ้าหน้าที่ติดตามประเมินผล', kpis: 'ผลการประเมินภาพรวมระดับดีมาก', obstacles: 'บางหน่วยงานส่งรายงาน SAR ล่าช้า', start_date: '2026-07-01', end_date: '2026-09-30' },
    { id: 11, name: 'โครงการผลิตสื่อธรรมะออนไลน์แบบสั้น (Short Video Dhamma)', objective: 'เผยแผ่พระพุทธศาสนาเชิงรุกผ่านแพลตฟอร์ม Social Media', budget: 60000, progress: 45, status: 'In Progress', owner: 'ฝ่ายประชาสัมพันธ์', kpis: 'ยอดวิวรวม 100,000 วิวใน 3 เดือน', obstacles: 'ขาดแคลนอุปกรณ์ตัดต่อวิดีโอคุณภาพสูง', start_date: '2026-08-01', end_date: '2026-12-31' },
    { id: 12, name: 'โครงการอบรมภาษาอังกฤษสำหรับพระนิสิต', objective: 'พัฒนาทักษะภาษาต่างประเทศเพื่อเตรียมความพร้อมสู่สากล', budget: 85000, progress: 25, status: 'Delayed', owner: 'ฝ่ายวิชาการ', kpis: 'พระนิสิตสอบผ่านเกณฑ์ 80%', obstacles: 'วิทยากรชาวต่างชาติเลื่อนกำหนดการเดินทาง', start_date: '2026-09-01', end_date: '2026-11-30' },
    { id: 13, name: 'โครงการจัดตั้งศูนย์ปฏิบัติธรรมและเจริญสติภาวนา', objective: 'สร้างสถานที่สัปปายะสำหรับการปฏิบัติธรรมของบุคลากรและประชาชน', budget: 500000, progress: 60, status: 'On Track', owner: 'ส่วนงานบริหารองค์กร', kpis: 'สามารถรองรับผู้ปฏิบัติธรรมได้ 50 คน/รุ่น', obstacles: 'ความล่าช้าในการส่งมอบวัสดุก่อสร้างบางประเภท', start_date: '2026-05-01', end_date: '2026-10-31' },
    { id: 14, name: 'โครงการสัมมนาเชิงปฏิบัติการ ทิศทางการบริหารงานวิทยาลัยในทศวรรษหน้า', objective: 'ระดมสมองเพื่อจัดทำแผนยุทธศาสตร์ 5 ปี', budget: 120000, progress: 100, status: 'Completed', owner: 'เจ้าหน้าที่แผนงานและงบประมาณ', kpis: 'ได้แผนยุทธศาสตร์ฉบับสมบูรณ์ 1 ฉบับ', obstacles: 'ไม่มี', start_date: '2026-07-10', end_date: '2026-07-12' },
    { id: 15, name: 'โครงการอัปเกรดระบบเครือข่าย Firewall และ Network Security', objective: 'ยกระดับความปลอดภัยข้อมูลและป้องกันการโจมตีทางไซเบอร์', budget: 350000, progress: 95, status: 'On Track', owner: 'นักวิชาการคอมพิวเตอร์', kpis: 'ไม่มีเหตุการณ์ข้อมูลรั่วไหลหรือ Server ดาวน์จากการโจมตี', obstacles: 'การคอนฟิก Firewall บางส่วนกระทบระบบเก่าเล็กน้อย', start_date: '2026-06-15', end_date: '2026-09-15' },
    { id: 16, name: 'โครงการทุนการศึกษาสำหรับพระภิกษุสามเณรผู้เรียนดี', objective: 'สนับสนุนทุนการศึกษาให้แก่นิสิตที่มีผลการเรียนดีแต่ขาดแคลนทุนทรัพย์', budget: 400000, progress: 50, status: 'In Progress', owner: 'ฝ่ายกิจการนิสิต', kpis: 'มอบทุนการศึกษา 100 ทุน', obstacles: 'คณะกรรมการกำลังตรวจสอบคุณสมบัติผู้สมัครที่มีจำนวนมาก', start_date: '2026-08-01', end_date: '2026-09-30' },
    { id: 17, name: 'โครงการอนุรักษ์และปริวรรตคัมภีร์ใบลาน', objective: 'อนุรักษ์เอกสารโบราณทางพระพุทธศาสนาและแปลงเป็นข้อมูลดิจิทัล', budget: 200000, progress: 35, status: 'In Progress', owner: 'สำนักหอสมุด', kpis: 'ปริวรรตและทำดัชนีคัมภีร์ 50 ผูก', obstacles: 'ผู้เชี่ยวชาญด้านอักษรธรรมมีจำนวนจำกัด', start_date: '2026-07-01', end_date: '2027-06-30' },
    { id: 18, name: 'โครงการพัฒนาระบบบัญชีและการเงินแบบรวมศูนย์ (ERP)', objective: 'เพิ่มประสิทธิภาพและความโปร่งใสในการบริหารงบประมาณ', budget: 800000, progress: 5, status: 'Pending', owner: 'เจ้าหน้าที่การเงินและพัสดุ', kpis: 'ระบบครอบคลุมทุกกระบวนการเบิกจ่าย 100%', obstacles: 'รอการสรุป TOR จัดจ้างบริษัทพัฒนาระบบ', start_date: '2026-11-01', end_date: '2027-08-31' },
    { id: 19, name: 'โครงการส่งเสริมสุขภาวะองค์รวมของบุคลากร (Well-being)', objective: 'ส่งเสริมสุขภาพกาย สุขภาพจิต และความสุขในการทำงาน', budget: 75000, progress: 85, status: 'On Track', owner: 'ส่วนงานบุคคล', kpis: 'บุคลากรมีความพึงพอใจต่อโครงการ > 85%', obstacles: 'เวลาเข้าร่วมกิจกรรมของบุคลากรสายวิชาการไม่ตรงกัน', start_date: '2026-05-01', end_date: '2026-09-30' },
    { id: 20, name: 'โครงการเตรียมความพร้อมรับการตรวจประเมินคุณภาพภายนอก (สมศ.)', objective: 'เตรียมเอกสารและสถานที่เพื่อรับการตรวจประเมินจากองค์กรภายนอก', budget: 150000, progress: 20, status: 'At Risk', owner: 'เจ้าหน้าที่ติดตามประเมินผล', kpis: 'ผลการประเมินภายนอกผ่านเกณฑ์มาตรฐาน', obstacles: 'การรวบรวมหลักฐานย้อนหลัง 3 ปีมีความยากลำบาก', start_date: '2026-08-15', end_date: '2026-12-15' }
  ],
  resolutions: [
    { id: 1, title: 'อนุมัติแนวทางการใช้ AI ช่วยงานบริหารภายในโดยห้ามนำข้อมูลลับส่ง AI ภายนอก', meeting_no: 'ครั้งที่ 3/2569', meeting_date: '2026-07-20', assignee: 'พระพรชัย วรชโย (นักวิชาการคอมพิวเตอร์)', deadline: '2026-08-31', status: 'Completed', details: 'ให้จัดหาโครงสร้างพื้นฐาน Local AI หรือควบคุมด้วยมาตรการความปลอดภัยข้อมูลของหน่วยงาน' },
    { id: 2, title: 'มอบหมายจัดทำระบบติดตามมติที่ประชุมและภารกิจแบบเรียลไทม์', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'เจ้าหน้าที่แผนงานและงบประมาณ & ศูนย์คอมพิวเตอร์', deadline: '2026-09-15', status: 'In Progress', details: 'พัฒนาแดชบอร์ดสรุปภาพรวมโครงการ มติที่ต้องติดตาม และประเด็นความเสี่ยง' },
    { id: 3, title: 'กำหนดเกณฑ์ตรวจสอบความครบถ้วนของเอกสารหลักฐานโครงการก่อนอนุมัติงบ', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'เจ้าหน้าที่การเงินและพัสดุ', deadline: '2026-09-30', status: 'Pending', details: 'จัดทำ Checklists เอกสารตามระเบียบพัสดุและระเบียบการเงินใหม่' },
    { id: 4, title: 'อนุมัติหลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาพระไตรปิฎกศึกษา (ฉบับปรับปรุง)', meeting_no: 'ครั้งที่ 2/2569', meeting_date: '2026-05-15', assignee: 'ฝ่ายวิชาการ', deadline: '2026-06-30', status: 'Completed', details: 'ที่ประชุมสภาวิทยาลัยมีมติอนุมัติหลักสูตร และให้นำเสนอต่อ สป.อว. ต่อไป' },
    { id: 5, title: 'รับทราบรายงานการตรวจสอบทางการเงิน ไตรมาสที่ 2', meeting_no: 'ครั้งที่ 3/2569', meeting_date: '2026-07-20', assignee: 'เจ้าหน้าที่การเงินและพัสดุ', deadline: '2026-07-25', status: 'Completed', details: 'ที่ประชุมรับทราบรายงาน และกำชับให้เร่งรัดการเบิกจ่ายงบลงทุน' },
    { id: 6, title: 'อนุมัติงบประมาณกันเหลื่อมปี โครงการสร้างอาคารปฏิบัติธรรม', meeting_no: 'ครั้งที่ 5/2569', meeting_date: '2026-09-25', assignee: 'ส่วนงานบริหารองค์กร', deadline: '2026-10-15', status: 'Pending', details: 'อนุมัติให้ขยายระยะเวลาเบิกจ่ายงบประมาณไปจนถึงไตรมาส 1 ปีงบ 2570' },
    { id: 7, title: 'แต่งตั้งคณะกรรมการพิจารณาตำแหน่งทางวิชาการ', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'งานบุคคล', deadline: '2026-09-10', status: 'Completed', details: 'ให้ดำเนินการออกคำสั่งแต่งตั้งตามรายชื่อที่เสนอ และแจ้งให้ผู้เกี่ยวข้องทราบ' },
    { id: 8, title: 'เห็นชอบแผนยุทธศาสตร์ 5 ปี (พ.ศ. 2570 - 2574)', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'เจ้าหน้าที่แผนงานและงบประมาณ', deadline: '2026-09-30', status: 'In Progress', details: 'ให้ฝ่ายแผนนำข้อเสนอแนะจากกรรมการไปปรับปรุงเป้าหมายเชิงรุกให้ชัดเจนขึ้น' },
    { id: 9, title: 'อนุมัติการให้ปริญญากิตติมศักดิ์ ประจำปี 2569', meeting_no: 'ครั้งที่ 3/2569', meeting_date: '2026-07-20', assignee: 'ฝ่ายวิชาการ', deadline: '2026-10-01', status: 'In Progress', details: 'มอบหมายให้ฝ่ายวิชาการเตรียมความพร้อมในพิธีประสาทปริญญาบัตร' },
    { id: 10, title: 'ข้อสั่งการเรื่องการประหยัดพลังงานภายในวิทยาลัย', meeting_no: 'ครั้งที่ 2/2569', meeting_date: '2026-05-15', assignee: 'ส่วนงานบริหารองค์กร', deadline: '2026-06-01', status: 'Completed', details: 'ให้ปิดเครื่องปรับอากาศก่อนเวลาเลิกงาน 30 นาที และลดไฟส่องสว่างในจุดที่ไม่จำเป็น' },
    { id: 11, title: 'มอบหมายให้ศึกษาความเป็นไปได้ในการเปิดวิทยาเขตใหม่', meeting_no: 'ครั้งที่ 1/2569', meeting_date: '2026-02-10', assignee: 'ฝ่ายบริหาร', deadline: '2026-08-31', status: 'Completed', details: 'ให้จัดทำรายงาน Feasibility Study พื้นที่จังหวัดนครราชสีมา' },
    { id: 12, title: 'อนุมัติปรับปรุงระเบียบว่าด้วยการจัดซื้อจัดจ้าง', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'งานพัสดุ', deadline: '2026-09-20', status: 'In Progress', details: 'ให้เพิ่มวงเงินอนุมัติของอธิการบดีเพื่อความคล่องตัวในการดำเนินงาน' },
    { id: 13, title: 'รับทราบผลการประเมินคุณภาพการศึกษาภายใน ปี 2568', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'เจ้าหน้าที่ติดตามประเมินผล', deadline: '2026-08-30', status: 'Completed', details: 'ที่ประชุมรับทราบ และให้จัดทำแผนพัฒนาจุดที่ต้องปรับปรุง (Improvement Plan)' },
    { id: 14, title: 'แต่งตั้งคณะทำงานเตรียมการรับเสด็จฯ', meeting_no: 'ครั้งที่ 5/2569', meeting_date: '2026-09-25', assignee: 'ส่วนงานบริหารองค์กร', deadline: '2026-10-05', status: 'Pending', details: 'ให้ดำเนินการร่างคำสั่งและจัดประชุมคณะทำงานโดยด่วน' },
    { id: 15, title: 'เห็นชอบการปรับโครงสร้างหน่วยงานภายใน', meeting_no: 'ครั้งที่ 3/2569', meeting_date: '2026-07-20', assignee: 'งานบุคคล', deadline: '2026-12-31', status: 'In Progress', details: 'ให้ยุบรวมฝ่ายเทคโนโลยีและฝ่ายนวัตกรรมเข้าด้วยกันเป็น ศูนย์เทคโนโลยีและนวัตกรรมดิจิทัล' },
    { id: 16, title: 'อนุมัติให้ทุนวิจัยแก่นิสิตระดับปริญญาโท-เอก จำนวน 20 ทุน', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'บัณฑิตวิทยาลัย', deadline: '2026-09-15', status: 'In Progress', details: 'ให้ประกาศรับสมัครนิสิตที่มีความประสงค์ขอรับทุนภายในเดือนกันยายน' },
    { id: 17, title: 'ข้อสั่งการให้ทุกหน่วยงานจัดทำคู่มือปฏิบัติงาน (SOP)', meeting_no: 'ครั้งที่ 2/2569', meeting_date: '2026-05-15', assignee: 'ทุกส่วนงาน', deadline: '2026-08-31', status: 'Completed', details: 'เพื่อลดความเสี่ยงจากการเข้าออกของบุคลากรและรักษาสายงาน' },
    { id: 18, title: 'อนุมัติร่างข้อบังคับว่าด้วยการบริหารงานบุคคล (ฉบับที่ 2)', meeting_no: 'ครั้งที่ 3/2569', meeting_date: '2026-07-20', assignee: 'งานบุคคล', deadline: '2026-08-15', status: 'Completed', details: 'ปรับเปลี่ยนเกณฑ์การประเมินผลสัมฤทธิ์ให้ผูกกับ KPI โครงการ' },
    { id: 19, title: 'มอบหมายแก้ไขปัญหาน้ำท่วมขังบริเวณลานจอดรถ', meeting_no: 'ครั้งที่ 5/2569', meeting_date: '2026-09-25', assignee: 'อาคารสถานที่', deadline: '2026-10-10', status: 'Pending', details: 'ให้ประสานงานเทศบาลและทำระบบลอกท่อระบายน้ำ' },
    { id: 20, title: 'รับทราบความก้าวหน้าโครงการพัฒนาระบบ e-Saraban', meeting_no: 'ครั้งที่ 4/2569', meeting_date: '2026-08-25', assignee: 'นักวิชาการคอมพิวเตอร์', deadline: '2026-08-26', status: 'Completed', details: 'ที่ประชุมชื่นชมความก้าวหน้าและขอให้เร่งจัดการอบรมการใช้งาน' }
  ],
  knowledge_base: [
    { id: 1, title: 'ข้อบังคับมหาวิทยาลัย ว่าด้วยการบริหารงานภายใน พ.ศ. 2568', category: 'ระเบียบ', file_type: 'PDF', source: 'สำนักงานสภาวิทยาลัย', content: 'กำหนดโครงสร้าง อำนาจหน้าที่ และการกำกับดูแลงานบริหาร มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย โดยให้มีระบบติดตามและประเมินผลการดำเนินงานอย่างเป็นระบบ', tags: 'ระเบียบ, บริหารงาน, สภาวิทยาลัย' },
    { id: 2, title: 'ประกาศแนวปฏิบัติการคุ้มครองข้อมูลส่วนบุคคลและความปลอดภัยด้าน AI', category: 'คำสั่ง', file_type: 'PDF', source: 'ศูนย์สารสนเทศ', content: 'ห้ามส่งข้อมูลนักศึกษา ข้อมูลบุคลากร ข้อมูลการเงิน และมติที่ประชุมที่เป็นลับเข้าสู่ AI Cloud ภายนอกที่ไม่ได้รับอนุญาต ให้ใช้ Local AI Agent หรือ Sandbox ที่ปลอดภัยเท่านั้น', tags: 'คำสั่ง, AI, PDPA, ความปลอดภัย' },
    { id: 3, title: 'รายงานการประชุมคณะกรรมการบริหารวิทยาลัย ครั้งที่ 4/2569', category: 'รายงานการประชุม', file_type: 'PDF', source: 'งานเลขานุการการประชุม', content: 'ที่ประชุมมีมติเห็นชอบโครงการ Local AI Agent สำหรับการบริหารหน่วยงาน และมอบหมายให้นักวิชาการคอมพิวเตอร์ดำเนินการเร่งรัดระบบ MVP ให้แล้วเสร็จภายในเดือนกุมภาพันธ์', tags: 'มติที่ประชุม, AI Agent, MVP' },
    { id: 4, title: 'คู่มือขั้นตอนการขออนุมัติโครงการและเบิกจ่ายงบประมาณ', category: 'คู่มือ', file_type: 'DOCX', source: 'งานการเงินและพัสดุ', content: 'อธิบายขั้นตอน 5 ขั้นตอนในการเสนอโครงการ การขออนุมัติหลักการ การจัดซื้อจัดจ้าง การแนบหลักฐาน และการเสนอรายงานสรุปผลหลังเสร็จสิ้นโครงการ', tags: 'คู่มือ, งบประมาณ, พัสดุ' },
    { id: 5, title: 'ระเบียบว่าด้วยการบริหารงานบุคคล พ.ศ. 2567', category: 'ระเบียบ', file_type: 'PDF', source: 'ส่วนงานบุคคล', content: 'ระบุถึงสิทธิ สวัสดิการ การลา และบทลงโทษสำหรับบุคลากรสายวิชาการและสายสนับสนุน รวมถึงเกณฑ์การประเมินผลการทดลองงาน', tags: 'ระเบียบ, บุคคล, HR' },
    { id: 6, title: 'คู่มือการใช้งานระบบ e-Saraban', category: 'คู่มือ', file_type: 'PDF', source: 'ศูนย์เทคโนโลยีสารสนเทศ', content: 'ขั้นตอนการรับ-ส่งหนังสือราชการ การลงนามอิเล็กทรอนิกส์ การค้นหาเอกสารย้อนหลัง และการตั้งค่าตัวแทนรับมอบอำนาจในระบบ', tags: 'คู่มือ, สารบรรณ, IT' },
    { id: 7, title: 'คู่มือการเขียนรายงานการประเมินตนเอง (SAR)', category: 'คู่มือ', file_type: 'PDF', source: 'ประกันคุณภาพ', content: 'อธิบายโครงสร้างของ SAR การเขียนวิเคราะห์จุดแข็งจุดอ่อนตามตัวชี้วัด 6 องค์ประกอบ และการจัดเตรียมร่องรอยหลักฐาน', tags: 'คู่มือ, ประกันคุณภาพ, SAR' },
    { id: 8, title: 'คำสั่งแต่งตั้งคณะกรรมการความเสี่ยงและควบคุมภายใน', category: 'คำสั่ง', file_type: 'PDF', source: 'ส่วนงานบริหารองค์กร', content: 'แต่งตั้งคณะกรรมการจำนวน 9 ท่าน เพื่อทำหน้าที่ระบุความเสี่ยง ประเมิน และจัดทำแผนบริหารความเสี่ยงระดับองค์กร', tags: 'คำสั่ง, ความเสี่ยง, บริหาร' },
    { id: 9, title: 'ประกาศมหาวิทยาลัย เรื่อง ปฏิทินการศึกษาประจำปี 2569', category: 'ประกาศ', file_type: 'PDF', source: 'สำนักวิชาการ', content: 'กำหนดการเปิด-ปิดภาคเรียน การลงทะเบียน การสอบกลางภาค การสอบปลายภาค และวันหยุดนักขัตฤกษ์สำหรับปีการศึกษา 2569', tags: 'ประกาศ, วิชาการ, ปฏิทิน' },
    { id: 10, title: 'แนวทางการจัดการเรียนการสอนแบบผสมผสาน (Blended Learning)', category: 'คู่มือ', file_type: 'PDF', source: 'สำนักวิชาการ', content: 'เกณฑ์การนับชั่วโมงเรียนออนไลน์ การใช้ LMS การประเมินผล และการจัดทำ มคอ.3 สำหรับรายวิชาที่สอนแบบผสมผสาน', tags: 'คู่มือ, วิชาการ, การสอน' },
    { id: 11, title: 'รายงานสรุปผลการดำเนินงานประจำปีงบประมาณ 2568', category: 'รายงาน', file_type: 'PDF', source: 'งานแผนและงบประมาณ', content: 'รายงานผลการใช้จ่ายงบประมาณ ความสำเร็จของโครงการตามแผนยุทธศาสตร์ และปัญหาอุปสรรคเพื่อเสนอต่อสภาวิทยาลัย', tags: 'รายงาน, แผนงาน, สรุปผล' },
    { id: 12, title: 'ระเบียบว่าด้วยการรับจ่ายเงินและเก็บรักษาเงิน พ.ศ. 2566', category: 'ระเบียบ', file_type: 'PDF', source: 'งานการเงินและพัสดุ', content: 'ข้อปฏิบัติในการรับเงินสด การโอนเงิน การสั่งจ่ายเช็ค วงเงินเก็บรักษา และขั้นตอนการตรวจสอบบัญชีประจำวัน', tags: 'ระเบียบ, การเงิน, บัญชี' },
    { id: 13, title: 'คู่มือความปลอดภัยอาชีวอนามัยและสภาพแวดล้อมในการทำงาน', category: 'คู่มือ', file_type: 'PDF', source: 'อาคารสถานที่', content: 'วิธีปฏิบัติเมื่อเกิดเหตุฉุกเฉิน อัคคีภัย การปฐมพยาบาลเบื้องต้น การจัดการขยะอันตราย และข้อปฏิบัติในการใช้ลิฟต์', tags: 'คู่มือ, ความปลอดภัย, อาคาร' },
    { id: 14, title: 'ประกาศ เรื่อง การให้ทุนสนับสนุนการตีพิมพ์ผลงานวิจัยระดับนานาชาติ', category: 'ประกาศ', file_type: 'PDF', source: 'สถาบันวิจัยพุทธศาสตร์', content: 'กำหนดเงื่อนไขการขอรับเงินสนับสนุนค่า Page Charge จำนวนสูงสุด 30,000 บาท สำหรับอาจารย์และนักวิจัยที่ตีพิมพ์ใน Scopus Q1-Q2', tags: 'ประกาศ, วิจัย, ทุน' },
    { id: 15, title: 'รายงานการประชุมสภาวิทยาลัย ครั้งที่ 2/2569', category: 'รายงานการประชุม', file_type: 'PDF', source: 'สำนักงานสภาวิทยาลัย', content: 'รับรองงบการเงินประจำปี อนุมัติหลักสูตรใหม่ และเห็นชอบให้มีการปรับปรุงโครงสร้างเงินเดือนบุคลากรสายวิชาการ', tags: 'มติที่ประชุม, สภาวิทยาลัย' },
    { id: 16, title: 'คู่มือการเบิกจ่ายค่าตอบแทนวิทยากรและผู้ทรงคุณวุฒิ', category: 'คู่มือ', file_type: 'PDF', source: 'งานการเงินและพัสดุ', content: 'อัตราการเบิกจ่ายค่าวิทยากรภาครัฐและเอกชน อัตราค่าพาหนะ และตัวอย่างการกรอกแบบฟอร์มขออนุมัติเบิกจ่าย', tags: 'คู่มือ, การเงิน, เบิกจ่าย' },
    { id: 17, title: 'แผนยุทธศาสตร์ 5 ปี (พ.ศ. 2568 - 2572)', category: 'แผนงาน', file_type: 'PDF', source: 'งานแผนและงบประมาณ', content: 'วิสัยทัศน์ พันธกิจ และยุทธศาสตร์ 4 ด้าน ได้แก่ การพัฒนานิสิต การวิจัยเชิงพุทธ การบริการวิชาการ และการบริหารจัดการที่ดี', tags: 'แผนงาน, ยุทธศาสตร์, วิสัยทัศน์' },
    { id: 18, title: 'คำสั่งแต่งตั้งคณะกรรมการควบคุมภายในและการตรวจสอบ', category: 'คำสั่ง', file_type: 'PDF', source: 'สำนักงานอธิการบดี', content: 'รายนามกรรมการผู้ทำหน้าที่ตรวจสอบการดำเนินงานของวิทยาลัยให้เป็นไปตามระเบียบของรัฐ และประเมินประสิทธิผลการใช้งบประมาณ', tags: 'คำสั่ง, ตรวจสอบ, ควบคุมภายใน' },
    { id: 19, title: 'ระเบียบว่าด้วยการจัดการศึกษาระดับบัณฑิตศึกษา พ.ศ. 2567', category: 'ระเบียบ', file_type: 'PDF', source: 'บัณฑิตวิทยาลัย', content: 'เกณฑ์การรับสมัคร การสอบโครงร่างวิทยานิพนธ์ การสอบป้องกันวิทยานิพนธ์ และเงื่อนไขการสำเร็จการศึกษาสำหรับระดับ ป.โท และ ป.เอก', tags: 'ระเบียบ, บัณฑิตวิทยาลัย, การศึกษา' },
    { id: 20, title: 'คู่มือการใช้งานระบบประเมินผลการปฏิบัติงานออนไลน์', category: 'คู่มือ', file_type: 'PDF', source: 'ส่วนงานบุคคล', content: 'ขั้นตอนการกรอกเป้าหมาย (KPI) การแนบหลักฐานการประเมิน การให้คะแนนของหัวหน้างาน และการดูผลประเมินย้อนหลัง', tags: 'คู่มือ, บุคคล, ประเมินผล' }
  ],
  vehicles: [
    { id: 1, type: 'Van', name: 'รถตู้ คันที่ 1', license_plate: 'ฮท 1111 กรุงเทพมหานคร', status: 'Available' },
    { id: 2, type: 'Van', name: 'รถตู้ คันที่ 2', license_plate: 'ฮท 2222 กรุงเทพมหานคร', status: 'Available' },
    { id: 3, type: 'Pickup', name: 'รถปิคอัพ คันที่ 1', license_plate: 'ผอ 3333 นครปฐม', status: 'Available' },
    { id: 4, type: 'Pickup', name: 'รถปิคอัพ คันที่ 2', license_plate: 'ผอ 4444 นครปฐม', status: 'Available' },
    { id: 5, type: '6-Wheel', name: 'รถ 6 ล้อ คันที่ 1', license_plate: '64-5555 นครปฐม', status: 'Available' }
  ],
  vehicle_bookings: [
    {
      id: 1,
      booking_date: new Date().toISOString().split('T')[0],
      start_time: '08:00',
      end_time: '16:00',
      booker: 'พระพรชัย วรชโย',
      vehicle_type: 'Van',
      vehicle_id: 1,
      driver: 'นายสมชาย ใจดี',
      purpose: 'ไปประชุมวิชาการ',
      destination: 'มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วังน้อย',
      passengers: '5 รูป/คน',
      status: 'Confirmed',
      mileage_start: 120500,
      mileage_end: 0,
      total_distance: 0,
      created_at: new Date().toISOString()
    }
  ]
};
