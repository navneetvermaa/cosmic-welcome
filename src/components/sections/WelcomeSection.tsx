interface WelcomeSectionProps {
  progress: number;
  isActive: boolean;
}

export const WelcomeSection = ({ progress, isActive }: WelcomeSectionProps) => {
  const textOpacity = Math.max(0, (progress - 0.3) / 0.7);
  const textTranslate = (1 - progress) * 50;
  
  return (
    <section 
      className="h-screen flex items-center justify-center px-4 md:px-8"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {/* Main content card - glass morphic like reference */}
      <div 
        className="glass rounded-2xl p-8 md:p-12 max-w-xl w-full relative overflow-hidden"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textTranslate}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-2xl" />
        
        {/* Status bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
              System Online
            </span>
          </div>
          <span className="font-body text-xs text-muted-foreground tracking-wider">
            34.05° N, 118.24° W
          </span>
        </div>
        
        {/* Main heading */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-2">
          Hi<span className="text-primary">.</span>
        </h1>
        
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-1">
          Welcome.
        </h2>
        <p className="font-body text-xl md:text-2xl text-muted-foreground mb-6">
          I build digital experiences.
        </p>
        
        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-8 max-w-md">
          I design and build immersive digital universes. Scroll to explore the cosmos and view selected works.
        </p>
        
        {/* Action section */}
        <div className="border-t border-border/30 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground block mb-1">
                Action
              </span>
              <button className="flex items-center gap-2 text-foreground font-display text-sm tracking-wider uppercase group">
                Start Journey
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Audio indicator */}
            <div className="flex items-center gap-1">
              <div className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-0.5 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-0.5 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              <div className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom left status */}
      <div className="fixed bottom-8 left-8 flex items-center gap-4 text-muted-foreground font-body text-xs tracking-wider">
        <span>EPOCH: 2024.1</span>
        <span className="text-border">|</span>
        <span>VEL: {(progress * 1000).toFixed(2)} KM/S</span>
      </div>
      
      {/* Bottom right scroll hint */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-2">
        <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
          Scroll to Explore
        </span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-muted-foreground animate-bounce"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
};
