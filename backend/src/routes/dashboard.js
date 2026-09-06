import express from 'express';
import { supabase } from '../db/supabaseClient.js';

const router = express.Router();

router.get('/summary', async (req, res) => {
  try {
    const [tasksRes, projectsRes, resRes, kbRes] = await Promise.all([
      supabase.from('tasks').select('*'),
      supabase.from('projects').select('*'),
      supabase.from('resolutions').select('*'),
      supabase.from('knowledge_base').select('*')
    ]);

    const tasks = tasksRes.data || [];
    const projects = projectsRes.data || [];
    const resolutions = resRes.data || [];
    const knowledge = kbRes.data || [];

    // Calculate statistics
    const totalTasks = tasks.length;
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const delayedTasks = tasks.filter(t => t.status === 'Delayed').length;

    const totalProjects = projects.length;
    const onTrackProjects = projects.filter(p => p.status === 'On Track').length;
    const atRiskProjects = projects.filter(p => p.status === 'At Risk').length;
    const totalBudget = projects.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
    const avgProgress = totalProjects > 0
      ? Math.round(projects.reduce((acc, curr) => acc + (Number(curr.progress) || 0), 0) / totalProjects)
      : 0;

    const pendingResolutions = resolutions.filter(r => r.status !== 'Completed').length;

    // Key Risk & Follow-up Items for Executives
    const urgentTasks = tasks.filter(t => t.priority === 'Urgent' || t.status === 'Delayed');
    const riskProjects = projects.filter(p => p.status === 'At Risk' || p.obstacles);

    return res.json({
      success: true,
      data: {
        stats: {
          tasks: { total: totalTasks, inProgress: inProgressTasks, completed: completedTasks, delayed: delayedTasks },
          projects: { total: totalProjects, onTrack: onTrackProjects, atRisk: atRiskProjects, totalBudget, avgProgress },
          resolutions: { total: resolutions.length, pending: pendingResolutions },
          knowledgeDocs: knowledge.length
        },
        urgentTasks,
        riskProjects,
        recentResolutions: resolutions.slice(0, 5)
      }
    });
  } catch (err) {
    console.error('Dashboard summary error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
