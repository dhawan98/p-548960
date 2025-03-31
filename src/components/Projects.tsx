
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Projects = () => {
  const { theme } = useTheme();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce site built with React and Node.js. Features include product search, filtering, cart functionality, and user authentication.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      liveLink: "#",
      repoLink: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that provides current conditions and forecasts based on user location or search. Utilizes OpenWeather API.",
      image: "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      technologies: ["JavaScript", "HTML5", "CSS3", "REST API"],
      liveLink: "#",
      repoLink: "#"
    },
    {
      title: "Task Management App",
      description: "A task management application with features like task creation, categorization, due dates, and progress tracking. Includes drag-and-drop functionality.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "TypeScript", "Firebase", "Material-UI"],
      liveLink: "#",
      repoLink: "#"
    }
  ];

  return (
    <section id="projects" className="bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden">
      <div className="section-container">
        <h2 className="heading text-center mb-12 animate-fade-in">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`
                group overflow-hidden transform transition-all duration-500 
                ${hoveredProject === index ? 'scale-[1.03] shadow-xl' : 'shadow-md hover:shadow-lg'}
              `}
              style={{
                background: theme === 'dark' ? 
                  'linear-gradient(145deg, #1a1d2b, #252836)' : 
                  'linear-gradient(145deg, #ffffff, #f5f7fa)',
                borderRadius: '1rem',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                transform: hoveredProject === index ? 
                  'rotateY(5deg) rotateX(5deg)' : 
                  'rotateY(0) rotateX(0)',
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="aspect-video overflow-hidden bg-muted relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild 
                  className="gap-1 group/btn hover:bg-primary/10 transition-all duration-300"
                >
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 group-hover/btn:rotate-6 transition-transform" />
                    Code
                  </a>
                </Button>
                <Button 
                  size="sm" 
                  asChild 
                  className="gap-1 group/btn transition-all duration-300"
                >
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
              
              {/* Animated border gradient */}
              <div 
                className={`absolute inset-0 rounded-lg p-[2px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{
                  background: `linear-gradient(90deg, 
                    ${theme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(67, 56, 202, 0.3)'} 0%, 
                    ${theme === 'dark' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(219, 39, 119, 0.3)'} 50%, 
                    ${theme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(67, 56, 202, 0.3)'} 100%)`,
                  backgroundSize: '200% 100%',
                  animation: 'gradient-x 3s linear infinite',
                }}
              />
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="group hover:bg-primary/10 transition-colors duration-300"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
