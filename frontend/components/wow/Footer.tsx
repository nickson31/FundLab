import Link from 'next/link';
import { Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-950 py-12 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 block">
                            FundLab
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                            The AI co-pilot for fundraising. Match with investors, draft personalized outreach, and close your round faster.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li><Link href="/chat" className="hover:text-indigo-600">Search Investors</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600">How it Works</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li><Link href="#" className="hover:text-indigo-600">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © 2025 FundLab SL. All rights reserved. Made with ❤️ for founders.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-indigo-600"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-indigo-600"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-indigo-600"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
