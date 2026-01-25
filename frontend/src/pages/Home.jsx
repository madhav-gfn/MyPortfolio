import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCode, HiMail, HiDocumentText } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const profileImage = "https://your-new-image-url.com/photo.jpg"; // <-- update to your actual photo URL

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
      gradient: 'from-primary-500 to-purple-600',
    },
    {
      title: 'Read Blogs',
      description: 'Insights and thoughts',
      icon: HiDocumentText,
      path: '/blogs',
      gradient: 'from-accent-500 to-green-600',
    },
    {
      title: 'Get in Touch',
      description: 'Let\'s collaborate',
      icon: HiMail,
      path: '/contact',
      gradient: 'from-pink-500 to-orange-500',
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
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse"></div>
              <img
                src={profileImage}
                alt="Profile"
                className="relative w-full h-full rounded-full object-cover border-4 border-white/20 shadow-glow-primary animate-float"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-primary-500/20"></div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Madhav Mishra
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Machine Learning Engineer • Full-stack Tinkerer • Curious Creator
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Passionate about creating innovative solutions at the intersection of AI and web development. 
            I love turning complex problems into elegant, scalable solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/projects"
              className="cursor-target group px-8 py-4 bg-black border border-white text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2"
            >
              View Projects
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="cursor-target group px-8 py-4 border border-white text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2"
            >
              Get In Touch
              <HiMail className="group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Explore My Work
            </h2>
            <p className="text-gray-400 text-lg">
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
                  className="cursor-target block p-8 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 transition-colors">
                    {action.description}
                  </p>
                  <div className="mt-4 text-white transition-opacity">
                    <HiArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
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
                className="cursor-target px-4 py-2 bg-dark-700/50 border border-white/30 rounded-full text-sm font-medium transition-all duration-200"
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