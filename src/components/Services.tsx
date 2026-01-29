import { motion, useInView } from 'framer-motion';
import { Code, Smartphone, ShoppingCart, Wrench, Globe } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsapConfig';

const services = [
    {
        title: 'Custom Websites',
        description: 'Bespoke website development tailored to your brand and business goals with modern design.',
        icon: Globe,
    },
    {
        title: 'Web Applications',
        description: 'Scalable web apps built with cutting-edge technology for exceptional performance.',
        icon: Code,
    },
    {
        title: 'WordPress Development',
        description: 'Custom WordPress sites with powerful themes, plugins, and seamless content management.',
        icon: Smartphone,
    },
    {
        title: 'Shopify E-Commerce',
        description: 'Complete Shopify stores optimized for conversions and stunning shopping experiences.',
        icon: ShoppingCart,
    },
    {
        title: 'Website Maintenance',
        description: 'Ongoing support, updates, and optimization to keep your site running at peak performance.',
        icon: Wrench,
    },
];

export const Services = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const ctx = gsap.context(() => {
            //  Stagger reveal for service cards
            gsap.from('.service-card', {
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 80%',
                },
            });

            // Heading animation
            gsap.from('.services-heading', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    return (
        <section ref={sectionRef} id="services" className="py-24 bg-darkNavy relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={headingRef} className="services-heading text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Our Services</span>
                    </h2>
                    <p className="text-textSecondary text-lg max-w-2xl mx-auto">
                        Professional web development solutions to bring your vision to life
                    </p>
                </div>

                <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((svc, _index) => {
                        const Icon = svc.icon;
                        return (
                            <motion.div
                                key={svc.title}
                                className="service-card group relative bg-cardBg rounded-2xl p-8 cursor-pointer"
                                whileHover={{
                                    y: -10,
                                    rotateX: 5,
                                    rotateY: 5,
                                    scale: 1.02,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-royalBlue to-mint opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

                                {/* Icon Container */}
                                <motion.div
                                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-royalBlue to-blue-500 p-3 mb-6"
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Icon className="w-full h-full text-white" />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-3 text-textDark group-hover:text-royalBlue transition-colors duration-300">
                                    {svc.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {svc.description}
                                </p>

                                {/* Hover Arrow */}
                                <div className="flex items-center text-sm font-semibold text-mint opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                                    Learn More
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
