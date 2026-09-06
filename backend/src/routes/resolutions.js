import express from 'express';
import { supabase } from '../db/supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('resolutions').select('*').order('id', { ascending: true });
    if (error) throw error;
    return res.json({ success: true, source: 'supabase', data });
  } catch (err) {
    console.error('Supabase resolutions fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { title, meeting_no, meeting_date, assignee, deadline, status, details } = req.body;
  const newRes = {
    title: title || 'มติที่ประชุมใหม่',
    meeting_no: meeting_no || 'ครั้งที่ 1/2569',
    meeting_date: meeting_date || new Date().toISOString().split('T')[0],
    assignee: assignee || 'ยังไม่มอบหมาย',
    deadline: deadline || null,
    status: status || 'Pending',
    details: details || ''
  };

  try {
    const { data, error } = await supabase.from('resolutions').insert([newRes]).select();
    if (error) throw error;
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Supabase resolutions insert error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  try {
    const { data, error } = await supabase.from('resolutions').update(updates).eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Resolution not found' });
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Supabase resolutions update error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { error } = await supabase.from('resolutions').delete().eq('id', id);
    if (error) throw error;
    return res.json({ success: true, id });
  } catch (err) {
    console.error('Supabase resolutions delete error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
