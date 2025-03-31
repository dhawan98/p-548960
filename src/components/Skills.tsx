import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skills = {
    frontend: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", 
      "React.js", "Next.js", "Tailwind CSS", "Styled Components"
    ],
    tools: [
      "Git", "Webpack", "Vite", "npm/yarn", "Jest", 
      "React Testing Library", "Storybook", "Figma"
    ],
    other: [
      "Responsive Design", "Performance Optimization", "Web Accessibility", 
      "SEO Basics", "API Integration", "State Management"
    ]
  };

  return (
    <section id="skills" className="bg-background">
      <div className="section-container">
        <h2 className="heading text-center mb-12 animate-fade-in">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <div className="animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
            <div className="bg-card rounded-lg shadow-md p-6 h-full">
              <h3 className="subheading mb-4 text-primary">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tools & Technologies */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card rounded-lg shadow-md p-6 h-full">
              <h3 className="subheading mb-4 text-primary">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Other Skills */}
          <div className="animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
            <div className="bg-card rounded-lg shadow-md p-6 h-full">
              <h3 className="subheading mb-4 text-primary">Other Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.other.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
