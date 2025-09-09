import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface TeamMember {
  name: string;
  title: string;
  img: string;
  bio: string;
  fullBio?: string; // Optional detailed bio
}

const About: React.FC = () => {
  // Extended team members with fullBio
  const teamMembers: TeamMember[] = [
    {
      name: 'Arnob Mallick Mandela',
      title: 'Team Member',
      img: '/images/aboutus1/arnob.jpeg',
      bio: 'Click For More Details',
      fullBio:
        'Hi everyone. I am currently majoring in Environmental Science at the City University of New York, with a strong interest in sustainability, climate change, and ecological research. My academic journey is focused on developing practical solutions to pressing environmental challenges, while building expertise in areas such as renewable energy, environmental policy, and conservation strategies. I am passionate about applying scientific knowledge to create a positive impact on communities and the natural world.',
    },
    {
      name: 'Md. Shohidul Islam Sumon',
      title: 'Team Member',
      img: '/images/aboutus1/sumon.jpeg',
      bio: 'Click For More Details',
      fullBio:
        'Hi everyone. I am studying in the Department of Folklore and Social Development Studies at the University of Rajshahi, with a keen interest in culture, society, and community development. My focus is on exploring the role of folklore in shaping social progress and sustainable development.',
    },
    {
      name: 'Md. Asiqur Rahman Santo',
      title: 'Team Member',
      img: '/images/aboutus1/santo.jpeg',
      bio: 'Click For More Details',
      fullBio:
        'Hi . I am pursuing a degree in Computer Information Systems at the City University of New York, USA, with a strong interest in technology, data management, and innovative digital solutions. My focus is on building practical skills in information systems to contribute to modern business and technology-driven environments.',
    },
    {
      name: 'Md Abdul Auwal',
      title: 'Team Member',
      img: '/images/aboutus1/abdul.jpeg',
      bio: 'Click For More Details',
      fullBio:
        'Hi . I am pursuing a Double Major in Global Business Administration and Global Hospitality Management at Kyungsung University, Busan, South Korea. My academic focus combines international business strategies with global hospitality practices, preparing me to contribute to cross-cultural industries and dynamic global markets.',
    },
    // {
    //   name: 'Maria Santos',
    //   title: 'Student Success Manager',
    //   img: 'https://picsum.photos/id/1027/200/200',
    //   bio: 'Maria ensures every student receives personalized support throughout their journey.',
    //   fullBio:
    //     'Maria has a background in counseling psychology and has supported students from over 30 countries. She oversees the post-admission process, including visa preparation, pre-departure orientation, and mental wellness support. Maria believes that emotional readiness is just as important as academic readiness.',
    // },
  ];

  // State to track selected team member
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const teamCardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3 },
    },
  };

  return (
      <div className="bg-brand-light dark:bg-gray-900 overflow-x-hidden">
        {/* Image-only header section */}
        <header className="relative flex items-center justify-center w-full aspect-video overflow-hidden">
          <img
            src="/images/blog/about-us1.jpeg" // Update path to your image
            alt="About hero"
            className="absolute top-0 left-0 w-full h-full object-contain z-0"
          />
        </header>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="bg-brand-light dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-1 bg-brand-secondary mb-6 rounded-full"></div>
              <h2 className="text-3xl font-bold text-brand-primary dark:text-gray-100">Our Mission</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                To empower students with the knowledge, guidance, and support they need to achieve their academic and
                career aspirations at top international institutions. We are committed to providing personalized,
                ethical, and comprehensive counseling.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-brand-light dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-1 bg-brand-secondary mb-6 rounded-full"></div>
              <h2 className="text-3xl font-bold text-brand-primary dark:text-gray-100">Our Vision</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                To be the most trusted and student-centric international education consultancy, renowned for creating
                life-changing opportunities and fostering a global community of successful leaders and innovators.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    {/* Our Story Section */}
    <section className="bg-gradient-to-br from-brand-light to-brand-primary/10 dark:from-gray-800 dark:to-gray-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100 relative inline-block">
              Our Story
              <div className="w-1/3 h-1 bg-brand-secondary mt-3 rounded-full"></div>
            </h2>
            <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              Founded in 2025, the International Guide for Students (IGFS) began with a simple idea: every student
              deserves a chance to pursue their dream education, regardless of their background. What started as a
              small advisory service has grown into a global consultancy with partners across three continents.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
             Our journey is just beginning, but we're driven by a clear vision—to guide students toward life-changing experiences abroad. We believe that studying overseas is more than just an academic goal; it's a transformative journey that builds character, fosters resilience, and unlocks a world of possibilities. With integrity and a commitment to excellence, we’re ready to shape countless success stories in the years to come.
            </p>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
              Listen to our founder share the inspiring journey behind IGFS.
            </p>
          </motion.div>

          {/* Video Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-xs md:max-w-md">
              {/* Fixed Video Player */}
              <video
                src="/videos/founder-journey.mp4"   /// change you video here 
                controls
                playsInline
                loop={false}
                className="w-full h-full rounded-2xl shadow-xl object-contain"
                style={{
                  aspectRatio: '9 / 16', // 👈 Matches 464x832 → 9:16
                }}
                aria-label="Founder sharing the story of IGFS with audio"
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
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-gray-100">
              Meet Our Expert Team
            </h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our strength lies in our team of experienced and passionate education professionals.
            </p>
          </motion.div>

          {/* Selected Member Full View */}
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedMember(null)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 text-center">
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <img
                      src={selectedMember.img}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover rounded-full border-4 border-brand-light dark:border-gray-700"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-primary dark:text-gray-100">{selectedMember.name}</h2>
                  <p className="text-brand-secondary font-semibold mt-1">{selectedMember.title}</p>
                  <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed px-4">
                    {selectedMember.fullBio || selectedMember.bio}
                  </p>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="mt-8 px-6 py-2 bg-brand-primary text-white rounded-full hover:bg-brand-secondary transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Team Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={teamCardVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMember(member)} // Open modal
              >
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 inline-block">
              <button
                onClick={() => window.location.href = "/#/contact"} 
                className="bg-white text-brand-primary font-bold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Get Started Today
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;