import express from 'express';
import { supabase } from '../db/supabaseClient.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').order('id', { ascending: true });
    
    if (error) {
      console.error('Supabase tasks fetch error:', error.message);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    return res.json({ success: true, source: 'supabase', data });
  } catch (err) {
    console.error('Unexpected error fetching tasks:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST create task
router.post('/', async (req, res) => {
  const { title, assignee, deadline, priority, status, evidence, category } = req.body;
  const newTask = {
    title: title || 'ภารกิจใหม่',
    assignee: assignee || 'ยังไม่ได้ระบุผู้รับผิดชอบ',
    deadline: deadline || new Date().toISOString().split('T')[0],
    priority: priority || 'Medium',
    status: status || 'Pending',
    evidence: evidence || '',
    category: category || 'บริหารงานทั่วไป'
  };

  try {
    const { data, error } = await supabase.from('tasks').insert([newTask]).select();
    
    if (error) {
      console.error('Supabase tasks insert error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to create task' });
    }
    
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Unexpected error creating task:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT update task status or details
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  try {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select();
    
    if (error) {
      console.error('Supabase tasks update error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to update task' });
    }
    
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Unexpected error updating task:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    
    if (error) {
      console.error('Supabase tasks delete error:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to delete task' });
    }
    
    return res.json({ success: true, id });
  } catch (err) {
    console.error('Unexpected error deleting task:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
