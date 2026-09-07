"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Background() {
  const container = useRef<HTMLDivElement>(null);
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Phase 1 -> Phase 2 (Problem - tension, oranges/reds)
    tl.to([orb1.current, orb2.current, orb3.current], {
      backgroundColor: (index) => {
        const colors = ["#ea580c", "#dc2626", "#b91c1c"];
        return colors[index];
      },
      scale: 1.5,
      xPercent: (index) => [50, -50, 20][index],
      yPercent: (index) => [-20, 60, -80][index],
      duration: 1,
    })
    // Phase 2 -> Phase 3/4/5/6 (Resolution/Skills - vibrant greens/cyans)
    .to([orb1.current, orb2.current, orb3.current], {
      backgroundColor: (index) => {
        const colors = ["#0d9488", "#0284c7", "#4f46e5"];
        return colors[index];
      },
      scale: 1.2,
      xPercent: (index) => [-30, 40, -10][index],
      yPercent: (index) => [40, -30, 50][index],
      duration: 2,
    });
    
  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-black pointer-events-none">
      <div className="absolute w-full h-full mix-blend-screen opacity-50 blur-[100px]">
        {/* Orb 1 */}
        <div 
          ref={orb1}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-indigo-600/40"
        />
        {/* Orb 2 */}
        <div 
          ref={orb2}
          className="absolute top-3/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-purple-600/40"
        />
        {/* Orb 3 */}
        <div 
          ref={orb3}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-blue-600/40"
        />
      </div>
      {/* Noise overlay to give it texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
}
