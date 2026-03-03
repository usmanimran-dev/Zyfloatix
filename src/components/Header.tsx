import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'About', href: '#about' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-darkNavy/80 backdrop-blur-xl shadow-premium border-b border-white/5 supports-[backdrop-filter]:bg-darkNavy/60'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => scrollToSection(e, '#home')}
                        className="flex items-center space-x-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="relative w-12 h-12"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Outer rotating ring */}
                            <motion.div
                                className="absolute inset-0 rounded-xl border-2 border-mint/30"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Inner gradient box */}
                            <motion.div
                                className="absolute inset-1 bg-gradient-to-br from-royalBlue via-mint to-royalBlue rounded-lg flex items-center justify-center shadow-lg shadow-mint/20"
                                whileHover={{
                                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
                                    backgroundPosition: "200% center"
                                }}
                                style={{ backgroundSize: "200% 200%" }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Letter U with modern styling */}
                                <motion.span
                                    className="text-white font-bold text-2xl font-display relative z-10"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    U
                                </motion.span>

                                {/* Accent dot */}
                                <motion.div
                                    className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>

                        <motion.span
                            className="font-display font-bold text-xl text-white group-hover:text-mint transition-colors duration-300"
                            whileHover={{ letterSpacing: "0.05em" }}
                            transition={{ duration: 0.3 }}
                        >
                            Usman Imran
                        </motion.span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                onMouseEnter={() => setHoveredPath(item.href)}
                                onMouseLeave={() => setHoveredPath(null)}
                                className="relative px-4 py-2 rounded-lg font-medium text-textSecondary hover:text-white transition-colors"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                <span className="relative z-10">{item.label}</span>
                                {hoveredPath === item.href && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/10 rounded-lg -z-0"
                                        layoutId="navbar-hover"
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.6
                                        }}
                                    />
                                )}
                            </motion.a>
                        ))}
                    </nav>

                    {/* CTA Button - Desktop */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            variant="mint"
                            className="shadow-glow-mint hover:shadow-glow-mint-lg transition-shadow duration-300"
                            onClick={() => {
                                const element = document.querySelector('#contact');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            Get Started
                        </Button>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-royalBlue via-mint to-royalBlue origin-left"
                style={{ scaleX }}
            />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-darkNavy/95 backdrop-blur-xl border-t border-white/10"
                    >
                        <nav className="px-4 py-4 space-y-2">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="block px-4 py-3 rounded-lg font-medium text-textSecondary hover:bg-white/10 hover:text-white transition-colors"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <motion.div
                                className="pt-2"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    variant="mint"
                                    className="w-full"
                                    onClick={() => {
                                        const element = document.querySelector('#contact');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Get Started
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
