import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const summary = "Computer Science undergraduate specializing in HCI and Game Technology. Skilled in building performant systems, cross-platform applications, and gameplay mechanics.";

  const education = {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Indian Institute Of Information Technology, Nagpur',
    period: 'July 2023 – June 2027',
    gpa: '7.96',
    specialization: 'Human Computer Interaction & Gaming Technology',
    coursework: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'HCI', 'Software Engineering']
  };

  const skills = {
    'Languages': [
      { name: 'C++', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'C', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'C#', level: 60 },
      { name: 'Java', level: 40 }
    ],
    'Web & Backend': [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 80 },
      { name: 'React', level: 65 }
    ],
    'Databases': [
      { name: 'MSSQL', level: 80 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 80 }
    ],
    'Game Development': [
      { name: 'Unity', level: 85 },
      { name: 'Unreal', level: 85 },
      { name: 'Gameplay Systems', level: 85 }
    ],
    'Cloud & DevOps': [
      { name: 'Git', level: 90 },
      { name: 'Agile/DevOps', level: 80 },
      { name: 'Oracle Cloud', level: 70 },
      { name: 'Google Cloud', level: 65 }
    ]
  };

  const projects = [
    {
      title: 'GamesLog: Social Gaming Tracker',
      period: 'Dec 2025 – Present',
      description: 'Relational backend for user libraries, play sessions, reviews, and social feeds with normalized PostgreSQL tables.',
      tech: ['Node.js', 'PostgreSQL', 'Prisma', 'JWT'],
      highlights: ['JWT authentication', 'Analytics endpoints', 'Paginated feeds']
    },
    {
      title: 'L-Systems & IFS Studio',
      period: 'Nov 2025 – Present',
      description: 'Procedural art generator combining stochastic L-Systems with IFS-based fractals.',
      tech: ['Python', 'Streamlit', 'NumPy', 'PIL'],
      highlights: ['Real-time preview', '0.2–1.5s generation', 'SVG/PNG export']
    },
    {
      title: 'Task Scheduling in Cloud Computing',
      period: 'Sep 2024 – Oct 2024',
      description: 'MAC-HDE algorithm implementation for heterogeneous cloud task scheduling.',
      tech: ['Python', 'SQLite'],
      highlights: ['15–16% performance improvement']
    }
  ];

  const achievements = [
    { title: '1st Place', event: 'TECHNEX\'25 Game Jam', org: 'IIT BHU', detail: 'Deception-driven tower defense' },
    { title: '1st Prize', event: 'Tantarfiesta\'25 Designathon', org: 'UI/UX Hackathon', detail: 'Emotion-based journaling app' },
    { title: '3rd Runner-Up', event: 'Exergy Case Study Challenge', org: 'IIT Kanpur', detail: '2025' }
  ];

  const certifications = [
    { name: 'Introduction to Game Design', issuer: 'Epic Games', id: 'EIDMET191FFV' },
    { name: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate', issuer: 'Oracle', link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=02AA11BCE15CE27577B203DF581341C6CA5E2A94D689CD2752ECF51512BE3034' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-20"
        >
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-white">Madhav</span>
              <span className="text-red-500"> Mishra</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">{summary}</p>
          </div>
        </motion.div>

        {/* Education & Quick Stats */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 hover:shadow-glow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{education.degree}</h3>
                  <p className="text-red-500 font-medium text-lg">{education.institution}</p>
                  <p className="text-gray-400 text-sm mt-1">{education.period}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-500">{education.gpa}</div>
                  <div className="text-xs text-gray-400">GPA</div>
                </div>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-sm">
                  {education.specialization}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course, idx) => (
                  <span key={idx} className="text-xs bg-dark-700/50 text-gray-300 px-3 py-1 rounded-lg">
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Projects', value: '15+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Achievements', value: '3' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:shadow-glow-lg transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-red-500 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Grid */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold mb-8">Technical Arsenal</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, techs], idx) => (
              <motion.div
                key={category}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:shadow-glow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-4 text-red-500">{category}</h3>
                <div className="space-y-3">
                  {techs.map((tech) => (
                    <div key={tech.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{tech.name}</span>
                        <span className="text-xs text-gray-500">{tech.level}%</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.level}%` }}
                          transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                          className="h-1.5 rounded-full bg-red-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold mb-8">Featured Projects</h2>
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:shadow-glow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-dark-700/50 px-3 py-1 rounded-full mt-2 md:mt-0 self-start">
                    {project.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/30">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-400">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements & Certifications */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((ach, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-5 hover:shadow-glow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1 text-red-500 font-bold text-sm whitespace-nowrap">
                        {ach.title}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">{ach.event}</h4>
                        <p className="text-gray-400 text-xs">{ach.org} • {ach.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold mb-8">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-5 hover:shadow-glow-lg transition-all duration-300"
                  >
                    <h4 className="text-white font-semibold text-sm mb-2">{cert.name}</h4>
                    <p className="text-gray-400 text-xs mb-2">{cert.issuer}</p>
                    {cert.link ? (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-red-500 text-xs hover:text-red-400 transition-colors">
                        View Credential →
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">ID: {cert.id}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Interests Footer */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-display font-bold mb-6">Areas of Interest</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Scalable Systems', 'HCI', 'Game Design', 'Performance Optimization'].map((interest, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="px-5 py-2 bg-dark-800/50 border border-red-500/30 rounded-full text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;
