import React from 'react';
import { motion, Variants } from 'framer-motion';

const SuccessStories: React.FC = () => {
    // Placeholder data — all real stories are commented until approved
    /*
    const stories = [
        {
            name: 'Priya Sharma',
            destination: 'University of California, USA',
            program: 'MS in Computer Science',
            quote: "My dream of studying at a top US university felt overwhelming until I found IGFS. Their counselors meticulously planned every step, from shortlisting universities that matched my profile to preparing me for the visa interview. The editors transformed my SOP from a simple document into a compelling story. I couldn't be more grateful for their unwavering support.",
            img: 'https://picsum.photos/id/1027/150/150'
        },
        {
            name: 'Jin-Woo Park',
            destination: 'KAIST, South Korea',
            program: 'B.Eng in Electrical Engineering',
            quote: "As a high school student, I had no idea how to navigate the Korean university application system. The IGFS team, with their deep knowledge of Korean education, was a lifesaver. They helped me highlight my strengths and secure a scholarship at my top-choice university, KAIST. They truly care about their students' success.",
            img: 'https://picsum.photos/id/1005/150/150'
        },
        {
            name: 'Marco Rossi',
            destination: 'Politecnico di Milano, Italy',
            program: 'Masters in Fashion Design',
            quote: "IGFS understood the nuances of applying to a top design school in Italy. They didn't just help with paperwork; they provided critical feedback on my portfolio, which made all the difference. Their guidance on the complex Italian visa process was clear and precise. Grazie mille, IGFS!",
            img: 'https://picsum.photos/id/1011/150/150'
        },
        {
            name: 'Aisha Al-Jamil',
            destination: 'University of Toronto, Canada',
            program: 'B.Com in Finance',
            quote: "The entire IGFS team was professional, patient, and incredibly knowledgeable. They helped me find the perfect commerce program and guided me in securing a study permit for Canada. The pre-departure session was fantastic, providing practical tips that made my transition to a new country so much smoother.",
            img: 'https://picsum.photos/id/1013/150/150'
        },
        {
            name: 'Ken Obinna',
            destination: 'University of Melbourne, Australia',
            program: 'PhD in Public Health',
            quote: "Applying for a PhD program is a unique challenge. IGFS connected me with a mentor who helped me refine my research proposal and contact potential supervisors. This specialized guidance was invaluable and directly led to my admission with a full scholarship. I highly recommend them for postgraduate applicants.",
            img: 'https://picsum.photos/id/1014/150/150'
        },
        {
            name: 'Liam Chen',
            destination: 'National University of Singapore, Singapore',
            program: 'MBA',
            quote: "IGFS gave me clarity in my MBA application journey. From GMAT prep guidance to essay editing and interview coaching, they were with me every step of the way. I'm now proud to be part of NUS's prestigious business school.",
            img: 'https://picsum.photos/id/1028/150/150'
        },
    ];
    */

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
                    {/* Coming Soon Message */}
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                            Student Success Stories
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Real journeys. Real achievements. Coming soon.
                        </p>
                        <div className="mt-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center"
                            >
                                <h3 className="text-2xl font-semibold text-brand-primary dark:text-blue-400">
                                    Stay Tuned!
                                </h3>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    Our students are achieving amazing things around the world. 
                                    Their inspiring stories will be shared here very soon.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Uncomment below when stories are ready */}
                    {/* 
                    <div className="space-y-12 mt-20">
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
                    */}
                </div>
            </main>
        </div>
    );
};

export default SuccessStories;