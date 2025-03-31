
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent! I'll get back to you soon.");
      
      // Reset form after submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-background">
      <div className="section-container">
        <h2 className="heading text-center mb-12 animate-fade-in">Get In Touch</h2>
        
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-lg animate-fade-in hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-center text-2xl">Contact Me</CardTitle>
              <CardDescription className="text-center">
                Have a project in mind? Let's discuss it.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 animate-pulse" />
                  <p className="text-xl font-medium">Message Sent!</p>
                  <p className="text-muted-foreground">Thanks for reaching out. I'll respond soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </form>
              )}
            </CardContent>
            
            {!isSubmitted && (
              <CardFooter className="bg-primary/5 border-t border-primary/10">
                <Button 
                  onClick={handleSubmit} 
                  className="w-full group" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
