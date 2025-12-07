/**
 * Animation Utilities for FundLab
 * 
 * This file contains reusable animation configurations and utilities
 * using GSAP, Framer Motion, and React Spring for premium animations.
 */

import { Variants } from 'framer-motion';

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

/**
 * Fade in from bottom with stagger support
 */
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.3 }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0] // Custom easing
        }
    }
};

/**
 * Scale and fade in
 */
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1] // Bounce easing
        }
    }
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0]
        }
    }
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0]
        }
    }
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

/**
 * Card hover effect
 */
export const cardHover = {
    rest: {
        scale: 1,
        y: 0,
        transition: { duration: 0.3 }
    },
    hover: {
        scale: 1.02,
        y: -8,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1.0]
        }
    }
};

/**
 * Glow effect on hover
 */
export const glowHover = {
    rest: {
        boxShadow: '0 0 0 rgba(99, 102, 241, 0)',
        transition: { duration: 0.3 }
    },
    hover: {
        boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
        transition: { duration: 0.3 }
    }
};

/**
 * Rotate and scale on tap
 */
export const tapEffect = {
    scale: 0.95,
    rotate: -2,
    transition: { duration: 0.1 }
};

// ============================================================================
// GSAP ANIMATION CONFIGS
// ============================================================================

/**
 * GSAP Timeline defaults
 */
export const gsapDefaults = {
    ease: 'power3.out',
    duration: 0.8
};

/**
 * GSAP Scroll trigger defaults
 */
export const scrollTriggerDefaults = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false // Set to true for debugging
};

/**
 * Text reveal animation config
 */
export const textRevealConfig = {
    duration: 1,
    ease: 'power4.out',
    stagger: 0.05,
    y: 100,
    opacity: 0
};

/**
 * Parallax scroll config
 */
export const parallaxConfig = {
    speed: 0.5,
    ease: 'none'
};

// ============================================================================
// REACT SPRING CONFIGS
// ============================================================================

/**
 * Spring physics presets
 */
export const springPresets = {
    // Gentle bounce
    gentle: {
        tension: 120,
        friction: 14
    },
    // Snappy response
    snappy: {
        tension: 300,
        friction: 20
    },
    // Slow and smooth
    slow: {
        tension: 80,
        friction: 26
    },
    // Bouncy
    bouncy: {
        tension: 180,
        friction: 12
    }
};

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

/**
 * Custom easing curves
 */
export const easings = {
    // Smooth ease in-out
    smooth: [0.25, 0.1, 0.25, 1.0],
    // Bounce
    bounce: [0.34, 1.56, 0.64, 1],
    // Sharp
    sharp: [0.4, 0.0, 0.2, 1],
    // Emphasized
    emphasized: [0.0, 0.0, 0.2, 1]
} as const;

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

/**
 * Standard duration values (in seconds)
 */
export const durations = {
    instant: 0.1,
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.2
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a stagger delay for multiple elements
 */
export const createStagger = (index: number, baseDelay: number = 0.1) => {
    return index * baseDelay;
};

/**
 * Get random delay for organic animations
 */
export const randomDelay = (min: number = 0, max: number = 0.5) => {
    return Math.random() * (max - min) + min;
};

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation
 */
export const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
};

/**
 * Map value from one range to another
 */
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
