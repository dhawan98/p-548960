
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
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

    addEventListeners();
    
    // We need to update our event listeners whenever the DOM changes
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial links setup
    updateLinks();

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  const cursorClasses = `
    fixed pointer-events-none z-50 rounded-full mix-blend-difference
    transition-transform duration-150 ease-out transform
    ${hidden ? "opacity-0" : "opacity-100"}
    ${clicked ? "scale-75" : "scale-100"}
    ${linkHovered ? "h-8 w-8" : "h-5 w-5"}
    ${theme === "dark" ? "bg-white" : "bg-primary"}
  `;

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <div
        className={cursorClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.75 : linkHovered ? 1.5 : 1})`,
        }}
      />
      {linkHovered && (
        <div
          className="fixed pointer-events-none z-40 rounded-full border-2 border-primary mix-blend-difference"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
            width: "38px",
            height: "38px",
            opacity: 0.5,
            transition: "width 0.2s, height 0.2s, opacity 0.2s",
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
