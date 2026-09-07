import dynamic from "next/dynamic";

// Dynamically import the 3D scene to prevent SSR issues with Three.js window dependencies
const ScrollScene = dynamic(() => import("./scene/ScrollScene"), {
  ssr: false,
});

export default function CanvasBackground() {
  return <ScrollScene />;
}
