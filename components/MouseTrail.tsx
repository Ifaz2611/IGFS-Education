// import React, { useEffect, useState, useRef } from "react";

// const MouseTrail: React.FC = () => {
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [follower, setFollower] = useState({ x: 0, y: 0 });
//   const target = useRef({ x: 0, y: 0 });
//   const animationRef = useRef<number | null>(null);

//   // Detect if device is desktop (non-touch)
//   useEffect(() => {
//     const checkDevice = () => {
//       const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
//       setIsDesktop(!hasTouchScreen);
//     };

//     checkDevice();
//     // Optional: re-check on resize (for hybrid devices)
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   // Only run animation logic if on desktop
//   useEffect(() => {
//     if (!isDesktop) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       target.current = { x: e.clientX, y: e.clientY };
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     const animate = () => {
//       setFollower((prev) => {
//         const dx = target.current.x - prev.x;
//         const dy = target.current.y - prev.y;

//         if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
//           return prev;
//         }

//         return {
//           x: prev.x + dx * 0.15,
//           y: prev.y + dy * 0.15,
//         };
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isDesktop]);

//   // Don't render anything on mobile
//   if (!isDesktop) return null;

//   return (
//     <div className="pointer-events-none fixed inset-0 z-50">
//       <div
//         className="absolute w-3 h-3 bg-black border border-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"
//         style={{
//           left: follower.x,
//           top: follower.y,
//           transition: 'none',
//         }}
//       />
//     </div>
//   );
// };

// export default MouseTrail;