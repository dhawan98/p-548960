
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PageTransition = () => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const loadingTexts = [
    "Initializing components...",
    "Loading particles...",
    "Configuring animations...",
    "Preparing interactive elements...",
    "Ready to launch..."
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 - prev) * 0.1;
        
        // Update text based on progress
        if (newProgress > 20 && textIndex === 0) setTextIndex(1);
        else if (newProgress > 50 && textIndex === 1) setTextIndex(2);
        else if (newProgress > 80 && textIndex === 2) setTextIndex(3);
        else if (newProgress > 95 && textIndex === 3) setTextIndex(4);
        
        return newProgress >= 99.5 ? 100 : newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [textIndex]);
  
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-4">
        <div className="relative mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-2"
          >
            <span className="animated-gradient-text">Vikram Bawa</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-center text-muted-foreground"
          >
            Frontend Developer
          </motion.div>
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          className="h-1 bg-primary rounded-full mb-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] animate-gradient-x"></div>
        </motion.div>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          {loadingTexts[textIndex]}
        </motion.div>
        
        <div className="mt-10 flex justify-center space-x-3">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: dot * 0.3 
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
