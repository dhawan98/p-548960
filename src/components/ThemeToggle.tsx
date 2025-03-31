
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  // For SVG animation
  const [sunPosition, setSunPosition] = useState(theme === 'dark' ? -50 : 25);
  const [moonPosition, setMoonPosition] = useState(theme === 'dark' ? 25 : 100);
  const [starsOpacity, setStarsOpacity] = useState(theme === 'dark' ? 1 : 0);
  const [cloudsOpacity, setCloudsOpacity] = useState(theme === 'dark' ? 0 : 1);

  useEffect(() => {
    if (isAnimating) {
      // Animate sun and moon positions
      const interval = setInterval(() => {
        if (theme === 'dark') {
          // Animate to light
          setSunPosition(prev => {
            const newPos = prev + 3;
            return newPos >= 25 ? 25 : newPos;
          });
          
          setMoonPosition(prev => {
            const newPos = prev + 3;
            return newPos >= 100 ? 100 : newPos;
          });
          
          setStarsOpacity(prev => {
            const newOpacity = prev - 0.05;
            return newOpacity <= 0 ? 0 : newOpacity;
          });
          
          setCloudsOpacity(prev => {
            const newOpacity = prev + 0.05;
            return newOpacity >= 1 ? 1 : newOpacity;
          });
        } else {
          // Animate to dark
          setSunPosition(prev => {
            const newPos = prev - 3;
            return newPos <= -50 ? -50 : newPos;
          });
          
          setMoonPosition(prev => {
            const newPos = prev - 3;
            return newPos <= 25 ? 25 : newPos;
          });
          
          setStarsOpacity(prev => {
            const newOpacity = prev + 0.05;
            return newOpacity >= 1 ? 1 : newOpacity;
          });
          
          setCloudsOpacity(prev => {
            const newOpacity = prev - 0.05;
            return newOpacity <= 0 ? 0 : newOpacity;
          });
        }
      }, 20);
      
      // Stop animation after 500ms
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsAnimating(false);
      }, 500);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isAnimating, theme]);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleToggle} 
      className="rounded-full overflow-hidden relative group"
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {/* SVG Animation for Day/Night */}
      <svg 
        width="30" 
        height="30" 
        viewBox="0 0 100 100" 
        className="transition-all duration-300 transform group-hover:scale-110"
      >
        {/* Sky background */}
        <rect 
          x="0" 
          y="0" 
          width="100" 
          height="100" 
          fill={theme === 'dark' ? '#0f172a' : '#87CEEB'} 
          className="transition-colors duration-500"
        />
        
        {/* Stars (only visible in dark mode) */}
        <g style={{ opacity: starsOpacity }}>
          <circle cx="15" cy="15" r="1" fill="white" />
          <circle cx="30" cy="10" r="1.5" fill="white" />
          <circle cx="45" cy="20" r="1" fill="white" />
          <circle cx="65" cy="15" r="1.2" fill="white" />
          <circle cx="80" cy="25" r="1" fill="white" />
          <circle cx="85" cy="5" r="1.5" fill="white" />
          <circle cx="20" cy="30" r="1" fill="white" />
          <circle cx="70" cy="40" r="1" fill="white" />
        </g>
        
        {/* Clouds (only visible in light mode) */}
        <g style={{ opacity: cloudsOpacity }}>
          <ellipse cx="20" cy="20" rx="15" ry="7" fill="white" />
          <ellipse cx="70" cy="30" rx="20" ry="10" fill="white" />
        </g>
        
        {/* Sun */}
        <circle 
          cx={sunPosition} 
          cy="25" 
          r="15" 
          fill="yellow" 
          className="transition-transform duration-300"
        >
          <animate 
            attributeName="r" 
            values="15;16;15" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        {/* Moon */}
        <g transform={`translate(${moonPosition}, 25)`}>
          <circle cx="0" cy="0" r="10" fill="#D0D0D0" />
          <circle cx="-3" cy="-3" r="2" fill="#A0A0A0" />
          <circle cx="4" cy="2" r="3" fill="#A0A0A0" />
          <circle cx="-2" cy="5" r="2.5" fill="#A0A0A0" />
        </g>
      </svg>
      
      {/* Fallback icons in case SVG doesn't work */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0">
        {theme === 'light' ? (
          <Moon className="h-5 w-5 transition-all" />
        ) : (
          <Sun className="h-5 w-5 transition-all" />
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
