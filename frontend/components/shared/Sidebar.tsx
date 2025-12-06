'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Building2, Settings, FileText, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
    { icon: Home, label: 'Chat', href: '/chat' },
    { icon: Users, label: 'Angels', href: '/angels' },
    { icon: Building2, label: 'Funds', href: '/funds' },
    { icon: FileText, label: 'Docs', href: '/docs' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="fixed left-0 top-0 h-full bg-background/80 backdrop-blur-xl border-r border-border z-50 flex flex-col shadow-xl"
            initial={{ width: '70px' }}
            animate={{ width: isHovered ? '260px' : '70px' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-4 flex items-center justify-center h-20 border-b border-border/50">
                <Menu className="w-6 h-6 text-muted-foreground" />
            </div>

            <nav className="flex-1 py-8 space-y-2 px-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden relative",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {/* Active Shine Effect */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav-glow"
                                    className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20"
                                />
                            )}

                            <item.icon className={cn("w-6 h-6 min-w-[24px] z-10", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} strokeWidth={1.5} />

                            <motion.span
                                className="ml-4 font-medium whitespace-nowrap overflow-hidden z-10"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? 'auto' : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.label}
                            </motion.span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border/50 bg-muted/20">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-background">
                        FL
                    </div>
                    <motion.div
                        className="ml-3 overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? 'auto' : 0 }}
                    >
                        <p className="text-sm font-medium text-foreground">Founder</p>
                        <p className="text-xs text-muted-foreground">Free Plan</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
