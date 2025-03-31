
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
import { useEffect, useState, lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

// Performance optimization - lazy load components that aren't immediately visible
const LazyAbout = lazy(() => import("@/components/About"));
const LazySkills = lazy(() => import("@/components/Skills"));
const LazyProjects = lazy(() => import("@/components/Projects"));
const LazyContact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Shorter loading for better UX
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 800);
    
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
                <Suspense fallback={<div className="section-container flex items-center justify-center">Loading...</div>}>
                  <LazyAbout />
                </Suspense>
                <Suspense fallback={<div className="section-container flex items-center justify-center">Loading...</div>}>
                  <LazySkills />
                </Suspense>
                <Suspense fallback={<div className="section-container flex items-center justify-center">Loading...</div>}>
                  <LazyProjects />
                </Suspense>
                <Suspense fallback={<div className="section-container flex items-center justify-center">Loading...</div>}>
                  <LazyContact />
                </Suspense>
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
