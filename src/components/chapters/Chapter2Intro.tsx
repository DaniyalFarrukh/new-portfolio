"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Chapter2Intro() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial load animation (happens immediately without scroll)
    const loadTl = gsap.timeline();
    loadTl.from(".intro-title", { opacity: 0, y: 100, filter: "blur(20px)", duration: 1.5, ease: "power3.out" })
          .from(".intro-subtitle", { opacity: 0, y: 50, filter: "blur(10px)", duration: 1.5, ease: "power3.out" }, "-=1");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Scroll animation to fade out when leaving the intro section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(".intro-content", { opacity: 0, scale: 1.1, filter: "blur(20px)", duration: 1 });
    });

    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      // Fade out for mobile when scrolling down
      gsap.to(".intro-content", {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: container.current,
          start: "bottom center",
          scrub: true,
        },
      });
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      data-chapter="01 — THE ENGINE" 
      className="min-h-screen py-24 md:h-screen md:py-0 w-full flex items-center justify-center relative z-10"
    >
      <div className="intro-content flex flex-col items-center text-center px-4">
        <h1 className="intro-title text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-4">
          Daniyal.
        </h1>
        <p className="intro-subtitle text-xl md:text-3xl text-primary/80 font-light tracking-wide max-w-2xl">
          AI Engineer & Full-Stack Developer
        </p>
      </div>
    </section>
  );
}
