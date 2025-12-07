# Animation Libraries & Utilities - FundLab

Complete guide to using advanced animations in FundLab with GSAP, Framer Motion, React Spring, and more.

---

## 📦 Installed Libraries

### Core Animation Libraries
- **GSAP** (`gsap`) - Professional-grade animation library
- **@gsap/react** - React hooks for GSAP
- **Framer Motion** (`framer-motion`) - React animation library (already installed)
- **React Spring** (`@react-spring/web`) - Physics-based animations
- **Lottie React** (`lottie-react`) - Render After Effects animations
- **React Type Animation** (`react-type-animation`) - Typing effect animations
- **React Intersection Observer** (`react-intersection-observer`) - Scroll detection

---

## 🎨 Animation Utilities

### Location: `lib/animations.ts`

#### Framer Motion Variants

```tsx
import { fadeInUp, scaleIn, slideInLeft, staggerContainer } from '@/lib/animations';

// Fade in from bottom
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>

// Scale in
<motion.div variants={scaleIn} initial="hidden" animate="visible">
  Content
</motion.div>

// Stagger children
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>Child 1</motion.div>
  <motion.div variants={fadeInUp}>Child 2</motion.div>
</motion.div>
```

#### Available Variants
- `fadeInUp` - Fade in from bottom
- `scaleIn` - Scale and fade in
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right
- `staggerContainer` - Container for staggered children
- `cardHover` - Card hover effect
- `glowHover` - Glow effect on hover
- `tapEffect` - Rotate and scale on tap

#### Easing Functions
```tsx
import { easings } from '@/lib/animations';

// Use in Framer Motion
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: easings.smooth }}
/>
```

Available easings: `smooth`, `bounce`, `sharp`, `emphasized`

---

## 🎯 GSAP Hooks

### Location: `lib/gsap-hooks.ts`

#### Fade In On Scroll
```tsx
import { useFadeInOnScroll } from '@/lib/gsap-hooks';

function MyComponent() {
  const ref = useFadeInOnScroll();
  
  return <div ref={ref}>Content fades in on scroll</div>;
}
```

#### Parallax Effect
```tsx
import { useParallax } from '@/lib/gsap-hooks';

function ParallaxSection() {
  const ref = useParallax(0.5); // speed: 0.5
  
  return <div ref={ref}>Parallax background</div>;
}
```

#### Text Reveal
```tsx
import { useTextReveal } from '@/lib/gsap-hooks';

function Hero() {
  const ref = useTextReveal('words'); // or 'chars'
  
  return <h1 ref={ref}>Text reveals word by word</h1>;
}
```

#### Counter Animation
```tsx
import { useCountUp } from '@/lib/gsap-hooks';

function Stats() {
  const countRef = useCountUp(500000, 2); // end: 500000, duration: 2s
  
  return <span ref={countRef}>0</span>;
}
```

#### Magnetic Hover
```tsx
import { useMagneticHover } from '@/lib/gsap-hooks';

function Button() {
  const ref = useMagneticHover(0.3); // strength: 0.3
  
  return <button ref={ref}>Magnetic Button</button>;
}
```

#### Available Hooks
- `useFadeInOnScroll()` - Fade in when scrolling into view
- `useParallax(speed)` - Parallax scroll effect
- `useTextReveal(splitBy)` - Reveal text word by word or char by char
- `useScaleIn()` - Scale in on scroll
- `useStaggerChildren(stagger)` - Stagger children animations
- `useMagneticHover(strength)` - Magnetic hover effect
- `useCountUp(end, duration)` - Animated counter

---

## 🌟 React Spring

### Basic Usage
```tsx
import { useSpring, animated } from '@react-spring/web';
import { springPresets } from '@/lib/animations';

function SpringCard() {
  const [springs, api] = useSpring(() => ({
    from: { scale: 1 },
    config: springPresets.bouncy
  }));

  return (
    <animated.div
      style={springs}
      onMouseEnter={() => api.start({ scale: 1.1 })}
      onMouseLeave={() => api.start({ scale: 1 })}
    >
      Hover me
    </animated.div>
  );
}
```

### Available Presets
- `springPresets.gentle` - Gentle bounce
- `springPresets.snappy` - Snappy response
- `springPresets.slow` - Slow and smooth
- `springPresets.bouncy` - Bouncy

---

## ⌨️ Type Animation

```tsx
import { TypeAnimation } from 'react-type-animation';

function Hero() {
  return (
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
  );
}
```

---

## 👁️ Intersection Observer

```tsx
import { useInView } from 'react-intersection-observer';

function Section() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <div ref={ref}>
      {inView ? 'Visible!' : 'Not visible'}
    </div>
  );
}
```

---

## 🎬 Lottie Animations

```tsx
import Lottie from 'lottie-react';
import animationData from './animation.json';

function LottieAnimation() {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 300, height: 300 }}
    />
  );
}
```

---

## 📚 Complete Examples

See `components/examples/AnimationExamples.tsx` for complete working examples:

1. **AnimatedHero** - Hero section with type animation
2. **ParallaxSection** - Parallax background effect
3. **TextRevealSection** - Text reveal animation
4. **StatsSection** - Animated counters
5. **MagneticButton** - Magnetic hover effect
6. **SpringCard** - Physics-based card animation
7. **StaggeredGrid** - Staggered grid items
8. **FadeInSection** - Scroll-triggered fade in

---

## 🎯 Best Practices

### Performance
- Use `will-change` CSS property sparingly
- Prefer `transform` and `opacity` for animations
- Use `useGSAP` hook for cleanup
- Debounce scroll events

### Accessibility
- Respect `prefers-reduced-motion`
- Provide fallbacks for animations
- Don't rely solely on animation for information

### Code Organization
- Keep animation configs in `lib/animations.ts`
- Create reusable hooks in `lib/gsap-hooks.ts`
- Use variants for Framer Motion
- Extract complex animations to separate components

---

## 🔧 Utility Functions

```tsx
import { createStagger, randomDelay, clamp, lerp, mapRange } from '@/lib/animations';

// Create stagger delay
const delay = createStagger(index, 0.1);

// Random delay
const delay = randomDelay(0, 0.5);

// Clamp value
const value = clamp(x, 0, 100);

// Linear interpolation
const value = lerp(0, 100, 0.5); // 50

// Map range
const value = mapRange(50, 0, 100, 0, 1); // 0.5
```

---

## 📖 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Spring Documentation](https://www.react-spring.dev/)
- [Lottie Files](https://lottiefiles.com/)

---

## 🚀 Quick Start

1. Import animation utilities:
```tsx
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useFadeInOnScroll } from '@/lib/gsap-hooks';
```

2. Use in your component:
```tsx
function MyComponent() {
  const ref = useFadeInOnScroll();
  
  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      Animated content
    </motion.div>
  );
}
```

3. Customize as needed!
