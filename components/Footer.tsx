import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-brand-primary text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                className="h-10 w-10 bg-white rounded-full p-1"
                // logo here
                src="/images/Logo/IGFS_X.jpeg"
                alt="IGFS Logo"
              />
              <span className="text-white text-2xl font-bold">IGFS</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner in navigating the journey to international education and a global career.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61578832565528"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="text-gray-300 hover:text-brand-secondary transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.twitter.com/igfs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="text-gray-300 hover:text-brand-secondary transition-colors"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/igfs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="text-gray-300 hover:text-brand-secondary transition-colors"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.instagram.com/igfs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-gray-300 hover:text-brand-secondary transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  Destinations
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/success-stories"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  Testimonials
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/process"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              {/* ✅ Fixed: Internal Link to FAQ Page */}
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-brand-secondary text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <span>123 Education Lane, Global City, 10001</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:info@igfs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-secondary transition-colors"
                >
                  info@igfs.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a
                  href="tel:+1234567890"
                  className="hover:text-brand-secondary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} IGFS. All Rights Reserved.{' '}
            <span className="hidden sm:inline">Your Future, Our Mission.</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;