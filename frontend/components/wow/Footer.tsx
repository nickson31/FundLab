import Link from 'next/link';
import { Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-muted/30 py-16 border-t border-border mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 block w-fit">
                            FundLab
                        </Link>
                        <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
                            The AI co-pilot for fundraising. Match with investors, draft personalized outreach, and close your round faster.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Product</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="/chat" className="hover:text-primary transition-colors">Search Investors</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Legal</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center opacity-75">
                    <p className="text-sm text-muted-foreground">
                        © 2025 FundLab SL. All rights reserved. Made with ❤️ for founders.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
