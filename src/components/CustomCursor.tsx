
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Sparkles } from "lucide-react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [trail, setTrail] = useState<Array<{x: number, y: number, life: number}>>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail with a maximum length
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, life: 20 }];
        return newTrail.slice(-25); // Keep only the last 25 positions
      });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const updateLinks = () => {
      const allLinks = document.querySelectorAll("a, button, .card, [role=button]");
      
      allLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          setLinkHovered(true);
        });
        
        link.addEventListener("mouseleave", () => {
          setLinkHovered(false);
        });
      });
    };

    // Animate trail decay
    const animateTrail = () => {
      setTrail(prevTrail => 
        prevTrail
          .map(point => ({ ...point, life: point.life - 1 }))
          .filter(point => point.life > 0)
      );
      
      requestAnimationFrame(animateTrail);
    };

    addEventListeners();
    
    // We need to update our event listeners whenever the DOM changes
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial links setup
    updateLinks();
    
    // Start trail animation
    const animationId = requestAnimationFrame(animateTrail);

    return () => {
      removeEventListeners();
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Generate cursor colors based on theme
  const primaryColor = theme === "dark" ? 
    "rgba(217, 70, 239, 1)" : // Bright magenta in dark mode
    "rgba(139, 92, 246, 1)";  // Vivid purple in light mode
    
  const secondaryColor = theme === "dark" ? 
    "rgba(139, 92, 246, 0.8)" : // Purple in dark mode
    "rgba(217, 70, 239, 0.8)";  // Magenta in light mode

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Cursor trail */}
      {trail.map((point, index) => {
        const size = Math.max(5, (point.life / 20) * 8);
        const opacity = point.life / 20;
        
        return (
          <div
            key={index}
            className="fixed pointer-events-none z-40 rounded-full"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              transform: 'translate(-50%, -50%)',
              background: `${index % 2 ? primaryColor : secondaryColor}`,
              transition: 'opacity 0.3s ease',
            }}
          />
        );
      })}
      
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-150 ease-out ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
        }}
      >
        {linkHovered ? (
          // Custom cursor for interactive elements
          <div className="relative">
            <div 
              className="absolute rounded-full animate-pulse"
              style={{
                width: '40px',
                height: '40px',
                border: `2px solid ${primaryColor}`,
                transform: 'translate(-50%, -50%)',
                opacity: 0.6,
              }}
            />
            <div 
              className="absolute rounded-full"
              style={{
                width: '12px',
                height: '12px',
                background: primaryColor,
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 15px ${primaryColor}`,
              }}
            />
          </div>
        ) : (
          // Default cursor with sparkle effect
          <div className="relative">
            <Sparkles 
              size={24} 
              className={`absolute ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
              style={{
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 2s infinite',
              }}
            />
            <div 
              className="absolute rounded-full"
              style={{
                width: '8px',
                height: '8px',
                background: primaryColor,
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 10px ${primaryColor}`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
