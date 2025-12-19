import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  visible?: boolean;
  zoom?: number;
}

export const Planet = ({ visible = true, zoom = 0 }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !planetRef.current) return;
    
    // Slow rotation
    planetRef.current.rotation.y += 0.001;
    
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.0005;
    }
    
    // Position based on zoom (moves toward camera)
    const baseZ = -30;
    const targetZ = baseZ + zoom * 25;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.05
    );
    
    // Slight floating motion
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[15, 0, -30]}>
      {/* Main planet body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          color="#2a4a6a"
          roughness={0.7}
          metalness={0.3}
          emissive="#1a2a3a"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Planet surface details (procedural) */}
      <mesh>
        <sphereGeometry args={[3.01, 64, 64]} />
        <meshStandardMaterial
          color="#3a6a9a"
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#00aaff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer atmosphere */}
      <mesh scale={1.3}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#0066aa"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Planetary rings */}
      <mesh ref={ringsRef} rotation={[Math.PI * 0.4, 0, 0.2]}>
        <ringGeometry args={[4, 6, 64]} />
        <meshBasicMaterial
          color="#88aacc"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Ring glow */}
      <mesh rotation={[Math.PI * 0.4, 0, 0.2]}>
        <ringGeometry args={[3.8, 6.2, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Small moon */}
      <mesh position={[7, 2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#888888"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};
