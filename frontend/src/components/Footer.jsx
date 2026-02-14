import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaMedium, FaInstagram } from 'react-icons/fa';
import { HiMail, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/madhav-gfn', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/madhav-gfn', label: 'LinkedIn' },
    { icon: FaMedium, href: 'https://medium.com/@madmishra72', label: 'Medium' },
    { icon: FaInstagram, href: 'https://www.instagram.com/madhav.__mishra/', label: 'Instagram' },
  ];

  return (
    <footer className="relative z-10 bg-black border-t-2 border-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <Link
                  to="/"
                  className="cursor-target text-2xl font-display font-bold"
                >
                  <span className="text-white">Madhav</span> <span className="text-red-500">Mishra</span>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 leading-relaxed mb-6 max-w-md"
              >
                Passionate full-stack developer and game dev creating
                innovative digital solutions that make a difference. Let's build something amazing together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3 text-gray-400">
                  <HiMail className="w-4 h-4 text-red-500" />
                  <a
                    href="mailto:madmishra72@gmail.com"
                    className="cursor-target text-gray-400 hover:text-red-500 transition-colors"
                  >
                    madmishra72@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <HiLocationMarker className="w-4 h-4 text-red-500" />
                  <span>Nagpur, Maharashtra, India</span>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold text-white mb-6"
              >
                Quick Links
              </motion.h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="cursor-target text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-lg font-semibold text-white mb-6"
              >
                Connect
              </motion.h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="cursor-target w-10 h-10 bg-black border-2 border-white rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
