interface WarpSectionProps {
  progress: number;
  isActive: boolean;
}

export const WarpSection = ({ progress, isActive }: WarpSectionProps) => {
  // Speed indicator
  const speed = Math.floor(progress * 299792); // Speed of light in km/s
  const warpFactor = (progress * 9.9).toFixed(1);
  
  // Stretch effect on text
  const stretchScale = 1 + progress * 0.5;
  
  return (
    <section 
      className="h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {/* Warp speed lines overlay */}
      <div 
        className="absolute inset-0 warp-lines pointer-events-none"
        style={{
          opacity: progress * 0.5,
          transform: `scaleX(${stretchScale})`,
        }}
      />
      
      <div className="text-center relative z-10">
        {/* Speed readout */}
        <div 
          className="font-display text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4"
          style={{
            opacity: 0.5 + progress * 0.5,
          }}
        >
          Engaging Warp Drive
        </div>
        
        <div 
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold"
          style={{
            transform: `scaleX(${stretchScale})`,
            opacity: 0.7 + progress * 0.3,
          }}
        >
          <span className="text-primary text-glow-cyan">WARP</span>
          <span className="text-foreground ml-4">{warpFactor}</span>
        </div>
        
        {/* Speed indicator */}
        <div className="mt-8 flex items-center justify-center gap-8 text-muted-foreground font-body">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-display text-primary">
              {speed.toLocaleString()}
            </div>
            <div className="text-xs uppercase tracking-wider">km/s</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-display text-accent">
              {(progress * 100).toFixed(0)}%
            </div>
            <div className="text-xs uppercase tracking-wider">Light Speed</div>
          </div>
        </div>
        
        {/* Warning message */}
        {progress > 0.7 && (
          <div 
            className="mt-12 text-accent font-display text-sm tracking-wider animate-pulse"
            style={{
              opacity: (progress - 0.7) / 0.3,
            }}
          >
            ⚠ GRAVITATIONAL ANOMALY DETECTED ⚠
          </div>
        )}
      </div>
    </section>
  );
};
