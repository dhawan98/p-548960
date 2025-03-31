
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

const Skills = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const skills = {
    frontend: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", 
      "React.js", "Next.js", "Tailwind CSS", "Styled Components"
    ],
    tools: [
      "Git", "Webpack", "Vite", "npm/yarn", "Jest", 
      "React Testing Library", "Storybook", "Figma"
    ],
    other: [
      "Responsive Design", "Performance Optimization", "Web Accessibility", 
      "SEO Basics", "API Integration", "State Management"
    ]
  };

  return (
    <section id="skills" className="bg-background relative min-h-[70vh] flex items-center">
      <div className="section-container">
        <h2 className="heading text-center mb-12 animate-fade-in">My Skills</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              className={`
                px-4 py-2 rounded-full transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-secondary hover:bg-secondary/80 text-foreground/80'}
              `}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <div 
              key={category}
              className={`transition-all duration-500 ${
                activeCategory === category 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-40 scale-95'
              }`}
            >
              <Card 
                className={`
                  h-full p-6 transform transition-all duration-300
                  hover:shadow-lg border-2 
                  ${activeCategory === category ? 'border-primary/30' : 'border-transparent'}
                `}
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(145deg, #1e2235, #272d46)' 
                    : 'linear-gradient(145deg, #ffffff, #f5f7fa)',
                  borderRadius: '1rem',
                  transform: activeCategory === category 
                    ? `perspective(1000px) rotateY(${
                        (mousePosition.x / window.innerWidth - 0.5) * 5
                      }deg) rotateX(${
                        (mousePosition.y / window.innerHeight - 0.5) * -5
                      }deg)` 
                    : 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                <h3 className={`
                  subheading mb-6 text-center
                  ${activeCategory === category ? 'text-primary' : 'text-foreground/80'}
                `}>
                  {category === 'frontend' 
                    ? 'Frontend Development' 
                    : category === 'tools' 
                      ? 'Tools & Technologies' 
                      : 'Other Skills'}
                </h3>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillList.map((skill, index) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className={`
                        px-3 py-1.5 text-sm font-medium cursor-default
                        hover:bg-primary/20 transition-all duration-300 transform
                        ${activeCategory === category ? 'hover:scale-110' : ''}
                      `}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        opacity: activeCategory === category ? 1 : 0.7,
                        transform: `translateY(${
                          activeCategory === category ? 0 : 10
                        }px)`,
                        transition: `transform 0.5s ease, opacity 0.5s ease`,
                        transitionDelay: `${index * 0.05}s`,
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
