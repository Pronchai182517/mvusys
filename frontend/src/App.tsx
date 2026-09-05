import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResolutionsPage } from './pages/ResolutionsPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { AIAgentPage } from './pages/AIAgentPage';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { User, UserRole } from './types';

const USERS: Record<UserRole, User> = {
  admin: { id: 'usr-1', name: 'พระพรชัย วรชโย', role: 'admin', title: 'นักวิชาการคอมพิวเตอร์', department: 'ส่วนงานบริหารองค์กร', email: 'worachayo@mvu.ac.th' },
  executive: { id: 'usr-2', name: 'ผู้บริหาร มหาวชิราลงกรณฯ', role: 'executive', title: 'รองอธิการบดี / ผู้บริหาร', department: 'สำนักงานผู้บริหาร', email: 'exec@mvu.ac.th' },
  project_lead: { id: 'usr-3', name: 'เจ้าหน้าที่แผนงานและงบประมาณ', role: 'project_lead', title: 'นักวิเคราะห์นโยบายและแผน', department: 'งานแผนและงบประมาณ', email: 'plan@mvu.ac.th' },
  tracking_officer: { id: 'usr-4', name: 'เจ้าหน้าที่ติดตามประเมินผล', role: 'tracking_officer', title: 'เจ้าหน้าที่ประกันคุณภาพ', department: 'งานประกันคุณภาพ', email: 'qa@mvu.ac.th' }
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [customUser, setCustomUser] = useState<User | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const currentUser = customUser || USERS[currentRole];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        onRoleChange={(newRole) => {
          setCustomUser(null);
          setCurrentRole(newRole);
        }}
        onOpenGoogleLogin={() => setIsGoogleModalOpen(true)}
      />

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setCustomUser(loggedInUser);
        }}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content View Area */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <DashboardPage onNavigate={setActiveTab} />}
          {activeTab === 'tasks' && <TasksPage />}
          {activeTab === 'projects' && <ProjectsPage />}
          {activeTab === 'resolutions' && <ResolutionsPage />}
          {activeTab === 'knowledge' && <KnowledgePage />}
          {activeTab === 'ai-agent' && <AIAgentPage />}
        </main>
      </div>
    </div>
  );
};

export default App;
