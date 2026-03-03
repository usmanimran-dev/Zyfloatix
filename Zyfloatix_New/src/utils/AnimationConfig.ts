// Animation configuration and constants
export const AnimationConfig = {
    // Durations
    duration: {
        fast: 0.3,
        normal: 0.6,
        slow: 1.2,
        verySlow: 1.8,
    },

    // Easing curves (Clay.global style)
    ease: {
        smooth: 'power3.out',
        snappy: 'power4.out',
        elastic: 'elastic.out(1, 0.5)',
        bounce: 'back.out(1.7)',
    },

    // Stagger delays
    stagger: {
        fast: 0.05,
        normal: 0.1,
        slow: 0.15,
    },

    // Parallax speeds
    parallax: {
        slow: 0.5,
        medium: 1,
        fast: 1.5,
    },

    // Magnetic effect radius
    magnetic: {
        radius: 100,
        strength: 0.3,
    },
};

// Check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation duration based on preference
export const getAnimationDuration = (duration: number): number => {
    return prefersReducedMotion() ? 0 : duration;
};
