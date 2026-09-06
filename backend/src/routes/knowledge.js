import express from 'express';
import { supabase } from '../db/supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('knowledge_base').select('*').order('id', { ascending: true });
    if (error) throw error;
    return res.json({ success: true, source: 'supabase', data });
  } catch (err) {
    console.error('Supabase knowledge fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { title, category, file_type, source, content, tags } = req.body;
  const newKb = {
    title: title || 'เอกสารใหม่',
    category: category || 'ระเบียบ',
    file_type: file_type || 'PDF',
    source: source || 'ส่วนงานบริหาร',
    content: content || '',
    tags: tags || ''
  };

  try {
    const { data, error } = await supabase.from('knowledge_base').insert([newKb]).select();
    if (error) throw error;
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Supabase knowledge insert error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
