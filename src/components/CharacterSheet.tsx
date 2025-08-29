import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Heart, 
  Zap, 
  DollarSign, 
  Star, 
  Edit3, 
  Save, 
  X,
  Package,
  Scroll,
  Flame,
  Users,
  Sword,
  Copy,
  User,
  Calendar,
  Eye
} from 'lucide-react';
import { 
  mockCharacters, 
  Character, 
  fightingStyles, 
  organizations, 
  pirate_crews, 
  races, 
  professions,
  calculateStaminaMax,
  calculateHakiMax,
  calculateResistanceMax,
  expTable,
  calculateLevelFromExp,
  calculateExpForNextLevel,
  professionInfo,
  getProfessionBonus
} from '../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

export const CharacterSheet: React.FC = () => {
  const { user } = useAuth();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<Character | null>(null);

  // Efeito para carregar o personagem quando o usuário for carregado
  useEffect(() => {
    if (user?.id) {
      const foundCharacter = mockCharacters.find(char => char.userId === user.id);
      if (foundCharacter) {
        setCharacter(foundCharacter);
        setEditedCharacter(foundCharacter);
      }
    }
  }, [user]);

  if (!character) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Carregando personagem...</p>
        {user && (
          <p className="text-gray-400 text-sm mt-2">
            Usuário ID: {user.id}
          </p>
        )}
      </div>
    );
  }

  const handleEdit = () => {
    setEditedCharacter({ ...character });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedCharacter) {
      setCharacter(editedCharacter);
      setIsEditing(false);
      toast.success('Ficha atualizada com sucesso!');
    }
  };

  const handleCancel = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };

  const updateEditedCharacter = (field: keyof Character, value: any) => {
    if (editedCharacter) {
      setEditedCharacter({
        ...editedCharacter,
        [field]: value
      });
    }
  };

  // Campos que jogadores podem editar (tudo exceto raça)
  const canPlayerEdit = (field: string): boolean => {
    const masterOnlyFields = ['race']; // Apenas a raça é exclusiva do mestre
    return user?.role === 'master' || !masterOnlyFields.includes(field);
  };

  const displayCharacter = isEditing ? editedCharacter : character;

  // Função utilitária para copiar texto com fallback
  const copyTextToClipboard = async (text: string): Promise<boolean> => {
    // Primeiro, tenta usar a Clipboard API moderna
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        // Se falhar, continua para o método de fallback
      }
    }

    // Fallback usando o método antigo com textarea temporário
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return successful;
    } catch (err) {
      return false;
    }
  };

  // Função para copiar a ficha formatada
  const copyCharacterSheet = async () => {
    const currentCharacter = isEditing ? editedCharacter : character;
    if (!currentCharacter) return;

    const formatDate = (date: string | undefined) => {
      if (!date) return new Date().toLocaleDateString('pt-BR');
      return new Date(date).toLocaleDateString('pt-BR');
    };

    const sheetText = `╾🟰🟰🟰🟰╼ 🏴‍☠ ╾🟰🟰🟰🟰╼

➝ ☠ Informações Básicas:

- 🔱 Nome: ${currentCharacter?.name || ''}
- 🔱 Raça: ${currentCharacter?.race || 'Humano'}
- 🔱 Profissão: ${currentCharacter?.profession || 'Aventureiro'}
- 🔱 Organização: ${currentCharacter?.organization?.name || 'Independente'} (${currentCharacter.organization?.position || 'N/A'})
- 🔱 Aparência: ${currentCharacter?.appearance || 'Não especificada'}
- 🔱 Idade: ${currentCharacter?.age || 18}
- 🔱 Data (Criação do Personagem): ${formatDate(currentCharacter?.creationDate)}
- 🔱 XP: ${(currentCharacter?.xp || 25000)?.toLocaleString()}%
- 🔱 Nível: ${currentCharacter?.level || 1}

╾🟰🟰🟰🟰╼ 🏴‍☠ ╾🟰🟰🟰🟰╼

➝ ☠ Energias:

- 🔴 Stamina: ${currentCharacter?.energies?.stamina?.current?.toLocaleString() || '0'}/${currentCharacter?.energies?.stamina?.max?.toLocaleString() || '0'}%
- ⚫ Haki: ${currentCharacter?.energies?.haki?.current?.toLocaleString() || '0'}/${currentCharacter?.energies?.haki?.max?.toLocaleString() || '0'}%
- 🟢 Resistência: ${currentCharacter?.energies?.resistance?.current?.toLocaleString() || '0'}/${currentCharacter?.energies?.resistance?.max?.toLocaleString() || '0'}%

╾🟰🟰🟰🟰╼ 🏴‍☠ ╾🟰🟰🟰🟰╼

➝ ☠ Habilidades:

- 🔱 Pontos de Níveis: ${currentCharacter?.skillPoints || 1}

- 🔱 Stamina: Lvl ${currentCharacter?.skillLevels?.stamina || 1}
- 🔱 Haki: Lvl ${currentCharacter?.skillLevels?.haki || 0}
- 🔱 Resistência: Lvl ${currentCharacter?.skillLevels?.resistance || 0}
- 🔱 Haki do Armamento: Lvl ${currentCharacter?.skillLevels?.hakiArmament || 0}
- 🔱 Haki da Visão: Lvl ${currentCharacter?.skillLevels?.hakiObservation || 0}
- 🔱 Estilo de Luta (${currentCharacter?.fightingStyle?.join(', ') || 'Nenhum'}): Lvl ${currentCharacter?.skillLevels?.fightingStyle || 0}
- 🔱 Arma (?): Lvl ${currentCharacter?.skillLevels?.weapon || 0}
- 🔱 Akuma no Mi: Lvl ${currentCharacter?.skillLevels?.devilFruit || 0}
- 🔱 Profissão: Lvl ${currentCharacter?.skillLevels?.profession || 0}
- 🔱 Raça: Lvl ${currentCharacter?.skillLevels?.race || 0}

╾🟰🟰🟰🟰╼ 🏴‍☠ ╾🟰🟰🟰🟰╼

➝ ☠ Combates:

- 🔱 Vitórias: ${currentCharacter.victories || 0} (${((currentCharacter.victories || 0) * 1000).toLocaleString()}% EXP)
- 🔱 Derrotas: ${currentCharacter.defeats || 0} (${((currentCharacter.defeats || 0) * 500).toLocaleString()}% EXP)

➝ ☠ Ilhas:

- 🔱 Ilhas (Lvl 1): ${currentCharacter.islands?.level1 || 0}
- 🔱 Ilhas (Lvl 2): ${currentCharacter.islands?.level2 || 0}
- 🔱 Ilhas (Lvl 3): ${currentCharacter.islands?.level3 || 0}
- 🔱 EXP Ganho: +${((currentCharacter.islands?.level1 || 0) * 100 + (currentCharacter.islands?.level2 || 0) * 200 + (currentCharacter.islands?.level3 || 0) * 500).toLocaleString()}% EXP

➝ ☠ Profissões:

- 🔱 Tarefas: ${currentCharacter.tasks || 0} (+${((currentCharacter.tasks || 0) * 50).toLocaleString()}% EXP)

➝ ☠ Passe de Batalha:

- 🔱 EXP (Bronze): +${currentCharacter.battlePass?.bronze || 0}%
- 🔱 EXP (Gold): +${currentCharacter.battlePass?.gold || 0}%

➝ ☠ Missões Diárias:

- 🔱 Missão (Cenas): +${currentCharacter.dailyMissions?.scenes || 0}%
- 🔱 Missão (Combate): +${currentCharacter.dailyMissions?.combat || 0}%

➝ ☠ EXP Inicial / Punições: 

- 🔱 EXP Inicial: ${(currentCharacter.expBonus?.initial || 25000).toLocaleString()}%
- 🔱 EXP Tutorial: ${currentCharacter.expBonus?.tutorial || 0}%
- 🔱 Punições: ${currentCharacter.expBonus?.punishments || 0}%

╾🟰🟰🟰🟰╼ 🏴‍☠ ╾🟰🟰🟰🟰╼`;

    const success = await copyTextToClipboard(sheetText);
    
    if (success) {
      toast.success('Ficha copiada para a área de transferência!');
    } else {
      // Fallback final: mostra o texto em um alert e tenta usar o console
      toast.error('Não foi possível copiar automaticamente. Veja o console do navegador ou selecione o texto que aparecerá na tela.');
      
      console.log('=== FICHA DO PERSONAGEM ===');
      console.log(sheetText);
      console.log('=== FIM DA FICHA ===');
      
      // Mostra em um prompt para seleção manual
      setTimeout(() => {
        alert('A ficha foi copiada no console do navegador (F12). Você também pode copiar o texto abaixo:\n\n' + sheetText.substring(0, 500) + '...\n\n(Veja o console para o texto completo)');
      }, 100);
    }
  };

  if (!displayCharacter) return null;

  const totalEnergyPower = (displayCharacter?.energies?.stamina?.max || 0) + 
                          (displayCharacter?.energies?.haki?.max || 0) + 
                          (displayCharacter?.energies?.resistance?.max || 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-amber-900">{displayCharacter.name}</h1>
          <p className="text-amber-700">"{displayCharacter.nickname}"</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={copyCharacterSheet} variant="outline" className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100">
            <Copy className="h-4 w-4 mr-2" />
            Copiar Ficha
          </Button>
          {!isEditing ? (
            <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
              <Edit3 className="h-4 w-4 mr-2" />
              Editar
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </>
          )}
          <Badge variant="default" className="bg-amber-700">
            Nível {displayCharacter.level}
          </Badge>
        </div>
      </div>

      {/* Status Cards - Sistema de Energias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">🔴 Stamina</CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-900">
              {displayCharacter.energies?.stamina?.current?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-red-600">
              Max: {displayCharacter.energies?.stamina?.max?.toLocaleString() || '0'}%
            </div>
            <Progress 
              value={((displayCharacter.energies?.stamina?.current || 0) / (displayCharacter.energies?.stamina?.max || 1)) * 100} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">⚫ Haki</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-900">
              {displayCharacter.energies?.haki?.current?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-purple-600">
              Max: {displayCharacter.energies?.haki?.max?.toLocaleString() || '0'}%
            </div>
            <Progress 
              value={((displayCharacter.energies?.haki?.current || 0) / (displayCharacter.energies?.haki?.max || 1)) * 100} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">🟢 Resistência</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-900">
              {displayCharacter.energies?.resistance?.current?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-green-600">
              Max: {displayCharacter.energies?.resistance?.max?.toLocaleString() || '0'}%
            </div>
            <Progress 
              value={((displayCharacter.energies?.resistance?.current || 0) / (displayCharacter.energies?.resistance?.max || 1)) * 100} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">
              {displayCharacter.bounty > 0 ? 'Recompensa' : 'Poder Total'}
            </CardTitle>
            <Star className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-amber-900">
              {displayCharacter.bounty > 0 
                ? `${(displayCharacter.bounty / 1000000).toFixed(0)}M ฿`
                : `${(totalEnergyPower / 1000).toFixed(0)}K`
              }
            </div>
            <div className="text-sm text-amber-600">
              {displayCharacter.bounty > 0 ? 'Recompensa' : 'Energia Total'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Character Information */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="energies">Energias</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="organization">Organização</TabsTrigger>
          <TabsTrigger value="powers">Poderes</TabsTrigger>
          <TabsTrigger value="inventory">Inventário</TabsTrigger>
          <TabsTrigger value="background">História</TabsTrigger>
          <TabsTrigger value="diary">Diário</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Raça</Label>
                    {isEditing ? (
                      <Select
                        value={displayCharacter.race || 'Humano'}
                        onValueChange={(value) => updateEditedCharacter('race', value)}
                        disabled={!canPlayerEdit('race')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {races.map((race) => (
                            <SelectItem key={race} value={race}>{race}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-amber-800">{displayCharacter.race || 'Humano'}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Profissão</Label>
                    {isEditing ? (
                      <Select
                        value={displayCharacter.profession || 'Aventureiro'}
                        onValueChange={(value) => updateEditedCharacter('profession', value)}
                        disabled={!canPlayerEdit('profession')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {professions.map((prof) => (
                            <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-amber-800">{displayCharacter.profession || 'Aventureiro'}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Idade</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.age || 18}
                        onChange={(e) => updateEditedCharacter('age', parseInt(e.target.value) || 18)}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('age')}
                      />
                    ) : (
                      <p className="text-amber-800">{displayCharacter.age || 18} anos</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Data de Criação</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={displayCharacter.creationDate || '2024-01-01'}
                        onChange={(e) => updateEditedCharacter('creationDate', e.target.value)}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('creationDate')}
                      />
                    ) : (
                      <p className="text-amber-800">
                        {displayCharacter.creationDate ? 
                          new Date(displayCharacter.creationDate).toLocaleDateString('pt-BR') : 
                          'Não especificada'
                        }
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Aparência</Label>
                  {isEditing ? (
                    <Textarea
                      value={displayCharacter.appearance || ''}
                      onChange={(e) => updateEditedCharacter('appearance', e.target.value)}
                      placeholder="Descreva a aparência do personagem..."
                      className="border-amber-300 min-h-[100px]"
                      disabled={!canPlayerEdit('appearance')}
                    />
                  ) : (
                    <p className="text-amber-800 whitespace-pre-wrap">
                      {displayCharacter.appearance || 'Não especificada'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Status Avançados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>XP Total</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.xp || 25000}
                        onChange={(e) => updateEditedCharacter('xp', parseInt(e.target.value) || 25000)}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('xp')}
                      />
                    ) : (
                      <p className="text-amber-800">{(displayCharacter.xp || 25000).toLocaleString()}%</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Nível</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.level || 1}
                        onChange={(e) => updateEditedCharacter('level', parseInt(e.target.value) || 1)}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('level')}
                      />
                    ) : (
                      <div className="space-y-1">
                        <p className="text-amber-800">{displayCharacter.level}</p>
                        <div className="text-sm text-amber-600">
                          Próximo nível: {calculateExpForNextLevel(displayCharacter.level).toLocaleString()}% EXP
                        </div>
                        <Progress 
                          value={((displayCharacter.xp || 0) / calculateExpForNextLevel(displayCharacter.level)) * 100} 
                          className="h-2" 
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Pontos de Habilidade Disponíveis</Label>
                    <p className="text-amber-800">{displayCharacter.skillPoints || 0} pontos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="energies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stamina */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  🔴 Stamina
                </CardTitle>
                <CardDescription className="text-red-700">
                  Energia para movimentos, combate e habilidades gerais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-red-700">Atual</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.energies?.stamina?.current || 0}
                        onChange={(e) => updateEditedCharacter('energies', {
                          ...displayCharacter.energies,
                          stamina: {
                            ...displayCharacter.energies?.stamina,
                            current: parseInt(e.target.value) || 0
                          }
                        })}
                        className="border-red-300"
                        disabled={!canPlayerEdit('energies')}
                      />
                    ) : (
                      <p className="text-red-800 font-medium">
                        {(displayCharacter.energies?.stamina?.current || 0).toLocaleString()}%
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-red-700">Máximo</Label>
                    <p className="text-red-800 font-medium">
                      {(displayCharacter.energies?.stamina?.max || 0).toLocaleString()}%
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-red-700">Nível da Habilidade</Label>
                  <p className="text-red-800">Lvl {displayCharacter.skillLevels?.stamina || 0}</p>
                  <div className="text-sm text-red-600 mt-1">
                    Máximo = {displayCharacter.skillLevels?.stamina || 0} × 50.000%
                  </div>
                </div>
                <Progress 
                  value={((displayCharacter.energies?.stamina?.current || 0) / (displayCharacter.energies?.stamina?.max || 1)) * 100} 
                  className="h-3" 
                />
              </CardContent>
            </Card>

            {/* Haki */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  ⚫ Haki
                </CardTitle>
                <CardDescription className="text-purple-700">
                  Energia espiritual para Haki do Armamento, Observação e Rei
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-purple-700">Atual</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.energies?.haki?.current || 0}
                        onChange={(e) => updateEditedCharacter('energies', {
                          ...displayCharacter.energies,
                          haki: {
                            ...displayCharacter.energies?.haki,
                            current: parseInt(e.target.value) || 0
                          }
                        })}
                        className="border-purple-300"
                        disabled={!canPlayerEdit('energies')}
                      />
                    ) : (
                      <p className="text-purple-800 font-medium">
                        {(displayCharacter.energies?.haki?.current || 0).toLocaleString()}%
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-purple-700">Máximo</Label>
                    <p className="text-purple-800 font-medium">
                      {(displayCharacter.energies?.haki?.max || 0).toLocaleString()}%
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-purple-700">Nível da Habilidade</Label>
                  <p className="text-purple-800">Lvl {displayCharacter.skillLevels?.haki || 0}</p>
                  <div className="text-sm text-purple-600 mt-1">
                    Máximo = {displayCharacter.skillLevels?.haki || 0} × 50.000%
                  </div>
                </div>
                <Progress 
                  value={((displayCharacter.energies?.haki?.current || 0) / (displayCharacter.energies?.haki?.max || 1)) * 100} 
                  className="h-3" 
                />
              </CardContent>
            </Card>

            {/* Resistência */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  🟢 Resistência
                </CardTitle>
                <CardDescription className="text-green-700">
                  HP do personagem - resistência a danos antes do desmaio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-green-700">Atual</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.energies?.resistance?.current || 0}
                        onChange={(e) => updateEditedCharacter('energies', {
                          ...displayCharacter.energies,
                          resistance: {
                            ...displayCharacter.energies?.resistance,
                            current: parseInt(e.target.value) || 0
                          }
                        })}
                        className="border-green-300"
                        disabled={!canPlayerEdit('energies')}
                      />
                    ) : (
                      <p className="text-green-800 font-medium">
                        {(displayCharacter.energies?.resistance?.current || 0).toLocaleString()}%
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-green-700">Máximo</Label>
                    <p className="text-green-800 font-medium">
                      {(displayCharacter.energies?.resistance?.max || 0).toLocaleString()}%
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-green-700">Nível da Habilidade</Label>
                  <p className="text-green-800">Lvl {displayCharacter.skillLevels?.resistance || 0}</p>
                  <div className="text-sm text-green-600 mt-1">
                    {displayCharacter.skillLevels?.resistance === 0 
                      ? 'Lvl 0 = 10.000%' 
                      : `Lvl ${displayCharacter.skillLevels?.resistance} = ${calculateResistanceMax(displayCharacter.skillLevels?.resistance || 0).toLocaleString()}%`
                    }
                  </div>
                </div>
                <Progress 
                  value={((displayCharacter.energies?.resistance?.current || 0) / (displayCharacter.energies?.resistance?.max || 1)) * 100} 
                  className="h-3" 
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Pontos e Níveis de Habilidades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pontos de Níveis</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={displayCharacter.skillPoints || 1}
                      onChange={(e) => updateEditedCharacter('skillPoints', parseInt(e.target.value) || 1)}
                      className="border-amber-300"
                      disabled={!canPlayerEdit('skillPoints')}
                    />
                  ) : (
                    <p className="text-amber-800">{displayCharacter.skillPoints || 1}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Stamina Level</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.stamina || 1}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          stamina: parseInt(e.target.value) || 1
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.stamina || 1}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Haki Level</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.haki || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          haki: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.haki || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Resistência Level</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.resistance || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          resistance: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.resistance || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Haki Armamento</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.hakiArmament || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          hakiArmament: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.hakiArmament || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Haki Observação</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.hakiObservation || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          hakiObservation: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.hakiObservation || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Estilo de Luta</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.fightingStyle || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          fightingStyle: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.fightingStyle || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Arma Level</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.weapon || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          weapon: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.weapon || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Akuma no Mi</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.devilFruit || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          devilFruit: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.devilFruit || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Profissão Level</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.profession || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          profession: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.profession || 0}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Raça Level</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.skillLevels?.race || 0}
                        onChange={(e) => updateEditedCharacter('skillLevels', {
                          ...displayCharacter.skillLevels,
                          race: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('skillLevels')}
                      />
                    ) : (
                      <p className="text-amber-800">Lvl {displayCharacter.skillLevels?.race || 0}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Sistemas de Progressão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-amber-800">Passe de Batalha</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Bronze EXP</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={displayCharacter.battlePass?.bronze || 0}
                          onChange={(e) => updateEditedCharacter('battlePass', {
                            ...displayCharacter.battlePass,
                            bronze: parseInt(e.target.value) || 0,
                            gold: displayCharacter.battlePass?.gold || 0
                          })}
                          className="border-amber-300"
                          disabled={!canPlayerEdit('battlePass')}
                        />
                      ) : (
                        <p className="text-amber-800">+{displayCharacter.battlePass?.bronze || 0}%</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Gold EXP</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={displayCharacter.battlePass?.gold || 0}
                          onChange={(e) => updateEditedCharacter('battlePass', {
                            ...displayCharacter.battlePass,
                            bronze: displayCharacter.battlePass?.bronze || 0,
                            gold: parseInt(e.target.value) || 0
                          })}
                          className="border-amber-300"
                          disabled={!canPlayerEdit('battlePass')}
                        />
                      ) : (
                        <p className="text-amber-800">+{displayCharacter.battlePass?.gold || 0}%</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-amber-800">Missões Diárias</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Cenas</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={displayCharacter.dailyMissions?.scenes || 0}
                          onChange={(e) => updateEditedCharacter('dailyMissions', {
                            ...displayCharacter.dailyMissions,
                            scenes: parseInt(e.target.value) || 0,
                            combat: displayCharacter.dailyMissions?.combat || 0
                          })}
                          className="border-amber-300"
                          disabled={!canPlayerEdit('dailyMissions')}
                        />
                      ) : (
                        <p className="text-amber-800">+{displayCharacter.dailyMissions?.scenes || 0}%</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Combate</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={displayCharacter.dailyMissions?.combat || 0}
                          onChange={(e) => updateEditedCharacter('dailyMissions', {
                            ...displayCharacter.dailyMissions,
                            scenes: displayCharacter.dailyMissions?.scenes || 0,
                            combat: parseInt(e.target.value) || 0
                          })}
                          className="border-amber-300"
                          disabled={!canPlayerEdit('dailyMissions')}
                        />
                      ) : (
                        <p className="text-amber-800">+{displayCharacter.dailyMissions?.combat || 0}%</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-amber-800">EXP Inicial / Punições</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>EXP Inicial</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={displayCharacter.expBonus?.initial || 25000}
                          onChange={(e) => updateEditedCharacter('expBonus', {
                            ...displayCharacter.expBonus,
                            initial: parseInt(e.target.value) || 25000,
                            tutorial: displayCharacter.expBonus?.tutorial || 0,
                            punishments: displayCharacter.expBonus?.punishments || 0
                          })}
                          className="border-amber-300"
                          disabled={!canPlayerEdit('expBonus')}
                        />
                      ) : (
                        <p className="text-amber-800">{(displayCharacter.expBonus?.initial || 25000).toLocaleString()}%</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>EXP Tutorial</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={displayCharacter.expBonus?.tutorial || 0}
                          onChange={(e) => updateEditedCharacter('expBonus', {
                            ...displayCharacter.expBonus,
                            initial: displayCharacter.expBonus?.initial || 25000,
                            tutorial: parseInt(e.target.value) || 0,
                            punishments: displayCharacter.expBonus?.punishments || 0
                          })}
                          className="border-amber-300"
                          disabled={!canPlayerEdit('expBonus')}
                        />
                      ) : (
                        <p className="text-amber-800">{displayCharacter.expBonus?.tutorial || 0}%</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Punições</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={displayCharacter.expBonus?.punishments || 0}
                          onChange={(e) => updateEditedCharacter('expBonus', {
                            ...displayCharacter.expBonus,
                            initial: displayCharacter.expBonus?.initial || 25000,
                            tutorial: displayCharacter.expBonus?.tutorial || 0,
                            punishments: parseInt(e.target.value) || 0
                          })}
                          className="border-amber-300"
                          disabled={!canPlayerEdit('expBonus')}
                        />
                      ) : (
                        <p className="text-amber-800">{displayCharacter.expBonus?.punishments || 0}%</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Sword className="h-5 w-5 mr-2" />
                  Combates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vitórias</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.victories || 0}
                        onChange={(e) => updateEditedCharacter('victories', parseInt(e.target.value) || 0)}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('victories')}
                      />
                    ) : (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-700">{displayCharacter.victories || 0}</p>
                        <p className="text-sm text-green-600">
                          +{((displayCharacter.victories || 0) * 1000).toLocaleString()}% EXP
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Derrotas</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.defeats || 0}
                        onChange={(e) => updateEditedCharacter('defeats', parseInt(e.target.value) || 0)}
                        className="border-amber-300"
                        disabled={!canPlayerEdit('defeats')}
                      />
                    ) : (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-700">{displayCharacter.defeats || 0}</p>
                        <p className="text-sm text-red-600">
                          +{((displayCharacter.defeats || 0) * 500).toLocaleString()}% EXP
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tarefas Completadas</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={displayCharacter.tasks || 0}
                      onChange={(e) => updateEditedCharacter('tasks', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                      disabled={!canPlayerEdit('tasks')}
                    />
                  ) : (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-700">{displayCharacter.tasks || 0}</p>
                      <p className="text-sm text-blue-600">
                        +{((displayCharacter.tasks || 0) * 50).toLocaleString()}% EXP
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Ilhas Conquistadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Ilhas Nível 1</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.islands?.level1 || 0}
                        onChange={(e) => updateEditedCharacter('islands', {
                          ...displayCharacter.islands,
                          level1: parseInt(e.target.value) || 0,
                          level2: displayCharacter.islands?.level2 || 0,
                          level3: displayCharacter.islands?.level3 || 0
                        })}
                        className="border-amber-300 w-20"
                        disabled={!canPlayerEdit('islands')}
                      />
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        {displayCharacter.islands?.level1 || 0}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Label>Ilhas Nível 2</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.islands?.level2 || 0}
                        onChange={(e) => updateEditedCharacter('islands', {
                          ...displayCharacter.islands,
                          level1: displayCharacter.islands?.level1 || 0,
                          level2: parseInt(e.target.value) || 0,
                          level3: displayCharacter.islands?.level3 || 0
                        })}
                        className="border-amber-300 w-20"
                        disabled={!canPlayerEdit('islands')}
                      />
                    ) : (
                      <Badge variant="outline" className="bg-orange-100 text-orange-800">
                        {displayCharacter.islands?.level2 || 0}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Label>Ilhas Nível 3</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={displayCharacter.islands?.level3 || 0}
                        onChange={(e) => updateEditedCharacter('islands', {
                          ...displayCharacter.islands,
                          level1: displayCharacter.islands?.level1 || 0,
                          level2: displayCharacter.islands?.level2 || 0,
                          level3: parseInt(e.target.value) || 0
                        })}
                        className="border-amber-300 w-20"
                        disabled={!canPlayerEdit('islands')}
                      />
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        {displayCharacter.islands?.level3 || 0}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-700">EXP Total de Ilhas:</p>
                  <p className="text-xl font-bold text-amber-900">
                    +{(
                      ((displayCharacter.islands?.level1 || 0) * 100) +
                      ((displayCharacter.islands?.level2 || 0) * 200) +
                      ((displayCharacter.islands?.level3 || 0) * 500)
                    ).toLocaleString()}% EXP
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organization" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Organização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label>Tipo de Organização</Label>
                      <Select
                        value={displayCharacter.organization?.type || 'pirate_crew'}
                        onValueChange={(value) => updateEditedCharacter('organization', {
                          name: displayCharacter.organization?.name || '',
                          type: value as any,
                          position: ''
                        })}
                        disabled={!canPlayerEdit('organization')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pirate_crew">Tripulação Pirata</SelectItem>
                          <SelectItem value="marine_rank">Marinha</SelectItem>
                          <SelectItem value="revolutionary_army">Exército Revolucionário</SelectItem>
                          <SelectItem value="journalist_agency">Agência Jornalística</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {displayCharacter.organization?.type === 'pirate_crew' && (
                      <div className="space-y-2">
                        <Label>Nome da Tripulação</Label>
                        <Select
                          value={displayCharacter.organization?.name || ''}
                          onValueChange={(value) => updateEditedCharacter('organization', {
                            ...displayCharacter.organization,
                            name: value,
                            type: 'pirate_crew'
                          })}
                          disabled={!canPlayerEdit('organization')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a tripulação" />
                          </SelectTrigger>
                          <SelectContent>
                            {pirate_crews.map((crew) => (
                              <SelectItem key={crew} value={crew}>{crew}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {displayCharacter.organization?.type !== 'pirate_crew' && (
                      <div className="space-y-2">
                        <Label>Nome da Organização</Label>
                        <Input
                          value={displayCharacter.organization?.name || ''}
                          onChange={(e) => updateEditedCharacter('organization', {
                            ...displayCharacter.organization,
                            name: e.target.value,
                            type: displayCharacter.organization?.type || 'pirate_crew'
                          })}
                          placeholder="Nome da organização..."
                          className="border-amber-300"
                          disabled={!canPlayerEdit('organization')}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label>Posição/Patente</Label>
                      <Select
                        value={displayCharacter.organization?.position || ''}
                        onValueChange={(value) => updateEditedCharacter('organization', {
                          ...displayCharacter.organization,
                          name: displayCharacter.organization?.name || '',
                          type: displayCharacter.organization?.type || 'pirate_crew',
                          position: value
                        })}
                        disabled={!canPlayerEdit('organization')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a posição" />
                        </SelectTrigger>
                        <SelectContent>
                          {displayCharacter.organization?.type === 'pirate_crew' && organizations.pirate_positions.map((pos) => (
                            <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                          ))}
                          {displayCharacter.organization?.type === 'marine_rank' && organizations.marine_ranks.map((rank) => (
                            <SelectItem key={rank} value={rank}>{rank}</SelectItem>
                          ))}
                          {displayCharacter.organization?.type === 'revolutionary_army' && organizations.revolutionary_positions.map((pos) => (
                            <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                          ))}
                          {displayCharacter.organization?.type === 'journalist_agency' && organizations.journalist_agencies.map((agency) => (
                            <SelectItem key={agency} value={agency}>{agency}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {displayCharacter.organization ? (
                      <>
                        <div>
                          <p className="text-sm text-amber-700">Organização</p>
                          <p className="font-medium text-amber-900">{displayCharacter.organization.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-amber-700">Posição</p>
                          <p className="font-medium text-amber-900">{displayCharacter.organization.position}</p>
                        </div>
                        <Badge variant="outline" className="bg-amber-100">
                          {displayCharacter.organization.type === 'pirate_crew' && '🏴‍☠️ Tripulação Pirata'}
                          {displayCharacter.organization.type === 'marine_rank' && '⚓ Marinha'}
                          {displayCharacter.organization.type === 'revolutionary_army' && '🔥 Exército Revolucionário'}
                          {displayCharacter.organization.type === 'journalist_agency' && '📰 Agência Jornalística'}
                        </Badge>
                      </>
                    ) : (
                      <p className="text-amber-600 italic">Nenhuma organização registrada</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Sword className="h-5 w-5 mr-2" />
                  Estilos de Luta
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label>Estilos Dominados</Label>
                    <div className="space-y-2">
                      {fightingStyles.map((style) => (
                        <div key={style} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={style}
                            checked={displayCharacter.fightingStyle?.includes(style) || false}
                            onChange={(e) => {
                              const currentStyles = displayCharacter.fightingStyle || [];
                              const updatedStyles = e.target.checked
                                ? [...currentStyles, style]
                                : currentStyles.filter(s => s !== style);
                              updateEditedCharacter('fightingStyle', updatedStyles);
                            }}
                            className="rounded border-amber-300"
                            disabled={!canPlayerEdit('fightingStyle')}
                          />
                          <Label htmlFor={style} className="text-sm">{style}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {displayCharacter.fightingStyle && displayCharacter.fightingStyle.length > 0 ? (
                      displayCharacter.fightingStyle.map((style) => (
                        <Badge key={style} variant="outline" className="bg-orange-100 text-orange-800 mr-2 mb-2">
                          {style}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-amber-600 italic">Nenhum estilo de luta registrado</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="powers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Flame className="h-5 w-5 mr-2" />
                  Akuma no Mi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={displayCharacter.devilFruit}
                    onChange={(e) => updateEditedCharacter('devilFruit', e.target.value)}
                    placeholder="Descreva a Akuma no Mi e suas habilidades..."
                    className="border-amber-300 min-h-[120px]"
                    disabled={user?.role !== 'master'}
                  />
                ) : (
                  <p className="text-amber-800 whitespace-pre-wrap">
                    {displayCharacter.devilFruit || 'Nenhuma Akuma no Mi'}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900">Haki</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={displayCharacter.haki}
                    onChange={(e) => updateEditedCharacter('haki', e.target.value)}
                    placeholder="Descreva os tipos e níveis de Haki..."
                    className="border-amber-300 min-h-[120px]"
                    disabled={user?.role !== 'master'}
                  />
                ) : (
                  <p className="text-amber-800 whitespace-pre-wrap">
                    {displayCharacter.haki || 'Nenhum Haki dominado'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Inventário
              </CardTitle>
              <CardDescription>
                Itens e equipamentos do personagem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {displayCharacter.inventory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-amber-100">
                        {item.quantity}x
                      </Badge>
                      <span className="text-amber-900">{item.item}</span>
                    </div>
                    {isEditing && user?.role === 'master' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                ))}
                {isEditing && user?.role === 'master' && (
                  <Button variant="outline" className="w-full border-dashed border-amber-400 text-amber-700">
                    Adicionar Item
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <Scroll className="h-5 w-5 mr-2" />
                História do Personagem
              </CardTitle>
              <CardDescription>
                Background e narrativa do personagem
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={displayCharacter.background}
                  onChange={(e) => updateEditedCharacter('background', e.target.value)}
                  placeholder="Conte a história do seu personagem..."
                  className="border-amber-300 min-h-[200px]"
                />
              ) : (
                <p className="text-amber-800 whitespace-pre-wrap leading-relaxed">
                  {displayCharacter.background}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Diário de Bordo</CardTitle>
              <CardDescription>
                Registre suas aventuras e descobertas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={displayCharacter.diary}
                  onChange={(e) => updateEditedCharacter('diary', e.target.value)}
                  placeholder="Escreva sobre suas últimas aventuras..."
                  className="border-amber-300 min-h-[200px]"
                />
              ) : (
                <p className="text-amber-800 whitespace-pre-wrap leading-relaxed">
                  {displayCharacter.diary}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};