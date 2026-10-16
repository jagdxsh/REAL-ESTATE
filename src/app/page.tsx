'use client';

import React, { useState } from 'react';
import { UserRole, UserProfile } from '@/types';
import AuthPage from '@/components/auth/AuthPage';
import Header from '@/components/layout/Header';
import Sidebar, { NavigationTab } from '@/components/layout/Sidebar';
import RoleHub from '@/components/roles/RoleHub';
import BuilderPanel from '@/components/roles/BuilderPanel';
import LandOwnerPanel from '@/components/roles/LandOwnerPanel';
import RealtorPanel from '@/components/roles/RealtorPanel';
import BuyerPanel from '@/components/roles/BuyerPanel';
import ReadyReckonerModule from '@/components/modules/ReadyReckonerModule';
import DpdpModule from '@/components/modules/DpdpModule';
import VastuModule from '@/components/modules/VastuModule';
import NumerologyMuhurtaModule from '@/components/modules/NumerologyMuhurtaModule';
import LegalDueDiligenceModule from '@/components/modules/LegalDueDiligenceModule';
import DataIngestionModule from '@/components/modules/DataIngestionModule';
import AiAssistantModal from '@/components/modules/AiAssistantModal';
import AdminPanel from '@/components/modules/AdminPanel';

export default function Home() {
  // Session State: User must authenticate first
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('builder');
  const [activeTab, setActiveTab] = useState<NavigationTab>('hub');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // If user is not authenticated, strictly show the Login Screen
  if (!currentUser) {
    return (
      <AuthPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentRole(user.role);
          setActiveTab('hub');
        }}
      />
    );
  }

  // Handle Tab Selection with AI Special Case
  const handleSelectTab = (tab: NavigationTab) => {
    if (tab === 'ai_assistant') {
      setAiModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(newRole) => {
          setCurrentRole(newRole);
          // If in a role tab, switch to that specific role panel
          if (['builder', 'landowner', 'realtor', 'buyer'].includes(activeTab)) {
            setActiveTab(newRole as NavigationTab);
          }
        }}
        userName={currentUser.name}
        onLogout={() => setCurrentUser(null)}
        onOpenAiAssistant={() => setAiModalOpen(true)}
        activeTab={activeTab}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Enterprise Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          currentRole={currentRole}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'hub' && (
              <RoleHub
                currentRole={currentRole}
                onSelectRole={(r) => setCurrentRole(r)}
                onNavigateTab={(t) => setActiveTab(t)}
                userName={currentUser.name}
              />
            )}

            {activeTab === 'builder' && <BuilderPanel />}

            {activeTab === 'landowner' && <LandOwnerPanel />}

            {activeTab === 'realtor' && <RealtorPanel />}

            {activeTab === 'buyer' && <BuyerPanel />}

            {activeTab === 'ready_reckoner' && <ReadyReckonerModule />}

            {activeTab === 'dpdp' && <DpdpModule />}

            {activeTab === 'vastu' && <VastuModule />}

            {activeTab === 'numerology' && <NumerologyMuhurtaModule />}

            {activeTab === 'due_diligence' && <LegalDueDiligenceModule />}

            {activeTab === 'properties' && <BuyerPanel />}

            {activeTab === 'ingestion' && <DataIngestionModule />}

            {activeTab === 'admin' && <AdminPanel />}
          </div>
        </main>
      </div>

      {/* Grounded AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        userRole={currentRole}
      />
    </div>
  );
}
