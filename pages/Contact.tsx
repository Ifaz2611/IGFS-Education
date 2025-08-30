import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

/**
 * =============================
 * Interface: ContactFormData
 * =============================
 * Defines the shape of the form data being submitted.
 * 🔹 This helps frontend and backend teams stay aligned.
 * 🔹 All fields match the form inputs exactly.
 * 🔹 `fullName` and `timestamp` are derived server-side or in payload.
 * 
 * Backend Note: Expect these fields in the POST request body.
 */
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  destination: string; // e.g., "USA", "South Korea"
  startDate: string; // e.g., "Fall 2024"
  counsellingMode: string; // "In-Person" or "Virtual"
  funding: string; // "Self-funded", "Education Loan", "Scholarship"
  studyLevel: string; // "Bachelors", "Masters", "PhD"
  contactConsent: boolean; // Opt-in for contact
  updatesConsent: boolean; // Opt-in for marketing
}

const Contact: React.FC = () => {
  // Animation variants for smooth UI
  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger child animations
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

  /**
   * ===================
   * Form State
   * ===================
   * Holds all user input.
   * 🔹 `office` field has been removed per client request.
   * 🔹 All form fields are controlled via `handleChange`.
   */
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    destination: '',
    startDate: '',
    counsellingMode: '',
    funding: '',
    studyLevel: '',
    contactConsent: false,
    updatesConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  /**
   * ===================
   * Handle Input Change
   * ===================
   * Updates form state dynamically.
   * 🔹 Handles both text inputs and checkboxes.
   * 🔹 Clears error for field when user starts typing.
   * 🔹 Uses type assertion for checkbox values.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user interacts with the field
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactFormData];
        return newErrors;
      });
    }
  };

  /**
   * ===================
   * Form Validation
   * ===================
   * Client-side validation before submission.
   * 🔹 Backend must re-validate — never trust frontend!
   * 🔹 Returns `false` if any error exists.
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.destination) newErrors.destination = 'Please select a destination';
    if (!formData.startDate) newErrors.startDate = 'Please select a start date';
    if (!formData.counsellingMode) newErrors.counsellingMode = 'Please select counselling mode';
    if (!formData.funding) newErrors.funding = 'Please select funding method';
    if (!formData.studyLevel) newErrors.studyLevel = 'Please select study level';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * ===================
   * Form Submission
   * ===================
   * Sends data to backend via POST request.
   * 🔹 Endpoint: `/api/contact` — update if needed.
   * 🔹 Payload includes derived fields: `fullName`, `timestamp`.
   * 🔹 Handles success/error states and resets form on success.
   * 🔹 Error caught and logged — user sees generic error message.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle'); // Reset status

    // Prepare payload for backend
    const payload = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      timestamp: new Date().toISOString(), // ISO format for easy parsing
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          destination: '',
          startDate: '',
          counsellingMode: '',
          funding: '',
          studyLevel: '',
          contactConsent: false,
          updatesConsent: false,
        });
      } else {
        throw new Error(`HTTP ${response.status}: Submission failed`);
      }
    } catch (error) {
      console.error('🔧 [Contact Form] Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            Reach out to us with your questions, and let's start planning your future.
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
            <div className="text-left mb-8">
              <h2 className="text-3xl font-extrabold text-brand-primary dark:text-gray-100">
                IGFS Can Help You
              </h2>
              <div className="w-16 h-1 bg-orange-500 mt-2"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Enter your details and one of our expert counsellors will reach out to you
                so we can connect you to the right course, country, university – and even scholarships!
              </p>
            </div>

            {/* Success/Error Feedback */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                Thank you! We will contact you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </motion.div>

              {/* Mobile Number */}
              <motion.div variants={fadeInUp}>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile Number*
                </label>
                <div className="mt-1 flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                  <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm dark:bg-gray-600 dark:text-gray-300">
                    +880
                  </span>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    autoComplete="tel"
                    className={`flex-1 block w-full px-4 py-3 focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white ${
                      errors.mobile ? 'border-red-500' : 'border-transparent'
                    }`}
                  />
                </div>
                {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
              </motion.div>

              {/* Study Destination & Start Date */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preferred Study Destination*
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.destination ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="USA">USA</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Italy">Italy</option>
                  </select>
                  {errors.destination && <p className="mt-1 text-sm text-red-500">{errors.destination}</p>}
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    When would you like to start?*
                  </label>
                  <select
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Fall 2024">Fall 2024</option>
                    <option value="Spring 2025">Spring 2025</option>
                    <option value="Fall 2025">Fall 2025</option>
                  </select>
                  {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                </div>
              </motion.div>

              {/* Counselling Mode & Funding */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="counsellingMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preferred Mode of Counselling*
                  </label>
                  <select
                    id="counsellingMode"
                    name="counsellingMode"
                    value={formData.counsellingMode}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.counsellingMode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                  {errors.counsellingMode && <p className="mt-1 text-sm text-red-500">{errors.counsellingMode}</p>}
                </div>
                <div>
                  <label htmlFor="funding" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    How will you fund your education?*
                  </label>
                  <select
                    id="funding"
                    name="funding"
                    value={formData.funding}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.funding ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Self-funded">Self-funded</option>
                    <option value="Education Loan">Education Loan</option>
                    <option value="Scholarship">Scholarship</option>
                  </select>
                  {errors.funding && <p className="mt-1 text-sm text-red-500">{errors.funding}</p>}
                </div>
              </motion.div>

              {/* Study Level */}
              <motion.div variants={fadeInUp}>
                <div>
                  <label htmlFor="studyLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preferred Study Level*
                  </label>
                  <select
                    id="studyLevel"
                    name="studyLevel"
                    value={formData.studyLevel}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.studyLevel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                  {errors.studyLevel && <p className="mt-1 text-sm text-red-500">{errors.studyLevel}</p>}
                </div>
              </motion.div>

              {/* Consent Checkboxes */}
              <motion.div variants={fadeInUp} className="space-y-4 pt-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    name="contactConsent"
                    checked={formData.contactConsent}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-brand-primary rounded focus:ring-brand-primary border-gray-300"
                  />
                  <label
                    htmlFor="contact-consent"
                    className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Please contact me by phone, email, or SMS to assist with my enquiry.
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="updates-consent"
                    name="updatesConsent"
                    checked={formData.updatesConsent}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-brand-primary rounded focus:ring-brand-primary border-gray-300"
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
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-8 rounded-full shadow-md text-lg text-white transition duration-300 ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Enquire Now'}
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

/**
 * =====================================================
 * 🔧 Backend Integration Guide
 * =====================================================
 * 
 * 📍 Endpoint: POST /api/contact
 * 
 * 📦 Payload Example:
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john@example.com",
 *   "mobile": "+8801712345678",
 *   "destination": "USA",
 *   "startDate": "Fall 2024",
 *   "counsellingMode": "Virtual",
 *   "funding": "Self-funded",
 *   "studyLevel": "Masters",
 *   "contactConsent": true,
 *   "updatesConsent": false,
 *   "fullName": "John Doe",
 *   "timestamp": "2025-04-05T10:00:00.000Z"
 * }
 * 
 * ✅ Required Actions on Backend:
 * 1. Re-validate all fields (never trust frontend).
 * 2. Sanitize input (prevent XSS, spam, etc.).
 * 3. Store in database (e.g., PostgreSQL, MongoDB).
 * 4. Send confirmation email to user (optional).
 * 5. Notify counsellor (Slack, email, CRM).
 * 
 * 🛠 Suggested Tech:
 * - Node.js + Express
 * - Firebase / Supabase
 * - Laravel / Django
 */