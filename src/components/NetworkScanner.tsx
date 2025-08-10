import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wifi, Shield, Globe, Zap } from 'lucide-react';

interface ScanResult {
  ip: string;
  port: number;
  status: 'open' | 'closed' | 'filtered';
  latency: number;
  service?: string;
}

const NetworkScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [connectedEndpoint, setConnectedEndpoint] = useState<ScanResult | null>(null);

  // Simulate network scanning
  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        
        // Simulate finding open ports during scan
        if (Math.random() > 0.7) {
          const mockResult: ScanResult = {
            ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            port: [80, 443, 8080, 3128, 9050, 1080][Math.floor(Math.random() * 6)],
            status: Math.random() > 0.3 ? 'open' : 'filtered',
            latency: Math.floor(Math.random() * 200) + 10,
            service: ['HTTP', 'HTTPS', 'Proxy', 'Tor', 'SOCKS'][Math.floor(Math.random() * 5)]
          };
          
          setScanResults(prev => [...prev, mockResult].slice(-20));
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };

  const connectToEndpoint = (endpoint: ScanResult) => {
    if (endpoint.status === 'open') {
      setConnectedEndpoint(endpoint);
    }
  };

  const disconnect = () => {
    setConnectedEndpoint(null);
  };

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <Card className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-green pulse-glow"></div>
            <h2 className="text-xl font-bold text-neon-green">Network Gateway Scanner</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={connectedEndpoint ? 'default' : 'secondary'} className="bg-neon-green/20 text-neon-green border-neon-green/30">
              {connectedEndpoint ? 'CONNECTED' : 'DISCONNECTED'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Scan Progress</div>
            <Progress value={scanProgress} className="h-2" />
            <div className="text-xs text-neon-green">{scanProgress.toFixed(1)}% Complete</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Active Endpoints</div>
            <div className="text-2xl font-mono text-neon-blue">{scanResults.filter(r => r.status === 'open').length}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={startScan} 
            disabled={isScanning}
            className="bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/30"
          >
            <Wifi className="w-4 h-4 mr-2" />
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Button>
          
          {connectedEndpoint && (
            <Button 
              onClick={disconnect}
              variant="destructive"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
            >
              <Shield className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          )}
        </div>
      </Card>

      {/* Connected Endpoint Status */}
      {connectedEndpoint && (
        <Card className="glass-panel p-6 neon-border">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-neon-green" />
            <h3 className="text-lg font-semibold text-neon-green">Active Connection</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">IP Address</div>
              <div className="font-mono text-neon-blue">{connectedEndpoint.ip}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Port</div>
              <div className="font-mono text-neon-blue">{connectedEndpoint.port}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Latency</div>
              <div className="font-mono text-neon-green">{connectedEndpoint.latency}ms</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Service</div>
              <div className="font-mono text-neon-green">{connectedEndpoint.service}</div>
            </div>
          </div>
        </Card>
      )}

      {/* Scan Results */}
      <Card className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-neon-blue" />
          <h3 className="text-lg font-semibold text-neon-blue">Discovered Endpoints</h3>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {scanResults.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No endpoints discovered yet. Start a scan to find available gateways.
            </div>
          ) : (
            scanResults.map((result, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-cyber-glass/50 rounded-lg border border-border/50 hover:border-neon-green/30 transition-colors cursor-pointer"
                onClick={() => connectToEndpoint(result)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    result.status === 'open' ? 'bg-neon-green' : 
                    result.status === 'filtered' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  
                  <div className="font-mono text-sm">
                    <span className="text-neon-blue">{result.ip}</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-neon-green">{result.port}</span>
                  </div>
                  
                  {result.service && (
                    <Badge variant="outline" className="text-xs border-neon-blue/30 text-neon-blue">
                      {result.service}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{result.latency}ms</span>
                  <Badge 
                    variant={result.status === 'open' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      result.status === 'open' ? 'bg-neon-green/20 text-neon-green border-neon-green/30' :
                      result.status === 'filtered' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {result.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default NetworkScanner;