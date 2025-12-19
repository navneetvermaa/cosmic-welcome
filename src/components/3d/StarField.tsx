import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  warpSpeed?: number;
  isWarping?: boolean;
}

// Procedural fallback starfield
const ProceduralStarField = ({ count = 3000, warpSpeed = 0, isWarping = false }: StarFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 50;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.85) {
        colors[i * 3] = 0.3;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 0.8;
        colors[i * 3 + 1] = 0.3;
        colors[i * 3 + 2] = 1;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return [positions, colors, sizes];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speed = isWarping ? warpSpeed * 100 : 2;
    
    for (let i = 0; i < count; i++) {
      positionArray[i * 3 + 2] += delta * speed;
      if (positionArray[i * 3 + 2] > 100) {
        positionArray[i * 3 + 2] = -100;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.size = isWarping ? 3 + warpSpeed * 5 : 2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={2}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// GLTF model starfield
const GLTFStarField = ({ warpSpeed = 0, isWarping = false }: StarFieldProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/starfield.glb');
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const speed = isWarping ? warpSpeed * 2 : 0.1;
    groupRef.current.rotation.z += delta * 0.02;
    groupRef.current.rotation.y += delta * speed * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={clonedScene} scale={15} />
    </group>
  );
};

export const StarField = (props: StarFieldProps) => {
  return (
    <Suspense fallback={<ProceduralStarField {...props} />}>
      <GLTFStarField {...props} />
    </Suspense>
  );
};

useGLTF.preload('/models/starfield.glb');
