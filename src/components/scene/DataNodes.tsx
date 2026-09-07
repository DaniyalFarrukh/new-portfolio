import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 216; // 6x6x6 grid
const CHAOS_SPREAD = 80;

export default function DataNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const [chaosPositions, gridPositions] = useMemo(() => {
    const chaos = [];
    const grid = [];
    
    let idx = 0;
    for (let x = -2.5; x <= 2.5; x++) {
      for (let y = -2.5; y <= 2.5; y++) {
        for (let z = -2.5; z <= 2.5; z++) {
          if (idx >= NODE_COUNT) break;
          // Structured grid positions
          grid.push(new THREE.Vector3(x * 3, y * 3, z * 3));
          
          // Chaotic, scattered positions
          chaos.push(new THREE.Vector3(
            (Math.random() - 0.5) * CHAOS_SPREAD,
            (Math.random() - 0.5) * CHAOS_SPREAD,
            (Math.random() - 0.5) * CHAOS_SPREAD
          ));
          idx++;
        }
      }
    }
    return [chaos, grid];
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorDummy = useMemo(() => new THREE.Color(), []);

  // Pre-allocate color array to avoid undefined errors
  const colorArray = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3 + 0] = 0;
      arr[i * 3 + 1] = 0.9;
      arr[i * 3 + 2] = 1;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate global scroll progress directly from window for performance
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));

    // Determine blending between chaos (0) and structured grid (1)
    let blend = 0;
    if (p > 0.25 && p < 0.6) {
      blend = (p - 0.25) / 0.35; 
      blend = THREE.MathUtils.smoothstep(blend, 0, 1);
    } else if (p >= 0.6) {
      blend = 1;
    }

    // Dynamic Camera Fly-through
    let camZ = 30;
    let camY = 0;
    if (p > 0.8) {
      const flyProgress = (p - 0.8) / 0.2; // 0 to 1
      camZ = 30 - flyProgress * 35; // fly into and past the grid
      camY = flyProgress * 5;
    }
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, camY, 0.05);
    
    // Update each instance
    for (let i = 0; i < NODE_COUNT; i++) {
      const cPos = chaosPositions[i];
      const gPos = gridPositions[i];
      
      // Interpolate position
      dummy.position.lerpVectors(cPos, gPos, blend);
      
      // Add continuous floating motion when in chaos mode
      if (blend < 1) {
        dummy.position.y += Math.sin(state.clock.elapsedTime + i) * 1.5 * (1 - blend);
        dummy.position.x += Math.cos(state.clock.elapsedTime * 0.8 + i) * 1.5 * (1 - blend);
      }
      
      // Scale up when organized
      const scale = 0.4 + blend * 0.6;
      dummy.scale.set(scale, scale, scale);
      
      // Spin individual nodes
      dummy.rotation.x = state.clock.elapsedTime * 0.2 + i;
      dummy.rotation.y = state.clock.elapsedTime * 0.3 + i;
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color shifts from dark blue in chaos to bright cyan in grid
      colorDummy.setHSL(0.5 + blend * 0.05, 1, 0.2 + blend * 0.5);
      meshRef.current.setColorAt(i, colorDummy);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    
    // Rotate the entire ecosystem block
    meshRef.current.rotation.y = p * Math.PI * 2 + state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.x = p * Math.PI * 0.25;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe={true} transparent opacity={0.8} />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}
