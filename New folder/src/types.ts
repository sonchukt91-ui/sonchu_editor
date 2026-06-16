export interface Project {
  id: string;
  title: string;
  category: "cinematic" | "ai-art" | "marketing" | "all";
  description: string;
  solution: string;
  image: string;
  tags: string[];
  duration?: string;
  stats?: string;
  videoUrl?: string;
  links?: { label: string; url: string; thumbnail?: string }[];
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  tools: string[];
  details: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
