import React from 'react';
import { motion, Variants } from 'framer-motion';

const SuccessStories: React.FC = () => {
    // Real stories - now UNCOMMENTED and active
    const stories = [
        {
            name: 'Jahir Mahmud Redoy',
            destination: 'Hanyang University, South Korea',
            program: 'Bachelor In Mechanical Engineering',
            quote: "My dream of studying at a top South Korea university felt overwhelming until I found IGS. Their counselors meticulously planned every step, from shortlisting universities that matched my profile to preparing me for the visa interview. I couldn't be more grateful for their unwavering support.",
            img: '/images/ss-story/ss1.jpeg'
        },
        {
            name: 'Noor Alam',
            destination: 'University of Milan, Italy',
            program: 'Master in Artificial Intilligence',
            quote: "As a high school student, I had no idea how to navigate the Italian university application system. The IGS team, with their deep knowledge of Italian education, was a lifesaver. They helped me highlight my strengths and secure a scholarship at my top-choice university,Italy . They truly care about their students' success.",
            img: '/images/ss-story/ss2.jpeg'
        },
        {
            name: 'Sarkar Alamin',
            destination: 'Bocconi University, Italy',
            program: 'Masters in Fashion Design',
            quote: "IGS understood the nuances of applying to a top design school in Italy. They didn't just help with paperwork; they provided critical feedback on my portfolio, which made all the difference. Their guidance on the complex Italian visa process was clear and precise. Grazie mille, IGS!",
            img: '/images/ss-story/ss3.jpeg'
        },
        {
            name: 'Mehedi Hasan Tipu',
            destination: 'Kyungsung University, South Korea',
            program: 'Bachelor In Mechanical Engineering (Automoblie)',
            quote: "Pursuing my dreams in South Korea with IGS’s guidance is the first step toward becoming a leader in automotive engineering. Grateful for the opportunity to learn and grow in a global environment.",
            img: '/images/ss-story/ss5.jpeg'
        },
        {
            name: 'Ashiqur Rahman ',
            destination: 'The City University of New York, USA',
            program: 'Bachelors in Computer Information System',
            quote: "IGS has opened doors to endless possibilities. With their support, I'm not only shaping my career in fashion but also immersing myself in the dynamic world of global fashion management.",
            img: '/images/ss-story/ss4.jpeg'
        },
        {
            name: 'Jannatul Islam Bristy',
            destination: 'Kansas State University, USA',
            program: 'Bachelors in Mechanical Engineering',
            quote: "IGS help me though out the all prosses and did everything for me. I would say their full guidance help me to get my dream university ",
            img: '/images/ss-story/ss6.jpeg'
        },
        // {
        //     name: 'Aisha Al-Jamil',
        //     destination: 'University of Toronto, Canada',
        //     program: 'B.Com in Finance',
        //     quote: "The entire IGFS team was professional, patient, and incredibly knowledgeable. They helped me find the perfect commerce program and guided me in securing a study permit for Canada. The pre-departure session was fantastic, providing practical tips that made my transition to a new country so much smoother.",
        //     img: 'https://picsum.photos/id/1013/150/150'
        // },

    ];

    return (
        <div className="bg-brand-light dark:bg-gray-900 overflow-x-hidden">
            {/* Video-only header section */}
            <header className="relative flex items-center justify-center w-full aspect-video overflow-hidden">
                <video 
                    src="/videos/success-stories-hero.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-contain z-0"
                />
            </header>

            <main className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title only — no "Coming Soon" message anymore */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                            Student Success Stories
                        </h2>
                    </div>

                    {/* Active Success Stories Section — UNCOMMENTED and LIVE */}
                    <div className="space-y-12">
                        {stories.map((story, index) => {
                            const slideInVariant: Variants = {
                                hidden: { opacity: 0, x: index % 2 !== 0 ? 50 : -50 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                            };

                            return (
                                <motion.div
                                    key={story.name}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={slideInVariant}
                                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden md:flex ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="md:w-1/3 flex-shrink-0">
                                        <motion.img
                                            initial={{ scale: 1.2, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            src={story.img} alt={story.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <p className="text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed">"{story.quote}"</p>
                                        <div className="mt-6">
                                            <p className="text-xl font-bold text-brand-primary dark:text-gray-100">{story.name}</p>
                                            <p className="text-brand-secondary font-semibold">{story.program}</p>
                                            <p className="text-gray-500 dark:text-gray-400">{story.destination}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SuccessStories;