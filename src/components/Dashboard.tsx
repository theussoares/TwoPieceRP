import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Heart, 
  Zap, 
  DollarSign, 
  Star,
  Users,
  FileText,
  AlertCircle,
  User
} from 'lucide-react';
import { Separator } from './ui/separator';
import { mockCharacters, mockNews, mockInterviews } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  
  // Buscar personagem do usuário atual
  const userCharacter = mockCharacters.find(char => char.userId === user?.id);
  
  // Top 3 Rankings (Mais Procurados)
  const topBounties = mockCharacters
    .sort((a, b) => b.bounty - a.bounty)
    .slice(0, 3);
  
  // Últimas 3 notícias
  const latestNews = mockNews.slice(0, 3);
  
  // Pendências para mestres
  const pendingInterviews = mockInterviews.filter(interview => interview.status === 'pending');

  if (user?.role === 'master') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-amber-900">Dashboard do Mestre</h1>
          <Badge variant="destructive" className="bg-red-700">
            Almirante
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total de Piratas
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{mockCharacters.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">
                Entrevistas Pendentes
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">{pendingInterviews.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Notícias Publicadas
              </CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{mockNews.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Maior Recompensa
              </CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {(topBounties[0]?.bounty / 1000000).toFixed(0)}M
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Piratas Mais Procurados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topBounties.map((character, index) => (
                  <div key={character.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-amber-100">
                        #{index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium text-amber-900">{character.name}</p>
                        <p className="text-sm text-amber-700">"{character.nickname}"</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-900">
                        {(character.bounty / 1000000).toFixed(0)}M ฿
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Entrevistas Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingInterviews.length > 0 ? (
                <div className="space-y-3">
                  {pendingInterviews.map((interview) => (
                    <div key={interview.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="font-medium text-yellow-900">{interview.title}</p>
                      <p className="text-sm text-yellow-700">Por: {interview.characterName}</p>
                      <p className="text-xs text-yellow-600">{interview.date}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => onNavigate('interviews')}
                    className="w-full mt-3 p-2 bg-amber-100 hover:bg-amber-200 rounded-lg text-amber-800 transition-colors"
                  >
                    Ver todas as entrevistas
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhuma entrevista pendente</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getCharacterTypeBadge = () => {
    if (userCharacter?.organization) {
      if (userCharacter.organization.type === 'marine_rank') {
        return <Badge variant="default" className="bg-blue-700">⚓ Marinha - {userCharacter.organization.position}</Badge>;
      }
      if (userCharacter.organization.type === 'revolutionary_army') {
        return <Badge variant="default" className="bg-orange-700">🔥 Revolucionário - {userCharacter.organization.position}</Badge>;
      }
      if (userCharacter.organization.type === 'journalist_agency') {
        return <Badge variant="default" className="bg-purple-700">📰 {userCharacter.organization.position}</Badge>;
      }
      if (userCharacter.organization.type === 'pirate_crew') {
        return <Badge variant="default" className="bg-red-700">🏴‍☠️ {userCharacter.organization.position}</Badge>;
      }
    }
    return <Badge variant="default" className="bg-gray-700">🌊 Independente</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-amber-900">Bem-vindo de volta, {userCharacter?.name}!</h1>
        {getCharacterTypeBadge()}
      </div>

      {userCharacter && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">
                Nível
              </CardTitle>
              <Star className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{userCharacter.level}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                🟢 Resistência
              </CardTitle>
              <Heart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {(userCharacter.energies?.resistance?.current || 0).toLocaleString()}
              </div>
              <div className="text-sm text-green-600">
                Max: {(userCharacter.energies?.resistance?.max || 0).toLocaleString()}%
              </div>
              <Progress 
                value={((userCharacter.energies?.resistance?.current || 0) / (userCharacter.energies?.resistance?.max || 1)) * 100} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                🔴 Stamina
              </CardTitle>
              <Zap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {(userCharacter.energies?.stamina?.current || 0).toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">
                Max: {(userCharacter.energies?.stamina?.max || 0).toLocaleString()}%
              </div>
              <Progress 
                value={((userCharacter.energies?.stamina?.current || 0) / (userCharacter.energies?.stamina?.max || 1)) * 100} 
                className="mt-2 h-2" 
              />
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                ⚫ Haki
              </CardTitle>
              <Star className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {(userCharacter.energies?.haki?.current || 0).toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">
                Max: {(userCharacter.energies?.haki?.max || 0).toLocaleString()}%
              </div>
              <Progress 
                value={((userCharacter.energies?.haki?.current || 0) / (userCharacter.energies?.haki?.max || 1)) * 100} 
                className="mt-2 h-2" 
              />
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">
                {userCharacter.bounty > 0 ? 'Recompensa' : 'Reputação'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">
                {userCharacter.bounty > 0 
                  ? `${(userCharacter.bounty / 1000000).toFixed(0)}M ฿`
                  : 'Honrado'
                }
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Informações da Organização e Estilos */}
      {userCharacter && (userCharacter.organization || (userCharacter.fightingStyle && userCharacter.fightingStyle.length > 0)) && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informações Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userCharacter.organization && (
                <div>
                  <h4 className="font-medium text-amber-800 mb-3">Organização</h4>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="font-medium text-amber-900 text-lg">{userCharacter.organization.name}</p>
                    <p className="text-amber-700 mt-1">{userCharacter.organization.position}</p>
                    <Badge variant="outline" className="bg-amber-100 mt-2">
                      {userCharacter.organization.type === 'pirate_crew' && '🏴‍☠️ Tripulação Pirata'}
                      {userCharacter.organization.type === 'marine_rank' && '⚓ Marinha'}
                      {userCharacter.organization.type === 'revolutionary_army' && '🔥 Exército Revolucionário'}
                      {userCharacter.organization.type === 'journalist_agency' && '📰 Agência Jornalística'}
                    </Badge>
                  </div>
                </div>
              )}
              
              {userCharacter.fightingStyle && userCharacter.fightingStyle.length > 0 && (
                <div>
                  <h4 className="font-medium text-amber-800 mb-3">Estilos de Luta</h4>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex flex-wrap gap-2">
                      {userCharacter.fightingStyle.map((style) => (
                        <Badge key={style} variant="outline" className="bg-orange-100 text-orange-800">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Top 3 Mais Procurados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topBounties.map((character, index) => (
                <div key={character.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant="outline" 
                      className={`${
                        index === 0 ? 'bg-yellow-100 border-yellow-400' :
                        index === 1 ? 'bg-gray-100 border-gray-400' :
                        'bg-orange-100 border-orange-400'
                      }`}
                    >
                      #{index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-amber-900">{character.name}</p>
                      <p className="text-sm text-amber-700">"{character.nickname}"</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-900">
                      {(character.bounty / 1000000).toFixed(0)}M ฿
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('rankings')}
              className="w-full mt-4 p-2 bg-amber-100 hover:bg-amber-200 rounded-lg text-amber-800 transition-colors"
            >
              Ver ranking completo
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Últimas Notícias Mundiais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestNews.map((news) => (
                <div key={news.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900">{news.title}</h4>
                  <p className="text-sm text-blue-700 mt-1 line-clamp-2">
                    {news.content.substring(0, 80)}...
                  </p>
                  <p className="text-xs text-blue-600 mt-2">{news.date}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="w-full mt-4 p-2 bg-amber-100 hover:bg-amber-200 rounded-lg text-amber-800 transition-colors"
            >
              Ler todas as notícias
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};