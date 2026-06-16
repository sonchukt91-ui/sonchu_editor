import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "motion/react";
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, Sparkles, Youtube, Facebook } from "lucide-react";
import { ContactFormData } from "../types";
import { translations } from "../dictionary";
import ScrambleText from "./ScrambleText";

interface ContactProps {
  lang?: "vi" | "en";
}

export default function Contact({ lang = "vi" }: ContactProps) {
  const d = translations[lang];

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setStatusMessage(data.message || d.contact.successMsg);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || d.contact.errorMsg);
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setStatusMessage(lang === "vi" 
        ? "Không thể kết nối dịch vụ, vui lòng liên hệ hotline: +84 969 998 645." 
        : "Cannot establish connection. Please contact directly: +84 969 998 645."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-24 pb-12 relative overflow-hidden bg-slate-950/60 border-t border-slate-900/60">
      {/* Background ambient radial lights */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Left Column: Contact details & pitch */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>
                  <ScrambleText text={d.contact.badge} />
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase">
                {lang === "vi" ? (
                  <>
                    <ScrambleText text="Bắt Đầu" /> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                      Dự Án Đột Phá
                    </span>
                  </>
                ) : (
                  <>
                    <ScrambleText text="Initiate" /> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                      Breakthrough Projects
                    </span>
                  </>
                )}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                {d.contact.description}
              </p>
            </div>

            {/* Info Channels list */}
            <div className="space-y-6 mt-6 lg:mt-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-mono">
                    {lang === "vi" ? "ĐƯỜNG THƯ ĐIỆN TỬ" : "EMAIL ADRESS"}
                  </span>
                  <a href="mailto:sonchukt91@gmail.com" className="text-white hover:text-cyan-400 font-medium transition duration-205">
                    sonchukt91@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-mono">
                    {lang === "vi" ? "HOTLINE / ZALO WORK" : "HOTLINE / ZALO WORK"}
                  </span>
                  <a href="tel:+84969998645" className="text-white hover:text-amber-400 font-medium transition duration-205">
                    +84 969 998 645
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-mono">
                    {lang === "vi" ? "VÙNG HOẠT ĐỘNG HOẶC REMOTE" : "WORK LOCATION & REMOTE"}
                  </span>
                  <span className="text-white font-medium">
                    {lang === "vi" ? " Remote toàn cầu" : " Nationwide | Global Remote"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form box */}
          <div className="lg:col-span-7">
            <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-6 md:p-8 relative">
              <div className="absolute right-4 top-4 font-mono text-[9px] text-gray-700 select-none">
                //SECURE_COMMUNICATION_CHANNEL
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wide">
                {d.contact.formHeading}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">{d.contact.nameInput}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === "vi" ? "Nguyễn Văn A" : "John Doe"}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">{d.contact.phoneInput}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="09xxx"
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">{d.contact.emailInput}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="partner@example.com"
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">{d.contact.msgInput}</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === "vi" ? "Hãy tóm tắt về loại video ngắn, kịch bản hoặc mảng Web3 bạn đang muốn thực hành..." : "Brief your content requirements, scripts or project ideas..."}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold md:tracking-wide py-4 px-6 rounded-xl hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? d.contact.btnSending : d.contact.btnSend}</span>
                </button>
              </form>

              {/* Form status response notice popup */}
              {submitStatus !== "idle" && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl flex items-start gap-3 border ${
                    submitStatus === "success" 
                      ? "bg-emerald-950/20 text-emerald-300 border-emerald-500/20" 
                      : "bg-rose-950/20 text-rose-300 border-rose-500/20"
                  }`}
                >
                  {submitStatus === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <span className="text-xs md:text-sm">{statusMessage}</span>
                </motion.div>
              )}
            </div>
          </div>

        </div>

        {/* Global Footer brand and info display */}
        <div className="border-t border-slate-900 pt-12 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">
              TRƯỜNG SƠN (@sonchu)
            </span>
            <p className="text-xs text-gray-500 font-mono mt-1">
              &copy; {new Date().getFullYear()} CHU NGUYỄN TRƯỜNG SƠN - PROFESSIONAL PORTFOLIO. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Social media connections */}
          <div className="flex items-center gap-4">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-red-950/30 border border-slate-800 hover:border-red-500/30 flex items-center justify-center text-gray-400 hover:text-red-400 transition"
              title="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>

            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-blue-950/30 border border-slate-800 hover:border-blue-500/30 flex items-center justify-center text-gray-400 hover:text-blue-400 transition"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a 
              href="https://zalo.me/0969998645" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-cyan-400 font-mono text-xs font-bold transition"
              title="Zalo Chat"
            >
              ZALO
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
