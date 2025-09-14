import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

interface NewsTickerProps {
    speed?: number; // pixels per second
    pauseOnHover?: boolean;
}

const TickerText: React.FC = () => {
    const announcements = [
        "Fall 2025 admissions are now open for USA, South Korea, and Italy!",
        "Book a free virtual counselling session with our experts this week.",
        "New scholarships announced for STEM programs in South Korea.",
        "IGS wishes all students the best for their upcoming exams!",
        "Check out our latest blog post on writing the perfect Statement of Purpose."
    ];

    return (
        <>
            {announcements.map((text, i) => (
                <span
                    key={i}
                    className="text-sm font-medium px-8 whitespace-nowrap inline-block"
                >
                    {text}
                </span>
            ))}
        </>
    );
};

const NewsTicker: React.FC<NewsTickerProps> = ({ 
    speed = 50, // pixels per second (adjustable)
    pauseOnHover = true 
}) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Measure container width (width of one set of announcements)
    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.scrollWidth / 2); // One full set
        }
    }, []);

    // Sync animation using useAnimationFrame
    useAnimationFrame(() => {
        if (!isHovered && containerWidth > 0) {
            // Move left (negative x)
            x.set(x.get() - (speed / 60)); // 60 FPS assumption

            // Reset position when half content scrolled
            if (x.get() <= -containerWidth) {
                x.set(0); // Loop seamlessly
            }
        }
    });

    return (
        <div
            className="sticky top-20 overflow-hidden z-40" // Removed bg/text classes — now custom
            aria-label="Latest announcements"
            role="region"
            onMouseEnter={() => pauseOnHover && setIsHovered(true)}
            onMouseLeave={() => pauseOnHover && setIsHovered(false)}
            style={{
                backgroundColor: '#1a1a2e', // Deep navy — modern, professional
                color: '#00f5ff',           // Bright cyan — eye-catching, futuristic
            }}
        >
            <div
                className="py-2.5"
                ref={containerRef}
                style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
            >
                <motion.div
                    style={{ x }}
                    className="flex"
                    aria-hidden="true"
                >
                    <TickerText /> {/* First copy */}
                    <TickerText /> {/* Second copy for seamless loop */}
                </motion.div>
            </div>
        </div>
    );
};

export default NewsTicker;