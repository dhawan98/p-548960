
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    
    // Particle properties
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(window.innerWidth / 4, 350); // More particles for density
    
    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.x;
      mouseY = e.y;
      setMousePosition({ x: e.x, y: e.y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Track scrolling
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Create particles with more complex properties
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
      density: number;
      maxSpeed: number;
      angle: number;
      spin: number;
      shape: 'circle' | 'square' | 'triangle' | 'star';
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.size = Math.random() * 4 + 0.5; // Larger particles for more visibility
        this.speedX = Math.random() * 1 - 0.5; // Faster movement
        this.speedY = Math.random() * 1 - 0.5;
        this.maxSpeed = 3; // Maximum speed when repelled
        
        // Dynamic colors based on theme
        this.hue = Math.random() * 60 + (theme === "dark" ? 230 : 190);
        this.saturation = Math.random() * 70 + 30;
        this.lightness = Math.random() * 30 + (theme === "dark" ? 60 : 40);
        this.alpha = Math.random() * 0.5 + 0.3;
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
        
        // Additional properties for more dynamic behavior
        this.density = Math.random() * 30 + 10;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.1 - 0.05;
        
        // Different shapes for variety
        const shapes = ['circle', 'square', 'triangle', 'star'] as const;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
      }
      
      update() {
        // Natural movement with some drift
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rotate angle
        this.angle += this.spin;
        
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250; // Increased interaction radius
        
        if (distance < maxDistance) {
          // Repel particles from cursor with stronger force
          const force = (maxDistance - distance) / maxDistance;
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          
          // Calculate repel force based on density
          const repelX = directionX * force * this.density * -1;
          const repelY = directionY * force * this.density * -1;
          
          // Apply force with speed limit
          this.speedX = Math.max(Math.min(this.speedX + repelX * 0.05, this.maxSpeed), -this.maxSpeed);
          this.speedY = Math.max(Math.min(this.speedY + repelY * 0.05, this.maxSpeed), -this.maxSpeed);
          
          // Particles glow and grow when near cursor
          this.size = Math.random() * 6 + 2;
          this.alpha = 0.8;
          
          // Change color when interacted with
          this.hue = (this.hue + 1) % 360;
          this.saturation = Math.min(this.saturation + 0.5, 100);
          this.lightness = Math.min(this.lightness + 0.5, 70);
        } else {
          // Return to original size and opacity
          this.size = Math.random() * 3 + 0.5;
          this.alpha = Math.random() * 0.5 + 0.3;
          
          // Apply gentle drag force
          this.speedX *= 0.98;
          this.speedY *= 0.98;
          
          // Return to original position slowly
          const dxOriginal = this.originalX - this.x;
          const dyOriginal = this.originalY - this.y;
          this.x += dxOriginal * 0.01;
          this.y += dyOriginal * 0.01;
          
          // Reset color gradually
          this.saturation = Math.max(this.saturation - 0.2, 30);
          this.lightness = Math.max(this.lightness - 0.2, theme === "dark" ? 60 : 40);
        }
        
        // Boundary check with soft bounce effect
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX * 0.8; // Bounce with some energy loss
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY * 0.8;
        }
        
        // Update color with subtle animation
        this.hue = (this.hue + 0.2) % 360;
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Different drawing based on shape
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        
        switch(this.shape) {
          case 'square':
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            break;
          
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size, this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.closePath();
            ctx.fill();
            break;
          
          case 'star':
            let spikes = 5;
            let outerRadius = this.size;
            let innerRadius = this.size / 2;
            
            ctx.beginPath();
            for(let i = 0; i < spikes * 2; i++) {
              let radius = i % 2 === 0 ? outerRadius : innerRadius;
              let x = Math.cos(i * Math.PI / spikes) * radius;
              let y = Math.sin(i * Math.PI / spikes) * radius;
              if(i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'circle':
          default:
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        
        ctx.shadowBlur = 0;
        ctx.restore();
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
    
    // Create energy bursts
    let lastBurst = 0;
    const createEnergyBurst = (timestamp: number) => {
      // More frequent bursts for visual interest
      if (timestamp - lastBurst > 3000) { // Every 3 seconds
        if (Math.random() > 0.5) { // 50% chance
          const burstX = Math.random() * canvas.width;
          const burstY = Math.random() * canvas.height;
          
          for (let i = 0; i < particlesArray.length; i++) {
            const dx = particlesArray[i].x - burstX;
            const dy = particlesArray[i].y - burstY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 400;
            
            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance * 15;
              const angle = Math.atan2(dy, dx);
              particlesArray[i].speedX += Math.cos(angle) * force * 0.3;
              particlesArray[i].speedY += Math.sin(angle) * force * 0.3;
              
              // Change color of affected particles
              particlesArray[i].hue = (particlesArray[i].hue + 30) % 360;
              particlesArray[i].saturation = Math.min(particlesArray[i].saturation + 20, 100);
              particlesArray[i].lightness = Math.min(particlesArray[i].lightness + 10, 70);
            }
          }
          
          lastBurst = timestamp;
          
          // Create ripple effect
          createRippleEffect(burstX, burstY);
        }
      }
    };
    
    // Ripple effect
    const ripples: Array<{x: number, y: number, size: number, maxSize: number, opacity: number, color: string}> = [];
    
    const createRippleEffect = (x: number, y: number) => {
      // Create multiple ripples with different sizes and speeds
      const numRipples = Math.floor(Math.random() * 3) + 1;
      const baseHue = Math.random() * 360;
      
      for (let i = 0; i < numRipples; i++) {
        ripples.push({
          x,
          y,
          size: 0,
          maxSize: 200 + Math.random() * 300,
          opacity: 0.7,
          color: `hsla(${baseHue + i * 30}, 70%, 60%, 0.3)`
        });
      }
    };
    
    const updateRipples = () => {
      for (let i = 0; i < ripples.length; i++) {
        ripples[i].size += 5;
        ripples[i].opacity -= 0.01;
        
        if (ripples[i].size > ripples[i].maxSize || ripples[i].opacity <= 0) {
          ripples.splice(i, 1);
          i--;
        }
      }
    };
    
    const drawRipples = () => {
      if (!ctx) return;
      
      for (const ripple of ripples) {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color.replace(/[\d.]+\)$/, `${ripple.opacity})`);
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };
    
    // Create scroll-based waves
    const createScrollWaves = () => {
      if (!ctx || !canvas) return;
      
      const waveHeight = 30;
      const waveCount = 3;
      const waveWidth = canvas.width;
      
      for (let i = 0; i < waveCount; i++) {
        const offsetY = scrollPosition * (0.1 + i * 0.1);
        const amplitude = waveHeight * (1 - i * 0.2);
        const frequency = 0.005 + i * 0.002;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + Math.sin(0) * amplitude + offsetY);
        
        for (let x = 0; x < waveWidth; x++) {
          const y = canvas.height / 2 + Math.sin(x * frequency) * amplitude + offsetY;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = `hsla(${210 + i * 30}, 70%, 60%, 0.2)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };
    
    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create energy bursts
      createEnergyBurst(timestamp);
      
      // Update and draw particles
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles
      connectParticles();
      
      // Update and draw ripples
      updateRipples();
      drawRipples();
      
      // Draw scroll waves
      createScrollWaves();
      
      requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme, scrollPosition]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;
