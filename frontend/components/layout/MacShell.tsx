'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Users, Building2, FileText, Settings, Search, MoreHorizontal, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MacShellProps {
    children: React.ReactNode;
    sidePanel?: React.ReactNode; // Optional right panel (e.g., for investor cards)
}

export default function MacShell({ children, sidePanel }: MacShellProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await import('@/lib/supabase').then(m => m.supabase.auth.getUser());
            setUser(user);
        };
        fetchUser();
    }, []);

    // Default Nav Items
    const navItems = [
        { icon: Home, label: 'Chat', href: '/chat' },
        { icon: Users, label: 'Angels', href: '/angels' },
        { icon: Building2, label: 'Funds', href: '/funds' },
        { icon: FileText, label: 'Docs', href: '/docs' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <div className="flex w-screen h-screen items-center justify-center p-4 lg:p-10 overflow-hidden bg-black/40">
            <div className="flex flex-col overflow-hidden w-full h-full max-w-7xl max-h-[95vh] glass-panel rounded-2xl shadow-2xl backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 relative bg-[#0a0a0a]/60">

                {/* Mac Title Bar */}
                <div className="flex border-b border-white/5 pt-4 pr-5 pb-4 pl-5 items-center justify-between bg-black/40 z-50 select-none">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 group">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm border border-transparent group-hover:border-[#E0443E] transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm border border-transparent group-hover:border-[#D89E24] transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm border border-transparent group-hover:border-[#1AAB29] transition-colors"></div>
                        </div>
                        {/* Go Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="text-blue-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 active:scale-95 ml-2 flex items-center justify-center"
                            title="Go Back"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-white/30 uppercase tracking-[0.2em] transform -translate-x-4">
                        FundLab AI
                    </div>
                    <div className="w-16"></div> {/* Spacer for balance */}
                </div>

                {/* App Content */}
                <div className="flex-1 flex overflow-hidden relative">

                    {/* Left Sidebar - Navigation */}
                    <aside className="w-64 border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-md">
                        {/* Search Mock */}
                        <div className="p-4 border-b border-white/5">
                            <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-white/5 border border-white/5 text-blue-400 group focus-within:ring-1 focus-within:ring-white/10 transition-all">
                                <Search className="w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input placeholder="Search..." className="w-full bg-transparent text-sm placeholder-slate-600 focus:outline-none" />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 group relative overflow-hidden",
                                            isActive
                                                ? "text-indigo-100 font-medium"
                                                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute inset-0 bg-indigo-500/10 border-l-2 border-indigo-500/50" />
                                        )}
                                        <item.icon className={cn("w-4 h-4 z-10 transition-colors", isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
                                        <span className="z-10">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Profile */}
                        <div className="border-t border-white/5 p-4 bg-black/10">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg ring-1 ring-white/10">
                                    {user?.email?.[0].toUpperCase() || 'F'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-slate-200 truncate">{user?.confirmed_at ? user.email.split('@')[0] : 'Founder'}</div>
                                    <div className="text-xs text-slate-500">{user?.email || 'Free Plan'}</div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white hover:bg-white/5">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Center Main Content */}
                    <main className="flex-1 flex flex-col bg-transparent relative z-0 overflow-hidden">
                        {children}
                    </main>

                    {/* Optional Right Panel */}
                    {sidePanel && (
                        <aside className="w-96 border-l border-white/5 flex flex-col bg-black/20 backdrop-blur-md">
                            {sidePanel}
                        </aside>
                    )}

                </div>
            </div>
        </div>
    );
}
