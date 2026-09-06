import express from 'express';
import { supabase } from '../db/supabaseClient.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (error) throw error;
    return res.json({ success: true, source: 'supabase', data });
  } catch (err) {
    console.error('Supabase projects fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST create project
router.post('/', async (req, res) => {
  const { name, objective, budget, progress, status, owner, kpis, obstacles, start_date, end_date } = req.body;
  const newProject = {
    name: name || 'โครงการใหม่',
    objective: objective || '',
    budget: Number(budget) || 0,
    progress: Number(progress) || 0,
    status: status || 'On Track',
    owner: owner || 'ไม่ระบุผู้รับผิดชอบ',
    kpis: kpis || '',
    obstacles: obstacles || '',
    start_date: start_date || new Date().toISOString().split('T')[0],
    end_date: end_date || null
  };

  try {
    const { data, error } = await supabase.from('projects').insert([newProject]).select();
    if (error) throw error;
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Supabase project create error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  try {
    const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Supabase project update error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    return res.json({ success: true, id });
  } catch (err) {
    console.error('Supabase project delete error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
