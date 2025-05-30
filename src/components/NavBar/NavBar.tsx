"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { session } = useAuth();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

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

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3,
                ease: "easeOut"
            }
        })
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden z-10">
                        <motion.button 
                            whileTap={{ scale: 0.92 }}
                            type="button" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-emerald-600/50 hover:text-white focus:outline-none transition-colors focus:ring-2 focus:ring-emerald-500"
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle main menu"
                        >
                            <motion.div
                                animate={isMobileMenuOpen ? "open" : "closed"}
                                className="w-6 h-6 flex flex-col justify-center items-center"
                            >
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out mt-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out mt-1.5 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                            </motion.div>
                        </motion.button>
                    </div>

                    {/* Logo and main navigation */}
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex flex-shrink-0 items-center ml-12 sm:ml-0">
                            <Link href="/" className="flex items-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h1 className="text-white text-3xl font-bold text-shadow-glow">Setrekk</h1>
                                </motion.div>
                            </Link>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="flex space-x-4">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'Trips', href: '/trips' },
                                    { name: 'Blog', href: '/blog' },
                                    { name: 'About', href: '/about' }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={item.name}
                                        custom={i} 
                                        initial="hidden" 
                                        animate="visible" 
                                        variants={navItemVariants}
                                        whileHover={{ scale: 1.05, y: -2 }} 
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link 
                                            href={item.href}
                                            className={`
                                                ${isActive(item.href) 
                                                    ? 'bg-emerald-600 text-white' 
                                                    : 'text-white/80 hover:text-white hover:bg-emerald-600/50'
                                                } 
                                                rounded-md px-4 py-2 text-sm font-medium transition-all duration-300
                                            `}
                                        >
                                            {item.name}
                                            {isActive(item.href) && (
                                                <motion.div 
                                                    layoutId="activeNav"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white mt-1"
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Theme Toggle */}
                            <div className="mx-3">
                                <ThemeToggle />
                            </div>

                            {/* User menu */}
                            <motion.div 
                                className="relative flex items-center" 
                                ref={userMenuRef}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                {session ? (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                            aria-label="User menu"
                                            aria-expanded={isUserMenuOpen}
                                        >
                                            <span className="text-sm font-medium">
                                                {getInitial(session.user?.email)}
                                            </span>
                                        </motion.button>
                                        <AnimatePresence>
                                            {isUserMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 top-12 w-48 rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-slate-700 border border-slate-700/50"
                                                >
                                                    <div className="px-4 py-2 text-sm text-white/80 border-b border-slate-700/50">
                                                        {session.user?.email}
                                                    </div>
                                                    <Link
                                                        href="/profile"
                                                        className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-slate-700 transition-colors"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                    >
                                                        Profile
                                                    </Link>
                                                    <button
                                                        onClick={() => signOut()}
                                                        className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-slate-700 transition-colors"
                                                    >
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <div className="flex space-x-2">
                                        <motion.div 
                                            whileHover={{ scale: 1.05, y: -2 }} 
                                            whileTap={{ scale: 0.95 }}
                                            custom={3} 
                                            initial="hidden" 
                                            animate="visible" 
                                            variants={navItemVariants}
                                        >
                                            <Link href="/login" className="text-white/80 hover:text-white hover:bg-emerald-600/50 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300">
                                                Login
                                            </Link>
                                        </motion.div>
                                        <motion.div 
                                            whileHover={{ scale: 1.05, y: -2 }} 
                                            whileTap={{ scale: 0.95 }}
                                            custom={4} 
                                            initial="hidden" 
                                            animate="visible" 
                                            variants={navItemVariants}
                                        >
                                            <Link href="/register" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-emerald-500/20">
                                                Register
                                            </Link>
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="sm:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md shadow-lg overflow-hidden"
                    >
                        <motion.div 
                            className="space-y-1 px-4 py-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Trips', href: '/trips' },
                                { name: 'Blog', href: '/blog' },
                                { name: 'About', href: '/about' }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={navItemVariants}
                                >
                                    <Link href={item.href} 
                                        className={`
                                            ${isActive(item.href) 
                                                ? 'bg-emerald-600 text-white' 
                                                : 'text-white/90 hover:text-white hover:bg-emerald-600/50'
                                            } 
                                            block rounded-md px-4 py-2.5 text-base font-medium transition-all
                                        `}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Theme Toggle in mobile menu */}
                            <div className="pt-2 pb-3 px-4 border-t border-slate-700/50 mt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/80">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>

                            {session ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="px-4 py-2.5 text-sm text-white/80 border-t border-slate-700/50 mt-2 pt-2">
                                        {session.user?.email}
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="text-white/90 hover:text-white hover:bg-emerald-600/50 block w-full text-left rounded-md px-4 py-2.5 text-base font-medium transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-white/90 hover:text-white hover:bg-emerald-600/50 block w-full text-left rounded-md px-4 py-2.5 text-base font-medium transition-all"
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="border-t border-slate-700/50 mt-2 pt-2"
                                >
                                    <Link href="/login" 
                                        className="text-white/90 hover:text-white hover:bg-emerald-600/50 block rounded-md px-4 py-2.5 text-base font-medium transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link href="/register" 
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white block rounded-md px-4 py-2.5 text-base font-medium transition-all mt-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default NavBar;
