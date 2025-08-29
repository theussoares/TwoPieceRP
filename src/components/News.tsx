import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar,
  User,
  Save,
  X
} from 'lucide-react';
import { mockNews, News as NewsType } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export const News: React.FC = () => {
  const { user } = useAuth();
  const [news, setNews] = useState<NewsType[]>(mockNews);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsType | null>(null);
  const [newNewsForm, setNewNewsForm] = useState({
    title: '',
    content: ''
  });

  const handleCreateNews = () => {
    if (!newNewsForm.title.trim() || !newNewsForm.content.trim()) {
      toast.error('Título e conteúdo são obrigatórios');
      return;
    }

    const newNews: NewsType = {
      id: (news.length + 1).toString(),
      title: newNewsForm.title,
      content: newNewsForm.content,
      author: user?.characterName || 'Mestre',
      date: new Date().toISOString().split('T')[0]
    };

    setNews([newNews, ...news]);
    setNewNewsForm({ title: '', content: '' });
    setIsCreateDialogOpen(false);
    toast.success('Notícia publicada com sucesso!');
  };

  const handleEditNews = (newsItem: NewsType) => {
    setEditingNews({ ...newsItem });
  };

  const handleSaveEdit = () => {
    if (!editingNews) return;

    setNews(news.map(item => 
      item.id === editingNews.id ? editingNews : item
    ));
    setEditingNews(null);
    toast.success('Notícia atualizada com sucesso!');
  };

  const handleDeleteNews = (newsId: string) => {
    setNews(news.filter(item => item.id !== newsId));
    toast.success('Notícia removida com sucesso!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-amber-900 flex items-center">
          <FileText className="h-6 w-6 mr-3" />
          Notícias Mundiais
        </h1>
        {user?.role === 'master' && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nova Notícia
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Publicar Nova Notícia</DialogTitle>
                <DialogDescription>
                  Crie uma nova notícia para informar os piratas sobre eventos mundiais
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Notícia</Label>
                  <Input
                    id="title"
                    value={newNewsForm.title}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, title: e.target.value })}
                    placeholder="Digite o título da notícia..."
                    className="border-amber-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={newNewsForm.content}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, content: e.target.value })}
                    placeholder="Escreva o conteúdo da notícia..."
                    className="border-amber-300 min-h-[200px]"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateNews} className="bg-blue-600 hover:bg-blue-700">
                    Publicar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-6">
        {news.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma notícia publicada ainda</p>
            </CardContent>
          </Card>
        ) : (
          news.map((newsItem) => (
            <Card key={newsItem.id} className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {editingNews?.id === newsItem.id ? (
                      <Input
                        value={editingNews.title}
                        onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                        className="text-lg font-bold bg-white border-amber-300 mb-2"
                      />
                    ) : (
                      <CardTitle className="text-blue-900 text-xl mb-2">
                        {newsItem.title}
                      </CardTitle>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-blue-700">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {newsItem.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(newsItem.date)}
                      </div>
                    </div>
                  </div>
                  
                  {user?.role === 'master' && (
                    <div className="flex items-center space-x-2 ml-4">
                      {editingNews?.id === newsItem.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingNews(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditNews(newsItem)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNews(newsItem.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingNews?.id === newsItem.id ? (
                  <Textarea
                    value={editingNews.content}
                    onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                    className="bg-white border-amber-300 min-h-[150px]"
                  />
                ) : (
                  <p className="text-blue-800 leading-relaxed whitespace-pre-wrap">
                    {newsItem.content}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};