import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Use location.key to trigger scroll on every navigation
    const { hash } = location;

    setTimeout(() => {
      if (hash) {
        const element = document.querySelector<HTMLElement>(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100); // Small delay to ensure DOM is ready
  }, [location.key]);

  return null;
};

export default ScrollToTop;