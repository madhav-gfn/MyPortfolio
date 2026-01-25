import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

// Import custom icons
import homeIcon from '../../icons/home.svg';
import projectsIcon from '../../icons/projects.png';
import blogIcon from '../../icons/blog.png';
import aboutIcon from '../../icons/about.svg';
import contactIcon from '../../icons/contactme.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: homeIcon },
    { path: '/projects', label: 'Projects', icon: projectsIcon },
    { path: '/blogs', label: 'Blogs', icon: blogIcon },
    { path: '/about', label: 'About', icon: aboutIcon },
    { path: '/contact', label: 'Contact', icon: contactIcon },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ x: 100 }}
      animate={{ x: 0, width: isExpanded ? 200 : 80 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="fixed right-0 top-0 h-full z-50 bg-black/90 backdrop-blur-lg border-l border-white/20 flex flex-col items-center justify-center transition-all duration-300"
    >
      {/* Logo */}
      <motion.div
        className="absolute top-8"
      >
        <Link
          to="/"
          className="cursor-target text-xl font-display font-bold text-white"
        >
          {isExpanded ? 'Portfolio' : 'P'}
        </Link>
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-col items-center space-y-6">
        {navItems.map((item) => {
          return (
            <motion.div key={item.path}>
              <Link
                to={item.path}
                className={`cursor-target flex items-center p-3 rounded-lg font-medium transition-all duration-200 relative ${
                  location.pathname === item.path
                    ? 'text-white bg-white/10'
                    : 'text-gray-300'
                } ${isExpanded ? 'w-40 justify-start space-x-3' : 'w-12 justify-center'}`}
              >
                <img 
                  src={item.icon}
                  alt={item.label}
                  className={`transition-all duration-200 filter brightness-0 invert ${
                    isExpanded ? 'w-6 h-6' : 'w-5 h-5'
                  }`} 
                />
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile menu button - hidden on desktop */}
      <div className="md:hidden absolute bottom-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-target p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8"
          >
            {navItems.map((item, index) => {
              return (
                <motion.div
                  key={item.path}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`cursor-target flex items-center space-x-3 px-6 py-3 rounded-md text-lg font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-white bg-white/10'
                        : 'text-gray-300'
                    }`}
                  >
                    <img 
                      src={item.icon}
                      alt={item.label}
                      className="w-6 h-6 filter brightness-0 invert" 
                    />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;