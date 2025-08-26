import React from 'react';
import { motion, Variants } from 'framer-motion';

const Contact: React.FC = () => {
  // Animation variants
  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen overflow-x-hidden transition-colors duration-300">
      {/* Header Section */}
      <header className="bg-brand-light dark:bg-gray-800 text-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-gray-100"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We're here to help you on your journey to international education.
            Reach out to us with your questions, and let's start planning your
            future.
          </motion.p>
        </div>
      </header>

      {/* Contact Form Section */}
      <section className="py-20 bg-cyan-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-lg shadow-lg"
          >
            {/* Form Title */}
            <div className="text-left mb-8">
              <h2 className="text-3xl font-extrabold text-brand-primary dark:text-gray-100">
                IGFS Can Help You
              </h2>
              <div className="w-16 h-1 bg-orange-500 mt-2"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Enter your details and one of our expert counsellors will reach
                out to you so we can connect you to the right course, country,
                university – and even scholarships!
              </p>
            </div>

            {/* Contact Form */}
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                alert('Thank you! We will contact you soon.');
              }}
            >
              {/* Name Fields */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </motion.div>

              {/* Mobile Number */}
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mobile Number*
                </label>
                <div className="mt-1 flex rounded-md overflow-hidden">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300">
                    +880
                  </span>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    className="flex-1 block w-full px-4 py-3 border border-gray-300 focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </motion.div>

              {/* Study Destination & Start Date */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Preferred Study Destination*
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="USA">USA</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Italy">Italy</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="start-date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    When would you like to start?*
                  </label>
                  <select
                    id="start-date"
                    name="startDate"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="Fall 2024">Fall 2024</option>
                    <option value="Spring 2025">Spring 2025</option>
                    <option value="Fall 2025">Fall 2025</option>
                  </select>
                </div>
              </motion.div>

              {/* Counselling Mode & Funding */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="counselling-mode"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Preferred Mode of Counselling*
                  </label>
                  <select
                    id="counselling-mode"
                    name="counsellingMode"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="funding"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    How will you fund your education?*
                  </label>
                  <select
                    id="funding"
                    name="funding"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="Self-funded">Self-funded</option>
                    <option value="Education Loan">Education Loan</option>
                    <option value="Scholarship">Scholarship</option>
                  </select>
                </div>
              </motion.div>

              {/* Study Level & Office */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="study-level"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Preferred Study Level*
                  </label>
                  <select
                    id="study-level"
                    name="studyLevel"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="office"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nearest IGFS Office*
                  </label>
                  <select
                    id="office"
                    name="office"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="New York, USA">New York, USA</option>
                    <option value="Seoul, South Korea">Seoul, South Korea</option>
                    <option value="Rome, Italy">Rome, Italy</option>
                  </select>
                </div>
              </motion.div>

              {/* Consent Checkboxes */}
              <motion.div variants={fadeInUp} className="space-y-4 pt-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    name="agreeTerms"
                    required
                    className="h-4 w-4 mt-1 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                  />
                  <label
                    htmlFor="agree-terms"
                    className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                  >
                    I agree to IGFS{' '}
                    <a
                      href="/terms"
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Terms
                    </a>{' '}
                    and{' '}
                    <a
                      href="/privacy"
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    name="contactConsent"
                    className="h-4 w-4 mt-1 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                  />
                  <label
                    htmlFor="contact-consent"
                    className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Please contact me by phone, email, or SMS to assist with my
                    enquiry.
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="updates-consent"
                    name="updatesConsent"
                    className="h-4 w-4 mt-1 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                  />
                  <label
                    htmlFor="updates-consent"
                    className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                  >
                    I would like to receive updates and offers from IGFS.
                  </label>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp} className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-300 text-lg"
                >
                  Enquire Now
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