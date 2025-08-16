import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navLinks } from '../constants';
import { MenuIcon, XIcon } from './icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLinkStyle = {
    color: '#F1A208',
    fontWeight: '600',
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'bg-brand-primary shadow-lg' : 'bg-brand-primary'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img className="h-10 w-10 bg-white dark:bg-gray-200 rounded-full p-1" src="/logo.png" alt="IGFS Logo" />
                <span className="text-white text-2xl font-bold">IGFS</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center">
               <div className="flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="text-gray-300 hover:text-brand-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
               <div className="ml-6 flex items-center space-x-3">
                 <Link to="/contact" className="bg-[#107569] text-white font-medium py-2 px-5 rounded-full text-sm hover:bg-opacity-90 transition-all duration-300">
                  Avail FREE counselling
                </Link>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-brand-primary" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  style={({ isActive }) => (isActive ? { ...activeLinkStyle, backgroundColor: '#374151' } : {})}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
             <div className="px-5 py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-[#107569] text-white font-medium py-2 px-4 rounded-full"
                >
                  Avail FREE counselling
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;