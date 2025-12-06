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
            className="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col"
            initial={{ width: '60px' }}
            animate={{ width: isHovered ? '240px' : '60px' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-4 flex items-center justify-center h-16 border-b border-gray-100 dark:border-gray-800">
                <Menu className="w-6 h-6 text-gray-500" />
            </div>

            <nav className="flex-1 py-6 space-y-2 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-3 rounded-lg transition-colors group",
                                isActive
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6 min-w-[24px]", isActive ? "text-indigo-600" : "text-gray-500")} />

                            <motion.span
                                className="ml-4 font-medium whitespace-nowrap overflow-hidden"
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

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        FL
                    </div>
                    <motion.div
                        className="ml-3 overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? 'auto' : 0 }}
                    >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Founder</p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
