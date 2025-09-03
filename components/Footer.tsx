import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
} from "./icons"; // keep existing icons

// New X (Twitter) icon
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="inline-block"
  >
    <path d="M18.244 2H21.5l-7.437 8.5L22 22h-6.933l-5.409-7.08L4.244 22H1l7.849-8.958L2 2h6.933l4.939 6.607L18.244 2z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-brand-primary text-white relative z-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                className="h-12 w-12 rounded-full border-2 border-white object-cover"
                src="/images/Logo/IGFS_X.jpeg"
                alt="IGFS Logo"
              />
              <span className="text-white text-2xl font-bold tracking-wide">
                IGFS
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in navigating the journey to international
              education and a global career.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-5">
              <a
                href="https://www.facebook.com/profile.php?id=61578832565528"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="p-2 rounded-full bg-white/10 hover:bg-brand-secondary transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="#" // Add X profile link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X"
                className="p-2 rounded-full bg-white/10 hover:bg-brand-secondary transition-colors"
              >
                <XIcon />
              </a>
              <a
                href="#" // Add LinkedIn link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="p-2 rounded-full bg-white/10 hover:bg-brand-secondary transition-colors"
              >
                <LinkedinIcon />
              </a>
              <a
                href="#" // Add Instagram link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="p-2 rounded-full bg-white/10 hover:bg-brand-secondary transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/process"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">📍</span>
                <span>Amtola, 60 Feet, Mirpur-1216</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:intguideforstudents@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  intguideforstudents@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a
                  href="tel:+8801835152037"
                  className="hover:text-white transition-colors"
                >
                  +88 (01835-152037)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center text-xs sm:text-sm text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} IGFS. All Rights Reserved.{" "}
            <span className="hidden sm:inline">Your Future, Our Mission.</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
