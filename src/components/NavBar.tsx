"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
            <div className="mx-auto mt-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button 
                            type="button" 
                            onClick={toggleMobileMenu}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg 
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>
                            <svg 
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/">
                                <Image
                                    className="h-16 w-auto"
                                    src="/setrekk-v3-transformed.png"
                                    alt="Setrekk"
                                    width={64}
                                    height={64}
                                />
                            </Link>
                            <Link href="/" className="hidden sm:block">
                                <h1 className="text-white mx-auto ml-3 text-4xl font-bold">Setrekk</h1>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4 mt-4 pl-8">
                                <Link 
                                    href="/" 
                                    className="bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-md px-4 py-2 text-sm font-medium transition-all"
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/trips"
                                    className="text-white/80 hover:text-white hover:bg-emerald-600/50 rounded-md px-4 py-2 text-sm font-medium transition-all"
                                >
                                    Trips
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link 
                            href="/"
                            className="text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/trips"
                            className="text-white block hover:text-white rounded-md px-3 py-2 text-base font-medium"
                        >
                            Trips
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
