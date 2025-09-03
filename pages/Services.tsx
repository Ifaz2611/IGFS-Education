import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

type ServiceCardProps = {
    title: string;
    description: string;
    benefits: string[];
    image: string;
    reverse?: boolean;
};

// Reusable variant generators
const createSlideInVariant = (reverse: boolean): Variants => ({
    hidden: { opacity: 0, x: reverse ? 50 : -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
});

const scaleInVariant: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, benefits, image, reverse = false }) => {
    return (
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3, margin: "50px" }}
                variants={createSlideInVariant(reverse)}
                className={`order-1 ${reverse ? 'md:order-2' : 'md:order-1'}`}
            >
                <h3 className="text-3xl font-bold text-brand-primary dark:text-gray-100">{title}</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
                <ul className="mt-6 space-y-3">
                    {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start">
                            <CheckCircleIcon
                                className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                                aria-hidden="true"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3, margin: "50px" }}
                variants={scaleInVariant}
                className={`order-2 ${reverse ? 'md:order-1' : 'md:order-2'}`}
            >
                <img
                    src={image}
                    alt={title}
                    className="rounded-lg shadow-xl w-full h-auto"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/fallback.jpg";
                    }}
                />
            </motion.div>
        </div>
    );
};

const Services: React.FC = () => {
    const services = [
        {
            title: "University & Course Selection",
            description: "Choosing the right university and course is the most critical decision. Our counselors use a data-driven approach, combined with your academic profile, interests, and career goals, to create a tailored list of best-fit institutions.",
            benefits: [
                "Access to a database of thousands of universities.",
                "Personalized shortlisting to save you time and effort.",
                "Expert advice on emerging fields and career prospects."
            ],
            image: "/images/Services/uni1.jpeg"
        },
        {
            title: "Application & SOP Assistance",
            description: "A compelling application can make all the difference. We guide you through every step, from filling out complex forms to crafting a powerful Statement of Purpose (SOP) and Letters of Recommendation (LORs) that highlight your strengths.",
            benefits: [
                "Error-free application submission.",
                "Guidance on writing impactful essays and SOPs.",
                "Review by experts to enhance your application's quality."
            ],
            image: "/images/Services/sop1.jpeg"
        },
        {
            title: "Scholarship & Financial Guidance",
            description: "Funding your education abroad can be challenging. We assist you in finding and applying for relevant scholarships, grants, and financial aid. Our team also provides guidance on education loans and proof of funds.",
            benefits: [
                "Identification of relevant scholarship opportunities.",
                "Assistance with scholarship application essays.",
                "Advice on financial planning and documentation."
            ],
            image: "/images/Services/sco1.jpeg"
        },
        {
            title: "Visa & Immigration Support",
            description: "Navigating the student visa process can be complex and stressful. Our experienced visa counselors provide comprehensive support, from documentation and mock interviews to the latest immigration updates, ensuring a high success rate.",
            benefits: [
                "Step-by-step guidance on the visa application.",
                "Thorough documentation checks to avoid rejections.",
                "Mock interview preparation to build your confidence."
            ],
            image: "/images/Services/Visa1.jpeg"
        }
    ];

    return (
        <div className="bg-brand-light dark:bg-gray-900 overflow-x-hidden">
            {/* Video-only header section */}
            <header className="relative flex items-center justify-center w-full aspect-video overflow-hidden">
                <video
                    src="/videos/service-hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <img src="/images/fallback-hero.jpg" alt="International education background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
                </video>
            </header>

            {/* Services Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} {...service} reverse={index % 2 !== 0} />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-brand-primary to-brand-secondary py-20 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold">Ready to Begin Your Success Story?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-gray-300">
                            Our services are designed to give you the competitive edge. Let's work together to achieve your academic goals.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 inline-block"
                        >
                            <Link
                                to="/contact"
                                className="inline-block bg-white text-gray-900 font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
                            >
                                Book a Free Consultation
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;