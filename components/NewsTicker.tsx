import React from 'react';
import { motion, Variants } from 'framer-motion';

const TickerText: React.FC = () => {
    const announcements = [
        "Fall 2024 admissions are now open for USA, South Korea, and Italy!",
        "Book a free virtual counselling session with our experts this week.",
        "New scholarships announced for STEM programs in South Korea.",
        "IGFS wishes all students the best for their upcoming exams!",
        "Check out our latest blog post on writing the perfect Statement of Purpose."
    ];
    
    // We duplicate the content to create a seamless loop effect
    const duplicatedAnnouncements = [...announcements, ...announcements];

    return (
        <div className="flex">
             {duplicatedAnnouncements.map((text, i) => (
                <span key={i} className="text-sm font-medium px-8 whitespace-nowrap">
                    {text}
                </span>
            ))}
        </div>
    );
};

const NewsTicker: React.FC = () => {
    const tickerVariants: Variants = {
        animate: {
            x: ['0%', '-50%'],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 20, // Adjust this value to change scroll speed
                    ease: 'linear',
                },
            },
        },
    };

    return (
        <div className="sticky top-20 bg-brand-secondary text-brand-primary overflow-hidden z-40">
            <div className="py-2.5">
                <motion.div
                    className="flex"
                    variants={tickerVariants}
                    animate="animate"
                >
                   <TickerText />
                </motion.div>
            </div>
        </div>
    );
};

export default NewsTicker;