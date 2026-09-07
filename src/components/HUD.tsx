"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function HUD() {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateHUD = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
      
      if (percentageRef.current) {
        percentageRef.current.innerText = `${percent}%`;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", updateHUD, { passive: true });
    // Also bind to resize
    window.addEventListener("resize", updateHUD, { passive: true });
    updateHUD();

    return () => {
      window.removeEventListener("scroll", updateHUD);
      window.removeEventListener("resize", updateHUD);
    };
  }, []);

  return (
    <div className="fixed top-8 right-8 z-50 flex flex-col items-end gap-2 text-primary font-mono text-xs pointer-events-none drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
      <div className="flex items-center gap-4 uppercase tracking-widest">
        <span id="hud-chapter-name" className="text-white/80">
          01 — START
        </span>
        <span ref={percentageRef} className="w-10 text-right font-bold text-white">
          0%
        </span>
      </div>
      <div className="w-32 md:w-64 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
        <div 
          ref={progressRef}
          className="absolute top-0 left-0 h-full w-full bg-primary origin-left scale-x-0 shadow-[0_0_10px_#00e5ff]"
        />
      </div>
    </div>
  );
}
