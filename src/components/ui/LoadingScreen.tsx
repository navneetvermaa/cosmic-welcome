import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'zooming' | 'complete'>('loading');
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('zooming');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (phase === 'zooming') {
      // Star zoom animation duration
      const timer = setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);
  
  if (phase === 'complete') return null;
  
  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        phase === 'zooming' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Star that zooms */}
        <div 
          className={`w-4 h-4 rounded-full bg-star mx-auto mb-8 ${
            phase === 'zooming' ? 'animate-star-zoom' : 'animate-pulse-glow'
          }`}
          style={{
            boxShadow: '0 0 20px #fff, 0 0 40px #fff, 0 0 60px hsl(var(--primary))',
          }}
        />
        
        {/* Loading text */}
        <div className="font-display text-sm tracking-[0.5em] uppercase text-muted-foreground mb-4">
          {phase === 'loading' ? 'Initializing Star Map' : 'Launching...'}
        </div>
        
        {/* Progress bar */}
        {phase === 'loading' && (
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-200"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
