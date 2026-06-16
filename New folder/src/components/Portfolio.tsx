import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, Eye, ArrowUpRight, Play, Sparkles, Film, Compass, TrendingUp, Instagram, X, Facebook } from "lucide-react";
import { Project } from "../types";
import { translations } from "../dictionary";
import ScrambleText from "./ScrambleText";

interface PortfolioProps {
  lang?: "vi" | "en";
}

export default function Portfolio({ lang = "vi" }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const d = translations[lang];

  const handlePlayProject = (project: Project) => {
    if (project.links && project.links.length > 0) {
      setActiveVideo({ url: project.links[0].url, title: `${project.title} - ${project.links[0].label}` });
    } else if (project.id === "proj_2") {
      setActiveVideo({ 
        url: "https://assets.mixkit.co/videos/preview/mixkit-soccer-ball-in-the-goal-net-32810-large.mp4", 
        title: project.title 
      });
    } else if (project.id === "proj_3") {
      setActiveVideo({ 
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32212-large.mp4", 
        title: project.title 
      });
    }
  };

  const projects: Project[] = d.portfolio.items.map((item, index) => {
    const gradients = [
      "linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)",
      "linear-gradient(135deg, #090d16 0%, #164e63 100%)",
      "linear-gradient(135deg, #090d16 0%, #064e3b 100%)"
    ];
    return {
      id: item.id,
      title: item.title,
      category: item.category as "cinematic" | "ai-art" | "marketing",
      description: item.description,
      solution: item.solution,
      image: gradients[index % gradients.length],
      tags: item.tags,
      duration: item.duration,
      stats: item.stats,
      links: (item as any).links
    };
  });

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const filterTabs = [
    { id: "all", label: d.portfolio.all },
    { id: "cinematic", label: d.portfolio.cinematic },
    { id: "ai-art", label: d.portfolio.aiArt },
    { id: "marketing", label: d.portfolio.marketing }
  ];

  // Motion Variants for Staggered list
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 18
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { duration: 0.22 } 
    }
  };

  return (
    <section id="portfolio" className="w-full min-h-screen h-auto py-12 md:py-20 relative overflow-visible bg-slate-950/20 border-t border-slate-900/40">
      {/* Background radial cyan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
              <span>
                <ScrambleText text={d.portfolio.badge} />
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase">
              <ScrambleText text={d.portfolio.title} />
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
            {d.portfolio.desc}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-slate-800/60 font-mono text-sm">
          <Filter className="w-4 h-4 text-cyan-400 mr-2" />
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 relative cursor-pointer ${
                activeCategory === tab.id 
                  ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/25" 
                  : "text-gray-400 hover:text-white hover:bg-slate-900 border border-transparent"
              }`}
            >
              {tab.label}
              {activeCategory === tab.id && (
                <motion.span 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              return (
                <motion.div
                  layout
                  variants={itemVariants}
                  exit="exit"
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)",
                  }}
                  key={project.id}
                  className="group bg-[#090d16] border border-slate-900 rounded-2xl p-6 md:p-8 overflow-visible hover:border-cyan-500/30 transition-all duration-300 flex flex-col gap-6 text-left"
                >
                  {/* Top Information Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Project title & description */}
                    <div className="lg:col-span-7 space-y-4">
                      {/* Status bar badge */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 w-max bg-slate-900 border border-slate-800 rounded-md text-[10px] font-mono text-cyan-400">
                        {project.category === "cinematic" && <Film className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
                        {project.category === "ai-art" && <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
                        {project.category === "marketing" && <TrendingUp className="w-3.5 h-3.5 text-teal-400 animate-pulse" />}
                        <span className="uppercase tracking-wider">
                          {project.category === "cinematic" && "SPORTS & ENTERTAINMENT // SYSTEM VIEW"}
                          {project.category === "ai-art" && "AI ART & CORE INTEGRATION // SYSTEM VIEW"}
                          {project.category === "marketing" && "MARKETING CONTENT & AFFILIATE // SYSTEM VIEW"}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight tracking-tight text-left">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-left">
                        {project.description}
                      </p>
                    </div>

                    {/* Right: Technical production solution, stats & tags */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
                          {project.duration ? `TIMELINE: ${project.duration}` : "ID_DEV"}
                        </span>
                        {project.stats && (
                          <span className="text-[10px] md:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/25 flex items-center gap-1 font-mono tracking-tight">
                            <TrendingUp className="w-3 h-3" />
                            {project.stats}
                          </span>
                        )}
                      </div>

                      {/* Production Solution Block */}
                      <div className="bg-slate-950/80 border border-slate-900/80 p-4 rounded-xl text-left relative overflow-hidden group/solution">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/[0.015] rounded-bl-full pointer-events-none transition-all group-hover/solution:w-20 group-hover/solution:h-20" />
                        <span className="text-[9px] text-cyan-500/80 font-mono tracking-widest block mb-1.5 uppercase font-bold">
                          {d.portfolio.solutionLabel} // SYSTEM_SOL
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans m-0">
                          {project.solution}
                        </p>
                      </div>

                      {/* Metatags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="px-2.5 py-1 bg-slate-950/80 text-gray-400 text-[10px] font-mono rounded-lg border border-slate-900 transition-colors hover:text-cyan-400 hover:border-cyan-500/10 cursor-default"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subtle divider line separating info and video list */}
                  {project.links && project.links.length > 0 && (
                    <>
                      <div className="border-t border-slate-900 my-2" />

                      {/* Section Header for Interactive Videos */}
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide">
                          Một số video nổi bật từ dự án — xem trực tiếp tại đây.
                        </p>
                      </div>

                      {/* Desktop horizontal 4-column Reels grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                        {project.links.map((link, idx) => {
                          const isFb = link.url.includes("facebook.com");
                          const isInsta = link.url.includes("instagram.com");
                          const isDrive = link.url.includes("drive.google.com");
                          
                          let embedUrl = "";
                          if (isFb) {
                            embedUrl = `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(link.url)}&show_text=false&width=267`;
                          } else if (isInsta) {
                            embedUrl = `${link.url.split("?")[0].replace(/\/+$/, "")}/embed/`;
                          } else if (isDrive) {
                            const parts = link.url.split("/d/");
                            if (parts.length > 1) {
                              const driveId = parts[1].split("/")[0].split("?")[0].replace("/view", "");
                              embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;
                            }
                          }

                          const platformLabel = isFb 
                            ? "FB REEL // EMBEDDED" 
                            : isInsta 
                            ? "INSTAGRAM // EMBEDDED" 
                            : isDrive
                            ? "DRIVE VIDEO // PREVIEW"
                            : "VIDEO // STREAM";

                          const itemLabel = project.id === "proj_2" 
                            ? `Troll Football Reel #${idx + 1}` 
                            : project.id === "proj_1" 
                            ? `Clipping Whop Reel #${idx + 1}` 
                            : `${link.label}`;

                          if (isDrive) {
                            return (
                              <div 
                                key={idx}
                                className="aspect-[9/16] w-full rounded-lg overflow-hidden border border-slate-900 bg-[#04060c] hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:scale-105 transition-all duration-300 flex flex-col justify-between relative group/reels"
                              >
                                <div className="w-full flex-grow h-full relative overflow-hidden bg-[#04060c] rounded-lg border border-zinc-800">
                                  <iframe 
                                    src={embedUrl} 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: "none" }} 
                                    allow="autoplay"
                                    className="w-full h-full object-cover bg-slate-950"
                                    title={itemLabel}
                                  />
                                  {/* Play Overlay Button to trigger modal */}
                                  <div 
                                    onClick={() => setActiveVideo({ url: embedUrl, title: itemLabel })}
                                    className="absolute inset-0 bg-slate-950/10 group-hover/reels:bg-slate-950/35 transition-colors duration-300 flex items-center justify-center cursor-pointer z-10"
                                  >
                                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/40 backdrop-blur-xs group-hover/reels:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                    </div>
                                  </div>

                                  {/* Bottom carbon overlay label */}
                                  <div className="absolute bottom-0 left-0 right-0 bg-[#050811]/90 backdrop-blur-md border-t border-slate-900/80 p-3 flex flex-col items-start gap-0.5 select-none text-left z-20">
                                    <span className="text-[11px] font-bold text-gray-200 uppercase tracking-wide">
                                      {itemLabel}
                                    </span>
                                    <span className="text-[9px] font-mono text-cyan-400/80">
                                      {platformLabel}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div 
                              key={idx}
                              className="aspect-[9/16] w-full rounded-lg overflow-hidden border border-slate-900 bg-[#04060c] hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:scale-105 transition-all duration-300 flex flex-col justify-between relative group/reels"
                            >
                              <div className="w-full flex-grow relative overflow-hidden bg-[#04060c]">
                                {isFb || isInsta ? (
                                  <iframe 
                                    src={embedUrl} 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: "none", overflow: "hidden" }} 
                                    scrolling="no" 
                                    frameBorder="0" 
                                    allowFullScreen={true} 
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    className="w-full h-full object-cover rounded-t-lg bg-slate-950"
                                    title={`${project.title} Reel #${idx + 1}`}
                                  />
                                ) : (
                                  <video 
                                    src={link.url}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover rounded-t-lg bg-slate-950"
                                  />
                                )}
                              </div>

                              {/* Standard bottom carbon overlay label */}
                              <div className="bg-[#050811]/95 backdrop-blur-md border-t border-slate-900/80 p-3 flex flex-col items-start gap-0.5 select-none text-left z-10">
                                <span className="text-[11px] font-bold text-gray-200 uppercase tracking-wide">
                                  {itemLabel}
                                </span>
                                <span className="text-[9px] font-mono text-cyan-400/80">
                                  {platformLabel}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm md:max-w-md bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{
                height: "min(680px, 85vh)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Title with glowing background */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs font-mono font-bold text-gray-300 truncate max-w-[200px]">
                    {activeVideo.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Player Body Stage */}
              <div className="flex-grow bg-slate-950 flex items-center justify-center relative overflow-hidden">
                {activeVideo.url.includes("instagram.com") ? (
                  <iframe
                    src={`${activeVideo.url.split("?")[0].replace(/\/+$/, "")}/embed/`}
                    className="w-full aspect-[9/16] rounded-xl shadow-lg border-0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    scrolling="no"
                  />
                ) : activeVideo.url.includes("facebook.com") ? (
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(activeVideo.url)}&show_text=false&width=267`}
                    className="w-full aspect-[9/16] rounded-xl shadow-lg border-0"
                    scrolling="no"
                    allowtransparency="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen={true}
                    preload="auto"
                  />
                ) : activeVideo.url.includes("drive.google.com") ? (
                  (() => {
                    let embedUrl = activeVideo.url;
                    if (activeVideo.url.includes("/d/")) {
                      const parts = activeVideo.url.split("/d/");
                      const driveId = parts.length > 1 ? parts[1].split("/")[0].split("?")[0].replace("/view", "") : "";
                      embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;
                    }
                    return (
                      <iframe
                        src={embedUrl}
                        className="w-full aspect-[9/16] rounded-xl shadow-lg border-0"
                        allow="autoplay"
                        allowFullScreen={true}
                        style={{ border: "none" }}
                      />
                    );
                  })()
                ) : (
                  <video
                    src={activeVideo.url}
                    controls
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    playsInline
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

