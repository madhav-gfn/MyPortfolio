import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCode, HiMail, HiDocumentText } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/madhav-gfn', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/madhav-mishra-4a0a62286/', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
  ];

  const quickActions = [
    {
      title: 'View Projects',
      description: 'Explore my latest work',
      icon: HiCode,
      path: '/projects',
    },
    {
      title: 'Read Blogs',
      description: 'Insights and thoughts',
      icon: HiDocumentText,
      path: '/blogs',
    },
    {
      title: 'Get in Touch',
      description: 'Let\'s collaborate',
      icon: HiMail,
      path: '/contact',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 dark:text-gray-400 text-lg"
                >
                  Hello, I'm
                </motion.p>
                
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-display font-bold leading-tight"
                >
                  <span className="text-black dark:text-white">Madhav</span>
                  <br />
                  <span className="text-red-500">Mishra</span>
                </motion.h1>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light">
                    Machine Learning Engineer
                  </p>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light">
                    Full-stack Developer
                  </p>
                </motion.div>
              </div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed"
              >
                Passionate about creating innovative solutions at the intersection of AI and web development. 
                I love turning complex problems into elegant, scalable solutions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/projects"
                  className="cursor-target group px-8 py-4 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
                >
                  View Projects
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="cursor-target group px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center gap-2"
                >
                  Get In Touch
                  <HiMail className="group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex space-x-6"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="cursor-target text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Profile */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Profile Image Container */}
                <div className="relative w-80 h-96 bg-white dark:bg-black border-2 border-black dark:border-white rounded-3xl p-8">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-6xl">👨💻</div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-2xl border-2 border-black dark:border-white flex items-center justify-center"
                  >
                    <span className="text-2xl">⚡</span>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-500 rounded-xl border-2 border-black dark:border-white flex items-center justify-center"
                  >
                    <span className="text-lg">🚀</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-black dark:text-white">
              Explore My Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover my projects, thoughts, and ways to connect
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link
                  to={action.path}
                  className="cursor-target block p-8 rounded-2xl bg-white dark:bg-black border-2 border-black dark:border-white hover:shadow-glow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl bg-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black dark:text-white transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors">
                    {action.description}
                  </p>
                  <div className="mt-4 text-red-500 transition-opacity">
                    <HiArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-black dark:text-white">
              Technologies I Love
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB', 'Docker', 'AWS', 'TypeScript'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cursor-target px-4 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white rounded-full text-sm font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
