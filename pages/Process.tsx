import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';

const Process: React.FC = () => {
    const steps = [
        {
            step: 1,
            title: "Discovery & Counseling",
            description: "This is where our journey together begins. We conduct an in-depth counseling session to understand your academic background, career ambitions, financial situation, and personal preferences. This holistic view allows us to tailor a unique roadmap for your success.",
            details: [
                "Comprehensive profile analysis.",
                "Psychometric tests to identify your strengths.",
                "Brainstorming career and course options.",
                "Setting realistic goals and expectations."
            ],
            icon: "🔍"
        },
        {
            step: 2,
            title: "University & Course Shortlisting",
            description: "Using the insights from our discovery session, we leverage our extensive database and expertise to identify a curated list of universities and courses that are the best fit for you. We balance your dream schools with practical options to maximize your chances of admission.",
            details: [
                "Matching your profile with university requirements.",
                "Researching program curricula and faculty.",
                "Considering location, campus culture, and cost.",
                "Finalizing a balanced list of 5-8 universities."
            ],
            icon: "🎓"
        },
        {
            step: 3,
            title: "Application & Admission",
            description: "This is the execution phase where we ensure your application is flawless. Our team guides you through every document, from writing a compelling Statement of Purpose (SOP) to assembling transcripts and Letters of Recommendation (LORs). We manage timelines to ensure you never miss a deadline.",
            details: [
                "SOP/Essay brainstorming and editing.",
                "LOR guidance and review.",
                "Meticulous application form filling.",
                "Tracking application status and following up."
            ],
            icon: "📝"
        },
        {
            step: 4,
            title: "Visa, Finance & Pre-Departure",
            description: "Securing admission is just half the battle. We provide end-to-end support for the student visa process, including documentation, financial planning, and mock interviews. Our pre-departure briefings prepare you for the cultural and academic transition, ensuring you arrive confident and ready.",
            details: [
                "Complete visa documentation checklist.",
                "Guidance on financial proof and education loans.",
                "Intensive mock visa interview sessions.",
                "Briefings on accommodation, travel, and cultural norms."
            ],
            icon: "✈️"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-900 overflow-x-hidden">
            <header className="relative flex items-center justify-center h-screen text-center text-white overflow-hidden">
                <video 
                    src="https://cdn.pixabay.com/video/2024/04/23/209673-937223363_large.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/70 z-10"></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5 }}
                         className="text-4xl md:text-5xl font-extrabold">Our Proven Path to Success</motion.h1>
                    <motion.p
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5, delay: 0.2 }}
                         className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">We've refined our process over a decade to make your study abroad journey seamless, transparent, and successful.</motion.p>
                </div>
            </header>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-brand-light dark:bg-gray-700 hidden md:block" aria-hidden="true"></div>
                        {steps.map((item, index) => {
                             const side = index % 2 === 0 ? 1 : -1;
                             const contentVariant: Variants = {
                                 hidden: { opacity: 0, x: -50 * side },
                                 visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                             };
                             const iconVariant: Variants = {
                                hidden: { scale: 0 },
                                visible: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.2 } }
                            };

                            return (
                            <motion.div
                                key={item.step}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                className={`mb-12 flex md:items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="hidden md:block w-1/2"></div>
                                <div className="hidden md:block relative">
                                    <motion.div
                                        variants={iconVariant}
                                        className="h-16 w-16 rounded-full bg-brand-secondary text-brand-primary text-3xl flex items-center justify-center font-bold z-10 relative">
                                        {item.step}
                                    </motion.div>
                                </div>
                                <motion.div variants={contentVariant} className="w-full md:w-1/2 bg-brand-light dark:bg-gray-800 p-8 rounded-lg shadow-md md:shadow-lg">
                                    <div className="flex items-center md:hidden mb-4">
                                        <div className="h-12 w-12 rounded-full bg-brand-secondary text-brand-primary text-2xl flex items-center justify-center font-bold mr-4">{item.step}</div>
                                        <h2 className="text-2xl font-bold text-brand-primary dark:text-gray-100">{item.title}</h2>
                                    </div>
                                    <h2 className="hidden md:block text-2xl font-bold text-brand-primary dark:text-gray-100 mb-3">{item.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                                    <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-400">
                                        {item.details.map(detail => (
                                            <li key={detail} className="flex"><span className="text-green-500 mr-2">✓</span>{detail}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        )})}
                    </div>
                </div>
            </section>
            
            <section className="bg-gradient-to-r from-brand-primary to-brand-secondary py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Take the First Step?
                        </h2>
                        <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8">
                            Your journey begins with a simple conversation. Let's discuss your future today.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block">
                            <Link 
                                to="/contact" 
                                className="bg-white text-brand-primary font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 text-lg">
                                Schedule Your Free Counseling
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Process;