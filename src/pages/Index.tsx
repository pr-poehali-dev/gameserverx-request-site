import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface ServerStats {
  cpu: number;
  ram: number;
  playersOnline: number;
  maxPlayers: number;
}

interface Player {
  id: number;
  name: string;
  ping: number;
  playtime: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

const Index = () => {
  const [serverRunning, setServerRunning] = useState(true);
  const [stats] = useState<ServerStats>({
    cpu: 45,
    ram: 62,
    playersOnline: 12,
    maxPlayers: 32,
  });

  const [players] = useState<Player[]>([
    { id: 1, name: 'ProGamer2024', ping: 45, playtime: '2h 34m' },
    { id: 2, name: 'ShadowHunter', ping: 67, playtime: '1h 12m' },
    { id: 3, name: 'NeonKnight', ping: 32, playtime: '3h 45m' },
    { id: 4, name: 'CyberWarrior', ping: 89, playtime: '45m' },
    { id: 5, name: 'PixelMaster', ping: 54, playtime: '2h 01m' },
  ]);

  const [logs] = useState<LogEntry[]>([
    { timestamp: '14:32:11', message: 'Player ProGamer2024 connected', type: 'info' },
    { timestamp: '14:31:45', message: 'Server tick rate: 64', type: 'info' },
    { timestamp: '14:30:22', message: 'Map rotation changed to de_dust2', type: 'warning' },
    { timestamp: '14:29:33', message: 'Player timeout detected', type: 'error' },
    { timestamp: '14:28:10', message: 'Server started successfully', type: 'info' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1423] to-[#0a0e1a] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple mb-2">
              GameServerX
            </h1>
            <p className="text-muted-foreground">Панель управления сервером</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant={serverRunning ? "default" : "destructive"}
              className={`px-4 py-2 text-sm ${serverRunning ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50 animate-pulse-glow' : ''}`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${serverRunning ? 'bg-neon-cyan' : 'bg-red-500'}`} />
              {serverRunning ? 'ОНЛАЙН' : 'ОФФЛАЙН'}
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="glass-card p-6 neon-border-cyan hover:shadow-neon-cyan transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">CPU</p>
                <p className="text-3xl font-bold neon-text-cyan">{stats.cpu}%</p>
              </div>
              <Icon name="Cpu" className="text-neon-cyan" size={40} />
            </div>
            <Progress value={stats.cpu} className="mt-4 h-2 bg-muted" />
          </Card>

          <Card className="glass-card p-6 neon-border-purple hover:shadow-neon-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">RAM</p>
                <p className="text-3xl font-bold neon-text-purple">{stats.ram}%</p>
              </div>
              <Icon name="MemoryStick" className="text-neon-purple" size={40} />
            </div>
            <Progress value={stats.ram} className="mt-4 h-2 bg-muted" />
          </Card>

          <Card className="glass-card p-6 neon-border-cyan hover:shadow-neon-cyan transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Игроки онлайн</p>
                <p className="text-3xl font-bold neon-text-cyan">{stats.playersOnline}/{stats.maxPlayers}</p>
              </div>
              <Icon name="Users" className="text-neon-cyan" size={40} />
            </div>
            <Progress value={(stats.playersOnline / stats.maxPlayers) * 100} className="mt-4 h-2 bg-muted" />
          </Card>

          <Card className="glass-card p-6 neon-border-purple hover:shadow-neon-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Пинг</p>
                <p className="text-3xl font-bold neon-text-purple">28ms</p>
              </div>
              <Icon name="Activity" className="text-neon-purple" size={40} />
            </div>
            <div className="mt-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 w-2 bg-neon-purple/30 rounded-sm" style={{ height: `${(i + 1) * 4}px` }} />
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card p-6 neon-border-cyan animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Gamepad2" className="text-neon-cyan" size={28} />
              Управление
            </h2>
            <div className="space-y-3">
              <Button 
                onClick={() => setServerRunning(!serverRunning)}
                className={`w-full ${serverRunning ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50' : 'bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50'}`}
              >
                <Icon name={serverRunning ? "Square" : "Play"} className="mr-2" size={20} />
                {serverRunning ? 'Остановить' : 'Запустить'}
              </Button>
              <Button className="w-full bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple border border-neon-purple/50">
                <Icon name="RotateCw" className="mr-2" size={20} />
                Перезапустить
              </Button>
              <Button className="w-full bg-muted/20 hover:bg-muted/30 text-foreground border border-muted/50">
                <Icon name="FileText" className="mr-2" size={20} />
                Бэкап
              </Button>
              <Button className="w-full bg-muted/20 hover:bg-muted/30 text-foreground border border-muted/50">
                <Icon name="Settings" className="mr-2" size={20} />
                Настройки
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-muted">
              <h3 className="text-lg font-semibold mb-4">Быстрые команды</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Icon name="Map" className="mr-2" size={16} />
                  Сменить карту
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Icon name="Zap" className="mr-2" size={16} />
                  Изменить режим игры
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Icon name="Shield" className="mr-2" size={16} />
                  Обновить плагины
                </Button>
              </div>
            </div>
          </Card>

          <Card className="glass-card lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Tabs defaultValue="players" className="h-full">
              <TabsList className="w-full bg-muted/30 border-b border-muted">
                <TabsTrigger value="players" className="flex-1 data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  <Icon name="Users" className="mr-2" size={16} />
                  Игроки
                </TabsTrigger>
                <TabsTrigger value="console" className="flex-1 data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple">
                  <Icon name="Terminal" className="mr-2" size={16} />
                  Консоль
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  <Icon name="Sliders" className="mr-2" size={16} />
                  Настройки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="players" className="p-6">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {players.map((player, index) => (
                      <div 
                        key={player.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-muted hover:border-neon-cyan/50 transition-all animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center font-bold">
                            {player.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{player.name}</p>
                            <p className="text-sm text-muted-foreground">Время в игре: {player.playtime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan">
                            {player.ping}ms
                          </Badge>
                          <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300">
                            <Icon name="AlertTriangle" size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                            <Icon name="Ban" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="console" className="p-6">
                <ScrollArea className="h-[400px] rounded-lg bg-black/40 p-4 font-mono text-sm border border-neon-purple/30">
                  {logs.map((log, index) => (
                    <div 
                      key={index}
                      className={`mb-2 ${
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'warning' ? 'text-yellow-400' : 
                        'text-neon-cyan'
                      }`}
                    >
                      <span className="text-muted-foreground">[{log.timestamp}]</span> {log.message}
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название сервера</label>
                    <input 
                      type="text" 
                      defaultValue="GameServerX Official Server #1"
                      className="w-full px-4 py-2 rounded-lg bg-muted/20 border border-muted focus:border-neon-cyan outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Максимум игроков</label>
                    <input 
                      type="number" 
                      defaultValue="32"
                      className="w-full px-4 py-2 rounded-lg bg-muted/20 border border-muted focus:border-neon-cyan outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Текущая карта</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-muted/20 border border-muted focus:border-neon-cyan outline-none transition-colors">
                      <option>de_dust2</option>
                      <option>de_mirage</option>
                      <option>de_inferno</option>
                      <option>de_nuke</option>
                    </select>
                  </div>
                  <Button className="w-full bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50">
                    <Icon name="Save" className="mr-2" size={20} />
                    Сохранить изменения
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
