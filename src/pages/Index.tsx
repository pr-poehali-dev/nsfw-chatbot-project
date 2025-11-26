import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

type Character = {
  id: string;
  name: string;
  avatar: string;
  age: string;
  gender: string;
  appearance: string;
  personality: string;
  background: string;
  communicationStyle: string;
  interests: string;
  nsfwPreferences: string;
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
      name: 'Алиса',
      avatar: '👩‍🦰',
      age: '25',
      gender: 'Женский',
      appearance: 'Высокая, рыжие волосы, зеленые глаза',
      personality: 'Открытая, игривая, без границ в общении',
      background: 'Творческая личность, любит эксперименты',
      communicationStyle: 'Прямая, раскованная, использует эмодзи',
      interests: 'Искусство, музыка, откровенные разговоры',
      nsfwPreferences: 'Открыта ко всему, любит флирт и провокации',
    },
  ]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const [newCharacter, setNewCharacter] = useState<Character>({
    id: '',
    name: '',
    avatar: '😊',
    age: '25',
    gender: 'Любой',
    appearance: '',
    personality: '',
    background: '',
    communicationStyle: '',
    interests: '',
    nsfwPreferences: '',
  });

  const handleCreateCharacter = () => {
    if (newCharacter.name && newCharacter.personality) {
      const character: Character = {
        ...newCharacter,
        id: Date.now().toString(),
      };
      setCharacters([...characters, character]);
      setNewCharacter({
        id: '',
        name: '',
        avatar: '😊',
        age: '25',
        gender: 'Любой',
        appearance: '',
        personality: '',
        background: '',
        communicationStyle: '',
        interests: '',
        nsfwPreferences: '',
      });
      setView('home');
    }
  };

  const handleStartChat = (character: Character) => {
    setSelectedCharacter(character);
    setMessages([
      {
        id: '1',
        text: `Привет! Я ${character.name}. ${character.personality} 😏`,
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
      const responses = [
        'Ммм, интересно... Продолжай 😏',
        'О да, я тебя слушаю внимательно 💋',
        'Расскажи мне больше, мне нравится 🔥',
        'Ты знаешь, как меня завести словами...',
        'Это так заводит! Что дальше? 😈',
        'Обожаю, когда ты так говоришь...',
      ];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const avatarEmojis = [
    '😊', '😎', '😈', '👩‍🦰', '🧑', '👨‍💼', '👩‍💻', '🦸', 
    '🧙‍♂️', '🧚', '💋', '🔥', '😏', '🌹', '💃', '🕺'
  ];

  const genderOptions = ['Мужской', 'Женский', 'Небинарный', 'Любой'];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground flex items-center gap-2">
            🔥 AI Chat <span className="text-xs text-muted-foreground">18+</span>
          </h1>
        </div>

        <nav className="flex-1 p-2">
          <Button
            variant={view === 'home' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-1"
            onClick={() => setView('home')}
          >
            <Icon name="Home" size={20} className="mr-3" />
            Персонажи
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Твои персонажи</h2>
                <div className="text-sm text-muted-foreground bg-destructive/20 px-3 py-1 rounded-full">
                  🔞 Контент без ограничений
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-all cursor-pointer animate-fade-in hover:scale-105"
                    onClick={() => handleStartChat(character)}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="text-5xl">{character.avatar}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{character.name}</h3>
                          <p className="text-xs text-muted-foreground">{character.age} лет • {character.gender}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{character.personality}</p>
                      <div className="text-xs text-primary">Нажми для чата 💬</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'create' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-3xl mx-auto p-6">
              <h2 className="text-3xl font-bold mb-2">Создать персонажа</h2>
              <p className="text-muted-foreground mb-6">Настрой каждую деталь под себя. Без ограничений.</p>
              
              <div className="bg-card rounded-lg p-6 border border-border space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Аватар</Label>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {avatarEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          className={`text-3xl p-2 rounded-lg border-2 transition-all ${
                            newCharacter.avatar === emoji
                              ? 'border-primary bg-primary/10 scale-110'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setNewCharacter({ ...newCharacter, avatar: emoji })}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Имя</Label>
                      <Input
                        value={newCharacter.name}
                        onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                        placeholder="Имя персонажа..."
                        className="bg-background mt-2"
                      />
                    </div>

                    <div>
                      <Label>Возраст</Label>
                      <Input
                        value={newCharacter.age}
                        onChange={(e) => setNewCharacter({ ...newCharacter, age: e.target.value })}
                        placeholder="18+"
                        className="bg-background mt-2"
                      />
                    </div>

                    <div>
                      <Label>Гендер</Label>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {genderOptions.map((gender) => (
                          <Button
                            key={gender}
                            variant={newCharacter.gender === gender ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setNewCharacter({ ...newCharacter, gender })}
                          >
                            {gender}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Внешность</Label>
                  <Textarea
                    value={newCharacter.appearance}
                    onChange={(e) => setNewCharacter({ ...newCharacter, appearance: e.target.value })}
                    placeholder="Опиши внешность: рост, телосложение, волосы, глаза, стиль одежды..."
                    className="bg-background mt-2 min-h-24"
                  />
                </div>

                <div>
                  <Label>Характер и личность</Label>
                  <Textarea
                    value={newCharacter.personality}
                    onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })}
                    placeholder="Какой характер? Застенчивый, дерзкий, игривый, доминантный..."
                    className="bg-background mt-2 min-h-24"
                  />
                </div>

                <div>
                  <Label>История и бэкграунд</Label>
                  <Textarea
                    value={newCharacter.background}
                    onChange={(e) => setNewCharacter({ ...newCharacter, background: e.target.value })}
                    placeholder="Чем занимается? Откуда? Жизненная история..."
                    className="bg-background mt-2 min-h-20"
                  />
                </div>

                <div>
                  <Label>Стиль общения</Label>
                  <Textarea
                    value={newCharacter.communicationStyle}
                    onChange={(e) => setNewCharacter({ ...newCharacter, communicationStyle: e.target.value })}
                    placeholder="Как общается? Формально, дружелюбно, кокетливо, использует ли эмодзи..."
                    className="bg-background mt-2 min-h-20"
                  />
                </div>

                <div>
                  <Label>Интересы и хобби</Label>
                  <Input
                    value={newCharacter.interests}
                    onChange={(e) => setNewCharacter({ ...newCharacter, interests: e.target.value })}
                    placeholder="Чем увлекается..."
                    className="bg-background mt-2"
                  />
                </div>

                <div className="border-t border-destructive/20 pt-6">
                  <Label className="text-destructive">🔞 NSFW предпочтения (без цензуры)</Label>
                  <Textarea
                    value={newCharacter.nsfwPreferences}
                    onChange={(e) => setNewCharacter({ ...newCharacter, nsfwPreferences: e.target.value })}
                    placeholder="Любые предпочтения, фантазии, особенности... Полная свобода выражения."
                    className="bg-background mt-2 min-h-32 border-destructive/20"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    ℹ️ Этот раздел полностью без ограничений. Опиши любые детали для максимальной персонализации.
                  </p>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => setView('home')}>
                    <Icon name="ArrowLeft" size={24} />
                  </Button>
                  <div className="text-4xl">{selectedCharacter.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedCharacter.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedCharacter.age} лет • {selectedCharacter.gender}</p>
                  </div>
                </div>
                <div className="text-xs text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                  🔓 Без цензуры
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
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="text-xl">
                        {message.isUser ? '👤' : selectedCharacter.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-2xl p-4 max-w-md ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4 bg-card">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Напиши что угодно... без ограничений 🔥"
                    className="bg-background"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Все разговоры конфиденциальны • Нет модерации контента
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
