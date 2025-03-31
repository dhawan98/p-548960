
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-background -z-10" />
      
      <div className="section-container">
        <div className="max-w-3xl">
          <p className="text-primary font-medium mb-3 animate-fade-in">Hello, I'm</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Vikram Bawa
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/80 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Frontend Developer
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            I build exceptional and accessible digital experiences for the web.
            Focused on creating responsive, user-friendly interfaces with modern frameworks.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button onClick={scrollToProjects} className="gap-2">
              View My Work
              <ArrowDown className="h-4 w-4" />
            </Button>
            <a href="/Vikram_Bawa_Resume.pdf" download>
              <Button variant="outline">Download Resume</Button>
            </a>
          </div>
          
          <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <a
              href="https://www.linkedin.com/in/bawa-vikram/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="Email Me"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
