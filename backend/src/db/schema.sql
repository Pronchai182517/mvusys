-- Schema SQL for Mahaajiralongkorn Pali Theravada Rajavidyalaya Administration (mvusys)

-- 1. Users / Roles Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'admin', 'executive', 'project_lead', 'tracking_officer'
  title VARCHAR(255),
  department VARCHAR(255),
  email VARCHAR(255)
);

-- 2. Tasks / Assignments Table (ภารกิจและงาน)
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  assignee VARCHAR(255) NOT NULL,
  deadline DATE NOT NULL,
  priority VARCHAR(50) DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Urgent'
  status VARCHAR(50) DEFAULT 'In Progress', -- 'Pending', 'In Progress', 'Completed', 'Delayed'
  evidence TEXT,
  category VARCHAR(100) DEFAULT 'บริหารงานทั่วไป',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects & Action Plans Table (แผนงานและโครงการ)
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  objective TEXT,
  budget NUMERIC(12,2) DEFAULT 0.00,
  progress INTEGER DEFAULT 0, -- 0 to 100%
  status VARCHAR(50) DEFAULT 'On Track', -- 'On Track', 'At Risk', 'Completed', 'Delayed'
  owner VARCHAR(255) NOT NULL,
  kpis TEXT,
  obstacles TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Meeting Resolutions Table (มติที่ประชุม)
CREATE TABLE IF NOT EXISTS resolutions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  meeting_no VARCHAR(100) NOT NULL,
  meeting_date DATE NOT NULL,
  assignee VARCHAR(255) NOT NULL,
  deadline DATE,
  status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'In Progress', 'Completed'
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Knowledge Base Table (ฐานความรู้ภายใน)
CREATE TABLE IF NOT EXISTS knowledge_base (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- 'ระเบียบ', 'คำสั่ง', 'แบบฟอร์ม', 'คู่มือ', 'รายงานการประชุม'
  file_type VARCHAR(50) DEFAULT 'PDF',
  source VARCHAR(255),
  content TEXT NOT NULL,
  tags TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
