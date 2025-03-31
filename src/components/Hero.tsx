
import { Github, Linkedin, Mail, ArrowDown, Mouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/AnimatedText";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scroll, setScroll] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-background -z-10" />
      
      <div 
        className="section-container"
        style={{
          transform: `translateY(${scroll * 0.3}px)`,
          opacity: 1 - scroll / 700
        }}
      >
        <div className="max-w-3xl">
          <p className="text-primary font-medium mb-3">
            <AnimatedText text="Hello, I'm" className="inline-block" />
          </p>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <AnimatedText 
              text="Vikram Bawa" 
              className="inline-block" 
              once={true}
            />
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/80 mb-6">
            <AnimatedText 
              text="Frontend Developer" 
              className="inline-block"
              once={true}
            />
          </h2>
          
          <p className="text-lg text-foreground/70 max-w-2xl mb-8">
            <AnimatedText 
              text="I build exceptional and accessible digital experiences for the web. Focused on creating responsive, user-friendly interfaces with modern frameworks."
              once={true}
            />
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              onClick={scrollToProjects} 
              className="gap-2 group hover:scale-105 transition-transform duration-300"
            >
              View My Work
              <ArrowDown className="h-4 w-4 group-hover:animate-bounce" />
            </Button>
            <a href="/Vikram_Bawa_Resume.pdf" download>
              <Button 
                variant="outline" 
                className="hover:bg-primary/10 hover:scale-105 transition-all duration-300"
              >
                Download Resume
              </Button>
            </a>
          </div>
          
          <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <a
              href="https://www.linkedin.com/in/bawa-vikram/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors transform hover:scale-110 transition-transform duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors transform hover:scale-110 transition-transform duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-foreground/70 hover:text-primary transition-colors transform hover:scale-110 transition-transform duration-300"
              aria-label="Email Me"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-foreground/50">
          <Mouse className="h-6 w-6 mb-2" />
          <span className="text-sm">Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
