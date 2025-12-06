'use client';

import MacShell from '@/components/layout/MacShell';

export default function SettingsPage() {
    return (
        <MacShell>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <div className="mb-8 sticky top-0 bg-black/40 backdrop-blur-xl p-4 -mx-4 rounded-xl border border-white/5 z-10">
                        <h1 className="text-2xl font-medium text-white tracking-tight">Settings</h1>
                    </div>

                    <div className="glass-panel rounded-xl border border-white/5 p-8 mb-8">
                        <h2 className="text-xl font-medium text-white mb-6">Profile</h2>
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 text-2xl font-bold border border-indigo-500/20">
                                FL
                            </div>
                            <div>
                                <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Change Picture</button>
                            </div>
                        </div>

                        <div className="space-y-6 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                                <input type="text" defaultValue="Founder Name" className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/20 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                                <input type="email" defaultValue="founder@example.com" className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/20 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600" />
                            </div>
                            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">Save Changes</button>
                        </div>
                    </div>

                    <div className="glass-panel rounded-xl border border-white/5 p-8 pb-20">
                        <h2 className="text-xl font-medium text-white mb-6">Admin</h2>
                        <p className="text-sm text-gray-400 mb-4">Manage database and system settings.</p>
                        <button className="text-red-400 border border-red-500/20 bg-red-500/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
                            Flush Unused Tables
                        </button>
                    </div>
                </div>
            </div>
        </MacShell>
    );
}
