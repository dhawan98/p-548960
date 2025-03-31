
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import SoundToggle from "@/components/SoundToggle";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading for smoother entry animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col relative theme-transition">
          {!loaded ? (
            <PageTransition />
          ) : (
            <>
              <CustomCursor />
              <InteractiveBackground />
              <Navbar />
              <SoundToggle />
              <main className="flex-grow overflow-hidden">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </>
          )}
        </div>
      </ThemeProvider>
    </LazyMotion>
  );
};

export default Index;
