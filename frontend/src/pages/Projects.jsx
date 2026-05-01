import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiEye } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import Loader from '../components/Loader';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      if (!githubUsername) {
        setError(new Error('GitHub username not configured'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('GitHub API rate limit reached');
          }
          throw new Error('Failed to load GitHub projects.');
        }

        const repos = await response.json();

        // Filter relevant repos first to minimize API calls for languages
        const relevantRepos = repos.filter(repo =>
          repo.topics?.some(t => t.toLowerCase() === 'portfolio' || t.toLowerCase() === 'others')
        );

        const formattedProjects = await Promise.all(
          relevantRepos.map(async (repo) => {
            let languages = [];
            try {
              const langRes = await fetch(repo.languages_url, {
                headers: { Accept: 'application/vnd.github+json' }
              });
              if (langRes.ok) {
                const langData = await langRes.json();
                languages = Object.keys(langData);
              }
            } catch (err) {
              console.error(`Failed to fetch languages for ${repo.name}`, err);
            }

            const techStack = languages.length > 0
              ? languages
              : (repo.topics?.length ? repo.topics.filter(t => t.toLowerCase() !== 'portfolio' && t.toLowerCase() !== 'others') : repo.language ? [repo.language] : []);

            return {
              id: repo.id,
              title: repo.name,
              description: repo.description || 'No description provided.',
              techStack: techStack,
              topics: repo.topics || [],
              github: repo.html_url,
              liveDemo: repo.homepage || '',
              createdAt: repo.created_at,
            };
          })
        );

        setProjects(formattedProjects);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [githubUsername]);

  // Separate projects into featured (portfolio-tagged) and others
  const featuredProjects = projects.filter(project =>
    project.topics?.some(topic => topic.toLowerCase() === 'portfolio')
  );
  const otherProjects = projects.filter(project =>
    project.topics?.some(topic => topic.toLowerCase() === 'others')
  );

  // Get unique tech tags from other projects
  const otherTechs = otherProjects.length > 0
    ? [...new Set(otherProjects.flatMap(project => project.techStack || []))].slice(0, 6)
    : [];
  const filters = ['all', ...otherTechs];

  // Filter applies only to the "Other Projects" section
  const filteredOtherProjects = otherProjects.filter(project =>
    filter === 'all' || project.techStack?.includes(filter)
  );


  if (isLoading) return <Loader />;
  if (error) {
    const isRateLimited = error.message.includes('rate limit');
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">
            {isRateLimited ? 'GitHub API rate limit reached' : 'Failed to load projects'}
          </p>
          <p className="text-gray-400">
            {isRateLimited
              ? 'Please try again later.'
              : error.message || 'Please try again later'}
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills in distributed systems,
            AI/LLM engineering, and full-stack development.
          </p>
        </motion.div>



        {/* Featured Projects Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              <span className="text-red-500">Featured</span> Projects
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id || project.github}
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
                      featured
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No featured projects yet. Add the "portfolio" topic to your GitHub repos to feature them here.</p>
            </div>
          )}
        </motion.div>

        {/* Other Projects Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-300">
              Other Projects
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
          </div>

          {/* Filter Buttons for Other Projects */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`cursor-target px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === tech
                  ? 'bg-gray-300 text-black'
                  : 'bg-black text-white border border-white/20 hover:border-gray-500'
                  }`}
              >
                {tech === 'all' ? 'All' : tech}
              </button>
            ))}
          </div>

          {/* Other Projects Grid */}
          {filteredOtherProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {filteredOtherProjects.map((project, index) => (
                  <motion.div
                    key={project.id || project.github}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
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
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HiCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">No projects found for this filter</p>
              <button
                onClick={() => setFilter('all')}
                className="cursor-target mt-3 text-gray-400 font-medium hover:text-gray-200"
              >
                Show all projects
              </button>
            </motion.div>
          )}
        </motion.div>
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
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
  const [imgSrc, setImgSrc] = React.useState(
    `https://raw.githubusercontent.com/${githubUsername}/${project.title}/main/preview/thumbnail.png`
  );
  const [imgFailed, setImgFailed] = React.useState(false);

  const handleImgError = () => {
    if (imgSrc.includes('preview/thumbnail.png')) {
      // Fallback to OpenGraph image
      setImgSrc(`https://opengraph.githubassets.com/1/${githubUsername}/${project.title}`);
    } else {
      // Both failed, show placeholder
      setImgFailed(true);
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-target relative bg-black/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-glow-lg transition-all duration-300 overflow-hidden group"
    >
      {/* Project Thumbnail */}
      <div className="aspect-video bg-red-500/10 relative overflow-hidden">
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt={project.title}
            onError={handleImgError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <HiCode className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </>
        )}

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
        <h3 className="text-xl font-semibold mb-2 text-white transition-colors line-clamp-1">
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
              className="cursor-target flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
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
              className="cursor-target flex items-center gap-2 text-white hover:text-red-500 transition-colors"
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
