import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').order('id', { ascending: true });
    if (!error && data && data.length > 0) {
      return res.json({ success: true, source: 'supabase', data });
    }
  } catch (err) {
    console.error('Supabase tasks fetch error, returning fallback store:', err.message);
  }
  return res.json({ success: true, source: 'local_store', data: mockData.tasks });
});

// POST create task
router.post('/', async (req, res) => {
  const { title, assignee, deadline, priority, status, evidence, category } = req.body;
  const newTask = {
    id: Date.now(),
    title: title || 'ภารกิจใหม่',
    assignee: assignee || 'ยังไม่ได้ระบุผู้รับผิดชอบ',
    deadline: deadline || new Date().toISOString().split('T')[0],
    priority: priority || 'Medium',
    status: status || 'Pending',
    evidence: evidence || '',
    category: category || 'บริหารงานทั่วไป',
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('tasks').insert([newTask]).select();
    if (!error && data) {
      mockData.tasks.push(data[0]);
      return res.json({ success: true, data: data[0] });
    }
  } catch (err) {
    console.log('Inserting into fallback mock store:', err.message);
  }

  mockData.tasks.push(newTask);
  return res.json({ success: true, data: newTask });
});

// PUT update task status or details
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  try {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select();
    if (!error && data) {
      return res.json({ success: true, data: data[0] });
    }
  } catch (err) {
    console.log('Updating fallback mock store');
  }

  const index = mockData.tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    mockData.tasks[index] = { ...mockData.tasks[index], ...updates };
    return res.json({ success: true, data: mockData.tasks[index] });
  }

  return res.status(404).json({ success: false, message: 'Task not found' });
});

// DELETE task
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await supabase.from('tasks').delete().eq('id', id);
  } catch (err) {}
  mockData.tasks = mockData.tasks.filter(t => t.id !== id);
  return res.json({ success: true, id });
});

export default router;
