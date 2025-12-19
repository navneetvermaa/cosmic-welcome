import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BlackHoleProps {
  pullStrength?: number;
  visible?: boolean;
}

export const BlackHole = ({ pullStrength = 0, visible = true }: BlackHoleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Create accretion disk geometry
  const diskGeometry = useMemo(() => {
    const geometry = new THREE.RingGeometry(2, 8, 64, 8);
    return geometry;
  }, []);

  // Create shader material for accretion disk
  const diskMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pullStrength: { value: pullStrength },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vRadius;
        
        void main() {
          vUv = uv;
          vRadius = length(position.xy);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float pullStrength;
        varying vec2 vUv;
        varying float vRadius;
        
        void main() {
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + time * 0.5;
          float spiral = sin(angle * 8.0 + vRadius * 3.0 - time * 2.0) * 0.5 + 0.5;
          
          // Colors: cyan to purple gradient
          vec3 cyan = vec3(0.3, 0.9, 1.0);
          vec3 purple = vec3(0.8, 0.2, 1.0);
          vec3 orange = vec3(1.0, 0.5, 0.2);
          
          vec3 color = mix(cyan, purple, spiral);
          color = mix(color, orange, pow(1.0 - (vRadius - 2.0) / 6.0, 2.0) * 0.5);
          
          float alpha = (1.0 - pow((vRadius - 2.0) / 6.0, 0.5)) * (0.6 + pullStrength * 0.4);
          alpha *= 0.8 + spiral * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Rotate the black hole
    groupRef.current.rotation.z += 0.002;
    
    // Update shader uniforms
    if (diskMaterial.uniforms) {
      diskMaterial.uniforms.time.value = state.clock.elapsedTime;
      diskMaterial.uniforms.pullStrength.value = pullStrength;
    }
    
    // Scale based on pull strength (getting closer)
    const scale = 1 + pullStrength * 0.5;
    groupRef.current.scale.setScalar(scale);
    
    // Tilt for 3D effect
    groupRef.current.rotation.x = Math.PI * 0.2;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      {/* Event horizon (black sphere) */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
      
      {/* Inner glow ring */}
      <mesh ref={glowRef}>
        <ringGeometry args={[1.8, 2.2, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Accretion disk */}
      <mesh ref={diskRef} geometry={diskGeometry} material={diskMaterial} />
      
      {/* Outer glow */}
      <mesh position={[0, 0, -0.1]}>
        <ringGeometry args={[8, 15, 64]} />
        <meshBasicMaterial
          color="#8833ff"
          transparent
          opacity={0.1 + pullStrength * 0.1}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Gravitational lensing effect (distortion ring) */}
      <mesh>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
