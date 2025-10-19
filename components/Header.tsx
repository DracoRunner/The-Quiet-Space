'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToggleModalFunction } from '../types';

interface HeaderProps {
    toggleModal: ToggleModalFunction;
}

const Header: React.FC<HeaderProps> = ({ toggleModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/blogs', label: 'Blogs' },
        { href: '/confession', label: 'Confession' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-[#2C3531]">
                            The Quiet Space
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link 
                                    key={link.href} 
                                    href={link.href} 
                                    className={`font-medium transition duration-300 relative ${
                                        isActive 
                                            ? 'text-[#2C3531]' 
                                            : 'text-gray-600 hover:text-[#2C3531]'
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-[#B48B7F]"></span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="hidden md:block">
                        <button onClick={() => toggleModal(true)} className="bg-[#B48B7F] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]">
                            Book Session
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#2C3531] focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white py-4">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-[#2C3531] block px-3 py-2 rounded-md text-base font-medium">
                                {link.label}
                            </Link>
                        ))}
                        <button onClick={() => { toggleModal(true); setIsOpen(false); }} className="mt-4 bg-[#B48B7F] text-white font-semibold py-2 px-6 rounded-lg shadow-md">
                            Book Session
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
