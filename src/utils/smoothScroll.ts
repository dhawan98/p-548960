
// This utility helps create smooth scrolling effects
const smoothScroll = (target: string, duration: number = 1000): void => {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const scrollProgress = Math.min(elapsedTime / duration, 1);
    
    const easingFunction = easeInOutCubic(scrollProgress);
    
    window.scrollTo(0, startPosition + distance * easingFunction);
    
    if (elapsedTime < duration) {
      requestAnimationFrame(animation);
    }
  };
  
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  
  requestAnimationFrame(animation);
};

export default smoothScroll;
