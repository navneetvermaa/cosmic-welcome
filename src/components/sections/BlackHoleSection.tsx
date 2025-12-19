interface BlackHoleSectionProps {
  progress: number;
  isActive: boolean;
}

export const BlackHoleSection = ({ progress, isActive }: BlackHoleSectionProps) => {
  // Gravitational distortion effect
  const distortion = progress * 10;
  const pullOpacity = Math.min(progress * 1.5, 1);
  
  return (
    <section 
      className="h-screen flex items-center justify-center relative"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {/* Vignette effect - gets stronger as we approach */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent ${60 - progress * 40}%, hsl(var(--void-black)) 100%)`,
          opacity: pullOpacity,
        }}
      />
      
      <div 
        className="text-center relative z-10"
        style={{
          transform: `scale(${1 - progress * 0.3})`,
        }}
      >
        <div className="font-display text-xs md:text-sm tracking-[0.5em] uppercase text-accent mb-6 animate-pulse">
          ⚠ Warning: Event Horizon Approaching ⚠
        </div>
        
        <h2 
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
          style={{
            textShadow: `0 0 ${20 + distortion * 3}px hsl(var(--accent)), 0 0 ${40 + distortion * 5}px hsl(var(--accent) / 0.5)`,
            letterSpacing: `${distortion * 0.5}px`,
          }}
        >
          BLACK HOLE
        </h2>
        
        <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
          The gravitational pull is irresistible. But there's something else here...
        </p>
        
        {/* Distance indicator */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="glass px-6 py-3 rounded-lg">
            <div className="text-primary font-display text-xl">
              {(100 - progress * 99).toFixed(1)} AU
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Distance to Event Horizon
            </div>
          </div>
        </div>
        
        {/* Navigation hint */}
        {progress > 0.5 && (
          <div 
            className="mt-8 text-primary font-body text-sm"
            style={{ opacity: (progress - 0.5) * 2 }}
          >
            A planet orbits nearby... scroll to investigate →
          </div>
        )}
      </div>
    </section>
  );
};
