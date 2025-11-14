import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { HiX, HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub, FaCalendar } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-dark-800/90 backdrop-blur-lg border border-gray-700/50 shadow-glow-lg transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="relative"
                >
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-900/50 text-gray-400 hover:text-white hover:bg-dark-900/80 transition-all duration-200"
                    aria-label="Close modal"
                  >
                    <HiX className="w-6 h-6" />
                  </button>

                  {/* Header */}
                  <div className="p-8 pb-4">
                    <div className="flex items-start gap-6">
                      {/* Project Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                          <HiCode className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Title and Meta */}
                      <div className="flex-1 min-w-0">
                        <Dialog.Title className="text-3xl font-display font-bold text-white mb-2">
                          {project.title}
                        </Dialog.Title>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="w-4 h-4" />
                            <span>
                              {project.createdAt ? formatDate(project.createdAt) : 'Recently'}
                            </span>
                          </div>
                          {project.importedFromGithub && (
                            <span className="px-2 py-1 bg-accent-500/20 text-accent-400 text-xs rounded-md border border-accent-500/30">
                              GitHub Import
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                            >
                              <FaGithub className="w-4 h-4" />
                              <span>View Code</span>
                            </a>
                          )}
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
                            >
                              <HiExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-8 pb-8">
                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-3">About This Project</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-3">
                          {project.techStack.map((tech, index) => (
                            <motion.span
                              key={index}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-lg border border-primary-500/20 hover:bg-primary-500/20 transition-colors duration-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Modern and responsive design</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Clean and maintainable code architecture</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Optimized performance and accessibility</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Cross-platform compatibility</span>
                        </li>
                      </ul>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-dark-700/50 rounded-xl border border-gray-700/50">
                        <div className="text-2xl font-bold text-primary-400 mb-1">
                          {project.techStack?.length || 0}
                        </div>
                        <div className="text-sm text-gray-400">Technologies</div>
                      </div>
                      <div className="text-center p-4 bg-dark-700/50 rounded-xl border border-gray-700/50">
                        <div className="text-2xl font-bold text-accent-400 mb-1">
                          {project.github ? '1' : '0'}
                        </div>
                        <div className="text-sm text-gray-400">Repository</div>
                      </div>
                      <div className="text-center p-4 bg-dark-700/50 rounded-xl border border-gray-700/50">
                        <div className="text-2xl font-bold text-pink-400 mb-1">
                          {project.liveDemo ? 'Live' : 'Dev'}
                        </div>
                        <div className="text-sm text-gray-400">Status</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectModal;