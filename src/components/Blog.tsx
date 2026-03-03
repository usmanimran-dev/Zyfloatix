import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsapConfig';

export default function Blog() {
    const sectionRef = useRef<HTMLElement>(null);

    const blogs = [
        {
            id: 1,
            title: "Architecting High-Frequency Trading Systems in Node.js",
            description: "An deep dive into low-latency optimizations, message queues, and memory management for processing thousands of transactions per second.",
            link: "https://medium.com/", // Placeholder
            date: "Oct 12, 2025",
            readTime: "8 MIN_READ",
        },
        {
            id: 2,
            title: "Securing Financial Microservices with Zero Trust Architecture",
            description: "How to implement mTLS, identity-aware proxies, and structured logging in distributed cloud environments to prevent unauthorized access.",
            link: "https://dev.to/", // Placeholder
            date: "Nov 04, 2025",
            readTime: "12 MIN_READ",
        },
        {
            id: 3,
            title: "Optimizing PostgreSQL for Financial Ledgers",
            description: "Database partitioning strategies, indexing optimization, and handling concurrent read/write locks at scale.",
            link: "https://hashnode.com/", // Placeholder
            date: "Jan 18, 2026",
            readTime: "6 MIN_READ",
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.blog-card', {
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="blog" className="py-32 bg-darkNavy relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-900/10 via-darkNavy to-black pointer-events-none" />
            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                <div className="mb-20">
                    <motion.h2
                        className="text-6xl md:text-8xl font-bold font-display leading-tight mb-6 text-white"
                        initial={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Latest <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-royalBlue">Insights</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <a
                            key={blog.id}
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="blog-card group relative block p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-mint/50 transition-all duration-300 min-h-[320px] flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-mint/10 rounded-xl text-mint transition-all">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-mint group-hover:text-darkNavy border border-white/10 text-white/50 transition-colors duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white leading-tight mb-4 group-hover:text-mint transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    {blog.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                                <span className="text-[10px] font-bold tracking-widest text-mint uppercase">
                                    {blog.date}
                                </span>
                                <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase border border-white/10 px-3 py-1 rounded-md group-hover:border-white/20 transition-colors">
                                    {blog.readTime}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
