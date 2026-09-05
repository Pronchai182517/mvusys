import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

router.get('/summary', async (req, res) => {
  let tasks = mockData.tasks;
  let projects = mockData.projects;
  let resolutions = mockData.resolutions;
  let knowledge = mockData.knowledge_base;

  try {
    const { data: dbTasks } = await supabase.from('tasks').select('*');
    if (dbTasks && dbTasks.length > 0) tasks = dbTasks;

    const { data: dbProjects } = await supabase.from('projects').select('*');
    if (dbProjects && dbProjects.length > 0) projects = dbProjects;

    const { data: dbRes } = await supabase.from('resolutions').select('*');
    if (dbRes && dbRes.length > 0) resolutions = dbRes;

    const { data: dbKb } = await supabase.from('knowledge_base').select('*');
    if (dbKb && dbKb.length > 0) knowledge = dbKb;
  } catch (err) {
    console.log('Dashboard summary using fallback store');
  }

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
});

export default router;
