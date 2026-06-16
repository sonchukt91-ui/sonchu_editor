import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Cảnh báo: Không tìm thấy GEMINI_API_KEY trong biến môi trường. Chatbot sẽ chạy ở chế độ mô phỏng offline.");
}

// Contacts Database File path
const CONTACTS_FILE_PATH = path.join(process.cwd(), "src", "contacts_db.json");

// Ensure src directory and contacts_db.json exist
const ensureDatabaseExists = () => {
  const srcDir = path.join(process.cwd(), "src");
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  if (!fs.existsSync(CONTACTS_FILE_PATH)) {
    fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}// System instruction for the AI assistant chatbot
const SYSTEM_INSTRUCTION = `
You are "Son AI Assistant" - a smart representative for Chu Nguyen Truong Son (sonchu).
Your mission is to provide professional, polite, and enthusiastic project consultation, service pricing, and collaboration queries in either Vietnamese or English depending on user preferences.

Response guidelines:
1. Keep replies highly visual, professional, to-the-point, and structured (maximum 2-3 sentences per point).
2. Look at the request parameter lang ("vi" or "en"). If lang is "en" or the user messages in English, answer strictly in English. If lang is "vi" or the user messages in Vietnamese, answer strictly in Vietnamese.

Profile of Chu Nguyen Truong Son:
- Identity: Professional Video Editor, Digital Content Creator, and Premium Front-end Designer with 2 years of practical experience. Master of Generative AI ecosystems (Gemini, Runway Gen-3, Luma, Midjourney) and high-end web development to optimize production and conversion rates.
- Work Ethics: Fast, robust, efficient and respects deadlines as absolute law ("đúng deadline").
- High-Value Niches of Expertise:
  1. Finance & Crypto/Web3: Simplifies complex global macro contents, crafts retention-focused scripts for short-form and long-form.
  2. Sports & Football Media: Dramatic, emotional storytelling and cinematic sports editing.
  3. Comics & 3D/Cinematic Animation: Visual styles, character transformations, high-end effects.
  4. Premium Landing Page Design (Futuristic/Cyberpunk UI/UX): Building high-end custom portfolios and sales page landing screens with interactive elements, responsive designs, and maximum conversion rates.
- Core Capacities:
  1. Video Editing: Social videos (TikTok/Reels/Shorts), high-end podcasts, seamless audio syncing.
  2. AI Video Production: Deep upscale/restoration to cinematic 4K, precise prompt engineering for robot transformations (e.g. Vinfast/SUV to Transformers robotic art).
  3. Channel Management: Built and managed cross-platform channels, calculated hooks, affiliate traffic funnels (TikTok Shop, Shopee Partner).
  4. On-Demand Video Editing & Production: Transforming raw footage or customized conceptual ideas into polished, high-impact video assets with professional pacing, sound design, and custom visual effects (Premiere, After Effects, DaVinci Resolve).
  5. Premium Landing Page Design: Custom futuristic/cyberpunk landing pages, fully responsive, fast load-speed optimized, using React, Tailwind CSS, Framer Motion, Vite, and Google AI Studio SDK.
- Toolsets: CapCut PC Pro, Runway Gen-3, Luma Dream Machine, Midjourney, Stable Diffusion, ElevenLabs, Gemini AI, Premiere, After Effects, DaVinci Resolve, React, Tailwind CSS, Framer Motion, Vite, Google AI Studio SDK.
- Reference Pricing:
  + Single Short-form Video (Script + AI Voice + Editing): 350,000 VND / video.
  + Channel growth package (15 premium shorts/month, search/trend research): 4,500,000 VND / month.
  + On-Demand Video Editing & Production: Starts from 500,000 VND / video.
  + Advanced AI Robot transformation works: From 1,500,000 VND / custom production.
  + Premium Landing Page Design (Custom UI/UX + futuristic/cyberpunk code): From 2,500,000 VND - 5,000,000 VND / landing page.
- Contact Details:
  + Email: sonchukt91@gmail.com
  + Hotline/Zalo: +84 969 998 645 (encourage visitors to fill out the contact form down on the page).
  + Socials: @sonchu

Persuade clients to collaborate with Son by showing genuine confidence, responsiveness, and clear value. Mention filing out the contact page for customized queries or messaging directly via Zalo at +84 969 998 645.
`;

// API: Chat with AI assistant
app.post("/api/chat", async (req, res) => {
  const { message, history, lang } = req.body;

  if (!message) {
    return res.status(400).json({ error: lang === "en" ? "Message is required." : "Vui lòng nhập nội dung tin nhắn." });
  }

  try {
    const isEn = lang === "en";
    if (ai) {
      // Build structured chat history from request history if provided
      const chatHistory = history ? history.map((h: any) => ({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      })) : [];

      // Create a chat session with system instruction
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
        history: chatHistory
      });

      const result = await chat.sendMessage({ message: `[Request Language context: ${lang || "vi"}] Send your reply: ${message}` });
      const reply = result.text || (isEn ? "Sorry, I am having trouble processing this query right now." : "Xin lỗi, tôi gặp chút sự cố trong việc xử lý thông tin này.");
      return res.json({ reply });
    } else {
      // Simulate reply from systemic knowledge base offline
      const lowercaseMsg = message.toLowerCase();
      let reply = "";

      if (isEn) {
        if (lowercaseMsg.includes("cost") || lowercaseMsg.includes("price") || lowercaseMsg.includes("how much") || lowercaseMsg.includes("rate")) {
          reply = "Single short-form video package starts at 350,000 VND. On-demand video editing starts from 500,000 VND. Channel management is 4,500,000 VND/month. AI Robot transformation starts from 1,500,000 VND. Premium Landing Page Design is from 2,500,000 VND to 5,000,000 VND.";
        } else if (lowercaseMsg.includes("landing") || lowercaseMsg.includes("web") || lowercaseMsg.includes("site") || lowercaseMsg.includes("design") || lowercaseMsg.includes("front-end")) {
          reply = "Son designs and builds premium, state-of-the-art Futuristic/Cyberpunk Landing Pages and Sales Screens using React, Tailwind CSS, Framer Motion, and Google AI Studio SDK starting from 2,500,000 VND to 5,000,000 VND. Highly optimized for conversion, speed, and mobile responsiveness.";
        } else if (lowercaseMsg.includes("demand") || lowercaseMsg.includes("custom video") || lowercaseMsg.includes("raw footage") || lowercaseMsg.includes("production")) {
          reply = "Son offers On-Demand Video Editing & Production services starting from 500,000 VND. He converts raw footage or raw concepts into polished, high-impact video assets. It includes optimized pacing, sound design, and custom visual effects with Premiere, After Effects, and DaVinci.";
        } else if (lowercaseMsg.includes("niche") || lowercaseMsg.includes("expertise") || lowercaseMsg.includes("specialty")) {
          reply = "Son specializes in 4 high-value segments: Finance/Crypto/DeFi, Sports media contents, custom Transformers character/3D animations, and Premium Futuristic Landing Page UI/UX development.";
        } else if (lowercaseMsg.includes("contact") || lowercaseMsg.includes("zalo") || lowercaseMsg.includes("email") || lowercaseMsg.includes("phone")) {
          reply = "You can contact Son directly on Zalo at +84 969 998 645 or via email at sonchukt91@gmail.com. Drop a request in the contact form at the bottom of this website!";
        } else if (lowercaseMsg.includes("experience") || lowercaseMsg.includes("about") || lowercaseMsg.includes("who")) {
          reply = "Chu Nguyen Truong Son (@sonchu) is a seasoned video editor, digital content creator, and front-end designer with 2 years of practical experience. He optimizes work schedules by 80% with zero delays.";
        } else {
          reply = "Hello! I am Son's AI Assistant. How can I help you regarding customized video editing, AI workflows, Web3 retention scripts, custom Landing Pages or rates?";
        }
      } else {
        if (lowercaseMsg.includes("chi phí") || lowercaseMsg.includes("giá") || lowercaseMsg.includes("bao nhiêu tiền") || lowercaseMsg.includes("báo giá")) {
          reply = "Dịch vụ làm Shorts lẻ khoảng 350.000 VNĐ/video. Biên tập & dựng video theo yêu cầu từ 500.000 VNĐ/video. Gói quản lý phát triển kênh là 4.500.000 VNĐ/tháng. Biến hình Robot Transformers từ 1.500.000 VNĐ. Thiết kế Landing Page Cao Cấp từ 2.500.000 VNĐ - 5.000.000 VNĐ.";
        } else if (lowercaseMsg.includes("landing") || lowercaseMsg.includes("web") || lowercaseMsg.includes("giao diện") || lowercaseMsg.includes("trang") || lowercaseMsg.includes("website")) {
          reply = "Anh Sơn chuyên thiết kế và lập trình các trang Landing Page và Sales Page cao cấp theo phong cách Futuristic/Cyberpunk độc bản, tối ưu UI/UX, responsive di động 100% bằng React, Tailwind CSS và Framer Motion. Chi phí từ 2.500.000 VNĐ đến 5.000.000 VNĐ tùy độ phức tạp.";
        } else if (lowercaseMsg.includes("theo yêu cầu") || lowercaseMsg.includes("bản dựng") || lowercaseMsg.includes("tư liệu thô") || lowercaseMsg.includes("yêu cầu") || lowercaseMsg.includes("dựng video")) {
          reply = "Anh Sơn cung cấp dịch vụ Biên Tập & Dựng Video Theo Yêu Cầu với chi phí từ 500.000 VNĐ. Dịch vụ này giúp chuyển hóa mọi ý tưởng hoặc tư liệu thô của bạn thành video thành phẩm chất lượng cao, tối ưu tuyệt đối về nhịp điệu, dàn dựng âm thanh (sound design), hiệu ứng VFX chuyên nghiệp bằng Premiere, DaVinci và After Effects.";
        } else if (lowercaseMsg.includes("ngách") || lowercaseMsg.includes("thế mạnh") || lowercaseMsg.includes("chuyên môn")) {
          reply = "Anh Sơn chuyên sâu 4 thế mạnh ngách đặc biệt: Tài chính & Crypto/Web3, Thể thao & Bóng đá kịch tính, Hoạt hình 3D biến hình Transformers, và Thiết kế Landing Page độc bản Futuristic/Cyberpunk.";
        } else if (lowercaseMsg.includes("liên hệ") || lowercaseMsg.includes("sđt") || lowercaseMsg.includes("zalo") || lowercaseMsg.includes("email")) {
          reply = "Bạn có thể liên hệ trực tiếp anh Sơn qua số Zalo: +84 969 998 645 hoặc gửi Email qua hộp thư: sonchukt91@gmail.com. Tiện nhất là cứ điền tin nhắn vào form ở cuối trang nhé!";
        } else if (lowercaseMsg.includes("kinh nghiệm") || lowercaseMsg.includes("giới thiệu")) {
          reply = "Anh Sơn là Editor chuyên nghiệp, Nhà sáng tạo nội dung số và Lập trình viên Front-end có hơn 2 năm thực chiến. Anh ấy luôn cam kết đảm bảo đúng tiến độ bàn giao sản phẩm.";
        } else {
          reply = "Chào bạn! Tôi là Sơn AI Assistant. Tôi có thể giải đáp cho bạn mọi thắc mắc về kỹ năng dựng video, dịch vụ thiết kế Landing Page của anh Trường Sơn (sonchu). Bạn muốn hợp tác mảng nào?";
        }
      }

      return res.json({ reply });
    }
  } catch (error: any) {
    console.error("Lỗi gọi Gemini API:", error);
    return res.json({ 
      reply: lang === "en" 
        ? "Hello! The chat copilot is currently serving high traffic, please feel free to contact Son directly on Zalo at +84 969 998 645 for instant support!"
        : "Chào bạn. Hiện tại hệ thống phản hồi đang tải cao một chút, bạn có thể liên lạc trực tiếp anh Chu Nguyễn Trường Sơn qua Zalo/SĐT: +84 969 998 645 để nhận tư vấn tức thì nhé!"
    });
  }
});

// API: Save contact message
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Họ tên, Email và Lời nhắn là bắt buộc." });
  }

  try {
    ensureDatabaseExists();
    const fileData = fs.readFileSync(CONTACTS_FILE_PATH, "utf-8");
    const contacts = JSON.parse(fileData);

    const newContact = {
      id: "cont_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify(contacts, null, 2), "utf-8");

    return res.json({ 
      success: true, 
      message: "Gửi thông tin liên hệ thành công! Sơn sẽ liên hệ lại với bạn sớm nhất." 
    });
  } catch (error) {
    console.error("Lỗi lưu liên hệ:", error);
    return res.status(500).json({ error: "Có lỗi xảy ra khi lưu trữ thông tin liên hệ." });
  }
});

// Serve frontend with Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER RUNNING] Portfolio server available at http://localhost:${PORT}`);
  });
}

startServer();
