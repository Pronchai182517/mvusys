import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResolutionsPage } from './pages/ResolutionsPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { AIAgentPage } from './pages/AIAgentPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { VehicleBookingPage } from './pages/VehicleBookingPage';
import { VehicleAdminPage } from './pages/VehicleAdminPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { RegisterModal } from './components/RegisterModal';
import { User, UserRole } from './types';

const USERS: Record<UserRole, User> = {
  admin: { id: 'usr-1', name: 'ผู้ดูแลระบบสูงสุด', role: 'admin', title: 'นักวิชาการคอมพิวเตอร์', department: 'ส่วนงานบริหารองค์กร', email: 'admin@yourdomain.ac.th' },
  executive: { id: 'usr-2', name: 'ผู้บริหาร มหาวชิราลงกรณฯ', role: 'executive', title: 'รองอธิการบดี / ผู้บริหาร', department: 'สำนักงานผู้บริหาร', email: 'exec@mvu.ac.th' },
  project_lead: { id: 'usr-3', name: 'เจ้าหน้าที่แผนงานและงบประมาณ', role: 'project_lead', title: 'นักวิเคราะห์นโยบายและแผน', department: 'งานแผนและงบประมาณ', email: 'plan@mvu.ac.th' },
  tracking_officer: { id: 'usr-4', name: 'เจ้าหน้าที่ติดตามประเมินผล', role: 'tracking_officer', title: 'เจ้าหน้าที่ประกันคุณภาพ', department: 'งานประกันคุณภาพ', email: 'qa@mvu.ac.th' },
  vehicle_admin: { id: 'usr-5', name: 'เจ้าหน้าที่ดูแลระบบจองรถ', role: 'vehicle_admin', title: 'เจ้าหน้าที่ยานพาหนะ', department: 'ส่วนงานยานพาหนะ', email: 'vehicle@mvu.ac.th' }
};

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [customUser, setCustomUser] = useState<User | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUser = customUser || USERS[currentRole];

  const handleLoginSuccess = (loggedInUser: User) => {
    setCustomUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCustomUser(null);
  };

  // Enforce Login Screen as Landing Page ONLY
  if (!isAuthenticated) {
    if (showAdminLogin) {
      return <AdminLoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setShowAdminLogin(false)} />;
    }

    return (
      <>
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onOpenGoogleLogin={() => setIsGoogleModalOpen(true)}
          onOpenRegister={() => setIsRegisterModalOpen(true)}
          onAdminLoginClick={() => setShowAdminLogin(true)}
        />
        <GoogleLoginModal
          isOpen={isGoogleModalOpen}
          onClose={() => setIsGoogleModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen relative antialiased selection:bg-primary selection:text-on-primary">
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        onRoleChange={(newRole) => {
          setCustomUser(null);
          setCurrentRole(newRole);
        }}
        onOpenGoogleLogin={() => setIsGoogleModalOpen(true)}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
        onSignOut={handleSignOut}
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setCustomUser(loggedInUser);
        }}
      />

      {/* Member Register Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      {/* Sidebar Navigation Drawer */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* Content View Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface min-h-[calc(100vh-80px)]">
        {activeTab === 'dashboard' && <DashboardPage onNavigate={setActiveTab} />}
        {activeTab === 'tasks' && <TasksPage />}
        {activeTab === 'projects' && <ProjectsPage />}
        {activeTab === 'resolutions' && <ResolutionsPage />}
        {activeTab === 'knowledge' && <KnowledgePage />}
        {activeTab === 'ai-agent' && <AIAgentPage />}
        {activeTab === 'users' && <UserManagementPage currentUser={currentUser} />}
        {activeTab === 'vehicles' && <VehicleBookingPage />}
        {activeTab === 'vehicle_admin' && <VehicleAdminPage />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;

