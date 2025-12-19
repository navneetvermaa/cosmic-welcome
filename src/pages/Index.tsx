import { useState, useCallback } from 'react';
import { SpaceScene } from '@/components/3d/SpaceScene';
import { WelcomeSection } from '@/components/sections/WelcomeSection';
import { WarpSection } from '@/components/sections/WarpSection';
import { BlackHoleSection } from '@/components/sections/BlackHoleSection';
import { PlanetSection } from '@/components/sections/PlanetSection';
import { VoidSection } from '@/components/sections/VoidSection';
import { ScrollProgressIndicator } from '@/components/ui/ScrollProgressIndicator';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress, section, sectionProgress } = useScrollProgress();
  
  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen onComplete={handleLoadComplete} />
      
      {/* Main content - only visible after loading */}
      <div 
        className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* 3D Background Scene */}
        <SpaceScene 
          section={section}
          sectionProgress={sectionProgress}
          overallProgress={progress}
        />
        
        {/* Scroll Progress Indicator */}
        <ScrollProgressIndicator 
          progress={progress}
          section={section}
        />
        
        {/* Scrollable content container */}
        <div className="relative z-10">
          {/* Welcome Section - Star zoom and greeting */}
          <WelcomeSection 
            progress={sectionProgress}
            isActive={section === 'welcome'}
          />
          
          {/* Warp Section - Light speed travel */}
          <WarpSection 
            progress={sectionProgress}
            isActive={section === 'warp'}
          />
          
          {/* Black Hole Section - Gravitational approach */}
          <BlackHoleSection 
            progress={sectionProgress}
            isActive={section === 'blackhole'}
          />
          
          {/* Planet Section - Projects showcase */}
          <PlanetSection 
            progress={sectionProgress}
            isActive={section === 'planet'}
          />
          
          {/* Void Section - Into the darkness */}
          <VoidSection 
            progress={sectionProgress}
            isActive={section === 'void'}
          />
        </div>
        
        {/* Spacer to enable scrolling */}
        <div className="h-[500vh]" />
      </div>
    </>
  );
};

export default Index;
