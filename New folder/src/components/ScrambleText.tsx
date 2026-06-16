import React, { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";

interface ScrambleTextProps {
  text: string;
  className?: string; // Standard HTML class
  triggerOnce?: boolean;
}

export default function ScrambleText({ text, className = "", triggerOnce = true }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-80px" });
  const chars = "X01#_@$+%*/\\<>[]";
  const hasAnimationTriggered = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimationTriggered.current) return;
    hasAnimationTriggered.current = true;

    let iteration = 0;
    const originalText = text;
    const interval = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      iteration += 1;
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, text]);

  // Re-trigger scrambled styling when switching translation text
  useEffect(() => {
    setDisplayText(text);
    hasAnimationTriggered.current = false;
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {displayText || text}
    </span>
  );
}
