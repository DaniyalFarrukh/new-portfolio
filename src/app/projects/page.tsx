"use client";

import { ExternalLink } from "lucide-react";
import Background from "@/components/Background";

const featuredProjects = [
  {
    title: "E-commerce store for Bike parts seller",
    description: "A full-stack web application designed for a bike parts retailer. Built to streamline operations and enhance the online shopping experience.",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    link: "https://al-saboor-btx6.vercel.app",
    image: "/projects/ecommerce-bike.png"
  },
  {
    title: "Gen Z business platform for NFC Cards templates",
    description: "A full-stack portfolio and business platform template designed for selling and managing NFC business cards.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    link: "https://tap.scorlyn.com",
    image: "/projects/scorlyn.png"
  },
  {
    title: "Hexalogic Tech - Digital Agency",
    description: "A modern software house landing page empowering businesses with custom software development and AI-powered solutions.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    link: "https://hexalogic-site.vercel.app",
    image: "/projects/hexalogic.png"
  },
  {
    title: "Enhancing RAG with Contextual Embeddings",
    description: "An R&D AI/ML project focused on enhancing Retrieval-Augmented Generation (RAG) using Contextual Embeddings to achieve measurable improvements in accuracy based on Anthropic's cookbook.",
    tech: ["Python", "Ollama", "LangChain", "Elasticsearch"],
    link: "https://github.com/DaniyalFarrukh/Enhancing-RAG-with-Contextual-Embeddings-",
    image: "/projects/contextual-rag.jpg"
  }
];

const clientFeedbacks = [
  {
    quote: "Daniyal delivered a full-stack web application that became the backbone of our startup operations.",
  },
  {
    quote: "The internal sales system he developed completely streamlined our workflow and data management.",
  },
  {
    quote: "Exceptional work on the data visualization dashboard. It made our raw data incredibly easy to interpret.",
  },
  {
    quote: "A true professional. The bug tracker he built was exactly what our team needed to stay organized.",
  }
];

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen selection:bg-primary/30 selection:text-white relative block pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <Background />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HERO SECTION */}
        <header className="mb-24 text-center">
          <p className="text-primary tracking-[0.2em] text-sm font-semibold uppercase mb-4">Case Studies</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
            Web Apps & Platforms
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-16">
            Modern applications built with cutting-edge technologies. A deep dive into my recent work across AI engineering, full-stack development, and automated infrastructure.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">9</span>
              <span className="text-white/60 text-sm tracking-wider uppercase">Projects</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">50+</span>
              <span className="text-white/60 text-sm tracking-wider uppercase">Apps Built</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">100%</span>
              <span className="text-white/60 text-sm tracking-wider uppercase">Satisfaction</span>
            </div>
          </div>
        </header>

        {/* FEATURED PROJECTS */}
        <div className="mb-32">
          <div className="flex flex-col gap-16">
            {featuredProjects.map((project, index) => (
              <div 
                key={index}
                className="flex flex-col lg:flex-row gap-8 bg-black/40 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md hover:bg-black/60 hover:border-white/20 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="w-full lg:w-3/5 aspect-video bg-black/60 rounded-2xl border border-white/5 flex flex-col items-center justify-center group overflow-hidden relative">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.02]" 
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-16 h-16 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center text-white/20 group-hover:text-primary group-hover:border-primary/50 transition-all duration-300">
                        <span className="text-2xl font-light">+</span>
                      </div>
                      <p className="text-white/40 mt-4 font-mono text-sm">Add Project Image Here</p>
                    </>
                  )}
                </div>

                {/* Project Details */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                  <p className="text-white/60 leading-relaxed mb-8 text-lg">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 tracking-wide font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary/50 hover:bg-primary/10 text-white font-medium transition-colors w-full"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {project.link.includes("github.com") ? "View on GitHub" : "Demo"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLIENT FEEDBACK */}
        <div className="max-w-6xl mx-auto text-center px-4 md:px-0">
          <p className="text-primary tracking-[0.2em] text-sm font-semibold uppercase mb-4">Client Feedback</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-white">What Clients Say</h2>
          
          <div className="relative w-full max-w-3xl mx-auto h-[500px] border border-white/5 rounded-3xl bg-black/20 overflow-hidden">
            {/* Top Fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-none z-10" />
            
            {/* Scrollable Container */}
            <div className="flex flex-col overflow-y-auto h-full gap-6 p-8 md:p-12 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {clientFeedbacks.map((feedback, idx) => (
                <div 
                  key={idx}
                  className="shrink-0 relative p-8 md:p-10 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center text-center group hover:bg-black/80 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,229,255,0.12)] cursor-pointer"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 group-hover:w-40 group-hover:opacity-100 transition-all duration-500" />
                  <p className="text-lg md:text-xl italic text-white/90 leading-relaxed font-light">
                    &quot;{feedback.quote}&quot;
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none z-10" />
          </div>
        </div>

      </div>
    </main>
  );
}
