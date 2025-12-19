interface BlackHoleSectionProps {
  progress: number;
  isActive: boolean;
}

export const BlackHoleSection = ({ progress, isActive }: BlackHoleSectionProps) => {
  const distortion = progress * 10;
  const pullOpacity = Math.min(progress * 1.5, 1);
  
  return (
    <section 
      className="h-screen flex items-center justify-center relative px-4 md:px-8"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent ${60 - progress * 40}%, hsl(var(--void-black)) 100%)`,
          opacity: pullOpacity,
        }}
      />
      
      {/* Main content */}
      <div 
        className="text-center relative z-10 max-w-2xl"
        style={{
          transform: `scale(${1 - progress * 0.2})`,
        }}
      >
        {/* Sector label */}
        <div className="mb-6">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary">
            Sector 02
          </span>
        </div>
        
        {/* Main title */}
        <h2 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-wide"
          style={{
            textShadow: `0 0 ${20 + distortion * 3}px hsl(var(--primary) / 0.5), 0 0 ${40 + distortion * 5}px hsl(var(--accent) / 0.3)`,
            letterSpacing: `${2 + distortion * 0.5}px`,
          }}
        >
          EVENT HORIZON
        </h2>
        
        {/* Description with left accent bar */}
        <div className="flex items-start gap-4 justify-center max-w-lg mx-auto">
          <div className="w-0.5 h-16 bg-primary/50 flex-shrink-0 mt-1" />
          <p className="text-muted-foreground font-body text-sm md:text-base text-left leading-relaxed">
            Approaching gravitational singularity. Time dilation effects detected. Project archives accessible in local orbit.
          </p>
        </div>
        
        {/* Navigation hint */}
        {progress > 0.5 && (
          <div 
            className="mt-12 text-muted-foreground font-body text-xs tracking-wider"
            style={{ opacity: (progress - 0.5) * 2 }}
          >
            Continue scrolling to approach the singularity →
          </div>
        )}
      </div>
      
      {/* Right side navigation indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 text-xs font-body tracking-wider">
        <div className="flex items-center gap-3 text-muted-foreground/50">
          <span>01 // STARFIELD</span>
          <div className="w-2 h-2 rounded-full border border-muted-foreground/30" />
        </div>
        <div className="flex items-center gap-3 text-foreground">
          <span>02 // HORIZON</span>
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <div className="flex items-center gap-3 text-muted-foreground/50">
          <span>03 // PROJECTS</span>
          <div className="w-2 h-2 rounded-full border border-muted-foreground/30" />
        </div>
        <div className="flex items-center gap-3 text-muted-foreground/50">
          <span>04 // SINGULARITY</span>
          <div className="w-2 h-2 rounded-full border border-muted-foreground/30" />
        </div>
        
        {/* Telemetry */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <span className="text-primary text-[10px] tracking-[0.2em] uppercase block mb-2">Telemetry</span>
          <div className="text-muted-foreground/70 text-[10px] space-y-1">
            <div>DIST: {(4000 - progress * 3900).toFixed(0)} LY</div>
            <div>VEL: {(200 + progress * 800).toFixed(0)}km/s</div>
          </div>
        </div>
      </div>
    </section>
  );
};
