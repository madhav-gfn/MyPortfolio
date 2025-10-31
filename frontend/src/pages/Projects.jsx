import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiX, HiEye } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { useProjects } from '../hooks/useApi';
import Loader from '../components/Loader';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  // Extract unique tech stack items for filtering
  const allTechs = projects ? [...new Set(projects.flatMap(project => project.techStack))] : [];
  const filters = ['all', ...allTechs.slice(0, 6)]; // Limit to 6 most common techs

  const filteredProjects = projects?.filter(project => 
    filter === 'all' || project.techStack.includes(filter)
  ) || [];

  if (isLoading) return <Loader />;
  if (error) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400 text-lg mb-4">Failed to load projects</p>
        <p className="text-gray-400">Please try again later</p>
      </div>
    </div>
  );

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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack development, 
            machine learning, and creative problem solving.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === tech
                  ? 'bg-primary-500 text-white shadow-glow-primary'
                  : 'bg-dark-700/50 text-gray-300 hover:bg-primary-500/20 hover:text-primary-400 border border-gray-600/50'
              }`}
            >
              {tech === 'all' ? 'All Projects' : tech}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <HiCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No projects found for this filter</p>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 text-primary-400 hover:text-primary-300 font-medium"
            >
              Show all projects
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 overflow-hidden group hover:shadow-glow-lg"
    >
      {/* Project Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-accent-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <HiCode className="w-12 h-12 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary-500/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <HiEye className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">View Details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-md border border-primary-500/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="px-2 py-1 text-gray-400 text-xs">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors"
            >
              <HiExternalLink className="w-4 h-4" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;