import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Briefcase, 
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  Target,
  Calendar,
  Trophy
} from 'lucide-react';
import { professionInfo, calculateWeeklyTaskExp, getCurrentWeekString } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { mockCharacters } from '../data/mockData';

export const ProfessionsPage: React.FC = () => {
  const { user } = useAuth();
  const userCharacter = mockCharacters.find(char => char.userId === user?.id);

  const renderProfessionCard = (professionName: string, profession: any) => {
    const isUserProfession = userCharacter?.profession === professionName;
    const userProfessionLevel = isUserProfession ? (userCharacter?.skillLevels?.profession || 0) : 0;
    
    return (
      <Card key={professionName} className={`relative overflow-hidden ${isUserProfession ? 'ring-2 ring-amber-500 bg-amber-50' : ''}`}>
        {isUserProfession && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-amber-600">Sua Profissão</Badge>
          </div>
        )}
        
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="text-2xl">{profession.icon}</div>
            <div>
              <h3 className="text-amber-900">{professionName}</h3>
              {isUserProfession && (
                <Badge variant="outline" className="bg-blue-100 text-blue-800 mt-1">
                  Nível {userProfessionLevel}
                </Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription>{profession.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h5 className="font-medium text-amber-800 mb-3">📊 Sistema de Bônus ({profession.bonusType})</h5>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(profession.bonuses).map(([level, bonus]) => (
                <div 
                  key={level} 
                  className={`p-2 rounded border text-center text-sm ${
                    isUserProfession && parseInt(level) === userProfessionLevel 
                      ? 'bg-amber-200 border-amber-400 font-bold' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-xs text-gray-600">Lvl {level}</div>
                  <div className="font-medium">{bonus}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <h6 className="text-blue-800 font-medium mb-2">📋 Tarefa Semanal</h6>
            <p className="text-blue-700 text-sm">{profession.task}</p>
            <p className="text-blue-600 text-xs mt-1">Recompensa: 5.000% EXP (máx. 4 por semana)</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-amber-900 mb-4 flex items-center justify-center gap-3">
          <Briefcase className="h-8 w-8" />
          Sistema de Profissões
        </h1>
        <p className="text-amber-700 max-w-4xl mx-auto">
          Escolha sua especialidade e domine as artes que farão de você um tripulante indispensável. 
          Cada profissão oferece bônus únicos e tarefas semanais para ganhar EXP adicional.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        {/* 1. Adicionamos um container que permite o scroll horizontal */}
<div className="overflow-x-auto pb-2">
  {/* 2. Removemos o grid e o texto pequeno, deixando as abas fluírem */}
  <TabsList className="inline-flex h-auto p-1 w-full sm:w-auto">
    {/* 3. Aumentamos o espaçamento para melhor toque e leitura */}
    <TabsTrigger value="overview" className="flex-1 sm:flex-initial flex items-center gap-2">
      <Briefcase className="h-4 w-4" />
      Profissões
    </TabsTrigger>
    <TabsTrigger value="tasks" className="flex-1 sm:flex-initial flex items-center gap-2">
      <Calendar className="h-4 w-4" />
      Tarefas Semanais
    </TabsTrigger>
    <TabsTrigger value="progress" className="flex-1 sm:flex-initial flex items-center gap-2">
      <TrendingUp className="h-4 w-4" />
      Meu Progresso
    </TabsTrigger>
  </TabsList>
</div>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Briefcase className="h-6 w-6" />
                </div>
                Como Funcionam as Profissões
              </CardTitle>
              <CardDescription className="text-blue-700">
                Cada profissão possui suas especialidades e benefícios únicos para sua tripulação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-amber-800 font-medium mb-2">🔧 Especialização</h4>
                  <p className="text-gray-700 text-sm">
                    Cada profissão oferece bônus específicos que melhoram conforme você aumenta seu nível profissional.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-amber-800 font-medium mb-2">📈 Evolução</h4>
                  <p className="text-gray-700 text-sm">
                    Use pontos de habilidade para aumentar seu nível profissional e desbloquear novos bônus.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-amber-800 font-medium mb-2">⏰ Tarefas Semanais</h4>
                  <p className="text-gray-700 text-sm">
                    Complete tarefas específicas de sua profissão para ganhar 5.000% EXP por tarefa (máx. 20.000% por mês).
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-amber-800 font-medium mb-2">🎯 Importância</h4>
                  <p className="text-gray-700 text-sm">
                    Todas as profissões são essenciais para o funcionamento de uma tripulação completa.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(professionInfo).map(([professionName, profession]) => 
              renderProfessionCard(professionName, profession)
            )}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Sistema de Tarefas Semanais
              </CardTitle>
              <CardDescription>
                Complete tarefas específicas da sua profissão para ganhar EXP adicional toda semana.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="text-amber-800 font-medium mb-3">📊 Informações Importantes</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-amber-700 mb-2"><strong>EXP por Tarefa:</strong> 5.000%</p>
                    <p className="text-amber-700 mb-2"><strong>Máximo Semanal:</strong> 4 tarefas (20.000% EXP)</p>
                    <p className="text-amber-700"><strong>Máximo Mensal:</strong> 20.000% EXP</p>
                  </div>
                  <div>
                    <p className="text-amber-700 mb-2"><strong>Reset:</strong> Todo Domingo</p>
                    <p className="text-amber-700 mb-2"><strong>Acumulativo:</strong> Não (reset semanal)</p>
                    <p className="text-amber-700"><strong>Restrição:</strong> Apenas sua profissão</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-amber-800 font-medium">📋 Tarefas por Profissão</h5>
                {Object.entries(professionInfo).map(([professionName, profession]) => (
                  <div key={professionName} className="bg-white border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{profession.icon}</span>
                      <h6 className="font-medium text-amber-900">{professionName}</h6>
                    </div>
                    <p className="text-gray-700 text-sm">{profession.task}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {userCharacter ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Minha Profissão: {userCharacter.profession}
                  </CardTitle>
                  <CardDescription>
                    Seu progresso como {userCharacter.profession} na tripulação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-amber-800 font-medium mb-2">📊 Nível Profissional</h4>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-600 text-lg px-3 py-1">
                            Nível {userCharacter.skillLevels?.profession || 0}
                          </Badge>
                          <div className="text-sm text-gray-600">
                            Bônus Atual: {professionInfo[userCharacter.profession as keyof typeof professionInfo]?.bonuses[(userCharacter.skillLevels?.profession || 0) as keyof typeof professionInfo[keyof typeof professionInfo]['bonuses']] || 'N/A'}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-amber-800 font-medium mb-2">🎯 Pontos Disponíveis</h4>
                        <p className="text-gray-700">
                          Você tem <strong>{userCharacter.skillPoints || 0} pontos</strong> para distribuir em habilidades.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-amber-800 font-medium mb-2">⏰ Progresso Semanal</h4>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-green-700">Tarefas Completadas</span>
                            <span className="font-medium text-green-800">
                              {userCharacter.weeklyTasks?.tasksCompleted || 0}/4
                            </span>
                          </div>
                          <Progress 
                            value={((userCharacter.weeklyTasks?.tasksCompleted || 0) / 4) * 100} 
                            className="h-2" 
                          />
                          <p className="text-green-600 text-sm mt-2">
                            EXP ganho esta semana: {userCharacter.weeklyTasks?.expEarnedThisWeek?.toLocaleString() || 0}%
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-amber-800 font-medium mb-2">📅 Progresso Mensal</h4>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-700">EXP Mensal</span>
                            <span className="font-medium text-blue-800">
                              {userCharacter.weeklyTasks?.expEarnedThisMonth?.toLocaleString() || 0}/20.000%
                            </span>
                          </div>
                          <Progress 
                            value={((userCharacter.weeklyTasks?.expEarnedThisMonth || 0) / 20000) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="text-amber-800 font-medium mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Sua Tarefa Atual
                    </h4>
                    <p className="text-amber-700">
                      {professionInfo[userCharacter.profession as keyof typeof professionInfo]?.task || 'Tarefa não definida'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-900">🏆 Benefícios da Sua Profissão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(professionInfo[userCharacter.profession as keyof typeof professionInfo]?.bonuses || {}).map(([level, bonus]) => (
                      <div 
                        key={level} 
                        className={`p-3 rounded-lg border text-center ${
                          parseInt(level) === (userCharacter.skillLevels?.profession || 0)
                            ? 'bg-amber-200 border-amber-400 ring-2 ring-amber-300' 
                            : parseInt(level) < (userCharacter.skillLevels?.profession || 0)
                            ? 'bg-green-100 border-green-300'
                            : 'bg-gray-100 border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Nível {level}</div>
                        <div className="text-xs">{bonus}</div>
                        {parseInt(level) === (userCharacter.skillLevels?.profession || 0) && (
                          <Badge className="bg-amber-600 text-xs mt-1">Atual</Badge>
                        )}
                        {parseInt(level) < (userCharacter.skillLevels?.profession || 0) && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 text-xs mt-1">Desbloqueado</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">Você precisa estar logado para ver seu progresso profissional.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};