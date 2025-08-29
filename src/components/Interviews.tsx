import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Plus, 
  Calendar,
  User,
  Check,
  X,
  Clock,
  Eye
} from 'lucide-react';
import { mockInterviews, Interview as InterviewType, mockCharacters } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export const Interviews: React.FC = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState<InterviewType[]>(mockInterviews);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<InterviewType | null>(null);
  const [newInterviewForm, setNewInterviewForm] = useState({
    title: '',
    content: ''
  });

  const userCharacter = mockCharacters.find(char => char.userId === user?.id);

  const handleCreateInterview = () => {
    if (!newInterviewForm.title.trim() || !newInterviewForm.content.trim()) {
      toast.error('Título e conteúdo são obrigatórios');
      return;
    }

    if (!userCharacter) {
      toast.error('Personagem não encontrado');
      return;
    }

    const newInterview: InterviewType = {
      id: (interviews.length + 1).toString(),
      title: newInterviewForm.title,
      content: newInterviewForm.content,
      author: user?.id || '',
      characterName: userCharacter.name,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setInterviews([newInterview, ...interviews]);
    setNewInterviewForm({ title: '', content: '' });
    setIsCreateDialogOpen(false);
    toast.success('Entrevista enviada para aprovação!');
  };

  const handleApproveInterview = (interviewId: string) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId 
        ? { ...interview, status: 'approved' as const }
        : interview
    ));
    toast.success('Entrevista aprovada!');
  };

  const handleRejectInterview = (interviewId: string) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId 
        ? { ...interview, status: 'rejected' as const }
        : interview
    ));
    toast.success('Entrevista rejeitada!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">Aprovada</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitada</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pendente</Badge>;
      default:
        return null;
    }
  };

  const approvedInterviews = interviews.filter(interview => interview.status === 'approved');
  const pendingInterviews = interviews.filter(interview => interview.status === 'pending');
  const userInterviews = interviews.filter(interview => interview.author === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-amber-900 flex items-center">
          <Users className="h-6 w-6 mr-3" />
          Jornal do Mundo - Entrevistas
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Entrevista
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submeter Nova Entrevista</DialogTitle>
              <DialogDescription>
                Compartilhe suas aventuras e experiências com outros piratas. A entrevista será revisada antes da publicação.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Entrevista</Label>
                <Input
                  id="title"
                  value={newInterviewForm.title}
                  onChange={(e) => setNewInterviewForm({ ...newInterviewForm, title: e.target.value })}
                  placeholder="Ex: Minha primeira aventura como pirata..."
                  className="border-amber-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={newInterviewForm.content}
                  onChange={(e) => setNewInterviewForm({ ...newInterviewForm, content: e.target.value })}
                  placeholder="Conte sua história, aventuras, desafios enfrentados..."
                  className="border-amber-300 min-h-[200px]"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Dica:</strong> Entrevistas interessantes e bem escritas têm maior chance de aprovação!
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateInterview} className="bg-green-600 hover:bg-green-700">
                  Submeter para Aprovação
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="published" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="published">Publicadas</TabsTrigger>
          <TabsTrigger value="mine">Minhas Entrevistas</TabsTrigger>
          {user?.role === 'master' && (
            <TabsTrigger value="pending">
              Pendentes ({pendingInterviews.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="published" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Entrevistas Publicadas</CardTitle>
              <CardDescription>
                Histórias e aventuras compartilhadas pela comunidade pirata
              </CardDescription>
            </CardHeader>
            <CardContent>
              {approvedInterviews.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma entrevista publicada ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {approvedInterviews.map((interview) => (
                    <Card key={interview.id} className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-green-900">{interview.title}</CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-green-700 mt-2">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {interview.characterName}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(interview.date)}
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(interview.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-800 leading-relaxed whitespace-pre-wrap">
                          {interview.content.length > 300 
                            ? `${interview.content.substring(0, 300)}...` 
                            : interview.content}
                        </p>
                        {interview.content.length > 300 && (
                          <Button
                            variant="link"
                            className="text-green-600 p-0 h-auto mt-2"
                            onClick={() => setSelectedInterview(interview)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ler mais
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mine" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Minhas Entrevistas</CardTitle>
              <CardDescription>
                Suas submissões e o status de cada uma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userInterviews.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Você ainda não submeteu nenhuma entrevista</p>
                  <Button 
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    Submeter Primeira Entrevista
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userInterviews.map((interview) => (
                    <Card key={interview.id} className="border-2 border-amber-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-amber-900">{interview.title}</CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-amber-700 mt-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(interview.date)}
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(interview.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-amber-800 leading-relaxed whitespace-pre-wrap">
                          {interview.content.length > 200 
                            ? `${interview.content.substring(0, 200)}...` 
                            : interview.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === 'master' && (
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900">Entrevistas Pendentes</CardTitle>
                <CardDescription>
                  Entrevistas aguardando aprovação ou rejeição
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingInterviews.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma entrevista pendente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingInterviews.map((interview) => (
                      <Card key={interview.id} className="border-2 border-yellow-200 bg-yellow-50">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-yellow-900">{interview.title}</CardTitle>
                              <div className="flex items-center space-x-4 text-sm text-yellow-700 mt-2">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {interview.characterName}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(interview.date)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveInterview(interview.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectInterview(interview.id)}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Rejeitar
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-yellow-800 leading-relaxed whitespace-pre-wrap">
                            {interview.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Modal para ler entrevista completa */}
      {selectedInterview && (
        <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-green-900">{selectedInterview.title}</DialogTitle>
              <div className="flex items-center space-x-4 text-sm text-green-700">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {selectedInterview.characterName}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(selectedInterview.date)}
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-green-800 leading-relaxed whitespace-pre-wrap">
                {selectedInterview.content}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};