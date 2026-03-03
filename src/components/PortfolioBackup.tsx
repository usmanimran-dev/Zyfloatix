import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { gsap } from '../utils/gsapConfig';

const projects = [
    {
        id: '01',
        title: 'E-Commerce Platform',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
        tags: ['React', 'Node.js', 'Stripe'],
        link: '#'
    },
    {
        id: '02',
        title: 'Brand Identity System',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
        tags: ['Branding', 'UI/UX', 'Figma'],
        link: '#'
    },
    {
        id: '03',
        title: 'Mobile Banking App',
        category: 'App Development',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        tags: ['React Native', 'Security', 'API'],
        link: '#'
    },
    {
        id: '04',
        title: 'Microservices API',
        category: 'Backend',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
        tags: ['Node.js', 'Docker', 'AWS'],
        link: '#'
    },
    {
        id: '05',
        title: 'SaaS Dashboard',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        tags: ['Dashboard', 'Charts', 'SaaS'],
        link: '#'
    },
    {
        id: '06',
        title: 'Interactive Portfolio',
        category: 'Frontend',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
        tags: ['React', 'Three.js', 'GSAP'],
        link: '#'
    },
];

const ScrambleText = ({ text, hovered }: { text: string; hovered: boolean }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    useEffect(() => {
        if (!hovered) {
            setDisplayText(text);
            return;
        }

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((_char, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [hovered, text]);

    return <span>{displayText}</span>;
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className="relative z-50"
        >
            {children}
        </motion.div>
    );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const imageX = useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]);
    const imageY = useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            className={`portfolio-card group relative h-[500px] rounded-2xl perspective-1000 cursor-pointer ${index % 2 !== 0 ? 'md:mt-12' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
        >
            <a href={project.link} className="block h-full w-full relative preserve-3d">
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-darkNavy shadow-2xl border border-white/5">

                    <motion.div
                        className="absolute inset-[-10%]"
                        style={{ x: imageX, y: imageY }}
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-darkNavy via-darkNavy/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 mix-blend-overlay"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    600px circle at ${mouseX}px ${mouseY}px,
                                    rgba(16, 185, 129, 0.15),
                                    rgba(37, 99, 235, 0.15),
                                    transparent 40%
                                )
                            `,
                        }}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-8 z-30 translate-z-20">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-mint font-mono text-xs tracking-wider uppercase mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 min-h-[2.25rem]">
                                        <ScrambleText text={project.title} hovered={isHovered} />
                                    </h3>
                                </div>
                                <MagneticButton>
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-mint group-hover:text-darkNavy transition-colors duration-300 backdrop-blur-sm border border-white/10">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                </MagneticButton>
                            </div>

                            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-medium text-white/80 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export const Portfolio = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.portfolio-card', {
                y: 120,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="portfolio" className="relative py-32 bg-darkNavy overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-royalBlue/5 via-darkNavy to-black pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-20">
                    <motion.h2
                        className="text-6xl md:text-8xl font-bold font-display leading-tight mb-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Selected <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-royalBlue">Works</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-2000">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
