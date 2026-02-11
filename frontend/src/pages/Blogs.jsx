import React from 'react';
import { motion } from 'framer-motion';

const Blogs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-9xl font-display font-bold text-white tracking-tighter"
        >
          COMING
          <br />
          <span className="text-red-500">SOON</span>
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default Blogs;
