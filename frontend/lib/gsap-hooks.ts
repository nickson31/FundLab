/**
 * GSAP Animation Hooks for FundLab
 * 
 * Custom React hooks for GSAP animations with scroll triggers,
 * parallax effects, and text animations.
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in on scroll
 */
export const useFadeInOnScroll = (trigger?: string) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: trigger || ref.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, [trigger]);

    return ref;
};

/**
 * Parallax scroll effect
 */
export const useParallax = (speed: number = 0.5) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.to(ref.current, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }, [speed]);

    return ref;
};

/**
 * Text reveal animation (split by words or characters)
 */
export const useTextReveal = (splitBy: 'words' | 'chars' = 'words') => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const text = ref.current.textContent || '';
        const elements = splitBy === 'words' ? text.split(' ') : text.split('');

        ref.current.innerHTML = elements
            .map((el) => `<span class="inline-block overflow-hidden"><span class="inline-block">${el}${splitBy === 'words' ? '&nbsp;' : ''}</span></span>`)
            .join('');

        const spans = ref.current.querySelectorAll('span span');

        gsap.fromTo(
            spans,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: 0.8,
                ease: 'power4.out',
                stagger: 0.05,
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, [splitBy]);

    return ref;
};

/**
 * Scale in on scroll
 */
export const useScaleIn = () => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return ref;
};

/**
 * Stagger children animation
 */
export const useStaggerChildren = (stagger: number = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const children = ref.current.children;

        gsap.fromTo(
            children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: stagger,
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, [stagger]);

    return ref;
};

/**
 * Magnetic hover effect
 */
export const useMagneticHover = (strength: number = 0.3) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return ref;
};

/**
 * Smooth scroll to element
 */
export const scrollToElement = (selector: string, offset: number = 0) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;

    gsap.to(window, {
        scrollTo: { y, autoKill: true },
        duration: 1,
        ease: 'power3.inOut'
    });
};

/**
 * Counter animation
 */
export const useCountUp = (end: number, duration: number = 2) => {
    const ref = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const obj = { value: 0 };

        gsap.to(obj, {
            value: end,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
                if (ref.current) {
                    ref.current.textContent = Math.round(obj.value).toLocaleString();
                }
            },
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, [end, duration]);

    return ref;
};
