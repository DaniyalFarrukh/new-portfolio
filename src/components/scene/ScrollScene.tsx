"use client";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import DataNodes from "./DataNodes";

export default function ScrollScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch on canvas

  return (
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden pointer-events-none">
      {/* Premium CSS Drop Shadow Glow behind the 3D scene */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-60 pointer-events-none mix-blend-screen"
      />
      
      <Canvas 
        camera={{ position: [0, 0, 30], fov: 45 }}
        dpr={[1, 2]} // limit pixel ratio for performance
        gl={{ antialias: false, powerPreference: "high-performance" }} 
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <DataNodes />
        </Float>
        
        {/* Adds ambient particles matching the cyber aesthetic */}
        <Sparkles count={400} scale={50} size={2} speed={0.4} color="#00e5ff" opacity={0.4} />
      </Canvas>
    </div>
  );
}
