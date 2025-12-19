interface VoidSectionProps {
  progress: number;
  isActive: boolean;
}

export const VoidSection = ({ progress, isActive }: VoidSectionProps) => {
  // Everything fades to black
  const fadeOpacity = 1 - progress;
  const textReveal = progress > 0.5 ? (progress - 0.5) * 2 : 0;
  
  return (
    <section 
      className="h-screen flex items-center justify-center relative"
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {/* Black overlay that fades in */}
      <div 
        className="absolute inset-0 bg-void-black pointer-events-none"
        style={{
          opacity: progress * 0.95,
        }}
      />
      
      <div className="text-center relative z-10 px-4">
        {/* Farewell message */}
        <div 
          style={{
            opacity: textReveal,
            transform: `scale(${0.8 + textReveal * 0.2})`,
            transition: 'all 0.3s ease-out',
          }}
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            The Journey Continues...
          </h2>
          
          <p className="text-muted-foreground font-body text-lg md:text-xl max-w-lg mx-auto mb-8 leading-relaxed">
            Beyond the event horizon lies infinite possibility. 
            Let's create something extraordinary together.
          </p>
          
          {/* Contact CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:hello@example.com"
              className="btn-cosmic text-primary flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Get In Touch
            </a>
            
            <a 
              href="#"
              className="px-8 py-4 text-foreground font-display font-semibold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
          
          {/* Social links */}
          <div className="mt-12 flex items-center justify-center gap-6">
            {['LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
              <a 
                key={social}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors font-body text-sm uppercase tracking-wider"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        {/* Final message at the very end */}
        {progress > 0.9 && (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: (progress - 0.9) * 10,
            }}
          >
            <p className="font-display text-xl text-muted-foreground tracking-widest">
              See you among the stars ✨
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
