import React from 'react';
import { motion, Variants } from 'framer-motion';

const Contact: React.FC = () => {
    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };
    
    return (
        <div className="bg-white dark:bg-gray-900 overflow-x-hidden">
            <header className="bg-brand-light dark:bg-gray-800 text-center py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-gray-100">Get in Touch</motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">We're here to help you on your journey to international education. Reach out to us with your questions, and let's start planning your future.</motion.p>
                </div>
            </header>

            <section className="py-20 bg-cyan-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-lg shadow-lg">
                        
                        <div className="text-left mb-8">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-gray-100">IGFS can help you</h2>
                             <div className="w-16 h-1 bg-orange-500 mt-2"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">Enter your details and one of our expert counsellors will reach out to you so we can connect you to the right course, country, university – and even scholarships!</p>
                        </div>

                        <form className="space-y-6">
                            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First name*</label>
                                    <input type="text" id="first-name" name="first-name" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name*</label>
                                    <input type="text" id="last-name" name="last-name" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                                </div>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address*</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile number*</label>
                                <div className="mt-1 flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300">+880</span>
                                    <input type="tel" id="mobile" name="mobile" className="flex-1 block w-full px-4 py-3 border border-gray-300 rounded-r-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                                </div>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your preferred study destination*</label>
                                    <select id="destination" name="destination" className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option>Select</option>
                                        <option>USA</option>
                                        <option>South Korea</option>
                                        <option>Italy</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">When would you like to start?*</label>
                                    <select id="start-date" name="start-date" className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option>Select</option>
                                        <option>Fall 2024</option>
                                        <option>Spring 2025</option>
                                        <option>Fall 2025</option>
                                    </select>
                                </div>
                            </motion.div>
                             <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="counselling-mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred mode of counselling*</label>
                                    <select id="counselling-mode" name="counselling-mode" className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option>Select</option>
                                        <option>In-Person</option>
                                        <option>Virtual</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="funding" className="block text-sm font-medium text-gray-700 dark:text-gray-300">How would you fund your education?*</label>
                                    <select id="funding" name="funding" className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option>Select</option>
                                        <option>Self-funded</option>
                                        <option>Education Loan</option>
                                        <option>Scholarship</option>
                                    </select>
                                </div>
                            </motion.div>
                             <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="study-level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred study level*</label>
                                    <select id="study-level" name="study-level" className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option>Select</option>
                                        <option>Bachelors</option>
                                        <option>Masters</option>
                                        <option>PhD</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="office" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nearest IGFS Office*</label>
                                    <select id="office" name="office" className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option>Select</option>
                                        <option>New York, USA</option>
                                        <option>Seoul, South Korea</option>
                                        <option>Rome, Italy</option>
                                    </select>
                                </div>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="space-y-4 pt-4">
                                <div className="flex items-start">
                                    <input id="agree-terms" name="agree-terms" type="checkbox" className="h-4 w-4 mt-1 text-brand-primary border-gray-300 rounded focus:ring-brand-primary" />
                                    <label htmlFor="agree-terms" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                        I agree to IGFS <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">Terms</a> and <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">privacy policy</a>.
                                    </label>
                                </div>
                                 <div className="flex items-start">
                                    <input id="contact-consent" name="contact-consent" type="checkbox" className="h-4 w-4 mt-1 text-brand-primary border-gray-300 rounded focus:ring-brand-primary" />
                                    <label htmlFor="contact-consent" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                        Please contact me by phone, email or SMS to assist with my enquiry.
                                    </label>
                                </div>
                                 <div className="flex items-start">
                                    <input id="updates-consent" name="updates-consent" type="checkbox" className="h-4 w-4 mt-1 text-brand-primary border-gray-300 rounded focus:ring-brand-primary" />
                                    <label htmlFor="updates-consent" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                        I would like to receive updates and offers from IGFS.
                                    </label>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="pt-4">
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-300 text-lg">
                                    Enquire now
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;