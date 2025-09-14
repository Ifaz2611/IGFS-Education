import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../constants';
import { MenuIcon, XIcon } from './icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu on window resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const activeLinkStyle = {
    color: '#F1A208',
    fontWeight: '600',
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-brand-primary/95 backdrop-blur-sm shadow-lg' 
            : 'bg-brand-primary'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.img 
                  className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 bg-white dark:bg-gray-200 rounded-full p-1 transition-transform group-hover:scale-105" 
                  src="/images/Logo/IGFS_X.jpeg" 
                  alt="IGFS Logo"
                  whileHover={{ rotate: 5 }}
                />   
                <span className="text-white text-lg sm:text-xl md:text-2xl font-bold group-hover:text-brand-secondary transition-colors">
                  IGS
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
               <div className="flex items-baseline space-x-1 xl:space-x-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="text-gray-300 hover:text-brand-secondary px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
                    style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-secondary transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                ))}
              </div>
               <div className="ml-4 xl:ml-6 flex items-center space-x-3">
                 <Link 
                   to="/contact" 
                   className="bg-[#107569] text-white font-medium py-2 px-3 xl:px-5 rounded-full text-xs xl:text-sm hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                 >
                   <span className="hidden sm:inline">Avail FREE counselling</span>
                   <span className="sm:hidden">FREE counselling</span>
                </Link>
              </div>
            </div>

            {/* Tablet Navigation */}
            <div className="hidden md:flex lg:hidden items-center">
               <div className="flex items-baseline space-x-1">
                {navLinks.slice(0, 4).map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="text-gray-300 hover:text-brand-secondary px-2 py-2 rounded-md text-xs font-medium transition-colors"
                    style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
               <div className="ml-3 flex items-center">
                 <Link 
                   to="/contact" 
                   className="bg-[#107569] text-white font-medium py-1.5 px-3 rounded-full text-xs hover:bg-opacity-90 transition-all duration-300"
                 >
                   Contact
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-all duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">{isOpen ? 'Close' : 'Open'} main menu</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    exit={{ rotate: isOpen ? 0 : 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              className="md:hidden bg-brand-primary border-t border-white/10"
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="px-4 pt-4 pb-3 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-300 hover:bg-white/10 hover:text-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border-l-4 border-transparent hover:border-brand-secondary"
                      style={({ isActive }) => (isActive ? { 
                        ...activeLinkStyle, 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderLeftColor: '#F1A208'
                      } : {})}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              
              <div className="px-4 py-4 border-t border-white/10">
                <motion.div
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navLinks.length}
                  className="flex flex-col space-y-3"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-[#107569] text-white font-medium py-3 px-4 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md"
                  >
                    Avail FREE counselling
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
