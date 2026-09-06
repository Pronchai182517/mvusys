import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let data, error; // const { data, error } = await supabase.from('knowledge_base').select('*').order('id', { ascending: true });
    if (!error && data && data.length > 0) {
      return res.json({ success: true, source: 'supabase', data });
    }
  } catch (err) {}
  return res.json({ success: true, source: 'local_store', data: mockData.knowledge_base });
});

router.post('/', async (req, res) => {
  const { title, category, file_type, source, content, tags } = req.body;
  const newKb = {
    id: Date.now(),
    title: title || 'เอกสารใหม่',
    category: category || 'ระเบียบ',
    file_type: file_type || 'PDF',
    source: source || 'ส่วนงานบริหาร',
    content: content || '',
    tags: tags || '',
    created_at: new Date().toISOString()
  };

  try {
    let data, error; // const { data, error } = await supabase.from('knowledge_base').insert([newKb]).select();
    if (!error && data) {
      mockData.knowledge_base.push(data[0]);
      return res.json({ success: true, data: data[0] });
    }
  } catch (err) {}

  mockData.knowledge_base.push(newKb);
  return res.json({ success: true, data: newKb });
});

export default router;
