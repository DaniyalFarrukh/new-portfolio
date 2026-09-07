"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BrainCircuit, Code2, CloudCog, Database } from "lucide-react";

const skills = [
  {
    title: "AI & RAG",
    icon: BrainCircuit,
    items: ["LangChain", "FAISS", "Embeddings", "LLMs (Llama, Groq)"],
  },
  {
    title: "Full-Stack",
    icon: Code2,
    items: ["Next.js", "React", "FastAPI", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "DevOps",
    icon: CloudCog,
    items: ["Docker", "AWS", "Azure", "Terraform", "Databricks"],
  },
  {
    title: "Data & MLOps",
    icon: Database,
    items: ["Selenium", "MLflow", "Data Engineering", "Asset Bundles"],
  }
];

const SkillCard = ({ skill }: { skill: { title: string, icon: React.ElementType, items: string[] } }) => {
  const Icon = skill.icon;

  return (
    <div className="skill-card h-full">
      <div className="flex flex-col h-full p-8 rounded-3xl bg-black/60 border border-white/5 hover:border-white/10 transition-colors duration-300 backdrop-blur-xl group">
        <Icon className="w-6 h-6 text-white/90 mb-6" strokeWidth={1.5} />
        <h3 className="text-xl md:text-2xl font-bold mb-8 text-white">{skill.title}</h3>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {skill.items.map((item: string, i: number) => (
            <span 
              key={i} 
              className="px-4 py-2 text-xs font-medium rounded-full bg-white/5 border border-white/5 text-white/70 transition-colors group-hover:bg-white/10 group-hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Chapter5Skills() {
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

      tl.from(".skills-header", { opacity: 0, y: 50, duration: 1 })
        .from(".skill-card", { 
          opacity: 0, 
          y: 50, 
          stagger: 0.2, 
          duration: 1 
        }, "-=0.5")
        .to({}, { duration: 1 }) // hold
        .to(".skills-content", { opacity: 0, scale: 0.9, filter: "blur(10px)", duration: 1 });
    });

    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      gsap.fromTo(".skill-card", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.8, 
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
      data-chapter="04 — WHAT I BUILD" 
      className="min-h-screen py-24 md:h-screen md:py-0 w-full flex flex-col justify-center px-6 md:px-24 relative z-10"
    >
      <div className="skills-content w-full max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="skills-header inline-block text-3xl md:text-5xl font-bold tracking-tight bg-black/60 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/10 drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            Architecting Intelligence
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
