import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHoveredClickable, setIsHoveredClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile/touch devices
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target && (
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "IFRAME" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".cursor-pointer")
        )
      ) {
        setIsHoveredClickable(true);
      } else {
        setIsHoveredClickable(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Neon Dot Center */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00f3ff] pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_8px_#00f3ff]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* 2. Lagging Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#00f3ff] pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHoveredClickable ? 38 : 22,
          height: isHoveredClickable ? 38 : 22,
          backgroundColor: isHoveredClickable ? "rgba(0, 243, 255, 0.15)" : "rgba(0, 243, 255, 0)",
          borderColor: isHoveredClickable ? "#00f3ff" : "rgba(0, 243, 255, 0.6)",
          boxShadow: isHoveredClickable ? "0 0 15px rgba(0, 243, 255, 0.4)" : "none",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
    </>
  );
}
