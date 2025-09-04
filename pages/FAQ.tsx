import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does IGFS offer?",
      answer:
        "IGFS provides end-to-end support including career counseling, university shortlisting, application assistance, visa guidance, financial planning, and pre-departure orientation.",
    },
    {
      question: "Which countries do you help students apply to?",
      answer:
        "We assist students in applying to top universities in the USA, Italy, South Korea.",
    },
    {
      question: "Do you help with scholarships and education loans?",
      answer:
        "Yes! We guide students through scholarship applications and connect them with trusted financial institutions for education loans.",
    },
    {
      question: "How much does your counseling service cost?",
      answer:
        "Our fees are transparent and vary based on the package. We offer free initial consultations to assess your needs.",
    },
    {
      question: "Can you help if my profile is average?",
      answer:
        "Absolutely. We specialize in maximizing potential and finding the best-fit universities for every academic background.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl font-bold text-brand-primary dark:text-brand-secondary"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-5 pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Footer Contact */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Still have questions?{" "}
              <a
                href="/#/contact"
                className="text-brand-secondary hover:underline font-semibold"
              >
                Contact us
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
