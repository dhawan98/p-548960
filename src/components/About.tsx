
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="bg-secondary/50 dark:bg-secondary/20">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading text-center mb-8 animate-fade-in">About Me</h2>
          
          <Card className="border-none shadow-lg animate-fade-in">
            <CardContent className="pt-6">
              <p className="text-lg mb-4">
                I'm a passionate frontend developer with a keen eye for design and a strong focus on creating intuitive, 
                responsive user interfaces. My journey in web development started with HTML, CSS, and JavaScript, and has 
                evolved to embrace modern frameworks and tools.
              </p>
              
              <p className="text-lg mb-4">
                I believe in writing clean, efficient code that delivers exceptional user experiences. With a background in computer science,
                I approach problems analytically and enjoy finding creative solutions to complex challenges.
              </p>
              
              <p className="text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through blog posts and community forums. I'm always eager to learn and grow
                as a developer.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
