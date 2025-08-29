import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Zap, 
  Heart, 
  Shield, 
  Brain, 
  TrendingUp,
  Star,
  Target,
  Calculator
} from 'lucide-react';
import { expTable, calculateStaminaMax, calculateHakiMax, calculateResistanceMax } from '../data/mockData';

export const EnergySystemPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-amber-900 mb-4">Sistema de Energias e Níveis</h1>
        <p className="text-amber-700 max-w-4xl mx-auto">
          Entenda como funcionam as três energias fundamentais do RPG Two Piece RP: Stamina, Haki e Resistência, 
          além do sistema de níveis e distribuição de pontos.
        </p>
      </div>

      <Tabs defaultValue="energies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="energies" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Energias
          </TabsTrigger>
          <TabsTrigger value="levels" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Níveis
          </TabsTrigger>
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Calculadora
          </TabsTrigger>
        </TabsList>

        <TabsContent value="energies" className="space-y-6">
          {/* Informações Gerais das Energias */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Zap className="h-6 w-6" />
                </div>
                Sistema de Energias
              </CardTitle>
              <CardDescription className="text-blue-700">
                No RPG possuí três tipos de energia: Stamina, Haki e Resistência. Cada uma tem funções específicas e sistemas de cálculo únicos.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Stamina */}
          <Card className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-pink-500"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Badge className="bg-red-600 text-white flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  🔴 Stamina
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                É utilizada no uso de movimentos gerais, movimentação corporal, armas, akuma no Mi, estilos de luta, etc... 
                Será a energia mais comum e mais utilizada.
              </p>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="text-red-800 mb-3">📊 Sistema de Cálculo</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-700 mb-2">
                      <strong>+50.000%</strong> de Stamina por nível
                    </p>
                    <div className="space-y-1 text-sm">
                      <div>Stamina Lvl 1: 50.000%</div>
                      <div>Stamina Lvl 2: 100.000%</div>
                      <div>Stamina Lvl 3: 150.000%</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-red-700 mb-2">
                      <strong>Sem limite</strong> de nível
                    </p>
                    <div className="bg-red-100 p-3 rounded">
                      <p className="text-red-800 text-sm">
                        As habilidades de energia não possuem limite de nível.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(level => (
                  <div key={level} className="bg-white border border-red-200 p-3 rounded-lg text-center">
                    <div className="text-red-600 font-medium">Nível {level}</div>
                    <div className="text-lg text-red-800">{calculateStaminaMax(level).toLocaleString()}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Haki */}
          <Card className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Badge className="bg-purple-600 text-white flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  ⚫ Haki
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Já a reserva de Haki que pode ser interpretada como vontade ou espírito, é a energia que será utilizada 
                através do Haki do Armamento, Haki da Observação e Haki do Rei.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="text-purple-800 mb-3">📊 Sistema de Cálculo</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-purple-700 mb-2">
                      <strong>+50.000%</strong> de Haki por nível
                    </p>
                    <div className="space-y-1 text-sm">
                      <div>Haki Lvl 1: 50.000%</div>
                      <div>Haki Lvl 2: 100.000%</div>
                      <div>Haki Lvl 3: 150.000%</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-purple-700 mb-2">
                      <strong>Sem limite</strong> de nível
                    </p>
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="text-purple-800 text-sm">
                        As habilidades de energia não possuem limite de nível.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(level => (
                  <div key={level} className="bg-white border border-purple-200 p-3 rounded-lg text-center">
                    <div className="text-purple-600 font-medium">Nível {level}</div>
                    <div className="text-lg text-purple-800">{calculateHakiMax(level).toLocaleString()}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resistência */}
          <Card className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-500"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Badge className="bg-green-600 text-white flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  🟢 Resistência
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                A Resistência é o HP do RPG, ela vai definir a quantia de pancada que o seu personagem é capaz de suportar 
                antes de desmaiar ou ficar incapaz de lutar. Se alguém com 0% de resistência receber qualquer golpe, é desmaio na hora!
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="text-green-800 mb-3">📊 Sistema de Cálculo</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-700 mb-2">
                      <strong>Sistema Especial:</strong>
                    </p>
                    <div className="space-y-1 text-sm">
                      <div><strong>Lvl 0:</strong> 10.000% (inicial)</div>
                      <div><strong>Lvl 1:</strong> 100.000% (+90.000%)</div>
                      <div><strong>Lvl 2+:</strong> +100.000% por nível</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-green-700 mb-2">
                      <strong>Sem limite</strong> de nível
                    </p>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="text-green-800 text-sm">
                        O player inicia com 10.000% de Resistência. Ao upar para Lvl 1 irá ficar 100.000%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map(level => (
                  <div key={level} className="bg-white border border-green-200 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-medium">Nível {level}</div>
                    <div className="text-lg text-green-800">{calculateResistanceMax(level).toLocaleString()}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="levels" className="space-y-6">
          {/* Sistema de Níveis */}
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-3">
                <div className="p-2 bg-amber-600 text-white rounded-lg">
                  <Star className="h-6 w-6" />
                </div>
                Sistema de Níveis
              </CardTitle>
              <CardDescription className="text-amber-700">
                A cada nível upado, o seu personagem ganha +1 Pontos de Níveis que serve para upar alguma habilidade. 
                Para subir o nível do personagem é necessário ganhar EXP.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Tabela de EXP */}
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">📈 EXP Necessário por Nível</CardTitle>
              <CardDescription>
                Tabela completa com o EXP necessário para atingir cada nível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {Object.entries(expTable).map(([level, exp]) => {
                  const levelNum = parseInt(level);
                  let bgColor = 'bg-gray-50 border-gray-200';
                  let textColor = 'text-gray-800';
                  
                  if (levelNum <= 10) {
                    bgColor = 'bg-green-50 border-green-200';
                    textColor = 'text-green-800';
                  } else if (levelNum <= 20) {
                    bgColor = 'bg-yellow-50 border-yellow-200';
                    textColor = 'text-yellow-800';
                  } else if (levelNum <= 30) {
                    bgColor = 'bg-orange-50 border-orange-200';
                    textColor = 'text-orange-800';
                  } else if (levelNum <= 40) {
                    bgColor = 'bg-red-50 border-red-200';
                    textColor = 'text-red-800';
                  }

                  return (
                    <div key={level} className={`${bgColor} border p-3 rounded-lg text-center`}>
                      <div className={`${textColor} font-medium`}>Nível {level}</div>
                      <div className={`text-sm ${textColor}`}>{exp.toLocaleString()}%</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-green-800 font-medium">Níveis 1-10</div>
                  <div className="text-sm text-green-700">+25.000% por nível</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-yellow-800 font-medium">Níveis 11-20</div>
                  <div className="text-sm text-yellow-700">+50.000% por nível</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-orange-800 font-medium">Níveis 21-30</div>
                  <div className="text-sm text-orange-700">+100.000% por nível</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-red-800 font-medium">Níveis 31-40+</div>
                  <div className="text-sm text-red-700">+150.000%/+200.000%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculadora de Energias
              </CardTitle>
              <CardDescription>
                Veja como suas energias crescem conforme você aumenta os níveis das habilidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exemplos de Cálculo */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-red-800 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Stamina
                  </h4>
                  <div className="space-y-2">
                    {[1, 5, 10, 15, 20].map(level => (
                      <div key={level} className="flex justify-between bg-red-50 p-2 rounded">
                        <span className="text-red-700">Nível {level}:</span>
                        <span className="text-red-800 font-medium">
                          {calculateStaminaMax(level).toLocaleString()}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-purple-800 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Haki
                  </h4>
                  <div className="space-y-2">
                    {[1, 5, 10, 15, 20].map(level => (
                      <div key={level} className="flex justify-between bg-purple-50 p-2 rounded">
                        <span className="text-purple-700">Nível {level}:</span>
                        <span className="text-purple-800 font-medium">
                          {calculateHakiMax(level).toLocaleString()}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-green-800 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Resistência
                  </h4>
                  <div className="space-y-2">
                    {[0, 1, 5, 10, 15].map(level => (
                      <div key={level} className="flex justify-between bg-green-50 p-2 rounded">
                        <span className="text-green-700">Nível {level}:</span>
                        <span className="text-green-800 font-medium">
                          {calculateResistanceMax(level).toLocaleString()}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dica importante */}
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-6 w-6 text-amber-600" />
                  <h4 className="text-amber-800">💡 Dica Estratégica</h4>
                </div>
                <p className="text-amber-700">
                  <strong>Pontos de Nível:</strong> A cada nível do personagem você ganha +1 ponto para distribuir. 
                  Planeje cuidadosamente onde investir seus pontos baseado no seu estilo de jogo e objetivos do personagem.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};