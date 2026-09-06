import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    let data, error; // const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (!error && data && data.length > 0) {
      return res.json({ success: true, source: 'supabase', data });
    }
  } catch (err) {
    console.error('Supabase projects fetch error:', err.message);
  }
  return res.json({ success: true, source: 'local_store', data: mockData.projects });
});

// POST create project
router.post('/', async (req, res) => {
  const { name, objective, budget, progress, status, owner, kpis, obstacles, start_date, end_date } = req.body;
  const newProject = {
    id: Date.now(),
    name: name || 'โครงการใหม่',
    objective: objective || '',
    budget: Number(budget) || 0,
    progress: Number(progress) || 0,
    status: status || 'On Track',
    owner: owner || 'ไม่ระบุผู้รับผิดชอบ',
    kpis: kpis || '',
    obstacles: obstacles || '',
    start_date: start_date || new Date().toISOString().split('T')[0],
    end_date: end_date || '',
    created_at: new Date().toISOString()
  };

  try {
    let data, error; // const { data, error } = await supabase.from('projects').insert([newProject]).select();
    if (!error && data) {
      mockData.projects.push(data[0]);
      return res.json({ success: true, data: data[0] });
    }
  } catch (err) {}

  mockData.projects.push(newProject);
  return res.json({ success: true, data: newProject });
});

// PUT update project
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  try {
    let data, error; // const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select();
    if (!error && data) {
      return res.json({ success: true, data: data[0] });
    }
  } catch (err) {}

  const index = mockData.projects.findIndex(p => p.id === id);
  if (index !== -1) {
    mockData.projects[index] = { ...mockData.projects[index], ...updates };
    return res.json({ success: true, data: mockData.projects[index] });
  }

  return res.status(404).json({ success: false, message: 'Project not found' });
});

// DELETE project
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await supabase.from('projects').delete().eq('id', id);
  } catch (err) {}
  mockData.projects = mockData.projects.filter(p => p.id !== id);
  return res.json({ success: true, id });
});

export default router;
