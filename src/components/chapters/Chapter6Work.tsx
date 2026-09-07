"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);


const projects = [
  {
    title: "RAG Portfolio Chatbot",
    description: "Conversational AI interface for exploring my portfolio. Built with FastAPI, LangChain, FAISS, and Groq/Llama-3.1.",
    tech: ["FastAPI", "LangChain", "Llama-3.1", "FAISS"],
    link: "#", // TODO: Add live project link
    github: "#" // TODO: Add github link
  },
  {
    title: "Secure Azure Databricks",
    description: "Private Azure Databricks deployment orchestrated via Terraform with VNet injection and Private Link for enterprise security.",
    tech: ["Terraform", "Azure", "Databricks", "VNet"],
    link: "#",
    github: "#"
  },
  {
    title: "Health Risk MLOps",
    description: "End-to-end BMI and health risk prediction system using FastAPI, MLflow, Databricks Asset Bundles, and GitHub Actions.",
    tech: ["MLflow", "Databricks", "GitHub Actions", "FastAPI"],
    link: "#",
    github: "#"
  },
  {
    title: "ANN Search Visualizer",
    description: "Interactive visualizer for Approximate Nearest Neighbor search algorithms, demonstrating high-dimensional vector embeddings.",
    tech: ["React", "TypeScript", "Three.js", "Vectors"],
    link: "#",
    github: "#"
  }
];

export default function Chapter6Work() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".project-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: container });

  return (
    <section 
      id="work"
      ref={container} 
      data-chapter="05 — PROOF OF WORK" 
      className="min-h-screen w-full py-32 px-8 md:px-24 relative z-10 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card flex flex-col p-8 rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 hover:border-primary/40 transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-4">
                  <a href={project.github} className="text-white/40 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a href={project.link} className="text-white/40 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <p className="text-white/60 font-light leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs text-white/80 tracking-wide font-mono backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
