import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Film, User, Compass, Award, Mail, Menu, X, Bot, ChevronUp, Globe } from "lucide-react";

import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import AIChatbox from "./components/AIChatbox";
import CustomCursor from "./components/CustomCursor";
import { translations } from "./dictionary";

export default function App() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Track window scroll coordinates to animate navbar and top scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const d = translations[lang];

  const menuItems = [
    { id: "hero", label: d.nav.home, icon: <Bot className="w-4 h-4" /> },
    { id: "about", label: d.nav.about, icon: <User className="w-4 h-4" /> },
    { id: "skills", label: d.nav.skills, icon: <Award className="w-4 h-4" /> },
    { id: "portfolio", label: d.nav.portfolio, icon: <Compass className="w-4 h-4" /> },
    { id: "contact", label: d.nav.contact, icon: <Mail className="w-4 h-4" /> }
  ];

  const handleNavClick = (id: string) => {
    setActiveAnchorIdAndScroll(id);
    setMobileMenuOpen(false);
  };

  const setActiveAnchorIdAndScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "vi" ? "en" : "vi"));
  };

  return (
    <div className="relative min-h-screen selection:bg-cyan-500 selection:text-slate-950 bg-[#05070c]">
      <CustomCursor />
      
      {/* 1. Futuristic Sticky Header / Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "py-4 bg-[#05070c]/85 border-b border-slate-900/80 backdrop-blur-md" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 font-black cursor-pointer uppercase select-none group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center p-2 text-slate-950 font-bold group-hover:scale-105 transition-transform duration-300">
              S
            </div>
            <div>
              <span className="block text-sm text-white font-extrabold tracking-wider group-hover:text-cyan-400 transition-colors">TRƯỜNG SƠN</span>
              <span className="block text-[8px] text-gray-400 font-mono tracking-widest">AI & VIDEO LAB</span>
            </div>
          </button>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-4 py-2 text-xs lg:text-sm text-gray-400 hover:text-white rounded-lg hover:bg-slate-900 transition-all duration-200 cursor-pointer font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Connect Action Button & Language switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switch button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition duration-200 font-mono"
              title="Switch language / Chuyển đổi ngôn ngữ"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === "vi" ? "EN" : "VI"}</span>
            </button>

            <button
              onClick={() => handleNavClick("contact")}
              className="px-4 py-2 text-xs font-bold border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 rounded-lg cursor-pointer transition-all duration-300 font-mono flex items-center gap-1"
            >
              <span>{d.nav.connect}</span>
            </button>
          </div>

          {/* Mobile elements container */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Language Switch for Mobile always on screen */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white hover:bg-slate-800 font-mono text-xs font-bold transition flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === "vi" ? "EN" : "VI"}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-400 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Mobile Bottom-sheet/Overlay menu navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] bg-[#05070c]/98 border-b border-slate-900 z-30 backdrop-blur-xl md:hidden py-6 px-4 space-y-3"
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left px-4 py-3 bg-slate-900 border border-slate-950 text-gray-300 hover:text-white hover:border-cyan-500/10 rounded-xl flex items-center gap-3 font-semibold text-sm transition"
                >
                  <span className="text-cyan-400">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold rounded-xl text-sm transition mt-2 cursor-pointer"
              >
                {lang === "vi" ? "Gửi Đề Bài Hợp Tác" : "Send Project Objectives"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE PAGE STRUCTURES */}
      <main className="relative">
        <Hero lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Portfolio lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* 4. CHATBOX AI SPECIAL WIDGET */}
      <AIChatbox lang={lang} />

      {/* 5. BACK-TO-TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-40 w-11 h-11 bg-slate-900 border border-slate-800 text-gray-400 hover:text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-black/80 hover:border-cyan-500/20"
            title={lang === "vi" ? "Cuộn về đầu trang" : "Scroll to top"}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
