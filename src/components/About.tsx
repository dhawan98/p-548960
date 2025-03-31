
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { Code, Briefcase, GraduationCap, Coffee, Heart } from "lucide-react";

const About = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  
  // Only render animations on client-side
  if (!mounted) {
    return <div className="h-screen" />;
  }

  return (
    <section id="about" className="relative bg-gradient-to-b from-secondary/20 to-background/5 dark:from-secondary/10 dark:to-background/0 overflow-hidden backdrop-blur-sm py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl transform rotate-45" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Left column - image and quick info */}
            <motion.div 
              className="w-full lg:w-2/5" 
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <Card className="relative backdrop-blur-sm bg-background/80 dark:bg-background/40 border-2 border-primary/10 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="relative w-48 h-48 mb-6 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 to-primary/20 animate-pulse-slow rounded-full"></div>
                        <Avatar className="w-48 h-48 border-4 border-background shadow-xl">
                          <AvatarImage 
                            src="https://media.licdn.com/dms/image/D4D03AQFYh7zRqQfbJA/profile-displayphoto-shrink_800_800/0/1684650609387?e=1718409600&v=beta&t=5Fxa9SYQ1Qp0wy5GWZxBpSlqvrgxrpJfHuoJNwTdVqA" 
                            alt="Vikram Bawa"
                            className="object-cover" 
                          />
                          <AvatarFallback className="text-3xl font-bold">VB</AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-1">Vikram Bawa</h3>
                      <p className="text-primary/80 dark:text-primary/70 font-medium mb-3">Frontend Developer & UI/UX Expert</p>
                      
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">React</Badge>
                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">TypeScript</Badge>
                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">UI/UX</Badge>
                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">Frontend</Badge>
                      </div>
                      
                      <p className="text-sm text-center text-muted-foreground">
                        <Coffee className="inline-block mr-1 h-4 w-4" /> 
                        Building beautiful web experiences with <Heart className="inline-block mx-1 h-4 w-4 text-red-500" /> and code
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            
            {/* Right column - tabs with detailed info */}
            <motion.div 
              className="w-full lg:w-3/5" 
              variants={itemVariants}
            >
              <div className="mb-6">
                <AnimatedText 
                  text="About Me" 
                  className="heading mb-4 text-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400 font-black uppercase tracking-wider" 
                  once={true}
                />
                
                <p className="text-lg text-foreground/80 mb-6">
                  I'm a passionate frontend developer with an eye for design and a mind for code. I create immersive digital experiences that blend creativity with technical precision.
                </p>
              </div>
              
              <Tabs defaultValue="bio" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-8">
                  <TabsTrigger value="bio" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                    <Code className="mr-2 h-4 w-4" /> Bio
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                    <Briefcase className="mr-2 h-4 w-4" /> Experience
                  </TabsTrigger>
                  <TabsTrigger value="education" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                    <GraduationCap className="mr-2 h-4 w-4" /> Education
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="bio" className="p-6 bg-background/40 dark:bg-background/20 backdrop-blur-md rounded-lg border border-primary/10">
                  <p className="mb-4">
                    As a frontend developer, I specialize in creating intuitive, responsive user interfaces that deliver exceptional user experiences. My journey in web development started with HTML, CSS, and JavaScript, and has evolved to embrace modern frameworks and tools.
                  </p>
                  
                  <p className="mb-4">
                    I believe in writing clean, efficient code that brings designs to life with pixel-perfect precision. With a background in computer science and a passion for design, I bridge the gap between aesthetics and functionality.
                  </p>
                  
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community forums. I'm always eager to learn and grow as a developer.
                  </p>
                </TabsContent>
                
                <TabsContent value="experience" className="p-6 bg-background/40 dark:bg-background/20 backdrop-blur-md rounded-lg border border-primary/10">
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <h4 className="font-bold text-lg">Senior Frontend Developer</h4>
                      <p className="text-primary/70 mb-2">TechCorp Inc. • 2021 - Present</p>
                      <p className="text-sm text-muted-foreground">
                        Led frontend development for enterprise applications, implemented responsive designs, and optimized performance for complex web applications.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <h4 className="font-bold text-lg">UI Developer</h4>
                      <p className="text-primary/70 mb-2">DigitalSolutions • 2018 - 2021</p>
                      <p className="text-sm text-muted-foreground">
                        Developed and maintained client-facing web applications with React, collaborated with design teams to implement pixel-perfect interfaces.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <h4 className="font-bold text-lg">Frontend Intern</h4>
                      <p className="text-primary/70 mb-2">WebStart • 2017 - 2018</p>
                      <p className="text-sm text-muted-foreground">
                        Assisted in developing responsive websites, learned modern JavaScript frameworks, and collaborated with senior developers.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="education" className="p-6 bg-background/40 dark:bg-background/20 backdrop-blur-md rounded-lg border border-primary/10">
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <h4 className="font-bold text-lg">Master of Computer Science</h4>
                      <p className="text-primary/70 mb-2">Tech University • 2015 - 2017</p>
                      <p className="text-sm text-muted-foreground">
                        Specialized in Human-Computer Interaction and Web Technologies.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <h4 className="font-bold text-lg">Bachelor of Computer Science</h4>
                      <p className="text-primary/70 mb-2">State University • 2011 - 2015</p>
                      <p className="text-sm text-muted-foreground">
                        Graduated with honors, focused on software development and web technologies.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <h4 className="font-bold text-lg">Professional Certifications</h4>
                      <p className="text-primary/70 mb-2">Various • 2015 - Present</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        <li>Advanced React Development</li>
                        <li>UI/UX Design Fundamentals</li>
                        <li>Frontend Performance Optimization</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
