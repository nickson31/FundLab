'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Github, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError) throw signUpError;
                setMessage('Check your email for the confirmation link.');
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                router.push('/chat');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md p-8"
            >
                <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
                    {/* Top Shine */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isSignUp ? 'signup' : 'signin'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-2"
                            >
                                <h1 className="text-2xl font-semibold text-white tracking-tight">
                                    {isSignUp ? 'Create an account' : 'Welcome back'}
                                </h1>
                                <p className="text-blue-400 text-sm">
                                    {isSignUp ? 'Get started with FundLab AI' : 'Sign in to your FundLab AI account'}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 text-red-400 text-xs">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                        {message && (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-3 text-green-400 text-xs">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                <span>{message}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-blue-400 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-blue-500"
                                    placeholder="founder@startup.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-blue-400 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-6 mt-2 shadow-lg shadow-indigo-500/20 font-medium transition-all"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isSignUp ? 'Sign Up' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-xs text-blue-400 font-medium">OR CONTINUE WITH</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-2.5 transition-colors group">
                            <Github className="w-4 h-4 text-blue-400 group-hover:text-white" />
                            <span className="text-sm font-medium text-blue-400 group-hover:text-white">Github</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-2.5 transition-colors group">
                            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                                <span className="text-black font-bold text-[10px]">G</span>
                            </div>
                            <span className="text-sm font-medium text-blue-400 group-hover:text-white">Google</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-xs text-blue-400 transition-colors">
                        {isSignUp ? "Already have an account? " : "Don't have an account? "}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium focus:outline-none"
                        >
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
