import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiX, HiEye } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { useProjects, useGithubPortfolioProjects } from '../hooks/useApi';
import Loader from '../components/Loader';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const projectsSource = import.meta.env.VITE_PROJECTS_SOURCE;
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
  const useGithubSource = projectsSource === 'github';

  const { data: projects, isLoading, error } = useProjects({ enabled: !useGithubSource });
  const {
    data: githubProjects,
    isLoading: isGithubLoading,
    error: githubError,
  } = useGithubPortfolioProjects(githubUsername, { enabled: useGithubSource });

  const normalizedGithubProjects = githubProjects?.items?.map((repo) => ({
    id: repo.id,
    title: repo.name,
    description: repo.description || 'No description provided yet.',
    github: repo.html_url,
    liveDemo: repo.homepage || '',
    techStack: repo.topics || [],
    createdAt: repo.created_at,
    importedFromGithub: true,
  }));

  const activeProjects = useGithubSource ? normalizedGithubProjects : projects;
  const activeLoading = useGithubSource ? isGithubLoading : isLoading;
  const activeError = useGithubSource ? githubError : error;
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const allTechs = activeProjects
    ? [...new Set(activeProjects.flatMap(project => project.techStack || []))]
    : [];
  const filters = ['all', ...allTechs.slice(0, 6)];

  const filteredProjects = activeProjects?.filter(project => 
    filter === 'all' || project.techStack?.includes(filter)
  ) || [];

  const hasMissingTopics = useGithubSource
    ? activeProjects?.some(project => !project.techStack || project.techStack.length === 0)
    : false;

  if (activeLoading) return <Loader />;
  if (activeError) {
    const errorStatus = activeError?.response?.status || activeError?.status;
    const isRateLimited = useGithubSource && errorStatus === 403;
    return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-lg mb-4">
          {isRateLimited ? 'GitHub API rate limit reached' : 'Failed to load projects'}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {isRateLimited
            ? 'Add a GitHub token or try again later.'
            : 'Please try again later'}
        </p>
      </div>
    </div>
  );
  }

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
            My <span className="text-red-500">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
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
              className={`cursor-target px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === tech
                  ? 'bg-red-500 text-white'
                  : 'bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-red-500'
              }`}
            >
              {tech === 'all' ? 'All Projects' : tech}
            </button>
          ))}
        </motion.div>

        {useGithubSource && hasMissingTopics && (
          <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-600 dark:text-amber-200">
            Some repositories do not expose topics yet. Add GitHub topics to improve filtering.
          </div>
        )}

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
                key={project._id || project.id || project.github}
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
            <HiCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">No projects found for this filter</p>
            <button
              onClick={() => setFilter('all')}
              className="cursor-target mt-4 text-red-500 font-medium hover:text-red-600"
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
      className="cursor-target relative bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl border border-black/20 dark:border-white/20 hover:shadow-glow-lg transition-all duration-300 overflow-hidden group"
    >
      {/* Project Thumbnail */}
      <div className="aspect-video bg-red-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <HiCode className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-red-500/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <HiEye className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">View Details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-black dark:text-white transition-colors line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded-md border border-red-500/30"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="px-2 py-1 text-gray-500 text-xs">
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
              className="cursor-target flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
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
              className="cursor-target flex items-center gap-2 text-black dark:text-white hover:text-red-500 transition-colors"
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
