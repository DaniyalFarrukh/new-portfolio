"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-lg border-b border-white/5 pointer-events-none" />
      
      <div className="relative flex items-center gap-2">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-primary transition-colors">
          Daniyal<span className="text-primary">.</span>
        </Link>
      </div>

      <div className="relative flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === link.href ? "text-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" : "text-white/70"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
