/**
 * Example: Advanced Animation Components
 * 
 * Demonstrates how to use the animation utilities and GSAP hooks
 * in FundLab components.
 */

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { useSpring, animated } from '@react-spring/web';
import {
    fadeInUp,
    scaleIn,
    staggerContainer,
    cardHover,
    createStagger
} from '@/lib/animations';
import {
    useFadeInOnScroll,
    useParallax,
    useTextReveal,
    useMagneticHover,
    useCountUp
} from '@/lib/gsap-hooks';

// ============================================================================
// EXAMPLE 1: Animated Hero Section
// ============================================================================

export function AnimatedHero() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.section
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="py-32 px-6"
        >
            <motion.h1
                variants={fadeInUp}
                className="text-7xl font-bold text-white mb-6"
            >
                Find Your Perfect
                <br />
                <TypeAnimation
                    sequence={[
                        'Angel Investor',
                        2000,
                        'VC Partner',
                        2000,
                        'Investment Fund',
                        2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-indigo-400"
                />
            </motion.h1>

            <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl"
            >
                AI-powered matching for startups seeking investment
            </motion.p>

            <motion.div
                variants={fadeInUp}
                className="flex gap-4 mt-8"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold"
                >
                    Get Started
                </motion.button>
            </motion.div>
        </motion.section>
    );
}

// ============================================================================
// EXAMPLE 2: Parallax Section
// ============================================================================

export function ParallaxSection() {
    const parallaxRef = useParallax(0.3);

    return (
        <div className="relative h-screen overflow-hidden">
            <div
                ref={parallaxRef}
                className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-black"
            />
            <div className="relative z-10 flex items-center justify-center h-full">
                <h2 className="text-6xl font-bold text-white">
                    Scroll to See Magic
                </h2>
            </div>
        </div>
    );
}

// ============================================================================
// EXAMPLE 3: Text Reveal Animation
// ============================================================================

export function TextRevealSection() {
    const textRef = useTextReveal('words');

    return (
        <section className="py-32 px-6">
            <h2
                ref={textRef}
                className="text-5xl font-bold text-white text-center"
            >
                Intelligence at Scale. Powered by AI.
            </h2>
        </section>
    );
}

// ============================================================================
// EXAMPLE 4: Animated Stats Counter
// ============================================================================

export function StatsSection() {
    const count1 = useCountUp(500000, 2);
    const count2 = useCountUp(1000, 1.5);
    const count3 = useCountUp(25, 1);

    return (
        <section className="py-32 px-6">
            <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">
                        <span ref={count1}>0</span>+
                    </div>
                    <p className="text-gray-400">Investor Profiles</p>
                </div>
                <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">
                        <span ref={count2}>0</span>+
                    </div>
                    <p className="text-gray-400">Messages/Week</p>
                </div>
                <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">
                        <span ref={count3}>0</span>%
                    </div>
                    <p className="text-gray-400">Response Rate</p>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// EXAMPLE 5: Magnetic Button
// ============================================================================

export function MagneticButton({ children }: { children: React.ReactNode }) {
    const magneticRef = useMagneticHover(0.4);

    return (
        <div ref={magneticRef} className="inline-block">
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold">
                {children}
            </button>
        </div>
    );
}

// ============================================================================
// EXAMPLE 6: Spring-Animated Card
// ============================================================================

export function SpringCard() {
    const [springs, api] = useSpring(() => ({
        from: { scale: 1, rotateZ: 0 },
    }));

    return (
        <animated.div
            style={springs}
            onMouseEnter={() => api.start({ scale: 1.05, rotateZ: 2 })}
            onMouseLeave={() => api.start({ scale: 1, rotateZ: 0 })}
            className="p-6 bg-white/5 rounded-2xl border border-white/10"
        >
            <h3 className="text-2xl font-bold text-white mb-2">
                Spring Animation
            </h3>
            <p className="text-gray-400">
                Hover to see physics-based animation
            </p>
        </animated.div>
    );
}

// ============================================================================
// EXAMPLE 7: Staggered Grid
// ============================================================================

export function StaggeredGrid() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const items = Array.from({ length: 6 }, (_, i) => i);

    return (
        <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-3 gap-6"
        >
            {items.map((item, index) => (
                <motion.div
                    key={item}
                    variants={scaleIn}
                    custom={index}
                    whileHover="hover"
                    initial="rest"
                    className="p-6 bg-white/5 rounded-2xl border border-white/10"
                >
                    <h4 className="text-xl font-bold text-white">
                        Feature {item + 1}
                    </h4>
                </motion.div>
            ))}
        </motion.div>
    );
}

// ============================================================================
// EXAMPLE 8: Scroll-Triggered Fade In
// ============================================================================

export function FadeInSection() {
    const fadeRef = useFadeInOnScroll();

    return (
        <div
            ref={fadeRef}
            className="py-32 px-6 bg-white/5"
        >
            <h2 className="text-5xl font-bold text-white text-center">
                This Section Fades In On Scroll
            </h2>
        </div>
    );
}
