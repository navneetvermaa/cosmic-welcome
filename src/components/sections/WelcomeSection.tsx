interface WelcomeSectionProps {
  progress: number;
  isActive: boolean;
}

export const WelcomeSection = ({ progress, isActive }: WelcomeSectionProps) => {
  // Text appears after initial star zoom (around 50% section progress)
  const textOpacity = Math.max(0, (progress - 0.3) / 0.7);
  const textTranslate = (1 - progress) * 100;
  
  return (
    <section 
      className="h-screen flex items-center justify-end pr-8 md:pr-16 lg:pr-24"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <div 
        className="text-right max-w-lg"
        style={{
          opacity: textOpacity,
          transform: `translateX(${textTranslate}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <p className="text-primary font-body text-lg md:text-xl mb-2 tracking-widest uppercase">
          Initiating sequence
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground text-glow-cyan mb-4">
          Hi,
          <br />
          <span className="text-primary">Welcome</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg md:text-xl leading-relaxed">
          Prepare for an interstellar journey through my universe of projects and experiences.
        </p>
        
        <div className="mt-8 flex items-center justify-end gap-2 text-muted-foreground">
          <span className="text-sm font-body tracking-wider uppercase">Scroll to launch</span>
          <div className="scroll-indicator">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-primary"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
