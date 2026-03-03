import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-darkNavy border-t border-white/10 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-royalBlue to-mint rounded-lg flex items-center justify-center shadow-glow-mint">
                                <span className="text-white font-bold text-xl font-display">U</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white font-display">
                                Usman Imran
                            </h3>
                        </div>
                        <p className="text-textSecondary mb-6 max-w-md">
                            Building powerful web solutions that transform businesses and deliver exceptional results.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Twitter, href: '#', label: 'Twitter' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                { icon: Github, href: 'https://github.com/usmanimran-dev', label: 'GitHub', target: '_blank', rel: 'noopener noreferrer' },
                                { icon: Instagram, href: '#', label: 'Instagram' },
                            ].map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target={social.target || '_self'}
                                        rel={social.rel || ''}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-mint hover:bg-mint/10 flex items-center justify-center transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5 text-textSecondary hover:text-mint transition-colors" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-display">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Services', 'About', 'Portfolio', 'Testimonials', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-textSecondary hover:text-mint transition-colors duration-300 inline-flex items-center group"
                                    >
                                        <span className="w-0 h-px bg-mint group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-display">Contact</h4>
                        <ul className="space-y-3 text-textSecondary">
                            <li className="hover:text-mint transition-colors duration-300">
                                <a href="mailto:Webappdevelopersofchicago@gmail.com">Webappdevelopersofchicago@gmail.com</a>
                            </li>
                            <li className="hover:text-mint transition-colors duration-300">
                                <a href="tel:+923259283582">+92 3259283582</a>
                            </li>
                            <li>Chicago, IL</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-textSecondary text-sm">
                        © {new Date().getFullYear()} Usman Imran. All rights reserved.
                    </p>
                    <p className="text-textSecondary text-sm flex items-center gap-2">
                        Made with <Heart className="w-4 h-4 text-mint fill-current animate-pulse" /> by Usman Imran
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
