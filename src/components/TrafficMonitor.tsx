import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Download, Upload, Smartphone } from 'lucide-react';

interface AppTraffic {
  name: string;
  icon: string;
  upload: number;
  download: number;
  status: 'active' | 'routed' | 'blocked';
}

const TrafficMonitor = () => {
  const [totalUpload, setTotalUpload] = useState(0);
  const [totalDownload, setTotalDownload] = useState(0);
  const [appTraffic, setAppTraffic] = useState<AppTraffic[]>([
    { name: 'WhatsApp', icon: '📱', upload: 0, download: 0, status: 'routed' },
    { name: 'Chrome', icon: '🌐', upload: 0, download: 0, status: 'routed' },
    { name: 'Instagram', icon: '📸', upload: 0, download: 0, status: 'routed' },
    { name: 'YouTube', icon: '📺', upload: 0, download: 0, status: 'routed' },
    { name: 'Telegram', icon: '💬', upload: 0, download: 0, status: 'routed' },
    { name: 'TikTok', icon: '🎵', upload: 0, download: 0, status: 'routed' },
    { name: 'Gmail', icon: '📧', upload: 0, download: 0, status: 'routed' },
    { name: 'Spotify', icon: '🎶', upload: 0, download: 0, status: 'routed' }
  ]);

  // Simulate real-time traffic data
  useEffect(() => {
    const interval = setInterval(() => {
      setAppTraffic(prev => prev.map(app => ({
        ...app,
        upload: app.upload + Math.random() * 10,
        download: app.download + Math.random() * 50,
        status: Math.random() > 0.8 ? 'active' : 'routed'
      })));

      setTotalUpload(prev => prev + Math.random() * 50);
      setTotalDownload(prev => prev + Math.random() * 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Traffic Overview */}
      <Card className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-5 h-5 text-neon-green" />
          <h2 className="text-xl font-bold text-neon-green">Traffic Monitor</h2>
          <div className="ml-auto">
            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
              ROUTING ACTIVE
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-neon-blue" />
              <span className="text-sm text-muted-foreground">Total Upload</span>
            </div>
            <div className="text-2xl font-mono text-neon-blue">
              {formatBytes(totalUpload)}
            </div>
            <Progress value={Math.min((totalUpload / 1000) * 100, 100)} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-neon-green" />
              <span className="text-sm text-muted-foreground">Total Download</span>
            </div>
            <div className="text-2xl font-mono text-neon-green">
              {formatBytes(totalDownload)}
            </div>
            <Progress value={Math.min((totalDownload / 5000) * 100, 100)} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyber-purple" />
              <span className="text-sm text-muted-foreground">Apps Routed</span>
            </div>
            <div className="text-2xl font-mono text-cyber-purple">
              {appTraffic.filter(app => app.status === 'routed').length}/8
            </div>
            <Progress value={(appTraffic.filter(app => app.status === 'routed').length / 8) * 100} className="h-2" />
          </div>
        </div>
      </Card>

      {/* App Traffic Details */}
      <Card className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="w-5 h-5 text-neon-blue" />
          <h3 className="text-lg font-semibold text-neon-blue">Application Traffic</h3>
        </div>

        <div className="space-y-3">
          {appTraffic.map((app, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-cyber-glass/50 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{app.icon}</span>
                <div>
                  <div className="font-medium text-foreground">{app.name}</div>
                  <div className="text-xs text-muted-foreground">
                    ↑ {formatBytes(app.upload)} • ↓ {formatBytes(app.download)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-mono text-neon-green">
                    {formatBytes(app.download)}/s
                  </div>
                  <div className="text-xs text-muted-foreground">download</div>
                </div>
                
                <Badge 
                  variant={app.status === 'routed' ? 'default' : app.status === 'active' ? 'secondary' : 'destructive'}
                  className={`text-xs ${
                    app.status === 'routed' ? 'bg-neon-green/20 text-neon-green border-neon-green/30' :
                    app.status === 'active' ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/30' :
                    'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}
                >
                  {app.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Stream Visualization */}
      <Card className="glass-panel p-6 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-neon-green pulse-glow"></div>
          <h3 className="text-lg font-semibold text-neon-green">Live Data Stream</h3>
        </div>

        <div className="relative h-20 bg-cyber-dark/50 rounded-lg border border-border/50 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30"></div>
          
          {/* Animated data streams */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute top-2 h-1 bg-neon-green/70 rounded data-stream"
              style={{
                width: '20px',
                animationDelay: `${i * 0.5}s`,
                top: `${20 + i * 8}px`
              }}
            ></div>
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted-foreground font-mono">
              ROUTING ALL TRAFFIC THROUGH GATEWAY • REAL-TIME MONITORING ACTIVE
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrafficMonitor;