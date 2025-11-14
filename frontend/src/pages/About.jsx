import React from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiAcademicCap, HiBriefcase, HiLightBulb } from 'react-icons/hi';
import { FaReact, FaNode, FaPython, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiTensorflow, SiMongodb, SiTypescript, SiJavascript } from 'react-icons/si';

const About = () => {
  // Summary
  const summary = (
    <>
      Computer Science undergraduate at <b>Indian Institute of Information Technology, Nagpur</b>, specializing in <b>Human–Computer Interaction and Game Technology</b>. I'm passionate about building performant systems, cross-platform applications, and interactive game experiences. With a strong foundation in data structures, algorithms, and software design, I'm eager to apply my technical and creative skills to solve real-world challenges.
    </>
  );

  // Education
  const education = [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Indian Institute Of Information Technology, Nagpur',
      period: 'August 2023 – Present',
      description: 'Specialization: Human Computer Interaction & Gaming Technology\nRelevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Human Computer Interaction, Software Engineering'
    }
  ];

  // Skills
  const skills = [
    {
      category: 'Languages',
      technologies: [
        { name: 'Python', level: 95 },
        { name: 'Java', level: 90 },
        { name: 'JavaScript', level: 90 },
        { name: 'C++', level: 85 },
        { name: 'C', level: 80 },
        { name: 'C#', level: 80 },
      ]
    },
    {
      category: 'Web & Backend',
      technologies: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'React', level: 90 },
        { name: 'HTML/CSS/Bootstrap', level: 90 },
      ]
    },
    {
      category: 'Databases',
      technologies: [
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 80 },
        { name: 'SQL', level: 80 },
        { name: 'File I/O', level: 75 },
      ]
    },
    {
      category: 'Systems & Design',
      technologies: [
        { name: 'Scalable storage & query concepts', level: 80 },
        { name: 'Modular architecture', level: 85 },
        { name: 'OOP', level: 90 },
      ]
    },
    {
      category: 'Cloud & Tools',
      technologies: [
        { name: 'AWS', level: 70 },
        { name: 'Azure', level: 65 },
        { name: 'Google Cloud', level: 65 },
        { name: 'Git', level: 90 },
        { name: 'Agile/DevOps', level: 80 },
      ]
    },
    {
      category: 'Other',
      technologies: [
        { name: 'Unity', level: 80 },
        { name: 'Game systems', level: 80 },
        { name: 'Performance-focused engineering', level: 85 },
      ]
    }
  ];

  // Projects
  const experience = [
    {
      title: 'Dual Front — Tactical Tower Defense',
      company: 'TECHNEX\'25 Game Jam Winner (IIT BHU)',
      period: 'March 2025',
      description: 'A deception-driven tower defense game built in Unity (C#). Designed modular architecture, engineered wave-based defense mechanics, tuned game economy and spells, and led playtest-driven balancing.',
      achievements: [
        'Winner, TECHNEX\'25 Game Jam',
        'Improved strategic depth by 20% in playtests',
        'Led feature implementation and balancing'
      ]
    },
    {
      title: 'CineNeon — Cross-Platform App',
      company: 'Personal Project',
      period: 'April 2025 – Present',
      description: 'High-performance Flutter app for web and mobile using clean architecture. Optimized for fast UI transitions and automated tests.',
      achievements: [
        'Built using clean architecture principles',
        'Sub-200 ms screen loads',
        'Nix-based environment configuration'
      ]
    },
    {
      title: 'Task Scheduling in Cloud Computing',
      company: 'Research Project',
      period: 'Sep 2024 – Oct 2024',
      description: 'Implemented MAC-HDE algorithm for optimizing task scheduling in heterogeneous cloud environments. Designed modules for adaptive scheduling and Gantt chart visualization.',
      achievements: [
        'Achieved 15–20% improvement in makespan and waiting time',
        'Technologies: Python, NumPy, pandas, matplotlib'
      ]
    }
  ];

  // Achievements
  const achievements = [
    '🥇 Winner, TECHNEX\'25 Game Jam (IIT BHU) — Deception-driven tower defense design',
    '🥇 Winner, Tantarfiesta\'25 Designathon (UI/UX Hackathon) — Non-linear, emotion-based journaling app design (Figma Prototype)'
  ];

  // Certifications
  const certifications = [
    {
      name: 'Introduction to Game Design',
      issuer: 'Epic Games',
      credential: 'EIDMET191FFV',
      period: 'October 2023 – December 2023'
    }
  ];

  // Interests
  const interests = [
    'Scalable systems',
    'Human-Computer Interaction',
    'Game design',
    'Performance optimization'
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
            {summary}
          </p>
        </motion.div>

        {/* Education */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            🎓 Education
          </h2>
          <div className="grid md:grid-cols-1 gap-8">
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
                <p className="text-gray-300 text-sm whitespace-pre-line">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            💻 Technical Skills
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
                <h3 className="text-xl font-semibold mb-6">{skillCategory.category}</h3>
                <div className="space-y-4">
                  {skillCategory.technologies.map((tech, techIndex) => (
                    <div key={tech.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{tech.name}</span>
                        <span className="text-sm text-gray-400">{tech.level}%</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.level}%` }}
                          transition={{ delay: 0.5 + techIndex * 0.1, duration: 0.8 }}
                          className="h-2 rounded-full bg-primary-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects/Experience Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            🚀 Featured Projects
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

        {/* Achievements */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            🏆 Achievements
          </h2>
          <ul className="space-y-4 text-lg text-gray-300 text-center">
            {achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            📜 Certifications
          </h2>
          <ul className="space-y-4 text-lg text-gray-300 text-center">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                <b>{cert.name}</b> — {cert.issuer}<br />
                <span className="text-sm text-gray-400">Credential ID: {cert.credential} | {cert.period}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Interests */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            🎯 Interests
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {interests.map((interest, idx) => (
              <span key={idx} className="px-4 py-2 bg-dark-700/50 border border-primary-500/30 rounded-full text-sm font-medium">
                {interest}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;