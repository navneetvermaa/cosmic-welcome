import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A revolutionary web application that pushes the boundaries of modern design and functionality.",
    tags: ["React", "TypeScript", "Three.js"],
    link: "#",
  },
  {
    id: 2,
    title: "Stellar Interface",
    description: "An immersive user experience designed for the next generation of digital explorers.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    link: "#",
  },
  {
    id: 3,
    title: "Nebula Engine",
    description: "High-performance graphics engine for creating stunning visual experiences.",
    tags: ["WebGL", "GLSL", "Canvas"],
    link: "#",
  },
  {
    id: 4,
    title: "Cosmic Dashboard",
    description: "Data visualization platform that transforms complex data into beautiful insights.",
    tags: ["D3.js", "Node.js", "PostgreSQL"],
    link: "#",
  },
];

interface PlanetSectionProps {
  progress: number;
  isActive: boolean;
}

export const PlanetSection = ({ progress, isActive }: PlanetSectionProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // Stagger project appearances based on progress
  const getProjectOpacity = (index: number) => {
    const threshold = index * 0.2;
    return Math.max(0, Math.min(1, (progress - threshold) / 0.3));
  };
  
  const getProjectTransform = (index: number) => {
    const threshold = index * 0.2;
    const projectProgress = Math.max(0, Math.min(1, (progress - threshold) / 0.3));
    return `translateY(${(1 - projectProgress) * 50}px)`;
  };
  
  return (
    <section 
      className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <div className="max-w-6xl w-full">
        {/* Section header */}
        <div 
          className="text-center mb-12"
          style={{
            opacity: progress > 0.1 ? 1 : 0,
            transform: progress > 0.1 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.5s ease-out',
          }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-2">
            Orbiting Planet Nova
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-glow-cyan">
            My Projects
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Discoveries made during my journey through the cosmos of code and creativity.
          </p>
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                
                <p className="text-muted-foreground font-body text-sm md:text-base mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-xs font-body bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Border glow on hover */}
              <div 
                className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/50 transition-colors duration-300"
                style={{
                  boxShadow: hoveredProject === project.id 
                    ? '0 0 30px hsl(var(--primary) / 0.3), inset 0 0 30px hsl(var(--primary) / 0.1)' 
                    : 'none',
                }}
              />
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div 
          className="text-center mt-12"
          style={{
            opacity: progress > 0.8 ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <button className="btn-cosmic text-primary">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};
