import { motion } from "motion/react";
import { Sparkles, Video, Calendar, ArrowRight, Play, Cpu } from "lucide-react";
import { translations } from "../dictionary";
import ScrambleText from "./ScrambleText";

interface HeroProps {
  lang?: "vi" | "en";
}

export default function Hero({ lang = "vi" }: HeroProps) {
  const d = translations[lang];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://drive.google.com/uc?export=download&id=1Ne5OSih0FV0_K7iEngKUWfa8sn_8yCVk')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay wrapping the content for superior readability */}
      <div className="bg-slate-950/60 w-full h-full min-h-screen flex items-center justify-center pt-20 relative">
        {/* Dynamic Ambient Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 z-0 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl mt-8">
          <div className="flex flex-col items-center text-center">
          
          {/* Tag Line */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-xs md:text-sm font-semibold tracking-wide backdrop-blur-md mb-8 hover:bg-cyan-950/40 transition-colors duration-300 pointer-events-default"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>
              <ScrambleText text={d.hero.badge} />
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase"
          >
            <ScrambleText text={d.hero.titleLine1} /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-550 filter drop-shadow-[0_2px_15px_rgba(6,182,212,0.3)]">
              {d.hero.titleGradient}
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-base md:text-lg max-w-3xl leading-relaxed mb-10 text-center"
          >
            {lang === "vi" ? (
              <>
                Mình là <span className="text-white font-extrabold">Chu Nguyễn Trường Sơn (@sonchu)</span> - một Editor chuyên nghiệp và Nhà sáng tạo nội dung số với hơn <span className="text-cyan-400 font-bold">2 năm kinh nghiệm thực chiến</span>. Mình đam mê tối ưu hóa quy trình sản xuất video bằng công nghệ AI và quản lý xây dựng kênh đa nền tảng.
                <br /><br />
                Với phong cách làm việc nhanh gọn, hiệu quả và luôn đặt <strong className="text-amber-400">"đúng deadline"</strong> lên hàng đầu, mình cam kết mang lại sự an tâm tuyệt đối và giá trị đột phá cho mọi đối tác.
              </>
            ) : (
              <>
                I am <span className="text-white font-extrabold">Chu Nguyen Truong Son (@sonchu)</span> - a professional Editor and Digital Content Creator with over <span className="text-cyan-400 font-bold">2 years of practical experience</span>. I specialize in optimizing video production workflows with AI.
                <br /><br />
                By executing with speed, efficiency, and respecting <strong className="text-amber-400">"deadlines as absolute law"</strong>, I deliver seamless reliability and breakthrough value for every brand partner.
              </>
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
          >
            <button
              onClick={() => scrollToSection("portfolio")}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-60 flex items-center justify-center gap-2 cursor-pointer border border-transparent"
              id="btn-discover-projects"
            >
              <Video className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>{d.hero.ctaViewer}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-gray-300 hover:text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-60 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-contact-me"
            >
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>{d.hero.ctaContact}</span>
            </button>
          </motion.div>

          {/* AI Engines Tech badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full max-w-4xl border-t border-slate-800/60 pt-8"
          >
            <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-4">
              {d.hero.stackTitle}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-40 hover:opacity-75 transition-opacity duration-300">
              <span className="flex items-center gap-1.5 text-sm font-mono tracking-wider">
                <Cpu className="w-4 h-4 text-cyan-400" /> GEMINI AI
              </span>
              <span className="flex items-center gap-1.5 text-sm font-mono tracking-wider">
                <Play className="w-4 h-4 text-teal-400" /> RUNWAY GEN-3
              </span>
              <span className="flex items-center gap-1.5 text-sm font-mono tracking-wider">
                <Video className="w-4 h-4 text-amber-500" /> LUMA / MIDJOURNEY
              </span>
              <span className="flex items-center gap-1.5 text-sm font-mono tracking-wider">
                🍿 CAPCUT PC MASTER
              </span>
              <span className="flex items-center gap-1.5 text-sm font-mono tracking-wider">
                🤖 STABLE DIFFUSION
              </span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  </section>
  );
}
