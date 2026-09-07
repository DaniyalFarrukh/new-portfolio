"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Chapter4Approach() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.from(".approach-title", { opacity: 0, scale: 0.9, filter: "blur(20px)", duration: 1 })
        .from(".approach-desc", { opacity: 0, y: 30, duration: 1 }, "-=0.5")
        .to({}, { duration: 1 }) // hold
        .to(".approach-content", { opacity: 0, scale: 1.1, filter: "blur(20px)", duration: 1 });
    });

    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      gsap.fromTo(".approach-content", 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      data-chapter="03 — THE APPROACH" 
      className="min-h-screen py-24 md:h-screen md:py-0 w-full flex items-center justify-end px-8 md:px-24 relative z-10"
    >
      <div className="approach-content max-w-3xl text-right">
        <h2 className="approach-title text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight text-white drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]">
          Intelligent Systems, <br /> Built <span className="text-primary italic">End-to-End.</span>
        </h2>
        <p className="approach-desc text-lg md:text-2xl text-white/80 font-light leading-relaxed">
          Orchestrating autonomous AI agents, robust RAG pipelines, and automated cloud infrastructure to build scalable, self-healing solutions.
        </p>
      </div>
    </section>
  );
}
