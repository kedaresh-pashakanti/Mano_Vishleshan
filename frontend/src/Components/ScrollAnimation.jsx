import React, { useEffect, useRef } from 'react';

const ScrollAnimation = ({ children, className = '', animationType = 'fade-in', delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (animationType) {
      case 'fade-in':
        return 'scroll-animate';
      case 'fade-in-left':
        return 'scroll-animate-left';
      case 'fade-in-right':
        return 'scroll-animate-right';
      case 'scale-in':
        return 'scroll-animate-scale';
      default:
        return 'scroll-animate';
    }
  };

  return (
    <div ref={elementRef} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation; 