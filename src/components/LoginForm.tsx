import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Anchor, Eye, EyeOff } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      // Login successful, the auth context will handle the state
    } else {
      setError('Email ou senha incorretos');
    }
  };

  const handleDemoLogin = (userType: 'player' | 'master') => {
    const demoCredentials = {
      player: { email: 'luffy@pirate.com', password: 'senha123' },
      master: { email: 'master@navy.com', password: 'senha123' }
    };
    
    const { email: demoEmail, password: demoPassword } = demoCredentials[userType];
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    if (login(demoEmail, demoPassword)) {
      // Login successful
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4 relative">
      {/* Background com tema náutico */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1705370401172-083571283df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBwaXJhdGUlMjBtYXAlMjB0cmVhc3VyZXxlbnwxfHx8fDE3NTY0MzA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-amber-50/95 backdrop-blur-sm border-4 border-amber-600 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-700 p-3 rounded-full">
                <Anchor className="h-8 w-8 text-amber-100" />
              </div>
            </div>
            <CardTitle className="text-2xl text-amber-900">Two Piece ON</CardTitle>
            <CardDescription className="text-amber-700">
              Entre na sua aventura pirata
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-amber-800">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="border-amber-300 focus:border-amber-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-amber-800">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-amber-300 focus:border-amber-500 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-amber-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-300 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              >
                Entrar
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-amber-300">
              <p className="text-sm text-amber-700 text-center mb-3">Login de demonstração:</p>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-400 text-blue-700 hover:bg-blue-50"
                  onClick={() => handleDemoLogin('player')}
                >
                  🏴‍☠️ Pirata (Luffy)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-800 hover:bg-blue-50"
                  onClick={() => {
                    setEmail('smoker@navy.gov');
                    setPassword('senha123');
                    login('smoker@navy.gov', 'senha123');
                  }}
                >
                  ⚓ Marinheiro (Smoker)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-orange-400 text-orange-700 hover:bg-orange-50"
                  onClick={() => {
                    setEmail('sabo@revolution.org');
                    setPassword('senha123');
                    login('sabo@revolution.org', 'senha123');
                  }}
                >
                  🔥 Revolucionário (Sabo)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    setEmail('morgans@worldnews.com');
                    setPassword('senha123');
                    login('morgans@worldnews.com', 'senha123');
                  }}
                >
                  📰 Jornalista (Morgans)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-red-400 text-red-700 hover:bg-red-50"
                  onClick={() => handleDemoLogin('master')}
                >
                  👑 Mestre do Jogo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};