import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';

interface TeamMember {
  name: string;
  title: string;
  img: string;
  bio: string;
}

const About: React.FC = () => {
    const teamMembers: TeamMember[] = [
        { 
            name: 'Dr. Evelyn Reed', 
            title: 'Founder & Chief Mentor', 
            img: 'https://picsum.photos/id/1027/200/200', 
            bio: 'With over 20 years in international education, Dr. Reed founded IGFS to make global learning accessible to all.' 
        },
        { 
            name: 'David Chen', 
            title: 'Head of Operations, USA', 
            img: 'https://picsum.photos/id/1005/200/200', 
            bio: 'An alumnus of Stanford, David specializes in US university admissions and scholarship strategies.' 
        },
        { 
            name: 'Sofia Bianchi', 
            title: 'European Destinations Lead', 
            img: 'https://picsum.photos/id/1011/200/200', 
            bio: 'Based in Rome, Sofia has extensive knowledge of European education systems and visa processes.' 
        },
        { 
            name: 'Kenji Tanaka', 
            title: 'Asia-Pacific Advisor', 
            img: 'https://picsum.photos/id/1012/200/200', 
            bio: 'Kenji helps students navigate the unique academic landscapes of South Korea, Japan, and Australia.' 
        },
        // Add new team members here/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        { 
            name: 'Maria Santos', 
            title: 'Student Success Manager', 
            img: 'https://picsum.photos/id/1027/200/200', 
            bio: 'Maria ensures every student receives personalized support throughout their journey.' 
        },
        { 
            name: 'James Wilson', 
            title: 'Visa Specialist', 
            img: 'https://picsum.photos/id/1005/200/200', 
            bio: 'With 15+ years of experience, James has a 98% visa approval rate for our students.' 
        },
        
    ];
    
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    
    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    const teamCardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                ease: 'easeOut'
            }
        },
        hover: {
            y: -10,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="bg-brand-light dark:bg-gray-900 overflow-x-hidden">
            {/* Video-only header section */}
            <header className="relative flex items-center justify-center w-full aspect-video overflow-hidden">
                <video 
                    src="/videos/about-hero.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-contain z-0"
                />
                {/* <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/70 z-10"></div> */}    
            </header>

            {/* Mission & Vision Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div 
                          variants={fadeInUp}
                          className="bg-brand-light dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                            <div className="w-16 h-1 bg-brand-secondary mb-6 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-brand-primary dark:text-gray-100">Our Mission</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                              To empower students with the knowledge, guidance, and support they need to achieve their academic and career aspirations at top international institutions. We are committed to providing personalized, ethical, and comprehensive counseling.
                            </p>
                        </motion.div>
                        <motion.div 
                          variants={fadeInUp}
                          className="bg-brand-light dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                            <div className="w-16 h-1 bg-brand-secondary mb-6 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-brand-primary dark:text-gray-100">Our Vision</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                              To be the most trusted and student-centric international education consultancy, renowned for creating life-changing opportunities and fostering a global community of successful leaders and innovators.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            
            {/* Our Story Section */}
            <section className="bg-gradient-to-br from-brand-light to-brand-primary/10 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100 relative inline-block">
                              Our Story
                              <div className="w-1/3 h-1 bg-brand-secondary mt-3 rounded-full"></div>
                            </h2>
                            <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                              Founded in 2010, the International Guide for Students (IGFS) began with a simple idea: every student deserves a chance to pursue their dream education, regardless of their background. What started as a small advisory service has grown into a global consultancy with partners across three continents.
                            </p>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                              Our journey has been fueled by the success stories of thousands of students we've guided, each one reinforcing our commitment to excellence and integrity. We believe that studying abroad is more than just an academic pursuit—it's a transformative experience that shapes character, builds resilience, and opens doors to a world of possibilities.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2">
                             <div className="relative">
                               <div className="absolute -inset-4 bg-brand-secondary rounded-2xl transform rotate-3"></div>
                               <img 
                                 src="https://picsum.photos/id/367/600/400" 
                                 alt="IGFS Team working" 
                                 className="relative rounded-2xl shadow-xl w-full object-cover"
                               />
                             </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Meet the Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">Meet Our Expert Team</h2>
                      <div className="w-24 h-1 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
                      <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Our strength lies in our team of experienced and passionate education professionals.
                      </p>
                    </motion.div>
                    
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                variants={teamCardVariants}
                                whileHover="hover"
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
                                <div className="p-6">
                                    <div className="relative mx-auto w-32 h-32 mb-6">
                                        <img 
                                            src={member.img} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover rounded-full border-4 border-brand-light dark:border-gray-700"
                                        />
                                        <div className="absolute inset-0 rounded-full border-2 border-brand-secondary opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-primary dark:text-gray-200">{member.name}</h3>
                                    <p className="text-brand-secondary font-semibold mt-1">{member.title}</p>
                                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-brand-primary to-brand-secondary py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Join the IGFS Family</h2>
                      <p className="mt-4 text-lg text-gray-100 max-w-2xl mx-auto">
                        Let our team of experts guide you on your journey to academic excellence. Your future awaits.
                      </p>
                      <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-8 inline-block">
                          <Link 
                            to="/contact" 
                            className="bg-white text-brand-primary font-bold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-lg">
                              Get Started Today
                          </Link>
                      </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;