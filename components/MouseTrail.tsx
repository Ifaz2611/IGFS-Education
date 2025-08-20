import React, { useEffect, useState, useRef } from "react";

const MouseTrail: React.FC = () => {
  // Current position of the follower dot
  const [follower, setFollower] = useState({ x: 0, y: 0 });

  // Store the target (mouse) position
  const target = useRef({ x: 0, y: 0 });

  // Store animation frame ID to clean up
  const animationRef = useRef<number | null>(null);

  // Update target position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      setFollower((prev) => {
        const dx = target.current.x - prev.x;
        const dy = target.current.y - prev.y;

        // Stop if the dot is very close to the target
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return prev;
        }

        // Move 15% of the distance (smooth easing)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });

      // Continue the animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup: cancel animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        className="absolute w-3 h-3 bg-black border border-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"    // can change clolor of the dot here 
        style={{
          left: follower.x,
          top: follower.y,
          // Disable CSS transitions to avoid conflict with JS animation
          transition: 'none',
        }}
      />
    </div>
  );
};

export default MouseTrail;