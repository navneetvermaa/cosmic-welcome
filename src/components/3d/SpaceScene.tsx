import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { StarField } from './StarField';
import { BlackHole } from './BlackHole';
import { Planet } from './Planet';
import * as THREE from 'three';

interface SpaceSceneProps {
  section: 'welcome' | 'warp' | 'blackhole' | 'planet' | 'void';
  sectionProgress: number;
  overallProgress: number;
}

const SceneContent = ({ section, sectionProgress, overallProgress }: SpaceSceneProps) => {
  const isWarping = section === 'warp';
  const warpSpeed = section === 'warp' ? sectionProgress : 0;
  
  const showBlackHole = section === 'blackhole' || section === 'planet' || section === 'void';
  const blackHolePull = section === 'blackhole' 
    ? sectionProgress 
    : section === 'void' 
      ? 1 + sectionProgress 
      : 0;
  
  const showPlanet = section === 'planet';
  const planetZoom = section === 'planet' ? sectionProgress : 0;

  // Calculate camera position based on section
  const getCameraZ = () => {
    switch (section) {
      case 'welcome': return 5 - sectionProgress * 2;
      case 'warp': return 3 - sectionProgress * 2;
      case 'blackhole': return 1 - sectionProgress * 10;
      case 'planet': return -9 + sectionProgress * 5;
      case 'void': return -4 - sectionProgress * 20;
      default: return 5;
    }
  };

  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.1} />
      
      {/* Point light from "star" direction */}
      <pointLight position={[50, 50, 50]} intensity={1} color="#ffffff" />
      
      {/* Colored rim lights */}
      <pointLight position={[-30, 0, -20]} intensity={0.5} color="#00ffff" />
      <pointLight position={[30, 0, -20]} intensity={0.3} color="#8833ff" />
      
      {/* Star field - always visible */}
      <StarField 
        count={2000} 
        warpSpeed={warpSpeed} 
        isWarping={isWarping}
      />
      
      {/* Black hole - appears after warp */}
      <BlackHole 
        pullStrength={blackHolePull}
        visible={showBlackHole}
      />
      
      {/* Planet - visible during planet section */}
      <Planet 
        visible={showPlanet}
        zoom={planetZoom}
      />
      
      {/* Fog for depth - increases in void section */}
      <fog 
        attach="fog" 
        args={[
          '#050510', 
          section === 'void' ? 5 : 30, 
          section === 'void' ? 20 + (1 - sectionProgress) * 80 : 150
        ]} 
      />
    </>
  );
};

export const SpaceScene = ({ section, sectionProgress, overallProgress }: SpaceSceneProps) => {
  const [opacity, setOpacity] = useState(1);
  
  // Fade to black in void section
  useEffect(() => {
    if (section === 'void') {
      setOpacity(1 - sectionProgress * 0.95);
    } else {
      setOpacity(1);
    }
  }, [section, sectionProgress]);

  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{ opacity }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Suspense fallback={null}>
          <SceneContent 
            section={section} 
            sectionProgress={sectionProgress} 
            overallProgress={overallProgress}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
