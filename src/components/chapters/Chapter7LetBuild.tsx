"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Calendar, LayoutGrid } from "lucide-react";
import { PopupModal } from "react-calendly";

export default function Chapter7LetBuild() {
  const container = useRef<HTMLElement>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".cta-content",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  return (
    <section 
      ref={container} 
      data-chapter="06 — LET'S BUILD" 
      className="min-h-screen w-full flex items-center justify-center relative z-10 overflow-hidden py-32"
    >
      {/* Distorted Particle Grid Wave Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at center, #00e5ff 1px, transparent 1px)`,
        backgroundSize: `40px 40px`,
        maskImage: `linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)`,
        transform: `perspective(500px) rotateX(60deg) scale(2)`,
        transformOrigin: `center 80%`
      }} />

      <div className="cta-content relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">
          Ready to Build Something <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Intelligent?</span>
        </h3>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full">
          <button 
            onClick={() => setIsCalendlyOpen(true)}
            className="w-full md:w-auto px-8 py-4 rounded-full bg-white/5 border border-primary/50 text-white font-medium hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Schedule a Call
          </button>

          <a 
            href="https://github.com/DaniyalFarrukh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <LayoutGrid className="w-5 h-5" />
            View My Work
          </a>
        </div>
      </div>

      {rootElement && (
        <PopupModal
          url="https://calendly.com/daniyal-farrukhpgc/30min"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={rootElement}
        />
      )}
    </section>
  );
}
