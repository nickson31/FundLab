# Animations.md - Comprehensive Framer Motion Specifications

## Philosophy: Google-Inspired Clean Motion Design

FundLab animations should feel **subtle, purposeful, and delightfully smooth**—inspired by Google's Material Design philosophy. Every animation serves a function: guiding attention, providing feedback, or creating spatial relationships.

**Core Principles**:
1. **Performance First**: 60fps, GPU-accelerated transforms
2. **Natural Physics**: Spring animations > easing curves
3. **Purposeful**: Every animation communicates meaning
4. **Accessible**: Respect `prefers-reduced-motion`
5. **Consistent Timing**: Unified duration scales

---

## Global Animation Variables

Use these throughout the app for consistency:

```typescript
// framer-motion variants config
export const animationConfig = {
  // Duration scales (ms)
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  xslow: 1.2,
  
  // Spring configurations
  spring: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  springGentle: {
    type: "spring",
    stiffness: 120,
    damping: 14,
  },
  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
  
  // Easing curves
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};
```

---

## Page: Wow Page (Landing)

### 1. Hero Section - Cascading Entrance

**Purpose**: Draw attention, establish premium feel

```tsx
// Hero Container
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: animationConfig.easeOut }}
>
  {/* Headline */}
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Find Your Perfect Investors
  </motion.h1>
  
  {/* Subheadline */}
  <motion.p
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    AI-powered matching in minutes, not months
  </motion.p>
  
  {/* CTA Button */}
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ ...animationConfig.springBouncy, delay: 0.6 }}
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)"
    }}
    whileTap={{ scale: 0.95 }}
  >
    Start Fundraising Free →
  </motion.button>
</motion.div>
```

### 2. Animated Background Gradient

**Purpose**: Premium aesthetic, subtle movement

```tsx
<motion.div
  className="gradient-mesh"
  animate={{
    background: [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    ],
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  }}
/>
```

### 3. Problem Section - Staggered Icon Animation

**Purpose**: Draw attention to pain points sequentially

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: animationConfig.springGentle
  },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  {painPoints.map((point) => (
    <motion.div key={point.id} variants={itemVariants}>
      <Icon />
      <Text />
    </motion.div>
  ))}
</motion.div>
```

### 4. Feature Cards - Flip-In Effect

**Purpose**: Showcase features with depth

```tsx
const cardVariants = {
  hidden: { 
    opacity: 0, 
    rotateY: -90,
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    rotateY: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
};

<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  whileHover={{ y: -8, scale: 1.02 }}
  style={{ perspective: 1000 }}
>
  {/* Card content */}
</motion.div>
```

### 5. Stats Counter - Number Count-Up

**Purpose**: Impressive numbers feel more impactful with animation

```tsx
import { useMotionValue, useTransform, animate } from "framer-motion";

function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  useEffect(() => {
    const controls = animate(count, value, { duration: 2 });
    return controls.stop;
  }, []);
  
  return <motion.span>{rounded}</motion.span>;
}

// Usage
<Counter value={500} />+ Investors
```

### 6. Testimonial Carousel - Smooth Slide

**Purpose**: Social proof with elegant transitions

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentIndex}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
  >
    {/* Testimonial content */}
  </motion.div>
</AnimatePresence>
```

---

## Page: Main Chat

### 7. Search Toggle - Pill Switch

**Purpose**: Clear visual feedback for mode change

```tsx
<motion.div
  layout
  className="toggle-container"
>
  <motion.div
    layout
    className="active-pill"
    transition={animationConfig.spring}
  />
  <button onClick={() => setMode('angels')}>Angels</button>
  <button onClick={() => setMode('funds')}>Funds</button>
</motion.div>
```

### 8. Search Results - Slide-Up Cascade

**Purpose**: Draw attention to new results

```tsx
// Gemini Brief
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <BriefText />
</motion.div>

// Investor Cards Container
<motion.div
  variants={{
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }}
  initial="hidden"
  animate="visible"
>
  {results.map(card => (
    <InvestorCard key={card.id} />
  ))}
</motion.div>

// Individual Card
<motion.div
  variants={{
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: animationConfig.springGentle
    },
  }}
  whileHover={{ y: -4, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  {/* Card content */}
</motion.div>
```

### 9. Card Expansion - Smooth Height Transition

**Purpose**: Seamless detail reveal

```tsx
<motion.div
  initial={false}
  animate={{ height: isExpanded ? "auto" : "120px" }}
  transition={{ duration: 0.4, ease: animationConfig.easeInOut }}
  style={{ overflow: "hidden" }}
>
  <CardHeader />
  {isExpanded && <CardDetails />}
</motion.div>
```

### 10. Sidebar Slide - Edge Reveal

**Purpose**: Smooth navigation access

```tsx
// Sidebar Container
<motion.aside
  initial={{ x: "-100%" }}
  animate={{ x: isHovered ? 0 : "-100%" }}
  transition={animationConfig.spring}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <NavLinks />
</motion.aside>

// Individual Links
<motion.a
  whileHover={{ x: 8, color: "#6366F1" }}
  whileTap={{ scale: 0.95 }}
>
  Link Text
</motion.a>
```

### 11. Loading State - Pulse + Shimmer

**Purpose**: Communicate activity, reduce perceived wait time

```tsx
// Pulse Animation
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <LoadingIcon />
</motion.div>

// Shimmer Effect (CSS-based but triggered via Framer)
<motion.div
  className="shimmer"
  initial={{ backgroundPosition: "-100%" }}
  animate={{ backgroundPosition: "200%" }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  }}
  style={{
    background: "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
    backgroundSize: "200% 100%",
  }}
/>
```

---

## Component: Message Composition Modal

### 12. Modal Entrance - Scale + Blur

**Purpose**: Focus attention, establish hierarchy

```tsx
// Overlay
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  style={{ backdropFilter: "blur(4px)" }}
  onClick={handleClose}
/>

// Modal
<motion.div
  initial={{ opacity: 0, scale: 0.9, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9, y: 20 }}
  transition={animationConfig.springGentle}
>
  <ModalContent />
</motion.div>
```

### 13. Step Transitions - Slide Between Steps

**Purpose**: Communicate progress, spatial relationship

```tsx
<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={currentStep}
    custom={direction}
    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
    transition={{ duration: 0.3 }}
  >
    {renderStep(currentStep)}
  </motion.div>
</AnimatePresence>
```

### 14. Message Generation - Typing Effect

**Purpose**: Simulate live generation, build anticipation

```tsx
function TypingAnimation({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20); // 20ms per character
    
    return () => clearInterval(interval);
  }, [text]);
  
  return <p>{displayedText}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span></p>;
}
```

---

## Component: Toasts & Notifications

### 15. Toast Slide-In from Top-Right

**Purpose**: Non-intrusive feedback

```tsx
<AnimatePresence>
  {toasts.map(toast => (
    <motion.div
      key={toast.id}
      initial={{ opacity: 0, x: 100, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={animationConfig.spring}
      style={{ position: "fixed", top: 20, right: 20 }}
    >
      {toast.message}
    </motion.div>
  ))}
</AnimatePresence>
```

---

## Advanced: Page Transitions

### 16. Route Changes - Fade + Slide

**Purpose**: Smooth navigation between pages

```tsx
// In _app.tsx or layout component
<AnimatePresence mode="wait">
  <motion.div
    key={router.pathname}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <Component {...pageProps} />
  </motion.div>
</AnimatePresence>
```

---

## Micro-Interactions

### 17. Button Hover & Press States

```tsx
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click Me
</motion.button>
```

### 18. Input Focus Glow

```tsx
<motion.input
  whileFocus={{
    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.3)",
    scale: 1.02,
  }}
  transition={{ duration: 0.2 }}
/>
```

### 19. Avatar Shimmer on Load

```tsx
<motion.img
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  onLoad={() => {
    // Trigger success animation
  }}
/>
```

### 20. Badge Bounce (New Notifications)

```tsx
<motion.span
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={animationConfig.springBouncy}
  className="notification-badge"
>
  3
</motion.span>
```

---

## Accessibility: Respecting User Preferences

```tsx
import { useReducedMotion } from "framer-motion";

function Component() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { opacity: [0, 1], y: [20, 0] }}
    >
      Content
    </motion.div>
  );
}
```

---

## Performance Optimizations

### 1. Use `layout` for Smooth Reorders
```tsx
<motion.div layout transition={animationConfig.spring}>
  {/* Content that repositions */}
</motion.div>
```

### 2. Animate Transform & Opacity Only
**GPU-accelerated properties**: `opacity`, `transform` (scale, rotate, translate)
**Avoid animating**: `width`, `height`, `margin`, `padding` (causes reflows)

### 3. Use `will-change` Strategically
```tsx
<motion.div style={{ willChange: "transform" }}>
  {/* Only on elements that will animate */}
</motion.div>
```

### 4. Lazy Variants
```tsx
// Define outside component to avoid recreation
const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
```

---

## Example: Complete Investor Card with All Animations

```tsx
function InvestorCard({ investor, isExpanded, onToggle }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={animationConfig.springGentle}
      onClick={onToggle}
      style={{
        borderRadius: 12,
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      <LayoutGroup>
        {/* Header (always visible) */}
        <motion.div layout="position">
          <Avatar src={investor.profilePic} />
          <h3>{investor.fullName}</h3>
          <p>{investor.headline}</p>
        </motion.div>
        
        {/* Expandable Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: animationConfig.easeInOut }}
            >
              <p>{investor.about}</p>
              <Actions />
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  );
}
```

---

## Summary: Animation Hierarchy

| Element | Animation Type | Duration | Spring/Ease |
|---------|----------------|----------|-------------|
| Page Load | Fade | 0.8s | easeOut |
| Hero Elements | Stagger Cascade | 0.6s + delays | easeOut |
| Search Results | Slide-up Stagger | 0.4s | Spring Gentle |
| Card Hover | Scale + Lift | 0.2s | Spring Bouncy |
| Modal Open | Scale + Fade | 0.3s | Spring Gentle |
| Toast | Slide from right | 0.4s | Spring |
| Sidebar | Slide from left | 0.5s | Spring |
| Expansion | Height Auto | 0.4s | easeInOut |

**Total Animations Specified**: 20+ unique patterns

**Implementation Time Estimate**: 2-3 days for all animations (after base UI is complete)
