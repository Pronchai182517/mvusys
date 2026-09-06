export type UserRole = 'admin' | 'executive' | 'project_lead' | 'tracking_officer' | 'vehicle_admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  department: string;
  email: string;
  status?: 'Active' | 'Pending' | 'Disabled';
  access_scope?: 'all' | 'department_only';
  allowed_departments?: string[];
  created_at?: string;
}

export interface Task {
  id: number;
  title: string;
  assignee: string;
  deadline: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  evidence?: string;
  category: string;
  created_at?: string;
}

export interface Project {
  id: number;
  name: string;
  objective: string;
  budget: number;
  progress: number; // 0-100
  status: 'On Track' | 'At Risk' | 'Completed' | 'Delayed';
  owner: string;
  kpis?: string;
  obstacles?: string;
  start_date?: string;
  end_date?: string;
}

export interface Resolution {
  id: number;
  title: string;
  meeting_no: string;
  meeting_date: string;
  assignee: string;
  deadline?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  details?: string;
}

export interface KnowledgeItem {
  id: number;
  title: string;
  category: string;
  file_type: string;
  source: string;
  content: string;
  tags?: string;
  created_at?: string;
}

export interface Vehicle {
  id: number;
  type: 'Van' | 'Pickup' | '6-Wheel';
  name: string;
  license_plate: string;
  status: 'Available' | 'Maintenance';
}

export interface VehicleBooking {
  id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  booker: string;
  vehicle_type: 'Van' | 'Pickup' | '6-Wheel';
  vehicle_id: number | null;
  driver: string;
  purpose: string;
  destination: string;
  passengers: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  admin_officer?: string;
  mileage_start: number;
  mileage_end: number;
  total_distance: number;
  created_at: string;
}

export interface Citation {
  title: string;
  source: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  citations?: Citation[];
}
