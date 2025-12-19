import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  warpSpeed?: number;
  isWarping?: boolean;
}

export const StarField = ({ warpSpeed = 0, isWarping = false }: StarFieldProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/starfield.glb');

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Move stars based on warp speed
    const speed = isWarping ? warpSpeed * 2 : 0.1;
    groupRef.current.position.z += delta * speed;
    
    // Reset position when it moves too far
    if (groupRef.current.position.z > 50) {
      groupRef.current.position.z = 0;
    }
    
    // Slight rotation for ambient movement
    groupRef.current.rotation.z += delta * 0.01;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene.clone()} scale={10} />
    </group>
  );
};

useGLTF.preload('/models/starfield.glb');
