import { Task, Project, Resolution, KnowledgeItem } from '../types';

const API_BASE = '/api';

export const api = {
  // Tasks
  async getTasks(): Promise<Task[]> {
    const res = await fetch(`${API_BASE}/tasks`);
    const data = await res.json();
    return data.data || [];
  },
  async createTask(task: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    return data.data;
  },
  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    return data.data;
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    return data.data || [];
  },
  async createProject(project: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    const data = await res.json();
    return data.data;
  },
  async updateProject(id: number, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    return data.data;
  },

  // Resolutions
  async getResolutions(): Promise<Resolution[]> {
    const res = await fetch(`${API_BASE}/resolutions`);
    const data = await res.json();
    return data.data || [];
  },
  async createResolution(resItem: Partial<Resolution>): Promise<Resolution> {
    const res = await fetch(`${API_BASE}/resolutions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resItem)
    });
    const data = await res.json();
    return data.data;
  },

  // Knowledge Base
  async getKnowledge(): Promise<KnowledgeItem[]> {
    const res = await fetch(`${API_BASE}/knowledge`);
    const data = await res.json();
    return data.data || [];
  },
  async createKnowledge(item: Partial<KnowledgeItem>): Promise<KnowledgeItem> {
    const res = await fetch(`${API_BASE}/knowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    const data = await res.json();
    return data.data;
  },

  // Dashboard
  async getDashboardSummary() {
    const res = await fetch(`${API_BASE}/dashboard/summary`);
    const data = await res.json();
    return data.data;
  },

  // AI Agent RAG Search & Report
  async queryAIAgent(query: string, mode: 'search' | 'draft_report' = 'search') {
    const res = await fetch(`${API_BASE}/ai-agent/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, mode })
    });
    const data = await res.json();
    return data.data;
  }
};
