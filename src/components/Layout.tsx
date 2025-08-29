import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  Anchor, 
  MapPin, 
  Users, 
  Trophy, 
  FileText, 
  User, 
  LogOut,
  Home,
  Flag,
  Zap,
  Briefcase,
  Menu
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'character', label: 'Minha Ficha', icon: User },
    { id: 'organizations', label: 'Organizações', icon: Flag },
    { id: 'professions', label: 'Profissões', icon: Briefcase },
    { id: 'energy-system', label: 'Sistema de Energias', icon: Zap },
    { id: 'news', label: 'Notícias Mundiais', icon: FileText },
    { id: 'rankings', label: 'Rankings', icon: Trophy },
    { id: 'interviews', label: 'Entrevistas', icon: Users },
  ];

  if (user?.role === 'master') {
    navigation.push({ id: 'manage', label: 'Gerenciar', icon: MapPin });
  }
  
  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const NavigationMenu = () => (
    <Card className="bg-amber-50/95 backdrop-blur-sm border-2 border-amber-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  currentPage === item.id 
                    ? 'bg-amber-700 text-white hover:bg-amber-800' 
                    : 'text-amber-800 hover:bg-amber-100'
                }`}
                onClick={() => handleNavigate(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 relative">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1705370401172-083571283df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBwaXJhdGUlMjBtYXAlMjB0cmVhc3VyZXxlbnwxfHx8fDE3NTY0MzA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <header className="relative z-20 bg-amber-900/90 backdrop-blur-sm border-b-4 border-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-amber-100 hover:bg-amber-800"
                // CORREÇÃO 2: Lógica de alternância (toggle)
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <Anchor className="h-8 w-8 text-amber-400" />
              <h1 className="text-amber-100 font-bold text-xl">Two Piece RP</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-amber-200 hidden sm:inline">
                {user?.characterName} ({user?.role === 'master' ? 'Mestre' : 'Pirata'})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="bg-red-700 border-red-600 text-white hover:bg-red-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Lateral Escondido (Mobile) */}
      {/* CORREÇÃO 1: Aumentado o z-index para z-50 */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Fundo escuro para fechar ao clicar */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          {/* Conteúdo do menu que desliza */}
          <div className="relative w-64 h-full bg-transparent transition-transform duration-300 ease-in-out transform">
             <NavigationMenu />
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Barra Lateral Estática (Desktop) */}
          <aside className="hidden lg:block lg:w-64">
            <NavigationMenu />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 min-h-[600px]">
              <div className="p-6">
                {children}
              </div>
            </Card>
          </main>
        </div>
      </div>
      <footer className="bg-amber-900/90 backdrop-blur-sm border-t-4 border-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-amber-200 text-sm text-center">
            &copy; 2023 Two Piece RP. Todos os direitos reservados.
            Desenvolvido por Matheus Ferreira Soares.
          </p>
        </div>
      </footer>
    </div>
  );
};