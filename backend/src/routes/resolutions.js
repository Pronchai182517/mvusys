import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let data, error; // const { data, error } = await supabase.from('resolutions').select('*').order('id', { ascending: true });
    if (!error && data && data.length > 0) {
      return res.json({ success: true, source: 'supabase', data });
    }
  } catch (err) {}
  return res.json({ success: true, source: 'local_store', data: mockData.resolutions });
});

router.post('/', async (req, res) => {
  const { title, meeting_no, meeting_date, assignee, deadline, status, details } = req.body;
  const newRes = {
    id: Date.now(),
    title: title || 'มติที่ประชุมใหม่',
    meeting_no: meeting_no || 'ครั้งที่ 1/2569',
    meeting_date: meeting_date || new Date().toISOString().split('T')[0],
    assignee: assignee || 'ยังไม่มอบหมาย',
    deadline: deadline || '',
    status: status || 'Pending',
    details: details || '',
    created_at: new Date().toISOString()
  };

  try {
    let data, error; // const { data, error } = await supabase.from('resolutions').insert([newRes]).select();
    if (!error && data) {
      mockData.resolutions.push(data[0]);
      return res.json({ success: true, data: data[0] });
    }
  } catch (err) {}

  mockData.resolutions.push(newRes);
  return res.json({ success: true, data: newRes });
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  try {
    let data, error; // const { data, error } = await supabase.from('resolutions').update(updates).eq('id', id).select();
    if (!error && data) {
      return res.json({ success: true, data: data[0] });
    }
  } catch (err) {}

  const index = mockData.resolutions.findIndex(r => r.id === id);
  if (index !== -1) {
    mockData.resolutions[index] = { ...mockData.resolutions[index], ...updates };
    return res.json({ success: true, data: mockData.resolutions[index] });
  }

  return res.status(404).json({ success: false, message: 'Resolution not found' });
});

export default router;
