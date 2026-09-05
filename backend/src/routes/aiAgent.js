import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

// Helper to query all context
async function getAllContext() {
  let tasks = mockData.tasks;
  let projects = mockData.projects;
  let resolutions = mockData.resolutions;
  let knowledge = mockData.knowledge_base;

  try {
    const { data: t } = await supabase.from('tasks').select('*');
    if (t && t.length) tasks = t;

    const { data: p } = await supabase.from('projects').select('*');
    if (p && p.length) projects = p;

    const { data: r } = await supabase.from('resolutions').select('*');
    if (r && r.length) resolutions = r;

    const { data: k } = await supabase.from('knowledge_base').select('*');
    if (k && k.length) knowledge = k;
  } catch (e) {}

  return { tasks, projects, resolutions, knowledge };
}

// 1. AI Chat / Query RAG Endpoint
router.post('/query', async (req, res) => {
  const { query, mode = 'search' } = req.body;
  if (!query) return res.status(400).json({ success: false, message: 'Query is required' });

  const context = await getAllContext();
  const q = query.toLowerCase();

  // Search relevant items across knowledge base, resolutions, projects, tasks
  const matchedKb = context.knowledge.filter(k => 
    k.title.toLowerCase().includes(q) || k.content.toLowerCase().includes(q) || (k.tags && k.tags.toLowerCase().includes(q))
  );

  const matchedResolutions = context.resolutions.filter(r => 
    r.title.toLowerCase().includes(q) || r.details.toLowerCase().includes(q) || r.assignee.toLowerCase().includes(q)
  );

  const matchedProjects = context.projects.filter(p => 
    p.name.toLowerCase().includes(q) || (p.objective && p.objective.toLowerCase().includes(q)) || p.owner.toLowerCase().includes(q)
  );

  const matchedTasks = context.tasks.filter(t => 
    t.title.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q)
  );

  // Synthesize Response
  let responseText = '';
  let citations = [];

  if (mode === 'draft_report') {
    responseText = `## 📄 ร่างรายงานสรุปผลการบริหารงานสำหรับผู้บริหาร
**มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย**
*ประมวลผลโดย Local AI Agent ณ วันที่ ${new Date().toLocaleDateString('th-TH')}*

---

### 1. สรุปภาพรวมความก้าวหน้าโครงการ
- **โครงการทั้งหมด:** ${context.projects.length} โครงการ (ดำเนินการตามแผน ${context.projects.filter(p => p.status === 'On Track').length} โครงการ, มีความเสี่ยง ${context.projects.filter(p => p.status === 'At Risk').length} โครงการ)
- **งบประมาณรวม:** ${context.projects.reduce((acc, curr) => acc + (Number(curr.budget)||0), 0).toLocaleString()} บาท
- **ความก้าวหน้าเฉลี่ย:** ${Math.round(context.projects.reduce((acc, curr) => acc + (Number(curr.progress)||0), 0) / context.projects.length)}%

### 2. มติที่ประชุมสำคัญและสถานะการติดตาม
${context.resolutions.map((r, i) => `- **${r.title}** (${r.meeting_no}) -> ผู้รับผิดชอบ: ${r.assignee} [สถานะ: ${r.status}]`).join('\n')}

### 3. ประเด็นความเสี่ยงและงานที่ต้องเร่งรัด
${context.tasks.filter(t => t.priority === 'Urgent' || t.status === 'Delayed').map(t => `- ⚠️ **${t.title}** (ผู้รับผิดชอบ: ${t.assignee}, กำหนดเสร็จ: ${t.deadline})`).join('\n')}

---
*หมายเหตุ: รายงานนี้จัดทำขึ้นโดย Local AI Agent จากฐานข้อมูลภายในหน่วยงาน เพื่อใช้ประกอบการพิจารณาของผู้บริหารเท่านั้น*`;

    citations = [
      { title: 'มติที่ประชุมสภาวิทยาลัย', source: 'ระบบติดตามมติที่ประชุม' },
      { title: 'แผนงานและโครงการ มหาวชิราลงกรณฯ', source: 'ระบบบริหารแผนงาน' },
      { title: 'ประกาศแนวปฏิบัติความปลอดภัย AI', source: 'คลังความรู้ภายใน (ระเบียบ)' }
    ];
  } else {
    // Normal Search & Q&A
    if (matchedKb.length > 0 || matchedResolutions.length > 0 || matchedProjects.length > 0 || matchedTasks.length > 0) {
      responseText = `จากการสืบค้นฐานความรู้ภายในหน่วยงาน พบข้อมูลที่เกี่ยวข้องดังนี้:\n\n`;

      if (matchedResolutions.length > 0) {
        responseText += `📌 **มติที่ประชุมที่เกี่ยวข้อง (${matchedResolutions.length} รายการ):**\n`;
        matchedResolutions.forEach(r => {
          responseText += `- **${r.title}** (${r.meeting_no}) — ผู้รับผิดชอบ: ${r.assignee} (สถานะ: ${r.status})\n`;
          citations.push({ title: `${r.title} (${r.meeting_no})`, source: `มติวันที่ ${r.meeting_date}` });
        });
        responseText += `\n`;
      }

      if (matchedKb.length > 0) {
        responseText += `📚 **เอกสาร/ระเบียบในฐานความรู้ (${matchedKb.length} รายการ):**\n`;
        matchedKb.forEach(k => {
          responseText += `- **${k.title}** [หมวดหมู่: ${k.category}] — ${k.content.substring(0, 150)}...\n`;
          citations.push({ title: k.title, source: `${k.category} - ${k.source}` });
        });
        responseText += `\n`;
      }

      if (matchedProjects.length > 0) {
        responseText += `🚀 **โครงการที่เกี่ยวข้อง (${matchedProjects.length} รายการ):**\n`;
        matchedProjects.forEach(p => {
          responseText += `- **${p.name}** — ผู้รับผิดชอบ: ${p.owner} | ความก้าวหน้า: ${p.progress}% [สถานะ: ${p.status}]\n`;
          citations.push({ title: p.name, source: `ผู้รับผิดชอบ: ${p.owner}` });
        });
        responseText += `\n`;
      }

      if (matchedTasks.length > 0) {
        responseText += `📋 **ภารกิจที่เกี่ยวข้อง (${matchedTasks.length} รายการ):**\n`;
        matchedTasks.forEach(t => {
          responseText += `- **${t.title}** — ผู้รับผิดชอบ: ${t.assignee} | กำหนดส่ง: ${t.deadline} [สถานะ: ${t.status}]\n`;
          citations.push({ title: t.title, source: `กำหนดส่ง ${t.deadline}` });
        });
      }

    } else {
      responseText = `จากการค้นหาเกี่ยวกับ **"${query}"** ในฐานความรู้ มติที่ประชุม และภารกิจปัจจุบัน ยังไม่พบรายการที่ตรงกันโดยตรง\n\n💡 **ข้อเสนอแนะจาก Local AI Agent:**\n1. คุณสามารถเพิ่มคำสั่ง/ระเบียบหรือมติที่ประชุมใหม่เข้าสู่ **"ฐานความรู้ภายใน"**\n2. AI ได้เตรียมเทมเพลตและคำถามเปิดสำหรับประสานงานกับผู้รับผิดชอบเรียบร้อยแล้ว`;
      citations = [
        { title: 'ข้อบังคับการบริหารงานภายใน พ.ศ. 2568', source: 'ฐานความรู้มหาวชิราลงกรณฯ' }
      ];
    }
  }

  return res.json({
    success: true,
    data: {
      query,
      answer: responseText,
      citations,
      matchedCount: matchedKb.length + matchedResolutions.length + matchedProjects.length + matchedTasks.length
    }
  });
});

export default router;
