
import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    
    // Particle properties
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(window.innerWidth / 5, 200); // More particles
    
    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.x;
      mouseY = e.y;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Create particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      originalX: number;
      originalY: number;
      color: string;
      hue: number;
      saturation: number;
      lightness: number;
      alpha: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.size = Math.random() * 3 + 0.5; // Larger particles
        this.speedX = Math.random() * 0.8 - 0.4; // Faster movement
        this.speedY = Math.random() * 0.8 - 0.4;
        
        // Dynamic colors
        this.hue = Math.random() * 60 + (theme === "dark" ? 200 : 180);
        this.saturation = Math.random() * 30 + 70;
        this.lightness = Math.random() * 20 + (theme === "dark" ? 70 : 50);
        this.alpha = Math.random() * 0.5 + 0.5;
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
      }
      
      update() {
        // Natural movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200; // Increased interaction radius
        
        if (distance < maxDistance) {
          // Repel particles from cursor with stronger force
          const force = (maxDistance - distance) / maxDistance * 3;
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          this.x -= directionX * force * 3;
          this.y -= directionY * force * 3;
          
          // Particles glow when near cursor
          this.size = Math.random() * 5 + 2;
          this.alpha = 0.8;
        } else {
          // Return to original size and opacity
          this.size = Math.random() * 3 + 0.5;
          this.alpha = Math.random() * 0.5 + 0.5;
          
          // Return to original position slowly
          const dxOriginal = this.originalX - this.x;
          const dyOriginal = this.originalY - this.y;
          this.x += dxOriginal * 0.01;
          this.y += dyOriginal * 0.01;
        }
        
        // Boundary check with bounce effect
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX * 1.1; // Bounce with acceleration
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY * 1.1;
        }
        
        // Update color with subtle animation
        this.hue = (this.hue + 0.2) % 360;
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    
    // Initialize particles
    const init = () => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    init();
    
    // Connect particles with lines
    const connectParticles = () => {
      if (!ctx) return;
      const maxDistance = 150;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Create gradient lines based on particle colors
            const opacity = 1 - (distance / maxDistance);
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x, 
              particlesArray[a].y, 
              particlesArray[b].x, 
              particlesArray[b].y
            );
            
            gradient.addColorStop(0, `hsla(${particlesArray[a].hue}, ${particlesArray[a].saturation}%, ${particlesArray[a].lightness}%, ${opacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${particlesArray[b].hue}, ${particlesArray[b].saturation}%, ${particlesArray[b].lightness}%, ${opacity * 0.5})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Add occasional energy burst
    let lastBurst = 0;
    const createEnergyBurst = (timestamp: number) => {
      if (timestamp - lastBurst > 5000) { // Every 5 seconds
        if (Math.random() > 0.7) { // 30% chance
          const burstX = Math.random() * canvas.width;
          const burstY = Math.random() * canvas.height;
          
          for (let i = 0; i < particlesArray.length; i++) {
            const dx = particlesArray[i].x - burstX;
            const dy = particlesArray[i].y - burstY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 300;
            
            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance * 10;
              const angle = Math.atan2(dy, dx);
              particlesArray[i].speedX += Math.cos(angle) * force * 0.3;
              particlesArray[i].speedY += Math.sin(angle) * force * 0.3;
            }
          }
          
          lastBurst = timestamp;
        }
      }
    };
    
    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      createEnergyBurst(timestamp);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;
