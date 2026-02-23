import React from 'react';
import { Sparkles, Menu } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="w-full py-5 px-6 md:px-12 flex justify-between items-center absolute top-0 left-0 z-50">
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Zentro Solutions" className="w-10 h-10 object-contain drop-shadow-md" />
                <span className="text-xl font-bold text-white tracking-tight">Zentro Solutions</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</a>
                <a href="#" className="text-white font-medium text-sm">Programs</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</a>
            </div>

            <button className="md:hidden text-white">
                <Menu className="w-6 h-6" />
            </button>
        </nav>
    );
};

export default Navbar;
