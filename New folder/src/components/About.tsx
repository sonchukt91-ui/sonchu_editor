import { motion } from "motion/react";
import { User, Target, Zap, CheckCircle, Flame, Award, Film } from "lucide-react";
import { translations } from "../dictionary";
import ScrambleText from "./ScrambleText";

interface AboutProps {
  lang?: "vi" | "en";
}

export default function About({ lang = "vi" }: AboutProps) {
  const d = translations[lang];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/40">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Bento Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Outer decorative neon border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-amber-500 opacity-20 group-hover:opacity-40 blur-lg transition duration-1000"></div>
              
              {/* Core Image Placeholder styling as tech panel */}
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <span>AI CREATOR BIO V2.5</span>
                  </div>
                  <div className="text-right font-mono text-[9px] text-gray-500">
                    LOC: SAIGON, VN
                  </div>
                </div>

                {/* Conceptual Design Grid of Work ethic */}
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-3 text-white font-semibold text-sm mb-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      {lang === "vi" ? "Đột phá cùng AI" : "AI Workflow Optimization"}
                    </div>
                    <p className="text-xs text-gray-400">
                      {lang === "vi" 
                        ? "Làm chủ các mô hình Runway Gen-3, Luma, Midjourney để bứt phá giới hạn hình ảnh." 
                        : "Mastering Runway Gen-3, Luma, Midjourney to break through boundaries of visual content."
                      }
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-3 text-white font-semibold text-sm mb-1">
                      <Target className="w-4 h-4 text-cyan-400" />
                      {lang === "vi" ? "Thời gian tối ưu" : "Speed & Efficiency"}
                    </div>
                    <p className="text-xs text-gray-400">
                      {lang === "vi" 
                        ? "Tiêu giảm đến 80% thời gian sản xuất và chỉnh sửa truyền thống nhờ quy trình co-production AI khép kín." 
                        : "Accelerate delivery schedules up to 80% using custom-designed co-production pipelines."
                      }
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-mono">
                    80% TIME SAVED
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1 block">
                    {lang === "vi" ? "Tối ưu hóa năng suất sản xuất" : "Video production optimized by Gen AI"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inspirational Storytelling */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3">
              <User className="w-4 h-4 text-cyan-400" />
              <span>
                <ScrambleText text={d.about.badge} />
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight uppercase">
              <ScrambleText text={d.about.nameTitle} /> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-500 font-mono text-xl md:text-2xl lowercase font-normal tracking-wide">
                {d.about.username}
              </span>
            </h2>

            <div className="text-gray-300 space-y-4 text-base md:text-lg leading-relaxed mb-8">
              <p>
                {lang === "vi" ? (
                  <>
                    Mình là <strong className="text-white">Trường Sơn (sonchu)</strong> - một Editor chuyên nghiệp và Nhà sáng tạo nội dung số với hơn <strong className="text-cyan-400">2 năm kinh nghiệm thực chiến</strong>. Mình đam mê tối ưu hóa quy trình sản xuất video bằng công nghệ AI và quản lý xây dựng kênh đa nền tảng.
                  </>
                ) : (
                  <>
                    I am <strong className="text-white">Truong Son (sonchu)</strong> - a professional Editor and Digital Content Creator with over <strong className="text-cyan-400">2 years of practical experience</strong>. I specialize in automating video production workflows using advanced AI.
                  </>
                )}
              </p>
              <p>
                {lang === "vi" ? (
                  <>
                    Với phong cách làm việc nhanh gọn, hiệu quả và luôn đặt <strong className="text-amber-400">"đúng deadline"</strong> lên hàng đầu, mình tự tin mang lại sự an tâm tuyệt đối và giá trị đột phá cho mọi đối tác và thương hiệu.
                  </>
                ) : (
                  <>
                    Driven by agility, performance, and keeping <strong className="text-amber-400">"deadlines met"</strong> at the core of my business, I deliver peace of mind and absolute engagement triggers for all brands and creators.
                  </>
                )}
              </p>
            </div>

            {/* 3 Specialized Niches Section */}
            <div className="mb-8 border-t border-slate-900 pt-6">
              <h3 className="text-sm font-bold text-amber-400 mb-4 tracking-wider uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
                <span>{d.about.nichesTitle}</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: d.about.niche1Title, desc: d.about.niche1Desc, border: "hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]" },
                  { title: d.about.niche2Title, desc: d.about.niche2Desc, border: "hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]" },
                  { title: d.about.niche3Title, desc: d.about.niche3Desc, border: "hover:border-teal-500/40 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)]" }
                ].map((nicheItem, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.015, x: 4 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`relative p-4 md:p-5 bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden transition-all duration-300 ${nicheItem.border}`}
                  >
                    {/* Futuristic glowing tracing overlay */}
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-500/10 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="flex items-start gap-3.5 relative z-10">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 animate-pulse"></div>
                      <div>
                        <h4 className="text-white font-bold text-sm md:text-base hover:text-cyan-400 transition-colors duration-200">
                          {nicheItem.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-400 mt-1 leading-relaxed">
                          {nicheItem.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main skills block matching the picture */}
            <div className="mb-8 border-t border-slate-900 pt-6">
              <h3 className="text-sm font-bold text-cyan-400 mb-4 tracking-wider uppercase flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{d.about.skillsTitle}</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {["Video Editing", "AI Video Production", "Channel Management", "Landing Page Design"].map((skill, index) => (
                  <motion.span 
                    key={index} 
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 0 12px rgba(6, 182, 212, 0.45)", 
                      borderColor: "#22d3ee" 
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 15 }}
                    className="px-4 py-2 bg-cyan-950/20 text-cyan-400 border border-cyan-500/35 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Quick Contact buttons block from image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-900 pt-6">
              <a 
                href="mailto:sonchukt91@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-white hover:border-cyan-500/25 transition duration-200"
              >
                <div className="text-cyan-400"><CheckCircle className="w-4 h-4" /></div>
                <div className="truncate text-xs md:text-sm">sonchukt91@gmail.com</div>
              </a>

              <a 
                href="tel:+84969998645"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-white hover:border-amber-500/25 transition duration-200"
              >
                <div className="text-amber-500"><CheckCircle className="w-4 h-4" /></div>
                <div className="truncate text-xs md:text-sm">+84 969 998 645</div>
              </a>

              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-white hover:border-blue-500/25 transition duration-200"
              >
                <div className="text-blue-400"><CheckCircle className="w-4 h-4" /></div>
                <div className="truncate text-xs md:text-sm">Facebook</div>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
