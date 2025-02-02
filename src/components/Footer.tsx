'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

function Footer() {
    const footerAnimation = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <motion.div 
                variants={footerAnimation}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-200">About</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/team" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    Team
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-200">Explore</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/trips" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    All Trips
                                </Link>
                            </li>
                            <li>
                                <Link href="/calendar" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    Calendar
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-200">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contact" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-200">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-8 border-t border-slate-800 pt-8">
                    <p className="text-center text-sm text-slate-400">
                        © {new Date().getFullYear()} Setrekk. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </footer>
    );
}

export default Footer;
