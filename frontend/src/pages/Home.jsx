import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaMedium, FaInstagram } from 'react-icons/fa';
import {
  SiPython, SiCplusplus, SiOpencv, SiUnrealengine,
  SiUnity, SiNodedotjs, SiMongodb
} from 'react-icons/si';
import { HiSparkles, HiCube, HiEye } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Lanyard from '../components/Lanyard';

// Import icons
import projectsIcon from '../../icons/projects.png';
import blogIcon from '../../icons/blog.png';
import contactIcon from '../../icons/contactme.png';

const Home = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('homeVisited')) {
      sessionStorage.setItem('homeVisited', 'true');
      toast('Try Game of Life by clicking the skull on top left corner', {
        duration: 5000,
        icon: '💀',
      });
    }
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/madhav-gfn', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/madhav-gfn', label: 'LinkedIn' },
    { icon: FaMedium, href: 'https://medium.com/@madmishra72', label: 'Medium' },
    { icon: FaInstagram, href: 'https://www.instagram.com/madhav.__mishra/', label: 'Instagram' },
  ];

  const quickActions = [
    {
      title: 'Projects',
      description: 'Explore my latest work',
      icon: projectsIcon,
      path: '/projects',
    },
    {
      title: 'Blogs',
      description: 'Insights and thoughts',
      icon: blogIcon,
      path: '/blogs',
    },
    {
      title: 'Get in Touch',
      description: 'Let\'s collaborate',
      icon: contactIcon,
      path: '/contact',
    },
  ];


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-black text-white"
    >
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Element - Minimal */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center items-start">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-9xl font-display font-bold leading-none tracking-tighter"
                >
                  MADHAV
                  <br />
                  <span className="text-red-500">MISHRA</span>
                </motion.h1>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col md:flex-row gap-4 md:gap-8 text-xl md:text-2xl font-light text-gray-400"
                >
                  <span>Full Stack Developer</span>
                  <span className="hidden md:inline text-red-500">•</span>
                  <span>Game Dev</span>
                  <span className="hidden md:inline text-red-500">•</span>
                  <span>Gen AI enthusiast</span>
                </motion.div>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-500 max-w-xl leading-relaxed pt-4"
                >
                  Crafting immersive digital experiences and intelligent systems.
                  Pushing the boundaries of what's possible with code.
                </motion.p>

                {/* Social Links */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex space-x-6 pt-6"
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="cursor-target text-gray-500 hover:text-white transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Lanyard */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="block h-[50vh] sm:h-[60vh] lg:h-[80vh] relative"
            >
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 border-b border-white/10 pb-4"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Explore My Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={action.path}
                  className="cursor-target block p-8 h-full border border-white/10 hover:border-red-500/50 bg-white/5 hover:bg-white/10 transition-all duration-300 relative overflow-hidden rounded-3xl"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <img src={action.icon} alt={action.title} className="w-24 h-24 filter brightness-0 invert" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="w-12 h-12 mb-6 filter brightness-0 invert">
                        <img src={action.icon} alt={action.title} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {action.title}
                      </h3>
                      <p className="text-gray-400">
                        {action.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center text-red-500 font-medium group-hover:translate-x-2 transition-transform">
                      <span>Enter</span>
                      <HiArrowRight className="ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
              Technologies I Love
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { name: 'Python', icon: SiPython },
              { name: 'C++', icon: SiCplusplus },
              { name: 'OpenCV', icon: SiOpencv },
              { name: 'Gen AI', icon: HiSparkles },
              { name: 'Unreal Engine', icon: SiUnrealengine },
              { name: 'Unity', icon: SiUnity },
              { name: 'AR', icon: HiCube },
              { name: 'VR', icon: HiEye },
              { name: 'Node.js', icon: SiNodedotjs },
              { name: 'MongoDB', icon: SiMongodb },
            ].map((tech, index) => (
              <motion.span
                key={tech.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="cursor-default inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full text-lg font-medium hover:bg-red-500 hover:border-red-500 transition-all duration-300"
              >
                <tech.icon className="w-5 h-5" />
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
