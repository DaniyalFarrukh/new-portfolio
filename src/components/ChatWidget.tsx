"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PopupModal } from "react-calendly";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Daniyal's personal AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI immediately
    const newHistory = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:7860";
      
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: newHistory.slice(0, -1).map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      if (!response.ok) throw new Error("API response was not ok");
      
      const data = await response.json();
      let responseText = data.response;

      if (responseText.includes("[ACTION: OPEN_CALENDLY]")) {
        responseText = responseText.replace("[ACTION: OPEN_CALENDLY]", "").trim();
        setIsCalendlyOpen(true);
      }

      setMessages(prev => [...prev, { role: "assistant", content: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later or contact Daniyal directly!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PopupModal
        url="https://calendly.com/daniyal-farrukhpgc/30min"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={typeof document !== 'undefined' ? document.body : (null as unknown as HTMLElement)}
      />

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-primary text-black rounded-full shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[85vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans text-sm backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-black/50 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-black relative">
                  <Image src="/daniyal_ai_logo.jpg" alt="Daniyal AI Logo" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-white tracking-wide">Daniyal AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-white/50">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message List */}
            <div 
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center relative ${msg.role === 'user' ? 'bg-primary/20' : 'bg-black border border-primary/20'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-primary" /> : <Image src="/daniyal_ai_logo.jpg" alt="Daniyal AI" fill className="object-cover" />}
                    </div>
                    <div 
                      className={`rounded-2xl px-4 py-2.5 ${
                        msg.role === 'user' 
                          ? 'bg-primary text-black rounded-tr-sm font-medium' 
                          : 'bg-white/10 text-white/90 rounded-tl-sm'
                      }`}
                    >
                      <span className="whitespace-pre-wrap leading-relaxed">{msg.content}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%] flex-row">
                    <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-black border border-primary/20 relative">
                      <Image src="/daniyal_ai_logo.jpg" alt="Daniyal AI" fill className="object-cover" />
                    </div>
                    <div className="bg-white/10 text-white/90 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 bg-black/50 border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-primary text-black rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                >
                  <Send className="w-4 h-4 ml-[2px]" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
