import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { HiX, HiCalendar, HiUser, HiClock } from 'react-icons/hi';

const BlogModal = ({ blog, isOpen, onClose, formatDate, getReadingTime }) => {
  if (!blog) return null;

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
              <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] transform overflow-hidden rounded-2xl bg-dark-800/90 backdrop-blur-lg border border-gray-700/50 shadow-glow-lg transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="relative h-full"
                >
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="cursor-target absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-900/50 text-gray-400 hover:text-white hover:bg-dark-900/80 transition-all duration-200"
                    aria-label="Close modal"
                  >
                    <HiX className="w-6 h-6" />
                  </button>

                  {/* Scrollable Content */}
                  <div className="overflow-y-auto h-full max-h-[90vh]">
                    {/* Header */}
                    <div className="p-8 pb-6">
                      <div className="mb-6">
                        <Dialog.Title className="text-3xl md:text-4xl font-display font-bold text-white mb-4 pr-12 leading-tight">
                          {blog.title}
                        </Dialog.Title>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <HiUser className="w-4 h-4" />
                            <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiCalendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt || blog.updatedAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiClock className="w-4 h-4" />
                            <span>{getReadingTime(blog.content)} min read</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-6">
                          {blog.tags.map((tag, index) => (
                            <motion.span
                              key={index}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="px-3 py-1 bg-accent-500/10 text-accent-400 text-sm rounded-full border border-accent-500/20"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="px-8 pb-8">
                      <div className="prose prose-invert prose-lg max-w-none">
                        {/* Split content into paragraphs and render */}
                        {blog.content.split('\n').map((paragraph, index) => {
                          // Skip empty paragraphs
                          if (!paragraph.trim()) return null;

                          return (
                            <motion.p
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-gray-300 leading-relaxed mb-6 text-lg"
                            >
                              {paragraph}
                            </motion.p>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 pt-8 border-t border-gray-700/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-400">
                            <p>Written by <span className="text-primary-400 font-medium">{blog.author}</span></p>
                            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                              <p className="mt-1">
                                Last updated on {formatDate(blog.updatedAt)}
                              </p>
                            )}
                          </div>

                          {/* Share buttons could go here */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {blog.content.split(' ').length} words
                            </span>
                          </div>
                        </div>
                      </motion.div>
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

export default BlogModal;