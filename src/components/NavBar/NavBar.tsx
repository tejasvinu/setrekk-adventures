"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { session } = useAuth();
    const userMenuRef = useRef<HTMLDivElement>(null);

    const getInitial = (email?: string | null) => {
        return email ? email[0].toUpperCase() : '?';
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            type="button" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <motion.div
                                animate={isMobileMenuOpen ? "open" : "closed"}
                                className="w-6 h-6"
                            >
                                {/* Replace with animated hamburger icon */}
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-200 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-200 ease-in-out mt-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-200 ease-in-out mt-1.5 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                            </motion.div>
                        </motion.button>
                    </div>

                    {/* Logo and main navigation */}
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/" className="flex items-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <h1 className="text-white text-3xl font-bold">Setrekk</h1>
                                </motion.div>
                            </Link>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="flex space-x-4">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/" className="bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-md px-4 py-2 text-sm font-medium transition-all">
                                        Home
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/trips" className="text-white/80 hover:text-white hover:bg-emerald-600/50 rounded-md px-4 py-2 text-sm font-medium transition-all">
                                        Trips
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/blog" className="text-white/80 hover:text-white hover:bg-emerald-600/50 rounded-md px-4 py-2 text-sm font-medium transition-all">
                                        Blog
                                    </Link>
                                </motion.div>
                            </div>

                            {/* User menu */}
                            <div className="ml-4 relative flex items-center" ref={userMenuRef}>
                                {session ? (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white focus:outline-none"
                                        >
                                            <span className="text-sm font-medium">
                                                {getInitial(session.user?.email)}
                                            </span>
                                        </motion.button>
                                        <AnimatePresence>
                                            {isUserMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute right-0 top-12 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                                                >
                                                    <div className="px-4 py-2 text-sm text-gray-700">
                                                        {session.user?.email}
                                                    </div>
                                                    <button
                                                        onClick={() => signOut()}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <div className="flex space-x-2">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link href="/login" className="text-white/80 hover:text-white hover:bg-emerald-600/50 rounded-md px-4 py-2 text-sm font-medium transition-all">
                                                Login
                                            </Link>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link href="/register" className="bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-md px-4 py-2 text-sm font-medium transition-all">
                                                Register
                                            </Link>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:hidden"
                    >
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/* Add your mobile menu items here */}
                            <Link href="/" className="text-white block rounded-md px-3 py-2 text-base font-medium">
                                Home
                            </Link>
                            <Link href="/trips" className="text-white/80 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                Trips
                            </Link>
                            <Link href="/blog" className="text-white/80 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                Blog
                            </Link>
                            {session ? (
                                <button
                                    onClick={() => signOut()}
                                    className="text-white/80 hover:text-white block w-full text-left rounded-md px-3 py-2 text-base font-medium"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link href="/login" className="text-white/80 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                        Login
                                    </Link>
                                    <Link href="/register" className="text-white/80 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
