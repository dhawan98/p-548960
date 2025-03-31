
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
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
    <section id="projects" className="bg-secondary/30 dark:bg-secondary/10">
      <div className="section-container">
        <h2 className="heading text-center mb-12 animate-fade-in">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden card-hover animate-fade-in" style={{ animationDelay: `${0.2 * index}s` }}>
              <div className="aspect-video overflow-hidden bg-muted">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-primary/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="gap-1">
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild className="gap-1">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
