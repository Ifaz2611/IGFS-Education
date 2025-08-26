import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ArrowRightIcon } from '../components/icons';
import { blogPosts } from '../constants'; // ✅ Correct import

const Blog: React.FC = () => {
  console.log('Blog component rendered');
  console.log('blogPosts:', blogPosts);

  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="bg-brand-light dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-red-500">No blog posts available. Check constants.</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-light dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 text-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-gray-100"
          >
            IGFS Insights Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Your go-to resource for expert advice, tips, and news on making your study abroad journey a success.
          </motion.p>
        </div>
      </header>

      <main className="py-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.slug} // ✅ Use slug instead of title
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col group"
              >
                <div className="overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={post.img.trim()} // ✅ Trim whitespace
                    alt={post.title}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      console.warn(`Image failed to load: ${post.img}`);
                      e.currentTarget.src = '/placeholder.jpg'; // Fallback
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>{post.author}</span> &bull; <span>{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-brand-primary dark:text-gray-200 flex-grow group-hover:text-brand-secondary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center font-semibold text-brand-primary dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary self-start"
                  >
                    Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Blog;