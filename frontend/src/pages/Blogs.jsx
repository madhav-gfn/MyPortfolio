import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiClock, HiCalendar, HiArrowRight, HiExternalLink, HiRefresh } from 'react-icons/hi';
import { FaMedium } from 'react-icons/fa';
import Loader from '../components/Loader';
import BlogModal from '../components/BlogModal';
import { fetchMediumPosts, mediumProfileUrl } from '../utils/fetchMedium';

const MEDIUM_USERNAME = import.meta.env.VITE_MEDIUM_USERNAME;

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getReadingTime = (htmlOrText = '') => {
  const words = htmlOrText.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    fetchMediumPosts(MEDIUM_USERNAME)
      .then((items) => setPosts(items))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!MEDIUM_USERNAME) {
      setError(new Error('Medium handle not configured'));
      setIsLoading(false);
      return;
    }
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openPost = (post) => {
    // Shape the post for the existing BlogModal.
    setSelected({
      title: post.title,
      author: post.author,
      createdAt: post.pubDate,
      content: post.contentHtml,
      text: post.text,
      tags: post.categories,
      link: post.link,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 text-white"
    >
      <div className="max-w-7xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            The <span className="text-red-500">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Thoughts on distributed systems, AI/LLM engineering, and building things that scale —
            straight from my Medium.
          </p>
          <a
            href={mediumProfileUrl(MEDIUM_USERNAME)}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-red-500/50 rounded-xl text-sm font-medium transition-all duration-300"
          >
            <FaMedium className="w-4 h-4" />
            Follow on Medium
          </a>
        </motion.div>

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg mb-2">Couldn't load articles right now</p>
            <p className="text-gray-400 mb-6 text-sm">{error.message}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={load}
                className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-medium transition-colors"
              >
                <HiRefresh className="w-4 h-4" /> Retry
              </button>
              <a
                href={mediumProfileUrl(MEDIUM_USERNAME)}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-xl text-sm font-medium hover:border-red-500/50 transition-colors"
              >
                Open Medium <HiExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!error && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <FaMedium className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">No stories yet</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Nothing published on Medium just yet — this page fills itself in automatically
              the moment a new story goes live. Check back soon!
            </p>
            <a
              href={mediumProfileUrl(MEDIUM_USERNAME)}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-medium transition-colors"
            >
              <FaMedium className="w-4 h-4" /> Visit my Medium
            </a>
          </motion.div>
        )}

        {/* Posts grid */}
        {!error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openPost(post)}
                  className="cursor-target group flex flex-col bg-black/50 backdrop-blur-sm rounded-2xl border border-white/15 overflow-hidden hover:border-red-500/50 hover:shadow-glow-lg transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-red-500/10 relative overflow-hidden">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/30 to-black">
                        <FaMedium className="w-10 h-10 text-red-500/70" />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <HiCalendar className="w-3.5 h-3.5" /> {formatDate(post.pubDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HiClock className="w-3.5 h-3.5" /> {post.readingMinutes} min read
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

                    {post.categories?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.slice(0, 3).map((cat, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-md border border-red-500/30"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="mt-auto inline-flex items-center gap-2 text-red-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Read article <HiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <BlogModal
        blog={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        formatDate={formatDate}
        getReadingTime={getReadingTime}
      />
    </motion.div>
  );
};

export default Blogs;
