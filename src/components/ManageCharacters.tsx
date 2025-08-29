import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Settings, 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Trash2,
  User,
  Star,
  DollarSign,
  Heart,
  Zap
} from 'lucide-react';
import { mockCharacters, Character } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export const ManageCharacters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>(mockCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [editedCharacter, setEditedCharacter] = useState<Character | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setEditedCharacter({ ...character });
    setIsEditDialogOpen(true);
  };

  const handleSaveCharacter = () => {
    if (!editedCharacter) return;

    setCharacters(characters.map(char => 
      char.id === editedCharacter.id ? editedCharacter : char
    ));
    setIsEditDialogOpen(false);
    setSelectedCharacter(null);
    setEditedCharacter(null);
    toast.success('Personagem atualizado com sucesso!');
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setSelectedCharacter(null);
    setEditedCharacter(null);
  };

  const updateEditedCharacter = (field: keyof Character, value: any) => {
    if (editedCharacter) {
      setEditedCharacter({
        ...editedCharacter,
        [field]: value
      });
    }
  };

  const updateEnergies = (energyType: 'stamina' | 'haki' | 'resistance', field: 'current' | 'max', value: number) => {
    if (editedCharacter) {
      setEditedCharacter({
        ...editedCharacter,
        energies: {
          ...editedCharacter.energies,
          [energyType]: {
            ...editedCharacter.energies?.[energyType],
            [field]: value
          }
        }
      });
    }
  };

  const updateSkillLevels = (skill: string, value: number) => {
    if (editedCharacter) {
      setEditedCharacter({
        ...editedCharacter,
        skillLevels: {
          ...editedCharacter.skillLevels,
          [skill]: value
        }
      });
    }
  };

  const addInventoryItem = () => {
    if (editedCharacter) {
      setEditedCharacter({
        ...editedCharacter,
        inventory: [...editedCharacter.inventory, { item: 'Novo Item', quantity: 1 }]
      });
    }
  };

  const removeInventoryItem = (index: number) => {
    if (editedCharacter) {
      setEditedCharacter({
        ...editedCharacter,
        inventory: editedCharacter.inventory.filter((_, i) => i !== index)
      });
    }
  };

  const updateInventoryItem = (index: number, field: 'item' | 'quantity', value: string | number) => {
    if (editedCharacter) {
      const newInventory = [...editedCharacter.inventory];
      newInventory[index] = {
        ...newInventory[index],
        [field]: value
      };
      setEditedCharacter({
        ...editedCharacter,
        inventory: newInventory
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-amber-900 flex items-center">
          <Settings className="h-6 w-6 mr-3" />
          Gerenciar Personagens
        </h1>
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-400">
          Acesso de Mestre
        </Badge>
      </div>

      {/* Lista de Personagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
          <Card key={character.id} className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-amber-900">{character.name}</CardTitle>
                  <p className="text-amber-700 italic">"{character.nickname}"</p>
                </div>
                <Badge className="bg-blue-600">
                  Nível {character.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">🔴 Stamina:</span>
                  <span className="font-medium text-amber-900">
                    {(character.energies?.stamina?.current || 0).toLocaleString()}/{(character.energies?.stamina?.max || 0).toLocaleString()}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">⚫ Haki:</span>
                  <span className="font-medium text-amber-900">
                    {(character.energies?.haki?.current || 0).toLocaleString()}/{(character.energies?.haki?.max || 0).toLocaleString()}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">🟢 Resistência:</span>
                  <span className="font-medium text-amber-900">
                    {(character.energies?.resistance?.current || 0).toLocaleString()}/{(character.energies?.resistance?.max || 0).toLocaleString()}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">Recompensa:</span>
                  <span className="font-medium text-amber-900">
                    {character.bounty > 0 ? `${(character.bounty / 1000000).toFixed(0)}M ฿` : 'N/A'}
                  </span>
                </div>
                <Button
                  onClick={() => handleEditCharacter(character)}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Editar Personagem
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Editando: {editedCharacter?.name}
            </DialogTitle>
            <DialogDescription>
              Atualize as informações e estatísticas do personagem
            </DialogDescription>
          </DialogHeader>

          {editedCharacter && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="energies">Energias</TabsTrigger>
                <TabsTrigger value="skills">Habilidades</TabsTrigger>
                <TabsTrigger value="powers">Poderes</TabsTrigger>
                <TabsTrigger value="inventory">Inventário</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Personagem</Label>
                    <Input
                      value={editedCharacter.name}
                      onChange={(e) => updateEditedCharacter('name', e.target.value)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Alcunha/Apelido</Label>
                    <Input
                      value={editedCharacter.nickname}
                      onChange={(e) => updateEditedCharacter('nickname', e.target.value)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nível</Label>
                    <Input
                      type="number"
                      value={editedCharacter.level}
                      onChange={(e) => updateEditedCharacter('level', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Recompensa (฿)</Label>
                    <Input
                      type="number"
                      value={editedCharacter.bounty}
                      onChange={(e) => updateEditedCharacter('bounty', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>XP Total</Label>
                    <Input
                      type="number"
                      value={editedCharacter.xp || 25000}
                      onChange={(e) => updateEditedCharacter('xp', parseInt(e.target.value) || 25000)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pontos de Habilidade Disponíveis</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillPoints || 0}
                      onChange={(e) => updateEditedCharacter('skillPoints', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-red-700">Atual</Label>
                          <Input
                            type="number"
                            value={editedCharacter.energies?.stamina?.current || 0}
                            onChange={(e) => updateEnergies('stamina', 'current', parseInt(e.target.value) || 0)}
                            className="border-red-300"
                          />
                        </div>
                        <div>
                          <Label className="text-red-700">Máximo</Label>
                          <Input
                            type="number"
                            value={editedCharacter.energies?.stamina?.max || 0}
                            onChange={(e) => updateEnergies('stamina', 'max', parseInt(e.target.value) || 0)}
                            className="border-red-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Haki */}
                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-800 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        ⚫ Haki
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-purple-700">Atual</Label>
                          <Input
                            type="number"
                            value={editedCharacter.energies?.haki?.current || 0}
                            onChange={(e) => updateEnergies('haki', 'current', parseInt(e.target.value) || 0)}
                            className="border-purple-300"
                          />
                        </div>
                        <div>
                          <Label className="text-purple-700">Máximo</Label>
                          <Input
                            type="number"
                            value={editedCharacter.energies?.haki?.max || 0}
                            onChange={(e) => updateEnergies('haki', 'max', parseInt(e.target.value) || 0)}
                            className="border-purple-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resistência */}
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        🟢 Resistência
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-green-700">Atual</Label>
                          <Input
                            type="number"
                            value={editedCharacter.energies?.resistance?.current || 0}
                            onChange={(e) => updateEnergies('resistance', 'current', parseInt(e.target.value) || 0)}
                            className="border-green-300"
                          />
                        </div>
                        <div>
                          <Label className="text-green-700">Máximo</Label>
                          <Input
                            type="number"
                            value={editedCharacter.energies?.resistance?.max || 0}
                            onChange={(e) => updateEnergies('resistance', 'max', parseInt(e.target.value) || 0)}
                            className="border-green-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Nível Stamina</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.stamina || 0}
                      onChange={(e) => updateSkillLevels('stamina', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nível Haki</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.haki || 0}
                      onChange={(e) => updateSkillLevels('haki', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nível Resistência</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.resistance || 0}
                      onChange={(e) => updateSkillLevels('resistance', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Haki do Armamento</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.hakiArmament || 0}
                      onChange={(e) => updateSkillLevels('hakiArmament', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Haki da Observação</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.hakiObservation || 0}
                      onChange={(e) => updateSkillLevels('hakiObservation', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estilo de Luta</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.fightingStyle || 0}
                      onChange={(e) => updateSkillLevels('fightingStyle', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Arma</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.weapon || 0}
                      onChange={(e) => updateSkillLevels('weapon', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Akuma no Mi</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.devilFruit || 0}
                      onChange={(e) => updateSkillLevels('devilFruit', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Profissão</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.profession || 0}
                      onChange={(e) => updateSkillLevels('profession', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Raça</Label>
                    <Input
                      type="number"
                      value={editedCharacter.skillLevels?.race || 0}
                      onChange={(e) => updateSkillLevels('race', parseInt(e.target.value) || 0)}
                      className="border-amber-300"
                    />
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-amber-800">
                    <strong>Pontos Usados:</strong> {Object.values(editedCharacter.skillLevels || {}).reduce((sum, val) => sum + val, 0)} / {editedCharacter.level}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="powers" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Akuma no Mi</Label>
                    <Textarea
                      value={editedCharacter.devilFruit}
                      onChange={(e) => updateEditedCharacter('devilFruit', e.target.value)}
                      placeholder="Descreva a Akuma no Mi e suas habilidades..."
                      className="border-amber-300 min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Haki</Label>
                    <Textarea
                      value={editedCharacter.haki}
                      onChange={(e) => updateEditedCharacter('haki', e.target.value)}
                      placeholder="Descreva os tipos e níveis de Haki..."
                      className="border-amber-300 min-h-[100px]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="inventory" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Inventário</Label>
                    <Button
                      onClick={addInventoryItem}
                      variant="outline"
                      size="sm"
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Item
                    </Button>
                  </div>
                  {editedCharacter.inventory.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <Input
                        value={item.item}
                        onChange={(e) => updateInventoryItem(index, 'item', e.target.value)}
                        placeholder="Nome do item"
                        className="flex-1 border-amber-300"
                      />
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateInventoryItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        placeholder="Qtd"
                        className="w-20 border-amber-300"
                      />
                      <Button
                        onClick={() => removeInventoryItem(index)}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSaveCharacter} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};