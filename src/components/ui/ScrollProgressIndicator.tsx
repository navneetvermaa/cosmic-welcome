interface ScrollProgressIndicatorProps {
  progress: number;
  section: string;
}

const SECTION_LABELS: Record<string, string> = {
  welcome: 'Welcome',
  warp: 'Warp Speed',
  blackhole: 'Black Hole',
  planet: 'Projects',
  void: 'The End',
};

export const ScrollProgressIndicator = ({ progress, section }: ScrollProgressIndicatorProps) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-4">
      {/* Section indicators */}
      {Object.entries(SECTION_LABELS).map(([key, label], index) => {
        const isActive = section === key;
        const isPast = Object.keys(SECTION_LABELS).indexOf(section) > index;
        
        return (
          <div key={key} className="flex items-center gap-3">
            <span 
              className={`font-body text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive ? 'text-primary opacity-100' : 'text-muted-foreground opacity-50'
              }`}
            >
              {label}
            </span>
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-primary scale-150 shadow-[0_0_10px_hsl(var(--primary))]' 
                  : isPast 
                    ? 'bg-primary/50' 
                    : 'bg-muted'
              }`}
            />
          </div>
        );
      })}
      
      {/* Progress bar */}
      <div className="mt-4 w-1 h-24 bg-muted rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-100"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};
