import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../constants';
import { ArrowRightIcon } from '../components/icons';

const SingleBlogPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="py-40 text-center bg-white dark:bg-gray-900">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-brand-primary dark:text-gray-100">Post not found</h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Sorry, we couldn't find the blog post you're looking for.</p>
                    <Link to="/blog" className="mt-8 inline-block bg-brand-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }
    
    const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

    return (
        <div className="bg-white dark:bg-gray-900">
            <header className="relative h-72 md:h-96">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white p-4 max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-extrabold">{post.title}</h1>
                        <p className="mt-4 text-lg text-gray-200">{post.author} &bull; {post.date}</p>
                    </motion.div>
                </div>
            </header>

            <main className="py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div 
                        className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </main>
            
             <aside className="py-16 bg-brand-light dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-brand-primary dark:text-gray-100 text-center mb-12">More Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {otherPosts.map(p => (
                            <motion.div
                                key={p.slug}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col group"
                            >
                                <div className="overflow-hidden">
                                    <Link to={`/blog/${p.slug}`}>
                                        <img src={p.img} alt={p.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </Link>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-brand-primary dark:text-gray-200 flex-grow group-hover:text-brand-secondary transition-colors">{p.title}</h3>
                                    <Link to={`/blog/${p.slug}`} className="mt-4 inline-flex items-center font-semibold text-brand-primary dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary self-start">
                                        Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SingleBlogPage;
