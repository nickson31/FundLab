export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile</h2>
                <div className="flex items-center space-x-6 mb-8">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                        FL
                    </div>
                    <div>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Change Picture</button>
                    </div>
                </div>

                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input type="text" defaultValue="Founder Name" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input type="email" defaultValue="founder@example.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Save Changes</button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Admin</h2>
                <p className="text-sm text-gray-500 mb-4">Manage database and system settings.</p>
                <button className="text-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100">
                    Flush Unused Tables
                </button>
            </div>
        </div>
    );
}
