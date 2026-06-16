import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";
import { translations } from "../dictionary";

interface AIChatboxProps {
  lang?: "vi" | "en";
}

export default function AIChatbox({ lang = "vi" }: AIChatboxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const d = translations[lang];

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize greeting messages whenever language changes
  useEffect(() => {
    setMessages([
      {
        id: "msg_init",
        sender: "ai",
        text: d.chat.initMsg,
        timestamp: new Date()
      }
    ]);
  }, [lang]);

  const [inputText, setInputText] = useState<string>(" ");
  // Set empty default
  useEffect(() => {
    setInputText("");
  }, [lang]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const suggestedQuestions = d.chat.suggestions;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "msg_user_" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          lang: lang,
          history: messages.slice(-6).map(m => ({
            sender: m.sender,
            text: m.text
          })) // Send recent message exchange context
        })
      });

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: "msg_ai_" + Date.now(),
        sender: "ai",
        text: data.reply || d.chat.errReply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Lỗi gửi chat:", err);
      const errMsg: ChatMessage = {
        id: "msg_err_" + Date.now(),
        sender: "ai",
        text: d.chat.errReply,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat window panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-[#090d16] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-950/40 w-[350px] md:w-[380px] h-[500px] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-400/30 flex items-center justify-center text-cyan-400 relative">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-[#090d16]"></span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold flex items-center gap-1.5 uppercase">
                    SonChu AI Assistant <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    {lang === "vi" ? "TƯ VẤN TRỰC TUYẾN GEMINI AI" : "ONLINE GEMINI CO-PILOT"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-gray-400 hover:text-white transition duration-200 cursor-pointer text-xs"
              >
                <X className="w-4 h-4 inline" /> {lang === "vi" ? "Đóng" : "Close"}
              </button>
            </div>

            {/* Chat Messages flow */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    msg.sender === "user" 
                      ? "bg-slate-950/80 border-slate-800 text-slate-300"
                      : "bg-cyan-950/20 border-cyan-500/10 text-cyan-400"
                  }`}>
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-3 max-w-[75%] rounded-2xl text-xs md:text-sm text-left leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-cyan-500 to-teal-600 text-slate-950 font-medium rounded-tr-none"
                      : "bg-slate-900 border border-slate-800 text-gray-300 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2.5 flex-row">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/20 border border-cyan-500/10 text-cyan-400 flex items-center justify-center animate-bounce">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 text-gray-400 rounded-2xl rounded-tl-none font-mono text-[10px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    {lang === "vi" ? "Trợ lý đang suy nghĩ..." : "Assistant is writing..."}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions pill blocks */}
            {messages.length === 1 && (
              <div className="px-4 py-3 bg-slate-950 border-t border-slate-900/40">
                <span className="text-[9px] text-gray-500 font-mono tracking-wider flex items-center gap-1 uppercase mb-2">
                  <HelpCircle className="w-3 h-3 text-cyan-400" /> {lang === "vi" ? "Nhấp nhanh câu hỏi gợi ý" : "Quick suggestions"}
                </span>
                <div className="flex flex-col gap-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-xs text-gray-300 hover:text-white bg-slate-900 hover:bg-cyan-950/30 border border-slate-800/80 hover:border-cyan-500/30 px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer truncate"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={d.chat.inputPlaceholder}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500/45 rounded-xl px-3 py-2 text-xs md:text-sm text-white placeholder-gray-500 outline-none transition duration-200"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button logo */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 p-4 rounded-full shadow-lg shadow-cyan-500/20 cursor-pointer overflow-hidden border border-cyan-400/20"
        id="widget-launcher-chat"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
        {isOpen ? <X className="w-6 h-6 font-bold" /> : <MessageSquare className="w-6 h-6 font-bold" />}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-[#05070c] animate-pulse"></span>
      </motion.button>
    </div>
  );
}
