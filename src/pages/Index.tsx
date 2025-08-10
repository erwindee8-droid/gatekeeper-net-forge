import { useState } from 'react';
import NetworkScanner from '@/components/NetworkScanner';
import TrafficMonitor from '@/components/TrafficMonitor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, 
  Network, 
  Shield, 
  Globe,
  Settings,
  Activity
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'scanner' | 'monitor'>('scanner');

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Scan line animation */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent scan-line"></div>
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <Card className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
                <Terminal className="w-6 h-6 text-cyber-dark" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neon-green font-mono">
                  GATEKEEPER
                </h1>
                <p className="text-sm text-muted-foreground">
                  Network Gateway & Traffic Router v2.1.0
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                <Shield className="w-3 h-3 mr-1" />
                SECURE
              </Badge>
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                <Globe className="w-3 h-3 mr-1" />
                ONLINE
              </Badge>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <Card className="glass-panel p-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab('scanner')}
              variant={activeTab === 'scanner' ? 'default' : 'ghost'}
              className={`flex-1 ${
                activeTab === 'scanner' 
                  ? 'bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/30' 
                  : 'hover:bg-cyber-glass/50 text-muted-foreground'
              }`}
            >
              <Network className="w-4 h-4 mr-2" />
              Network Scanner
            </Button>
            
            <Button
              onClick={() => setActiveTab('monitor')}
              variant={activeTab === 'monitor' ? 'default' : 'ghost'}
              className={`flex-1 ${
                activeTab === 'monitor' 
                  ? 'bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/30' 
                  : 'hover:bg-cyber-glass/50 text-muted-foreground'
              }`}
            >
              <Activity className="w-4 h-4 mr-2" />
              Traffic Monitor
            </Button>
            
            <Button
              variant="ghost"
              className="hover:bg-cyber-glass/50 text-muted-foreground"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </Card>

        {/* Main Content */}
        {activeTab === 'scanner' && <NetworkScanner />}
        {activeTab === 'monitor' && <TrafficMonitor />}

        {/* Footer */}
        <Card className="glass-panel p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© 2024 Gatekeeper Network Tools</span>
              <span>•</span>
              <span>Build 2.1.0-alpha</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green pulse-glow"></div>
              <span>System Operational</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
