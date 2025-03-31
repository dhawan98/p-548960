
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

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative">
        <CustomCursor />
        <InteractiveBackground />
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
