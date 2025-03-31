
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Create audio element for ambient sound
    const audio = new Audio("/ambient-synth.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const toggleSound = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      // User is unmuting - start playing
      audioRef.current.play()
        .then(() => {
          setIsMuted(false);
          toast({
            title: "Ambient sound enabled",
            description: "Enjoy the immersive experience!",
            duration: 3000,
          });
        })
        .catch(error => {
          // Handle autoplay restrictions
          console.error("Autoplay prevented:", error);
          toast({
            title: "Couldn't enable sound",
            description: "Browser blocked autoplay. Try again after interacting with the page.",
            variant: "destructive",
            duration: 5000,
          });
        });
    } else {
      // User is muting - pause audio
      audioRef.current.pause();
      setIsMuted(true);
      toast({
        title: "Sound disabled",
        duration: 3000,
      });
    }
  };
  
  return (
    <div 
      className="fixed bottom-4 right-4 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {isHovered && (
          <div className="absolute right-0 bottom-full mb-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-md text-sm animate-fade-in whitespace-nowrap">
            {isMuted ? "Enable ambient sound" : "Disable sound"}
          </div>
        )}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSound}
          className="rounded-full bg-background/30 backdrop-blur-md border border-primary/20 hover:bg-primary/20 transition-all duration-300"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SoundToggle;
