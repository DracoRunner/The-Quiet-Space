import React from 'react';
import { NavLink } from 'react-router-dom';
import { ToggleModalFunction } from '../types';

interface HeaderProps {
    toggleModal: ToggleModalFunction;
}

const Header: React.FC<HeaderProps> = ({ toggleModal }) => {
    const activeLinkStyle = {
        color: '#2C3531',
        fontWeight: '600',
        borderBottom: '2px solid #B48B7F',
        paddingBottom: '0.25rem'
    };

    const inactiveLinkStyle = {
        color: '#4B5563', // gray-600
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <NavLink to="/" className="text-2xl font-bold text-[#2C3531] tracking-wider">The Quiet Space</NavLink>
                <nav className="hidden md:flex space-x-8 text-lg font-medium">
                    <NavLink to="/" className="hover:text-[#B48B7F] transition duration-300" style={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}>Home</NavLink>
                    <NavLink to="/about" className="hover:text-[#B48B7F] transition duration-300" style={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}>About Us</NavLink>
                    <NavLink to="/blogs" className="hover:text-[#B48B7F] transition duration-300" style={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}>Blogs</NavLink>
                    <NavLink to="/confession" className="hover:text-[#B48B7F] transition duration-300" style={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}>Confession</NavLink>
                </nav>
                <button onClick={() => toggleModal(true)} className="bg-[#2C3531] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]">
                    Book Session
                </button>
                <button className="md:hidden text-[#2C3531] focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </header>
    );
};

export default Header;