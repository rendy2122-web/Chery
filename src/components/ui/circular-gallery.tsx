import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial?: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by?: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation (degrees per frame). */
  autoRotateSpeed?: number;
  /** Sensitivity of scroll movement. */
  scrollSensitivity?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius, autoRotateSpeed = 0.15, scrollSensitivity = 0.15, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 420, height: 280 });
    const [currentRadius, setCurrentRadius] = useState(550);
    const animationFrameRef = useRef<number | null>(null);
    const lastScrollYRef = useRef(0);

    // Handle responsive dimensions and radius
    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        setDimensions({
          width: isMobile ? 280 : 420,
          height: isMobile ? 180 : 280
        });
        setCurrentRadius(radius || (isMobile ? 320 : 550));
      };
      
      handleResize();
      lastScrollYRef.current = window.scrollY;
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [radius]);

    // Handle scroll-delta rotation
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollYRef.current;
        lastScrollYRef.current = currentScrollY;
        
        // Add scroll delta to the rotation
        setRotation(prev => prev + delta * scrollSensitivity);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollSensitivity]);

    // Handle constant auto-rotation
    useEffect(() => {
      const autoRotate = () => {
        setRotation(prev => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    const anglePerItem = 360 / items.length;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            
            // Fade out completely when rotated past 85 degrees (facing away)
            const opacity = Math.max(0, 1 - (normalizedAngle / 85));

            // Don't render cards that are completely invisible
            if (opacity <= 0) return null;

            return (
              <div
                key={item.photo.url} 
                role="group"
                aria-label={item.common}
                className="absolute"
                style={{
                  width: `${dimensions.width}px`,
                  height: `${dimensions.height}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${currentRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${dimensions.width / 2}px`,
                  marginTop: `-${dimensions.height / 2}px`,
                  opacity: opacity,
                  transition: 'opacity 0.2s ease-out',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden group border border-white/10 bg-card/70 dark:bg-card/30 backdrop-blur-md">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
