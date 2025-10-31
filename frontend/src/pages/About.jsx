import React from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiAcademicCap, HiBriefcase, HiLightBulb } from 'react-icons/hi';
import { FaReact, FaNode, FaPython, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiTensorflow, SiMongodb, SiTypescript, SiJavascript } from 'react-icons/si';

const About = () => {
  const skills = [
    {
      category: 'Frontend Development',
      icon: FaReact,
      color: 'from-blue-500 to-cyan-500',
      technologies: [
        { name: 'React', icon: FaReact, level: 95 },
        { name: 'TypeScript', icon: SiTypescript, level: 90 },
        { name: 'JavaScript', icon: SiJavascript, level: 95 },
      ]
    },
    {
      category: 'Backend Development',
      icon: FaNode,
      color: 'from-green-500 to-emerald-500',
      technologies: [
        { name: 'Node.js', icon: FaNode, level: 90 },
        { name: 'Python', icon: FaPython, level: 85 },
        { name: 'MongoDB', icon: SiMongodb, level: 80 },
      ]
    },
    {
      category: 'Machine Learning',
      icon: SiTensorflow,
      color: 'from-orange-500 to-red-500',
      technologies: [
        { name: 'TensorFlow', icon: SiTensorflow, level: 80 },
        { name: 'Python', icon: FaPython, level: 85 },
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: FaDocker,
      color: 'from-purple-500 to-pink-500',
      technologies: [
        { name: 'Docker', icon: FaDocker, level: 75 },
        { name: 'AWS', icon: FaAws, level: 70 },
        { name: 'Git', icon: FaGitAlt, level: 90 },
      ]
    }
  ];

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovation Ltd.',
      period: '2022 - Present',
      description: 'Lead development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented CI/CD pipelines.',
      achievements: [
        'Increased application performance by 40%',
        'Led team of 5 developers',
        'Implemented microservices architecture'
      ]
    },
    {
      title: 'Machine Learning Engineer',
      company: 'AI Solutions Inc.',
      period: '2021 - 2022',
      description: 'Developed and deployed ML models for predictive analytics and computer vision applications. Worked with TensorFlow, PyTorch, and cloud ML services.',
      achievements: [
        'Built recommendation systems',
        'Deployed 15+ ML models to production',
        'Improved model accuracy by 25%'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Digital Agency',
      period: '2020 - 2021',
      description: 'Created responsive web applications and interactive user interfaces. Collaborated with designers and backend developers to deliver exceptional user experiences.',
      achievements: [
        'Delivered 30+ client projects',
        'Reduced bundle size by 50%',
        'Implemented accessibility standards'
      ]
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'University of Technology',
      period: '2018 - 2020',
      description: 'Specialized in Machine Learning and Artificial Intelligence'
    },
    {
      degree: 'Bachelor of Engineering in Computer Science',
      institution: 'Engineering College',
      period: '2014 - 2018',
      description: 'Graduated with First Class Honours'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Passionate developer with expertise in full-stack development and machine learning. 
            I love creating innovative solutions that solve real-world problems.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 hover:shadow-glow-lg transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                  <HiLightBulb className="text-primary-400" />
                  My Journey
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I'm a passionate full-stack developer and machine learning engineer with over 5 years of experience 
                    creating innovative digital solutions. My journey started with curiosity about how technology can 
                    solve complex problems and has evolved into a career focused on building scalable, user-centric applications.
                  </p>
                  <p>
                    I specialize in modern web technologies like React, Node.js, and Python, with a strong focus on 
                    machine learning and AI integration. I believe in writing clean, maintainable code and creating 
                    experiences that users love.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                    or sharing knowledge through blog posts and community talks.
                  </p>
                </div>
                
                {/* Resume Download */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:shadow-glow-primary transition-all duration-200"
                >
                  <HiDownload className="w-5 h-5" />
                  Download Resume
                </motion.a>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '50+', label: 'Projects Completed' },
                  { number: '5+', label: 'Years Experience' },
                  { number: '20+', label: 'Technologies' },
                  { number: '100%', label: 'Client Satisfaction' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center p-6 bg-dark-700/50 rounded-xl border border-gray-600/50"
                  >
                    <div className="text-3xl font-bold text-primary-400 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            <HiAcademicCap className="text-primary-400" />
            Skills & Expertise
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:shadow-glow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skillCategory.color} flex items-center justify-center`}>
                    <skillCategory.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{skillCategory.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {skillCategory.technologies.map((tech, techIndex) => (
                    <div key={tech.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <tech.icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{tech.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{tech.level}%</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.level}%` }}
                          transition={{ delay: 0.5 + techIndex * 0.1, duration: 0.8 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${skillCategory.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            <HiBriefcase className="text-primary-400" />
            Professional Experience
          </h2>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 hover:shadow-glow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                        <p className="text-primary-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 bg-dark-700/50 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-400 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            <HiAcademicCap className="text-primary-400" />
            Education
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:shadow-glow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{edu.degree}</h3>
                  <p className="text-primary-400 font-medium">{edu.institution}</p>
                  <span className="text-sm text-gray-400">{edu.period}</span>
                </div>
                <p className="text-gray-300 text-sm">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;