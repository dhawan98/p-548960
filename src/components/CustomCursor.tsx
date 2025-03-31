
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Sparkles, Code, Briefcase, User, Mail } from "lucide-react";

// Define cursor states
type CursorMode = "default" | "link" | "hero" | "about" | "skills" | "projects" | "contact";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
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
        });
        
        link.addEventListener("mouseleave", () => {
          setCursorMode("default");
        });
      });
      
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
      };
    };

    addEventListeners();
    
    // Set up cursor mode tracking
    const observer = new MutationObserver(() => {
      updateCursorMode();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial cursor mode setup
    updateCursorMode();

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

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
        return theme === "dark" ? "rgba(217, 70, 239, 0.8)" : "rgba(139, 92, 246, 0.8)";
    }
  };

  // Icon based on section
  const getCursorIcon = () => {
    switch(cursorMode) {
      case "hero":
        return <Sparkles className="h-4 w-4" />;
      case "about":
        return <User className="h-4 w-4" />;
      case "skills":
        return <Code className="h-4 w-4" />;
      case "projects":
        return <Briefcase className="h-4 w-4" />;
      case "contact":
        return <Mail className="h-4 w-4" />;
      case "link":
        return <Sparkles className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-150 ease-out ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative">
        {/* Main cursor ring */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '30px',
            height: '30px',
            border: `2px solid ${getCursorColor()}`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.8,
          }}
        />
        
        {/* Inner cursor dot */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '8px',
            height: '8px',
            background: getCursorColor(),
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Icon based on section */}
        <div className="absolute text-white transform -translate-x-1/2 -translate-y-1/2">
          {getCursorIcon()}
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
