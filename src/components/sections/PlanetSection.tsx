import { useState } from 'react';
import { Link2, Bitcoin, Lock } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: 'link' | 'bitcoin' | 'lock';
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nebula Explorer",
    description: "Real-time WebGL visualization of star clusters using raymarching techniques to render volumetric nebulae.",
    tags: ["THREE.JS", "REACT", "WEBGL"],
    icon: 'link',
    link: "#",
  },
  {
    id: 2,
    title: "Orbit Finance",
    description: "DeFi dashboard visualizing liquidity pools with gravitational physics interactions and real-time market data.",
    tags: ["SOLIDITY", "D3.JS", "WEB3"],
    icon: 'bitcoin',
    link: "#",
  },
  {
    id: 3,
    title: "Void Chat",
    description: "End-to-end encrypted messaging platform designed for zero-latency communication across distributed nodes.",
    tags: ["SOCKET.IO", "NODE.JS", "REDIS"],
    icon: 'lock',
    link: "#",
  },
];

const ProjectIcon = ({ type }: { type: 'link' | 'bitcoin' | 'lock' }) => {
  const iconClass = "w-5 h-5 text-muted-foreground";
  switch (type) {
    case 'bitcoin': return <Bitcoin className={iconClass} />;
    case 'lock': return <Lock className={iconClass} />;
    default: return <Link2 className={iconClass} />;
  }
};

interface PlanetSectionProps {
  progress: number;
  isActive: boolean;
}

export const PlanetSection = ({ progress, isActive }: PlanetSectionProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const getProjectOpacity = (index: number) => {
    const threshold = index * 0.15;
    return Math.max(0, Math.min(1, (progress - threshold) / 0.25));
  };
  
  const getProjectTransform = (index: number) => {
    const threshold = index * 0.15;
    const projectProgress = Math.max(0, Math.min(1, (progress - threshold) / 0.25));
    return `translateY(${(1 - projectProgress) * 40}px)`;
  };
  
  return (
    <section 
      className="min-h-screen flex items-start justify-end py-24 px-4 md:px-8 lg:px-16"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <div className="max-w-lg w-full">
        {/* Section header */}
        <div 
          className="text-right mb-8"
          style={{
            opacity: progress > 0.05 ? 1 : 0,
            transform: progress > 0.05 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out',
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Mission Logs
          </h2>
          <div className="flex items-center justify-end gap-2 text-muted-foreground">
            <span className="text-lg">📁</span>
            <span className="font-body text-xs tracking-[0.15em] uppercase">
              Archive // Projects
            </span>
          </div>
        </div>
        
        {/* Projects list */}
        <div className="space-y-4">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="glass rounded-xl p-6 cursor-pointer group relative overflow-hidden"
              style={{
                opacity: getProjectOpacity(index),
                transform: getProjectTransform(index),
                transition: 'all 0.3s ease-out',
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Hover glow */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <div className="relative z-10">
                {/* Title with icon */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <h3 className="font-display text-xl font-semibold text-foreground text-center">
                    {project.title}
                  </h3>
                  <ProjectIcon type={project.icon} />
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground font-body text-sm text-center leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-[10px] font-body border border-border/50 text-muted-foreground rounded-full tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Border glow on hover */}
              <div 
                className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-300"
                style={{
                  boxShadow: hoveredProject === project.id 
                    ? '0 0 20px hsl(var(--primary) / 0.2), inset 0 0 20px hsl(var(--primary) / 0.05)' 
                    : 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Left side status panel */}
      <div 
        className="fixed left-8 bottom-32 max-w-xs"
        style={{
          opacity: progress > 0.3 ? (progress - 0.3) * 2 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-body text-xs tracking-[0.15em] uppercase text-primary">
              System Status
            </span>
          </div>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            Planetary scan complete. Several artifacts detected in sector 7G. Approaching data clusters.
          </p>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="fixed bottom-8 left-8 right-8 flex items-center justify-between">
        <button className="flex items-center gap-2 text-muted-foreground font-body text-xs tracking-wider hover:text-foreground transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          ORBIT VIEW
        </button>
        
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="w-32 h-1 bg-border/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="font-body text-xs text-muted-foreground">SEC-03 LOADING</span>
        </div>
        
        <button className="flex items-center gap-2 text-primary font-body text-xs tracking-wider hover:text-foreground transition-colors">
          APPROACH HORIZON
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};
