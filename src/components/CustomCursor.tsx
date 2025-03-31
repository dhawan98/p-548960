
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Sparkles, Code, Briefcase, User, Mail, Code2, Star, BookOpen, Palette } from "lucide-react";

// Define cursor states
type CursorMode = "default" | "link" | "hero" | "about" | "skills" | "projects" | "contact";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [trail, setTrail] = useState<Array<{x: number, y: number, life: number, angle: number}>>([]);
  const [orbits, setOrbits] = useState<Array<{icon: JSX.Element, angle: number, distance: number, speed: number}>>([]);
  const [targetScale, setTargetScale] = useState(1);
  const scaleRef = useRef(1);
  const { theme } = useTheme();

  // Create orbiting elements
  useEffect(() => {
    const orbitIcons = [
      { icon: <Code size={14} />, distance: 40, speed: 0.02 },
      { icon: <Briefcase size={14} />, distance: 40, speed: -0.015 },
      { icon: <Star size={14} />, distance: 40, speed: 0.025 },
      { icon: <Palette size={14} />, distance: 40, speed: -0.022 },
      { icon: <BookOpen size={14} />, distance: 40, speed: 0.018 }
    ].map(item => ({
      ...item,
      angle: Math.random() * Math.PI * 2
    }));
    
    setOrbits(orbitIcons);
  }, []);

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
        const newTrail = [...prevTrail, { 
          x: e.clientX, 
          y: e.clientY, 
          life: 20,
          angle: Math.random() * Math.PI * 2
        }];
        return newTrail.slice(-35); // Keep more trail points for dramatic effect
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
      setTargetScale(0.8);
    };

    const onMouseUp = () => {
      setClicked(false);
      setTargetScale(1);
    };

    const updateCursorMode = () => {
      // Update sections that should have special cursor modes
      const sections = [
        { id: "hero", mode: "hero" as CursorMode },
        { id: "about", mode: "about" as CursorMode },
        { id: "skills", mode: "skills" as CursorMode },
        { id: "projects", mode: "projects" as CursorMode },
        { id: "contact", mode: "contact" as CursorMode }
      ];
      
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        
        // Check which section we're hovering over
        let currentMode: CursorMode = "default";
        
        sections.forEach(section => {
          const el = document.getElementById(section.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (
              clientX >= rect.left &&
              clientX <= rect.right &&
              clientY >= rect.top &&
              clientY <= rect.bottom
            ) {
              currentMode = section.mode;
            }
          }
        });
        
        setCursorMode(currentMode);
      };
      
      document.addEventListener('mousemove', onMouseMove);
      
      // Track interactive elements
      const allLinks = document.querySelectorAll("a, button, .card, [role=button]");
      
      allLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          setCursorMode("link");
          setTargetScale(1.5);
        });
        
        link.addEventListener("mouseleave", () => {
          setCursorMode("default");
          setTargetScale(1);
        });
      });
      
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
      };
    };

    // Animate trail decay and cursor scale
    const animateElements = () => {
      // Update trail
      setTrail(prevTrail => 
        prevTrail
          .map(point => ({ ...point, life: point.life - 1 }))
          .filter(point => point.life > 0)
      );
      
      // Update orbits
      setOrbits(prevOrbits => 
        prevOrbits.map(orbit => ({
          ...orbit,
          angle: orbit.angle + orbit.speed,
        }))
      );
      
      // Smooth scale animation
      scaleRef.current = scaleRef.current + (targetScale - scaleRef.current) * 0.2;
      
      requestAnimationFrame(animateElements);
    };

    addEventListeners();
    
    // We need to update our event listeners whenever the DOM changes
    const observer = new MutationObserver(() => {
      updateCursorMode();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial cursor mode setup
    updateCursorMode();
    
    // Start animations
    const animationId = requestAnimationFrame(animateElements);

    return () => {
      removeEventListeners();
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [targetScale]);

  // Generate cursor colors based on theme
  const getCursorColor = () => {
    switch(cursorMode) {
      case "hero":
        return theme === "dark" ? "rgba(139, 92, 246, 1)" : "rgba(124, 58, 237, 1)";
      case "about":
        return theme === "dark" ? "rgba(236, 72, 153, 1)" : "rgba(219, 39, 119, 1)";
      case "skills":
        return theme === "dark" ? "rgba(16, 185, 129, 1)" : "rgba(5, 150, 105, 1)";
      case "projects":
        return theme === "dark" ? "rgba(245, 158, 11, 1)" : "rgba(217, 119, 6, 1)";
      case "contact":
        return theme === "dark" ? "rgba(59, 130, 246, 1)" : "rgba(37, 99, 235, 1)";
      case "link":
        return theme === "dark" ? "rgba(217, 70, 239, 1)" : "rgba(192, 38, 211, 1)";
      default:
        return theme === "dark" ? "rgba(217, 70, 239, 1)" : "rgba(139, 92, 246, 1)";
    }
  };
  
  const getTrailColor = (index: number) => {
    const colors = [
      theme === "dark" ? "rgba(139, 92, 246, 0.8)" : "rgba(124, 58, 237, 0.8)",
      theme === "dark" ? "rgba(236, 72, 153, 0.8)" : "rgba(219, 39, 119, 0.8)",
      theme === "dark" ? "rgba(16, 185, 129, 0.8)" : "rgba(5, 150, 105, 0.8)",
      theme === "dark" ? "rgba(245, 158, 11, 0.8)" : "rgba(217, 119, 6, 0.8)",
      theme === "dark" ? "rgba(59, 130, 246, 0.8)" : "rgba(37, 99, 235, 0.8)"
    ];
    
    return colors[index % colors.length];
  };

  // Icon based on section
  const getCursorIcon = () => {
    switch(cursorMode) {
      case "hero":
        return <Star className="h-5 w-5" />;
      case "about":
        return <User className="h-5 w-5" />;
      case "skills":
        return <Code2 className="h-5 w-5" />;
      case "projects":
        return <Briefcase className="h-5 w-5" />;
      case "contact":
        return <Mail className="h-5 w-5" />;
      case "link":
        return <Sparkles className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Cursor trail */}
      {trail.map((point, index) => {
        const size = Math.max(4, (point.life / 20) * 10);
        const opacity = point.life / 20;
        
        return (
          <div
            key={index}
            className="fixed pointer-events-none z-40 rounded-full mix-blend-screen"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              transform: 'translate(-50%, -50%)',
              background: `${getTrailColor(index)}`,
              boxShadow: `0 0 ${size * 1.5}px ${getTrailColor(index)}`,
              transition: 'opacity 0.3s ease',
            }}
          />
        );
      })}
      
      {/* Orbiting elements */}
      {orbits.map((orbit, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-50 text-primary transition-colors duration-300"
          style={{
            left: `${position.x + Math.cos(orbit.angle) * orbit.distance * scaleRef.current}px`,
            top: `${position.y + Math.sin(orbit.angle) * orbit.distance * scaleRef.current}px`,
            transform: 'translate(-50%, -50%)',
            opacity: hidden ? 0 : 0.8,
            transition: 'opacity 0.3s ease',
          }}
        >
          {orbit.icon}
        </div>
      ))}
      
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-150 ease-out ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${scaleRef.current})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="relative">
          {/* Main cursor ring with glow effect */}
          <div 
            className="absolute rounded-full backdrop-blur-sm animate-pulse"
            style={{
              width: '40px',
              height: '40px',
              border: `2px solid ${getCursorColor()}`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.8,
              boxShadow: `0 0 15px ${getCursorColor()}`,
            }}
          />
          
          {/* Inner cursor dot */}
          <div 
            className="absolute rounded-full"
            style={{
              width: '12px',
              height: '12px',
              background: getCursorColor(),
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 15px ${getCursorColor()}`,
            }}
          />
          
          {/* Icon based on section */}
          <div className="absolute text-white transform -translate-x-1/2 -translate-y-1/2">
            {getCursorIcon()}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
