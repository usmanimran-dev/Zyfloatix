// Initialize GSAP ScrollTrigger globally
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once globally
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
