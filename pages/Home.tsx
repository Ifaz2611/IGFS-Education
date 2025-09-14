import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon } from '../components/icons'; // Ensure these exist
import { blogPosts } from '../constants';

// Corrected: Use Link with motion wrapper
const MotionLink = motion(Link);

// ✅ Fixed AnimatedCounter without relying on framer-motion.animate()
const AnimatedCounter: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = "" }) => {
    const nodeRef = React.useRef<HTMLSpanElement>(null);
    const hasAnimated = React.useRef(false);

    React.useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;

                        const duration = 1500; // 1.5 seconds
                        const start = 0;
                        const end = to;
                        const range = end - start;
                        const startTime = performance.now();

                        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3); // Smooth ease-out

                        const animateCount = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easedProgress = easeOut(progress);
                            const value = Math.round(start + range * easedProgress);

                            node.textContent = value + suffix;

                            if (progress < 1) {
                                requestAnimationFrame(animateCount);
                            }
                        };

                        requestAnimationFrame(animateCount);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [to, suffix]);

    return <span ref={nodeRef}>0{suffix}</span>;
};

// ✅ Updated ServiceCard with dynamic features
const ServiceCard = React.memo(
    ({ title, features }: { title: string; features: string[] }) => {
        const fadeInUp: Variants = {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        };

        return (
            <motion.div
                variants={fadeInUp}
                whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(31, 70, 97, 0.2)' }}
                className="bg-brand-light dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-md h-full transition-all duration-300"
            >
                <h3 className="text-lg sm:text-xl font-bold text-brand-primary dark:text-gray-200 mb-3 sm:mb-4">{title}</h3>
                <ul className="text-gray-600 dark:text-gray-400 text-left space-y-2 sm:space-y-3">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        );
    }
);

const Home: React.FC = () => {
    const [isSubmittingNewsletter, setIsSubmittingNewsletter] = React.useState(false);
    const [isSubmittingContact, setIsSubmittingContact] = React.useState(false);
    const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const popIn: Variants = {
        hidden: { scale: 0, rotate: -90 },
        visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
    };

    const slideInFrom = (direction: 'left' | 'right'): Variants => ({
        hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    });

    const firstThreePosts = blogPosts.slice(0, 3);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmittingNewsletter(true);

        // Simulate saving email
        fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'study-abroad-guide' }),
        }).catch(console.error);

        // Trigger PDF download
        setTimeout(() => {
            try {
                const link = document.createElement('a');
                link.href = '/guides/study-abroad-guide.pdf';
                link.download = 'study-abroad-guide.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setNewsletterSubmitted(true);
            } catch (err) {
                alert('Download failed. Please try again.');
            } finally {
                setIsSubmittingNewsletter(false);
            }
        }, 800);
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingContact(true);

        // Simulate API delay
        setTimeout(() => {
            setIsSubmittingContact(false);
            alert('Message sent successfully!');
        }, 1000);
    };

    return (
        <div className="bg-white dark:bg-gray-900 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center w-full h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden text-white">
                <video
                    src="/videos/Home-hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    poster="/images/hero-fallback.jpg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
                <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center md:justify-start">
                    <div className="text-center md:text-left max-w-xl lg:max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight sm:leading-snug"
                        >
                            Your Global Future <br className="hidden sm:block" /> 
                            <span className="sm:hidden"> </span>Starts Here with IGS
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed"
                        >
                            We pave the way for ambitious students to access world-class education. 
                            Discover your potential, find the right university, and start your international journey with our expert guidance.
                        </motion.p>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
                        >
                            <MotionLink
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                to="/contact"
                                className="bg-brand-secondary text-brand-primary font-semibold py-3 px-6 sm:px-8 rounded-md shadow-md hover:opacity-90 transition duration-300 text-sm sm:text-base"
                            >
                                Book a Free Consultation
                            </MotionLink>
                            <MotionLink
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                to="/destinations"
                                className="bg-transparent text-white font-semibold py-3 px-6 sm:px-8 rounded-md border-2 border-white hover:bg-white hover:text-brand-primary transition duration-300 text-sm sm:text-base"
                            >
                                Explore Destinations
                            </MotionLink>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Strip */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="bg-brand-primary text-white"
                aria-label="Company statistics"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                        <motion.div variants={fadeInUp} className="space-y-2">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-secondary">
                                <AnimatedCounter to={50} suffix="+" />
                            </p>
                            <p className="text-sm sm:text-base md:text-lg font-medium">University Offers Secured</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-secondary">
                                <AnimatedCounter to={3} />
                            </p>
                            <p className="text-sm sm:text-base md:text-lg font-medium">Top Destination Countries</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-secondary">
                                <AnimatedCounter to={7} suffix="-10 Days" />
                            </p>
                            <p className="text-sm sm:text-base md:text-lg font-medium">Average Shortlisting Time</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Services Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900" aria-label="Services">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">Our Services</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        We offer end-to-end support to make your study abroad dream a reality.
                    </p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                    >
                        {[
                            {
                                title: 'University Shortlisting',
                                features: [
                                    'Personalized university matching based on your profile',
                                    'Course selection & program fit analysis',
                                    'Rankings, location, and budget-aligned suggestions',
                                ],
                            },
                            {
                                title: 'Application Assistance',
                                features: [
                                    'SOP & LOR guidance tailored to your background',
                                    'Application form review and submission support',
                                    'Deadline tracking and document checklist',
                                ],
                            },
                            {
                                title: 'Visa Guidance',
                                features: [
                                    'Step-by-step visa application process walkthrough',
                                    'Interview preparation and common questions training',
                                    'Documentation checklist and financial proof support',
                                ],
                            },
                            {
                                title: 'Pre-Departure Support',
                                features: [
                                    'Accommodation assistance and city orientation',
                                    'Flight booking tips and insurance guidance',
                                    'Cultural prep and packing checklist',
                                ],
                            },
                        ].map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </motion.div>
                    <MotionLink
                        to="/services"
                        className="mt-12 inline-flex items-center bg-brand-secondary text-brand-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300"
                        aria-label="Learn more about our services"
                    >
                        Learn More About Our Services <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </MotionLink>
                </div>
            </section>

    {/* Destinations Section */}
    <section className="py-20 bg-brand-light dark:bg-gray-800" aria-label="Popular destinations">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">Popular Destinations</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore top-tier education in countries that offer unique cultural and academic experiences.
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              name: 'United States',
              key: 'USA',
              img: '/images/destinations/usa.jpg',
              title: 'United States: Where opportunities thrive',
              description:
                'Unleash your potential at top-ranked universities, with cutting-edge resources and a dynamic environment that empowers you to achieve your dreams.',
            },
            {
              name: 'South Korea',
              key: 'South Korea',
              img: '/images/destinations/south-korea.jpg',
              title: 'South Korea: Innovation meets tradition',
              description:
                'Immerse yourself in a tech-forward society with world-class education in engineering and arts, all while experiencing a rich cultural heritage.',
            },
            {
              name: 'Italy',
              key: 'Italy',
              img: '/images/destinations/italy.jpg',
              title: 'Italy: A legacy of art and culture',
              description:
                'Study amidst timeless masterpieces. Italy offers unparalleled education in design, architecture, and humanities in the heart of history.',
            },
          ].map((dest) => {
            const [isHovered, setIsHovered] = useState(false);

            return (
              <motion.div
                key={dest.name}
                variants={fadeInUp}
                className="relative rounded-xl shadow-lg overflow-hidden group w-full aspect-video cursor-pointer"
                aria-label={`Study in ${dest.name}`}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onTap={() => setIsHovered(!isHovered)}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                </div>
                <motion.div
                  className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center border-4 border-blue-500 dark:border-blue-400 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{dest.title}</h4>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{dest.description}</p>
                  <Link
                    to="/destinations"
                    state={{ destination: dest.key }}
                    className="mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    aria-label={`Study in ${dest.name}`}
                  >
                    Study in {dest.name}
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>

            {/* Process Section */}
            <section className="py-20 bg-white dark:bg-gray-900" aria-label="Process">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">Our Streamlined Process</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We follow a simple yet effective 4-step process to ensure your journey is smooth and successful.
                    </p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="mt-12 grid grid-cols-1 md:grid-cols-4 text-center"
                    >
                        {['Discovery', 'Shortlist', 'Apply', 'Visa & Arrival'].map((step, index) => (
                            <motion.div variants={fadeInUp} key={step} className="relative p-6">
                                <div className="relative z-10">
                                    <motion.div
                                        variants={popIn}
                                        className="flex items-center justify-center bg-brand-secondary text-brand-primary rounded-full h-16 w-16 mx-auto text-2xl font-bold"
                                    >
                                        {index + 1}
                                    </motion.div>
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-brand-primary dark:text-gray-200">{step}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Guidance through the {step.toLowerCase()} phase.</p>
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                    <Link
                        to="/process"
                        className="mt-8 inline-flex items-center bg-brand-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300"
                        aria-label="Discover the full process"
                    >
                        Discover the Full Process
                    </Link>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-20 bg-brand-light dark:bg-gray-800" aria-label="Success stories">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">
                        Student Success Stories
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover how our students have transformed their academic dreams into reality at top universities worldwide.
                    </p>
                </div>

        {/* Horizontal Scroll Cards — Now Centered on Desktop */}
        <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max mx-auto max-w-5xl">
                {[
                    {
                        name: 'Priya Sharma',
                        destination: 'University of California, USA',
                        program: 'MS in Computer Science',
                        quote: "IGS transformed my overwhelming dream into a confirmed admission. Their SOP editing was magic!",
                        img: 'https://picsum.photos/id/1027/150/150'
                    },
                    {
                        name: 'Jin-Woo Park',
                        destination: 'KAIST, South Korea',
                        program: 'B.Eng in Electrical Engineering',
                        quote: "They helped me secure a scholarship at KAIST — I never thought it was possible!",
                        img: 'https://picsum.photos/id/1005/150/150'
                    },
                    {
                        name: 'Aisha Al-Jamil',
                        destination: 'University of Toronto, Canada',
                        program: 'B.Com in Finance',
                        quote: "From visa confusion to landing in Toronto — IGS guided every step.",
                        img: 'https://picsum.photos/id/1013/150/150'
                    }
                ].map((story, index) => (
                    <motion.div
                        key={story.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex-shrink-0 w-56 sm:w-64 md:w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-5 md:p-6 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={story.img}
                            alt={story.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full mx-auto mb-3 object-cover border-2 border-brand-primary dark:border-blue-400"
                        />
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm sm:text-base md:text-lg">
                            {story.name}
                        </h3>
                        <p className="text-xs sm:text-sm mt-1 line-clamp-1 text-gray-600 dark:text-gray-300">
                            {story.destination}
                        </p>
                        <p className="text-xs sm:text-sm italic text-gray-500 dark:text-gray-400 mt-3 line-clamp-2">
                            "{story.quote}"
                        </p>
                        <a
                            href="#/success-stories"
                            className="mt-4 inline-block text-brand-primary dark:text-blue-400 font-medium text-xs sm:text-sm hover:underline"
                        >
                            Read Full Story →
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>

            </div>
        </section>
            {/* Lead Magnet (Google Drive PDF Link) */}
            <section className="py-20 bg-brand-primary text-white" aria-label="Download study abroad guide">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold">Get Your Free Study Abroad Guide</h2>
                    <p className="mt-4 max-w-2xl mx-auto">
                        Download our comprehensive guide covering everything from choosing a country to packing your bags.
                    </p>

                    {/* Direct Google Drive Button */}
                    <div className="mt-8">
                        <a
                            href="https://drive.google.com/file/d/1bDVRFgQ7OiZO14xad0xqxdhTdFDK6vAz/view?usp=sharing" // 🔗 Replace with your actual Google Drive shareable link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-brand-secondary text-brand-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300"
                            aria-label="Open study abroad guide in Google Drive"
                        >
                            Download Now <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </a>
                    </div>

                    {/* <p className="mt-4 text-sm text-gray-200">
                        Opens in Google Drive – no email required.
                    </p> */}
                </div>
            </section>

            {/* Blog Preview */}
            <section className="py-20 bg-white dark:bg-gray-900" aria-label="Latest blog posts">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">From Our Blog</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get the latest tips, news, and insights on studying abroad.
                    </p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {firstThreePosts.map((post) => (
                            <motion.div
                                key={post.title}
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-left group"
                            >
                                <div className="overflow-hidden">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        src={post.img}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-brand-primary dark:text-gray-200 group-hover:text-brand-secondary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="mt-4 inline-flex items-center font-semibold text-brand-primary dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary"
                                        aria-label={`Read more about ${post.title}`}
                                    >
                                        Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

{/* Contact Section - Left-Aligned Info, Full-Width */}
<section className="py-20 bg-brand-light dark:bg-gray-800" aria-label="Contact information">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 gap-8"> {/* Single column on all screens */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={scaleIn}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
            >
                <h3 className="text-xl font-bold text-brand-primary dark:text-gray-200 mb-6">
                    Contact Information
                </h3>

                <div className="text-gray-600 dark:text-gray-300 space-y-3">
                    <p>
                        <strong>Email:</strong> intguideforstudents@gmail.com
                    </p>
                    <p>
                        <strong>Phone:</strong> +88(01835-152037)
                    </p>
                    <p>
                        <strong>Address:</strong> Amtola, 60 Feet, Mirpur-1216
                    </p>
                </div>

                <div className="mt-6">
                    <h4 className="font-bold text-brand-primary dark:text-gray-200 mb-2">
                        Office Hours:
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">Sat - Thurs: 10:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">(Friday Closed)</p>
                </div>

                {/* Map */}
                <div className="mt-8 h-64 rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.9313386532103!2d90.36237788684178!3d23.785459232385197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b7c8db4515%3A0x38adef9072a2e029!2sS%20Paikpara%20-%20Pirerbag%20Amtola%20Rd%20%26%20Kamal%20Soroni%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1756659428250!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Map location"
                    ></iframe>
                </div>
            </motion.div>
        </div>
    </div>
</section>
        </div>
    );
};

export default Home;