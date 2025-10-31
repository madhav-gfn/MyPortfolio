import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiCalendar, HiUser, HiEye, HiX } from 'react-icons/hi';
import { useBlogs } from '../hooks/useApi';
import Loader from '../components/Loader';
import BlogModal from '../components/BlogModal';

const Blogs = () => {
  const { data: blogs, isLoading, error } = useBlogs();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Extract unique tags for filtering
  const allTags = blogs ? [...new Set(blogs.flatMap(blog => blog.tags || []))] : [];
  const tags = ['all', ...allTags];

  // Filter blogs based on search and tags
  const filteredBlogs = blogs?.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || (blog.tags && blog.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  }) || [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content, length = 150) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (isLoading) return <Loader />;
  if (error) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400 text-lg mb-4">Failed to load blogs</p>
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
            My <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts, insights, and experiences from my journey in technology, 
            development, and continuous learning.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Tag Filter */}
          {tags.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-primary-500 text-white shadow-glow-primary'
                      : 'bg-dark-700/50 text-gray-300 hover:bg-primary-500/20 hover:text-primary-400 border border-gray-600/50'
                  }`}
                >
                  {tag === 'all' ? 'All Topics' : tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <BlogCard blog={blog} formatDate={formatDate} getExcerpt={getExcerpt} getReadingTime={getReadingTime} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiSearch className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg mb-4">
              {searchTerm || selectedTag !== 'all' 
                ? 'No articles found matching your criteria' 
                : 'No articles available yet'
              }
            </p>
            {(searchTerm || selectedTag !== 'all') && (
              <div className="space-x-4">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Clear search
                  </button>
                )}
                {selectedTag !== 'all' && (
                  <button
                    onClick={() => setSelectedTag('all')}
                    className="text-accent-400 hover:text-accent-300 font-medium"
                  >
                    Show all topics
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Blog Modal */}
      <BlogModal
        blog={selectedBlog}
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        formatDate={formatDate}
        getReadingTime={getReadingTime}
      />
    </motion.div>
  );
};

const BlogCard = ({ blog, formatDate, getExcerpt, getReadingTime }) => {
  return (
    <article className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 overflow-hidden group hover:shadow-glow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-2">
            <HiUser className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <HiCalendar className="w-4 h-4" />
            <span>{formatDate(blog.createdAt || blog.updatedAt)}</span>
          </div>
          <span>•</span>
          <span>{getReadingTime(blog.content)} min read</span>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
          {blog.title}
        </h2>
      </div>

      {/* Content */}
      <div className="px-6 flex-1">
        <p className="text-gray-400 leading-relaxed line-clamp-3 mb-4">
          {getExcerpt(blog.content)}
        </p>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent-500/10 text-accent-400 text-xs rounded-md border border-accent-500/20"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 text-gray-400 text-xs">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More */}
        <div className="flex items-center justify-between">
          <span className="text-primary-400 font-medium group-hover:text-primary-300 transition-colors flex items-center gap-2">
            <span>Read Article</span>
            <HiEye className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default Blogs;