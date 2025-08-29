import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  DollarSign, 
  Star, 
  Medal, 
  Crown,
  Zap,
  Users
} from 'lucide-react';
import { mockCharacters } from '../data/mockData';

export const Rankings: React.FC = () => {
  // Separar personagens por tipo
  const pirates = mockCharacters.filter(char => 
    char.organization?.type === 'pirate_crew' || char.bounty > 0
  );
  const marines = mockCharacters.filter(char => 
    char.organization?.type === 'marine_rank'
  );
  const revolutionaries = mockCharacters.filter(char => 
    char.organization?.type === 'revolutionary_army'
  );
  const journalists = mockCharacters.filter(char => 
    char.organization?.type === 'journalist_agency'
  );

  // Ranking dos Mais Procurados (apenas piratas com recompensa)
  const mostWantedRanking = pirates
    .sort((a, b) => b.bounty - a.bounty)
    .map((character, index) => ({ ...character, position: index + 1 }));

  // Ranking dos Mais Fortes (baseado no sistema de energias)
  const strongestRanking = mockCharacters
    .map(character => ({
      ...character,
      totalPower: (character.energies?.stamina?.max || 0) + 
                  (character.energies?.haki?.max || 0) + 
                  (character.energies?.resistance?.max || 0)
    }))
    .sort((a, b) => b.totalPower - a.totalPower)
    .map((character, index) => ({ ...character, position: index + 1 }));

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-orange-500" />;
      default:
        return <Trophy className="h-5 w-5 text-amber-600" />;
    }
  };

  const getRankBadgeColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  const formatBounty = (bounty: number) => {
    if (bounty >= 1000000000) {
      return `${(bounty / 1000000000).toFixed(1)}B ฿`;
    } else if (bounty >= 1000000) {
      return `${(bounty / 1000000).toFixed(0)}M ฿`;
    } else if (bounty >= 1000) {
      return `${(bounty / 1000).toFixed(0)}K ฿`;
    }
    return `${bounty} ฿`;
  };

  const getCharacterTypeIcon = (character: any) => {
    if (character.organization) {
      switch (character.organization.type) {
        case 'marine_rank':
          return '⚓';
        case 'revolutionary_army':
          return '🔥';
        case 'journalist_agency':
          return '📰';
        case 'pirate_crew':
          return '🏴‍☠️';
        default:
          return '🌊';
      }
    }
    return '🌊';
  };

  const getCharacterTypeName = (character: any) => {
    if (character.organization) {
      switch (character.organization.type) {
        case 'marine_rank':
          return 'Marinha';
        case 'revolutionary_army':
          return 'Revolucionário';
        case 'journalist_agency':
          return 'Jornalista';
        case 'pirate_crew':
          return 'Pirata';
        default:
          return 'Independente';
      }
    }
    return 'Independente';
  };

  return (
    <div className="space-y-6">
      {/* MELHORIA 1: Cabeçalho Responsivo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h1 className="text-amber-900 flex items-center text-xl sm:text-2xl font-bold">
          <Trophy className="h-6 w-6 mr-3" />
          Rankings Mundiais
        </h1>
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-400 text-xs sm:text-sm">
          Atualizado em tempo real
        </Badge>
      </div>

      <Tabs defaultValue="wanted" className="w-full">
        {/* MELHORIA 2: Abas Roláveis em Telas Pequenas */}
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex h-auto p-1 w-full sm:w-auto">
            <TabsTrigger value="wanted" className="flex-1 sm:flex-initial flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Mais Procurados</span>
            </TabsTrigger>
            <TabsTrigger value="strongest" className="flex-1 sm:flex-initial flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Mais Fortes</span>
            </TabsTrigger>
            <TabsTrigger value="factions" className="flex-1 sm:flex-initial flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Por Facção</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="wanted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Ranking dos Mais Procurados
              </CardTitle>
              <CardDescription>
                Classificação baseada no valor das recompensas oferecidas pela Marinha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mostWantedRanking.map((character) => (
                  <div 
                    key={character.id}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
                      character.position <= 3 
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {/* MELHORIA 3: Layout do Item do Ranking empilhável */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="flex flex-col items-center space-y-1 mt-1">
                          {getRankIcon(character.position)}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getRankBadgeColor(character.position)}`}
                          >
                            #{character.position}
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-amber-900 text-lg">
                            {character.name}
                          </h3>
                          <p className="text-amber-700 italic text-sm">
                            "{character.nickname}"
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              Nível {character.level}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-100 text-gray-800">
                              {getCharacterTypeIcon(character)} {getCharacterTypeName(character)}
                            </Badge>
                            {character.organization && (
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs">
                                {character.organization.position}
                              </Badge>
                            )}
                          </div>
                          {character.fightingStyle && character.fightingStyle.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {character.fightingStyle.slice(0, 2).map((style) => (
                                <Badge key={style} variant="outline" className="bg-orange-100 text-orange-800 text-xs">
                                  {style}
                                </Badge>
                              ))}
                              {character.fightingStyle.length > 2 && (
                                <Badge variant="outline" className="bg-orange-100 text-orange-800 text-xs">
                                  +{character.fightingStyle.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="w-full sm:w-auto text-left sm:!text-right pt-2 sm:pt-0 border-t sm:border-0 border-amber-200/50">
                        <p className="text-sm text-gray-600">Recompensa</p>
                        <div className="text-2xl font-bold text-red-700 flex justify-end">
                          {formatBounty(character.bounty)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strongest" className="space-y-4">
           {/* O mesmo padrão de melhoria é aplicado aqui */}
           <Card>
            <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Ranking dos Mais Fortes
                </CardTitle>
                <CardDescription>
                    Classificação baseada no sistema de energias (Stamina + Haki + Resistência)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {strongestRanking.map((character) => (
                        <div key={character.id} className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
                            character.position <= 3 
                                ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200' 
                                : 'bg-gray-50 border-gray-200'
                        }`}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="flex flex-col items-center space-y-1 mt-1">
                                        {getRankIcon(character.position)}
                                        <Badge variant="outline" className={`text-xs ${getRankBadgeColor(character.position)}`}>
                                            #{character.position}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-purple-900 text-lg">{character.name}</h3>
                                        <p className="text-purple-700 italic text-sm">"{character.nickname}"</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <Badge variant="outline" className="bg-blue-100 text-blue-800">Nível {character.level}</Badge>
                                            <Badge variant="outline" className="bg-gray-100 text-gray-800">{getCharacterTypeIcon(character)} {getCharacterTypeName(character)}</Badge>
                                            {character.organization && (
                                                <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs">{character.organization.position}</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-0 border-purple-200/50">
                                    <p className="text-sm text-gray-600">Poder Total</p>
                                    <div className="text-2xl font-bold text-purple-700">{character.totalPower.toLocaleString()}</div>
                                    <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] sm:text-xs">
                                        <div className="bg-red-100 rounded px-1 sm:px-2 py-1 text-center"><span className="text-red-700">🔴 {(character.energies?.stamina?.max || 0).toLocaleString()}</span></div>
                                        <div className="bg-purple-100 rounded px-1 sm:px-2 py-1 text-center"><span className="text-purple-700">⚫ {(character.energies?.haki?.max || 0).toLocaleString()}</span></div>
                                        <div className="bg-green-100 rounded px-1 sm:px-2 py-1 text-center"><span className="text-green-700">🟢 {(character.energies?.resistance?.max || 0).toLocaleString()}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        </TabsContent>

        <TabsContent value="factions" className="space-y-4">
          {/* Nenhuma mudança necessária aqui, o layout já é mobile-first. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>

<CardHeader>

<CardTitle className="text-amber-900 flex items-center">

🏴‍☠️ <span className="ml-2">Piratas</span>

</CardTitle>

<CardDescription>Criminosos com recompensas ativas</CardDescription>

</CardHeader>

<CardContent>

<div className="space-y-2">

{pirates.map((character, index) => (

<div key={character.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">

<div className="flex items-center space-x-2">

<Badge variant="outline" className="bg-blue-100">#{index + 1}</Badge>

<span className="font-medium text-blue-900">{character.name}</span>

</div>

<span className="text-sm text-blue-700">{formatBounty(character.bounty)}</span>

</div>

))}

</div>

</CardContent>

</Card>



<Card>

<CardHeader>

<CardTitle className="text-amber-900 flex items-center">

⚓ <span className="ml-2">Marinha</span>

</CardTitle>

<CardDescription>Defensores da justiça mundial</CardDescription>

</CardHeader>

<CardContent>

<div className="space-y-2">

{marines.map((character, index) => (

<div key={character.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">

<div className="flex items-center space-x-2">

<Badge variant="outline" className="bg-blue-100">#{index + 1}</Badge>

<span className="font-medium text-blue-900">{character.name}</span>

</div>

<span className="text-sm text-blue-700">Nível {character.level}</span>

</div>

))}

</div>

</CardContent>

</Card>



<Card>

<CardHeader>

<CardTitle className="text-amber-900 flex items-center">

🔥 <span className="ml-2">Revolucionários</span>

</CardTitle>

<CardDescription>Lutadores pela liberdade</CardDescription>

</CardHeader>

<CardContent>

<div className="space-y-2">

{revolutionaries.map((character, index) => (

<div key={character.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">

<div className="flex items-center space-x-2">

<Badge variant="outline" className="bg-orange-100">#{index + 1}</Badge>

<span className="font-medium text-orange-900">{character.name}</span>

</div>

<span className="text-sm text-orange-700">{formatBounty(character.bounty)}</span>

</div>

))}

</div>

</CardContent>

</Card>



<Card>

<CardHeader>

<CardTitle className="text-amber-900 flex items-center">

📰 <span className="ml-2">Jornalistas</span>

</CardTitle>

<CardDescription>Relatores das grandes notícias</CardDescription>

</CardHeader>

<CardContent>

<div className="space-y-2">

{journalists.map((character, index) => (

<div key={character.id} className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">

<div className="flex items-center space-x-2">

<Badge variant="outline" className="bg-purple-100">#{index + 1}</Badge>

<span className="font-medium text-purple-900">{character.name}</span>

</div>

<span className="text-sm text-purple-700">Nível {character.level}</span>

</div>

))}

</div>

</CardContent>

</Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
);
};