import React, { useState, useEffect, useRef } from 'react';
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
  const navRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: homeIcon },
    { path: '/projects', label: 'Projects', icon: projectsIcon },
    { path: '/blogs', label: 'Blogs', icon: blogIcon },
    { path: '/about', label: 'About', icon: aboutIcon },
    { path: '/contact', label: 'Contact', icon: contactIcon },
  ];

  useEffect(() => {
    setIsOpen(false);
    setIsExpanded(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Navbar - Right Side Vertical */}
      {!isMobile && (
        <motion.nav
          ref={navRef}
          initial={{ x: 100 }}
          animate={{ x: 0, width: isExpanded ? 200 : 80 }}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          aria-expanded={isExpanded}
          className="fixed right-0 top-0 h-full z-50 bg-black/90 backdrop-blur-lg border-l border-white/20 flex flex-col items-center justify-center transition-all duration-300"
        >
          {/* Logo */}
          <motion.div className="absolute top-8">
            <Link
              to="/"
              className="text-xl font-display font-bold text-white group"
            >
              {isExpanded ? (
                <span>
                  <span className="text-white">Madhav</span> <span className="text-red-500">Mishra</span>
                </span>
              ) : (
                'M'
              )}
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-col items-center space-y-6 w-full">
            {navItems.map((item) => {
              return (
                <motion.div key={item.path} className="w-full flex justify-center">
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg font-medium transition-all duration-200 relative ${location.pathname === item.path
                      ? 'text-white bg-white/10'
                      : 'text-gray-300'
                      } ${isExpanded ? 'w-[160px] px-4 justify-start space-x-3' : 'w-12 justify-center'}`}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`transition-all duration-200 filter brightness-0 invert flex-shrink-0 ${isExpanded ? 'w-6 h-6' : 'w-5 h-5'
                        }`}
                    />

                    <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                      <span className="text-sm whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.nav>
      )}

      {/* Mobile Navbar - Bottom Horizontal */}
      {isMobile && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/20"
        >
          <div className="flex items-center justify-around px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${location.pathname === item.path
                  ? 'text-red-500'
                  : 'text-gray-400'
                  }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-6 h-6 filter brightness-0 invert transition-all duration-200 ${location.pathname === item.path ? 'opacity-100' : 'opacity-60'
                    }`}
                  style={location.pathname === item.path ? { filter: 'invert(44%) sepia(89%) saturate(6492%) hue-rotate(347deg) brightness(98%) contrast(94%)' } : {}}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Navbar;
