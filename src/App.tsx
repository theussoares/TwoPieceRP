import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { CharacterSheet } from './components/CharacterSheet';
import { News } from './components/News';
import { Rankings } from './components/Rankings';
import { Interviews } from './components/Interviews';
import { ManageCharacters } from './components/ManageCharacters';
import { OrganizationsPage } from './components/OrganizationsPage';
import { EnergySystemPage } from './components/EnergySystemPage';
import { ProfessionsPage } from './components/ProfessionsPage';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'character':
        return <CharacterSheet />;
      case 'news':
        return <News />;
      case 'rankings':
        return <Rankings />;
      case 'interviews':
        return <Interviews />;
      case 'organizations':
        return <OrganizationsPage />;
      case 'energy-system':
        return <EnergySystemPage />;
      case 'professions':
        return <ProfessionsPage />;
      case 'manage':
        return <ManageCharacters />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}