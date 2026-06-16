import React from "react";
import { motion } from "motion/react";
import { Cpu, Terminal, Sparkles, Film, PenTool, Database, MessageSquare, Award, Video, Layout } from "lucide-react";
import { translations } from "../dictionary";
import ScrambleText from "./ScrambleText";

interface SkillCardProps {
  key?: React.Key | number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tools: string[];
  details: string[];
  borderColor: string;
  glowColor: string;
  lang: "vi" | "en";
}

function SkillCard({ title, description, icon, tools, details, borderColor, glowColor, lang }: SkillCardProps) {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Map specific colors for standard glowing boundaries
  const shadowGlow = glowColor === "bg-cyan-500" 
    ? "rgba(6, 182, 212, 0.25)" 
    : glowColor === "bg-amber-500" 
    ? "rgba(245, 158, 11, 0.2)" 
    : glowColor === "bg-teal-500"
    ? "rgba(20, 184, 166, 0.2)"
    : glowColor === "bg-violet-500"
    ? "rgba(139, 92, 246, 0.45)" // radiant violet/purple/indigo glow
    : "rgba(244, 63, 94, 0.2)";

  const spotlightBgColor = glowColor === "bg-cyan-500" 
    ? "rgba(6, 182, 212, 0.12)" 
    : glowColor === "bg-amber-500" 
    ? "rgba(245, 158, 11, 0.12)" 
    : glowColor === "bg-teal-500"
    ? "rgba(20, 184, 166, 0.12)"
    : glowColor === "bg-violet-500"
    ? "rgba(139, 92, 246, 0.18)"
    : "rgba(244, 63, 94, 0.12)";

  const spotlightBorderColor = glowColor === "bg-cyan-500" 
    ? "rgba(6, 182, 212, 0.35)" 
    : glowColor === "bg-amber-500" 
    ? "rgba(245, 158, 11, 0.35)" 
    : glowColor === "bg-teal-500"
    ? "rgba(20, 184, 166, 0.35)"
    : glowColor === "bg-violet-500"
    ? "rgba(139, 92, 246, 0.55)"
    : "rgba(244, 63, 94, 0.35)";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.025,
        boxShadow: `0 0 25px ${shadowGlow}`,
      }}
      className={`relative group bg-[#090d16] border ${borderColor} rounded-2xl p-6 md:p-8 transition-all duration-300 overflow-hidden`}
    >
      {/* Spotlight Border Tracing layer */}
      <div 
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, ${spotlightBorderColor}, transparent 80%)`
        }}
      />

      {/* Spotlight Background Overlay */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${spotlightBgColor}, transparent 80%)`
        }}
      />

      {/* Background Glow corner */}
      <div className={`absolute -top-12 -right-12 w-28 h-28 ${glowColor} rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}></div>

      {/* Code/Grid Decorative Elements */}
      <div className="absolute right-4 top-4 font-mono text-[10px] text-gray-700 select-none group-hover:text-cyan-400/40 transition-colors z-10">
        //CORE_SKILL_MODULE
      </div>

      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-400 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all duration-300">
          {title}
        </h3>
      </div>

      <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-10">
        {description}
      </p>

      {/* Detailed Checklists */}
      <div className="space-y-2.5 mb-6 relative z-10">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
            <span>{detail}</span>
          </div>
        ))}
      </div>

      {/* Tools tags */}
      <div className="border-t border-slate-800/60 pt-4 relative z-10">
        <span className="block text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-2">
          {lang === "vi" ? "Công cụ & Công nghệ" : "Tools & Technologies"}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {tools.map((tool, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 bg-slate-950 text-gray-400 border border-slate-800/80 rounded-md text-xs font-mono hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-200"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface SkillsProps {
  lang?: "vi" | "en";
}

export default function Skills({ lang = "vi" }: SkillsProps) {
  const d = translations[lang];

  const icons = [
    <Film className="w-6 h-6 text-cyan-400" />,
    <PenTool className="w-6 h-6 text-amber-400" />,
    <Database className="w-6 h-6 text-teal-400" />,
    <Video className="w-6 h-6 text-rose-400 animate-pulse" />,
    <Layout className="w-6 h-6 text-violet-400" />
  ];

  const borderColors = [
    "border-cyan-950/40 hover:border-cyan-500/30",
    "border-amber-950/40 hover:border-amber-500/30",
    "border-teal-950/40 hover:border-teal-500/30",
    "border-rose-950/40 hover:border-rose-500/30",
    "border-violet-950/40 hover:border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
  ];

  const glowColors = [
    "bg-cyan-500",
    "bg-amber-500",
    "bg-teal-500",
    "bg-rose-500",
    "bg-violet-500"
  ];

  const coreSkills = d.skills.cards.map((card, i) => ({
    ...card,
    icon: icons[i] || <Film className="w-6 h-6" />,
    borderColor: borderColors[i] || "border-slate-800",
    glowColor: glowColors[i] || "bg-cyan-500"
  }));

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-10 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>
              <ScrambleText text={d.skills.badge} />
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase">
            <ScrambleText text={d.skills.title} />
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            {d.skills.description}
          </p>
        </div>

        {/* Bento Grid layout - optimized for 5 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreSkills.map((skill, index) => (
            <SkillCard 
              key={index} 
              title={skill.title}
              description={skill.description}
              icon={skill.icon}
              tools={skill.tools}
              details={skill.details}
              borderColor={skill.borderColor}
              glowColor={skill.glowColor}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
