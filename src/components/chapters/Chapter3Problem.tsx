"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Chapter3Problem() {
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

      tl.from(".problem-title", { opacity: 0, x: -50, filter: "blur(10px)", duration: 1 })
        .from(".problem-desc", { opacity: 0, y: 30, duration: 1 }, "-=0.5")
        .to({}, { duration: 1 }) // hold
        .to(".problem-content", { opacity: 0, y: -50, filter: "blur(10px)", duration: 1 });
    });

    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      gsap.fromTo(".problem-content", 
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
      data-chapter="02 — THE PROBLEM" 
      className="min-h-screen py-24 md:h-screen md:py-0 w-full flex items-center justify-start px-8 md:px-24 relative z-10"
    >
      <div className="problem-content max-w-3xl">
        <h2 className="problem-title text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
          Most developers pick a lane. I build the whole road.
        </h2>
        <p className="problem-desc text-lg md:text-2xl text-white/60 font-light leading-relaxed border-l-2 border-primary/50 pl-6">
          AI pipelines, full-stack apps, cloud infrastructure, client-ready SaaS — one engineer, one system, start to finish.
        </p>
      </div>
    </section>
  );
}
