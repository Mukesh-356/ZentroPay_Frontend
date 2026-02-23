import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-8 border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                    © 2024 Zentro Solutions. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                    <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
