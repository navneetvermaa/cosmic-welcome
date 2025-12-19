import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BlackHoleProps {
  pullStrength?: number;
  visible?: boolean;
}

export const BlackHole = ({ pullStrength = 0, visible = true }: BlackHoleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/blackhole.glb');

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Rotate the black hole
    groupRef.current.rotation.z += 0.002;
    
    // Scale based on pull strength (getting closer)
    const scale = 1 + pullStrength * 0.5;
    groupRef.current.scale.setScalar(scale);
    
    // Tilt for 3D effect
    groupRef.current.rotation.x = Math.PI * 0.2;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      <primitive object={scene.clone()} scale={5} />
    </group>
  );
};

useGLTF.preload('/models/blackhole.glb');
