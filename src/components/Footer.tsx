
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-card text-card-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="subheading mb-6">Get In Touch</h2>
            <p className="text-foreground/70 mb-6 max-w-md">
              I'm currently open to new opportunities and collaborations. 
              Whether you have a question or just want to say hi, I'll try 
              my best to get back to you!
            </p>
            <a 
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              your.email@example.com
            </a>
          </div>
          
          <div className="md:text-right">
            <h2 className="subheading mb-6">Connect With Me</h2>
            <div className="flex gap-4 md:justify-end mb-8">
              <a
                href="https://www.linkedin.com/in/bawa-vikram/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors p-2"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors p-2"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-foreground/70 hover:text-primary transition-colors p-2"
                aria-label="Email Me"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            © {currentYear} Vikram Bawa. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60">
            Designed & Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
