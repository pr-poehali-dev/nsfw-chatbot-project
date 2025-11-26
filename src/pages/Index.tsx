import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Character = {
  id: string;
  name: string;
  description: string;
  avatar: string;
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const Index = () => {
  const [view, setView] = useState<'home' | 'create' | 'chat'>('home');
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: '1',
      name: 'Ася',
      description: 'Твоя виртуальная подруга, готовая поддержать любой разговор',
      avatar: '👩‍🦰',
    },
    {
      id: '2',
      name: 'Максим',
      description: 'Харизматичный собеседник с чувством юмора',
      avatar: '🧑',
    },
  ]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const [newCharacter, setNewCharacter] = useState({
    name: '',
    description: '',
    avatar: '😊',
  });

  const handleCreateCharacter = () => {
    if (newCharacter.name && newCharacter.description) {
      const character: Character = {
        id: Date.now().toString(),
        ...newCharacter,
      };
      setCharacters([...characters, character]);
      setNewCharacter({ name: '', description: '', avatar: '😊' });
      setView('home');
    }
  };

  const handleStartChat = (character: Character) => {
    setSelectedCharacter(character);
    setMessages([
      {
        id: '1',
        text: `Привет! Я ${character.name}. ${character.description}`,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setView('chat');
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Интересно! Расскажи мне больше...',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const avatarEmojis = ['😊', '😎', '🤖', '👩‍🦰', '🧑', '👨‍💼', '👩‍💻', '🦸', '🧙‍♂️', '🧚'];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">AI Chat</h1>
        </div>

        <nav className="flex-1 p-2">
          <Button
            variant={view === 'home' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-1"
            onClick={() => setView('home')}
          >
            <Icon name="Home" size={20} className="mr-3" />
            Главная
          </Button>
          <Button
            variant={view === 'create' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-1"
            onClick={() => setView('create')}
          >
            <Icon name="Plus" size={20} className="mr-3" />
            Создать персонажа
          </Button>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="text-sm text-sidebar-foreground">Пользователь</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {view === 'home' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto p-6">
              <h2 className="text-3xl font-bold mb-6">Персонажи</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors cursor-pointer animate-fade-in"
                    onClick={() => handleStartChat(character)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{character.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
                        <p className="text-muted-foreground text-sm">{character.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'create' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl mx-auto p-6">
              <h2 className="text-3xl font-bold mb-6">Создать персонажа</h2>
              <div className="bg-card rounded-lg p-6 border border-border space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Аватар</label>
                  <div className="flex gap-2 flex-wrap">
                    {avatarEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        className={`text-4xl p-3 rounded-lg border-2 transition-all ${
                          newCharacter.avatar === emoji
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setNewCharacter({ ...newCharacter, avatar: emoji })}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Имя персонажа</label>
                  <Input
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                    placeholder="Введите имя..."
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <Textarea
                    value={newCharacter.description}
                    onChange={(e) =>
                      setNewCharacter({ ...newCharacter, description: e.target.value })
                    }
                    placeholder="Опишите личность персонажа..."
                    className="bg-background min-h-32"
                  />
                </div>

                <Button onClick={handleCreateCharacter} className="w-full" size="lg">
                  <Icon name="Check" size={20} className="mr-2" />
                  Создать персонажа
                </Button>
              </div>
            </div>
          </div>
        )}

        {view === 'chat' && selectedCharacter && (
          <>
            <div className="border-b border-border p-4 bg-card">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setView('home')}>
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <div className="text-4xl">{selectedCharacter.avatar}</div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedCharacter.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCharacter.description}</p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-slide-in ${
                      message.isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {message.isUser ? 'U' : selectedCharacter.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-4 max-w-md ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4 bg-card">
              <div className="max-w-3xl mx-auto flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Написать сообщение..."
                  className="bg-background"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
