
import { useEffect, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

const AnimatedText = ({ text, className = "", once = false }: AnimatedTextProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Split text into spans
    const createLetterSpans = () => {
      element.innerHTML = "";
      text.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        span.style.display = "inline-block";
        span.style.transition = `opacity 0.3s ease, transform 0.3s ease`;
        span.style.transitionDelay = `${index * 0.03}s`;
        element.appendChild(span);
      });
    };
    
    createLetterSpans();
    
    const animateText = () => {
      const spans = element.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      });
    };
    
    const resetText = () => {
      const spans = element.querySelectorAll("span");
      spans.forEach((span, index) => {
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
      });
    };
    
    // Animation on scroll
    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (isVisible) {
        animateText();
      } else if (!once) {
        resetText();
      }
    };
    
    // Initial check
    handleScroll();
    
    if (!once) {
      window.addEventListener("scroll", handleScroll);
    } else {
      // For elements that should only animate once when they come into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateText();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(element);
      return () => observer.disconnect();
    }
    
    return () => {
      if (!once) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [text, once]);
  
  return <div ref={elementRef} className={className} />;
};

export default AnimatedText;
