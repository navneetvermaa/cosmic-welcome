import { Mail, Image, Users, Rocket } from 'lucide-react';

interface VoidSectionProps {
  progress: number;
  isActive: boolean;
}

export const VoidSection = ({ progress, isActive }: VoidSectionProps) => {
  const fadeIn = Math.max(0, (progress - 0.2) / 0.6);
  
  return (
    <section 
      className="h-screen flex items-center justify-center relative px-4"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {/* Main content card */}
      <div 
        className="glass rounded-2xl p-8 md:p-12 max-w-xl w-full relative overflow-hidden"
        style={{
          opacity: fadeIn,
          transform: `translateY(${(1 - fadeIn) * 30}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
        
        {/* Status bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
              The Event Horizon // 100% Complete
            </span>
          </div>
          <Rocket className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-border/30 mb-8" />
        
        {/* Main heading */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-2">
          Let's build
        </h2>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-8">
          <span className="text-foreground">the </span>
          <span className="text-primary/60">future.</span>
        </h2>
        
        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-8 max-w-md">
          The journey doesn't end here. I am currently open for new collaborations starting Q1 2025.
        </p>
        
        {/* Email CTA */}
        <div className="flex items-center gap-4 mb-8">
          <button className="flex items-center gap-3 bg-primary/20 hover:bg-primary/30 border border-primary/30 px-6 py-3 rounded-lg transition-colors group">
            <Mail className="w-5 h-5 text-foreground" />
            <span className="font-display text-sm tracking-wider text-foreground">
              hello@portfolio.design
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-border/50" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-body text-xs text-muted-foreground">Available for work</span>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-border/30 mb-6" />
        
        {/* Social links and footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted/30 rounded-lg transition-colors">
              <Image className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted/30 rounded-lg transition-colors">
              <Users className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted/30 rounded-lg transition-colors">
              <Rocket className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="text-right">
            <p className="font-body text-[10px] text-muted-foreground/70 tracking-wider uppercase">
              © 2024 Design. Made in Space.
            </p>
            <p className="font-body text-[10px] text-muted-foreground/50 tracking-wider">
              📍 Singularity, Null
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom status */}
      <div className="fixed bottom-8 right-8 flex items-center gap-2 text-muted-foreground/50 font-body text-xs tracking-wider">
        <span>System Offline</span>
        <Rocket className="w-4 h-4" />
      </div>
    </section>
  );
};
