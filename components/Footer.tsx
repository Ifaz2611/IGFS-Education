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
              <img className="h-10 w-10 bg-white rounded-full p-1" src="/logo.png" alt="IGFS Logo" />
              <span className="text-white text-2xl font-bold">IGFS</span>
            </div>
            <p className="text-gray-300 text-sm">Your trusted partner in navigating the journey to international education and a global career.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-brand-secondary"><FacebookIcon /></a>
              <a href="#" className="text-gray-300 hover:text-brand-secondary"><TwitterIcon /></a>
              <a href="#" className="text-gray-300 hover:text-brand-secondary"><LinkedinIcon /></a>
              <a href="#" className="text-gray-300 hover:text-brand-secondary"><InstagramIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-brand-secondary text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-secondary text-sm">Services</Link></li>
              <li><Link to="/destinations" className="text-gray-300 hover:text-brand-secondary text-sm">Destinations</Link></li>
              <li><Link to="/success-stories" className="text-gray-300 hover:text-brand-secondary text-sm">Testimonials</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-brand-secondary text-sm">Blog</Link></li>
              <li><Link to="/process" className="text-gray-300 hover:text-brand-secondary text-sm">Our Process</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-brand-secondary text-sm">Contact Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-secondary text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start"><span className="mr-2 mt-1">📍</span> 123 Education Lane, Global City, 10001</li>
              <li className="flex items-center"><span className="mr-2">📧</span> <a href="mailto:info@igfs.com" className="hover:text-brand-secondary">info@igfs.com</a></li>
              <li className="flex items-center"><span className="mr-2">📞</span> <a href="tel:+1234567890" className="hover:text-brand-secondary">+1 (234) 567-890</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} IGFS. All Rights Reserved. Your Future, Our Mission.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
