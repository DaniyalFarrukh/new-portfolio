import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ChatWidget from "@/components/ChatWidget";
import CanvasBackground from "@/components/CanvasBackground";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniyal | AI Engineer & Full-Stack Developer",
  description: "Portfolio of Daniyal, showcasing AI/RAG pipelines, full-stack engineering, and automated infrastructure.",
  openGraph: {
    title: "Daniyal | AI Engineer & Full-Stack Developer",
    description: "Intelligent Systems, Built End-to-End.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniyal | AI Engineer & Full-Stack Developer",
    description: "Intelligent Systems, Built End-to-End.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Daniyal",
              "jobTitle": "AI Engineer & Full-Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Aidx Solutions"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lahore",
                "addressCountry": "Pakistan"
              },
              "knowsAbout": ["AI/RAG pipelines", "Next.js", "React", "FastAPI", "Docker", "AWS", "Azure", "Terraform", "Databricks", "Selenium", "MLOps"]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <SmoothScroll>
          <CanvasBackground />
          {children}
          <ChatWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
