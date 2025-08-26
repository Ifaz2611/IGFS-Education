import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants, animate } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon } from '../components/icons';
import { blogPosts } from '../constants';

const MotionLink = motion(Link);

const AnimatedCounter: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = "" }) => {
    const nodeRef = React.useRef<HTMLSpanElement>(null);
    const hasAnimated = React.useRef(false);

    React.useEffect(() => {
        const node = nodeRef.current;
        if (!node || hasAnimated.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        animate(0, to, {
                            duration: 1.5,
                            ease: "easeOut",
                            onUpdate(value) {
                                if (nodeRef.current) {
                                    nodeRef.current.textContent = Math.round(value).toString() + suffix;
                                }
                            },
                        });
                        observer.unobserve(node);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [to, suffix]);

    return <span ref={nodeRef}>0{suffix}</span>;
};

const ServiceCard = React.memo(({ service }: { service: string }) => {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8, boxShadow: '0 10px 20px rgba(31, 70, 97, 0.2)' }}
            className="bg-brand-light dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-brand-primary dark:text-gray-200 mb-3">{service}</h3>
            <ul className="text-gray-600 dark:text-gray-400 text-left space-y-2">
                <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Personalized university matching
                </li>
                <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Course selection advice
                </li>
                <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Profile evaluation
                </li>
            </ul>
        </motion.div>
    );
});

const Home: React.FC = () => {
    // ✅ Separate loading states for each form
    const [isSubmittingNewsletter, setIsSubmittingNewsletter] = React.useState(false);
    const [isSubmittingContact, setIsSubmittingContact] = React.useState(false);
    const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false); // Success state
    const [email, setEmail] = React.useState(''); // ✅ Track email

    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    const popIn: Variants = {
        hidden: { scale: 0, rotate: -90 },
        visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
    };

    const slideInFrom = (direction: 'left' | 'right'): Variants => ({
        hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    });

    const firstThreePosts = blogPosts.slice(0, 3);

    // ✅ Fixed: Handle newsletter form with email capture + download
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmittingNewsletter(true);

        // Simulate backend save (optional)
        fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'study-abroad-guide' }),
        }).catch(console.error);

        // ✅ Trigger PDF download
        setTimeout(() => {
            try {
                const link = document.createElement('a');
                link.href = '/guides/study-abroad-guide.pdf'; // Place in public/guides/
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

    // ✅ Handle contact form separately
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingContact(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmittingContact(false);
            alert('Message sent successfully!');
        }, 1000);
    };

    return (
        <div className="bg-white dark:bg-gray-900 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex items-center justify-start h-screen text-left text-white">
            <video 
                src="/videos/Home-hero.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-xl"
                >
                    Your Global Future <br /> Starts Here with IGFS
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="mt-6 text-lg text-gray-200 max-w-lg"
                >
                    We pave the way for ambitious students to access world-class education. 
                    Discover your potential, find the right university, and start your international journey with our expert guidance.
                </motion.p>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                    <MotionLink
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        to="/contact" 
                        className="bg-brand-secondary text-brand-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300"
                    >
                        Book a Free Consultation
                    </MotionLink>
                    <MotionLink
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        to="/destinations" 
                        className="bg-transparent text-white font-semibold py-3 px-8 rounded-lg border-2 border-white hover:bg-white hover:text-brand-primary transition duration-300"
                    >
                        Explore Destinations
                    </MotionLink>
                </motion.div>
            </div>
         </section>

            {/* Trust Strip */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={staggerContainer}
                className="bg-brand-primary text-white"
                aria-label="Company statistics">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        <motion.div variants={fadeInUp}>
                            <p className="text-4xl font-bold text-brand-secondary">
                                <AnimatedCounter to={50} suffix="+" />
                            </p>
                            <p className="text-lg font-medium">University Offers Secured</p>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <p className="text-4xl font-bold text-brand-secondary">
                                <AnimatedCounter to={3} />
                            </p>
                            <p className="text-lg font-medium">Top Destination Countries</p>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <p className="text-4xl font-bold text-brand-secondary">
                                <AnimatedCounter to={7} suffix="-10 Days" />
                            </p>
                            <p className="text-lg font-medium">Average Shortlisting Time</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Services Section */}
            <section className="py-20 bg-white dark:bg-gray-900" aria-label="Services">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">Our Services</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We offer end-to-end support to make your study abroad dream a reality.
                    </p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {['University Shortlisting', 'Application Assistance', 'Visa Guidance', 'Pre-Departure Support'].map((service) => (
                            <ServiceCard key={service} service={service} />
                        ))}
                    </motion.div>
                    <MotionLink 
                        to="/services" 
                        className="mt-12 inline-flex items-center bg-brand-secondary text-brand-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300"
                        aria-label="Learn more about our services">
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
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'United States',
                                img: '/images/destinations/usa.jpg',
                                title: 'United States: Where opportunities thrive',
                                description: 'Unleash your potential at top-ranked universities, with cutting-edge resources and a dynamic environment that empowers you to achieve your dreams.',
                                link: '/destinations',
                            },
                            {
                                name: 'South Korea',
                                img: '/images/destinations/south-korea.jpg',
                                title: 'South Korea: Innovation meets tradition',
                                description: 'Immerse yourself in a tech-forward society with world-class education in engineering and arts, all while experiencing a rich cultural heritage.',
                                link: '/destinations',
                            },
                            {
                                name: 'Italy',
                                img: '/images/destinations/italy.jpg',
                                title: 'Italy: A legacy of art and culture',
                                description: 'Study amidst timeless masterpieces. Italy offers unparalleled education in design, architecture, and humanities in the heart of history.',
                                link: '/destinations',
                            },   
                        ].map(dest => (
                            <motion.div
                                key={dest.name}
                                variants={fadeInUp}
                                className="relative rounded-xl shadow-lg overflow-hidden group w-full aspect-video"
                                whileHover="hover"
                                aria-label={`Study in ${dest.name}`}
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
                                    variants={{
                                        hover: { opacity: 1 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{dest.title}</h4>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{dest.description}</p>
                                    <Link 
                                        to={dest.link} 
                                        className="mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
                                        aria-label={`Study in ${dest.name}`}
                                    >
                                        Study in {dest.name}
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
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
                        className="mt-12 grid grid-cols-1 md:grid-cols-4 text-center">
                        {['Discovery', 'Shortlist', 'Apply', 'Visa & Arrival'].map((step, index) => (
                            <motion.div variants={fadeInUp} key={step} className="relative p-6">
                                <div className="relative z-10">
                                    <motion.div
                                        variants={popIn}
                                        className="flex items-center justify-center bg-brand-secondary text-brand-primary rounded-full h-16 w-16 mx-auto text-2xl font-bold">
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
                        aria-label="Discover the full process">
                        Discover the Full Process
                    </Link>
                </div>
            </section>
            
            {/* Success Stories */}
            <section className="py-20 bg-brand-light dark:bg-gray-800" aria-label="Success stories">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">Success Stories</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Don't just take our word for it. See what our students have to say about their experience with IGFS.
                    </p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                name: 'Priya Sharma', 
                                country: 'USA', 
                                quote: "IGFS made my dream of studying in the US a reality. Their personalized guidance was invaluable.", 
                                img: 'https://picsum.photos/id/1027/100/100' 
                            },
                            { 
                                name: 'Jin-Woo Park', 
                                country: 'South Korea', 
                                quote: "The team's expertise in Korean universities was amazing. They helped me get into my top choice program.", 
                                img: 'https://picsum.photos/id/1005/100/100' 
                            },
                            { 
                                name: 'Marco Rossi', 
                                country: 'Italy', 
                                quote: "From application to visa, IGFS was there every step. I couldn't have done it without them. Grazie!", 
                                img: 'https://picsum.photos/id/1011/100/100' 
                            },
                        ].map((story, index) => (
                            <motion.div
                                key={story.name}
                                variants={slideInFrom(index === 1 ? 'right' : 'left')}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                <motion.img
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    src={story.img} 
                                    alt={story.name} 
                                    className="w-24 h-24 rounded-full mx-auto mb-4" 
                                />
                                <p className="text-gray-600 dark:text-gray-300 italic">"{story.quote}"</p>
                                <p className="mt-4 font-bold text-brand-primary dark:text-gray-200">{story.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Studying in {story.country}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                    <Link 
                        to="/success-stories" 
                        className="mt-12 inline-flex items-center bg-brand-secondary text-brand-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300"
                        aria-label="Read more success stories">
                        Read More Stories <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
            
            {/*  FIXED: Lead Magnet (PDF Download) */}
            <section className="py-20 bg-brand-primary text-white" aria-label="Newsletter signup">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold">Get Your Free Study Abroad Guide</h2>
                    <p className="mt-4 max-w-2xl mx-auto">
                        Download our comprehensive PDF guide covering everything from choosing a country to packing your bags.
                    </p>

                    {/*  Success Message */}
                    {newsletterSubmitted ? (
                        <div className="mt-8 p-6 bg-white/20 rounded-lg backdrop-blur-sm">
                            <p className="text-lg">✅ Thank you! The guide has been downloaded.</p>
                            <p className="text-sm mt-2">Check your inbox for more tips.</p>
                        </div>
                    ) : (
                        <motion.form
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={staggerContainer}
                            className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-4"
                            onSubmit={handleNewsletterSubmit}>
                            <motion.input
                                variants={slideInFrom('left')}
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-grow px-4 py-3 rounded-lg text-gray-800 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                required
                                aria-label="Email address for newsletter"
                            />
                            <motion.button
                                variants={slideInFrom('right')}
                                animate={{ scale: [1, 1.03, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                type="submit"
                                className="bg-brand-secondary text-brand-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90"
                                disabled={isSubmittingNewsletter}
                                aria-label="Download free study abroad guide">
                                {isSubmittingNewsletter ? 'Sending...' : 'Download Now'}
                            </motion.button>
                        </motion.form>
                    )}
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
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {firstThreePosts.map(post => (
                            <motion.div
                                key={post.title}
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-left group">
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
                                        aria-label={`Read more about ${post.title}`}>
                                        Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            {/* Contact Section */}
            <section className="py-20 bg-brand-light dark:bg-gray-800" aria-label="Contact us">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}>
                            <h2 className="text-3xl font-bold text-brand-primary dark:text-gray-100">Ready to Start?</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Reach out to us today. Our expert counselors are ready to help you plan your future.
                            </p>
                            <form className="mt-8 space-y-4" onSubmit={handleContactSubmit}>
                                <motion.input 
                                    variants={fadeInUp} 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                    required 
                                    aria-label="Your name"
                                />
                                <motion.input 
                                    variants={fadeInUp} 
                                    type="email" 
                                    placeholder="Your Email" 
                                    className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                    required 
                                    aria-label="Your email"
                                />
                                <motion.textarea 
                                    variants={fadeInUp} 
                                    placeholder="Your Message" 
                                    rows={4} 
                                    className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                    required
                                    aria-label="Your message"
                                ></motion.textarea>
                                <motion.button 
                                    variants={fadeInUp} 
                                    type="submit" 
                                    className="w-full bg-brand-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300"
                                    disabled={isSubmittingContact}
                                    aria-label="Send message">
                                    {isSubmittingContact ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scaleIn}>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-brand-primary dark:text-gray-200 mb-4">Contact Information</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> info@igfs.com
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    <strong>Phone:</strong> +1 (234) 567-890
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    <strong>Address:</strong> 123 Education Lane, Global City
                                </p>
                                <h4 className="font-bold text-brand-primary dark:text-gray-200 mb-2">Office Hours:</h4>
                                <p className="text-gray-600 dark:text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-600 dark:text-gray-300">Sat: 10:00 AM - 2:00 PM</p>
                                <div className="mt-6 h-48 rounded-lg overflow-hidden">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193596.26002815957!2d-74.14431223360049!3d40.69728463486588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1755345338868!5m2!1sen!2sbd"
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0 }} 
                                        allowFullScreen 
                                        loading="lazy" 
                                        title="Map location"
                                    ></iframe>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;