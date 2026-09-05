import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import tasksRouter from './routes/tasks.js';
import projectsRouter from './routes/projects.js';
import resolutionsRouter from './routes/resolutions.js';
import knowledgeRouter from './routes/knowledge.js';
import dashboardRouter from './routes/dashboard.js';
import aiAgentRouter from './routes/aiAgent.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/tasks', tasksRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/resolutions', resolutionsRouter);
app.use('/api/knowledge', knowledgeRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/ai-agent', aiAgentRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Mahaajiralongkorn Pali Theravada Rajavidyalaya Local AI Agent Backend',
    database: 'Supabase PostgreSQL (https://supabase.palithaillm.in.th)',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`🔗 Connected to Supabase at ${process.env.SUPABASE_URL || 'https://supabase.palithaillm.in.th'}`);
});
