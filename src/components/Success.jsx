import React from 'react';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';

const Success = ({ paymentId }) => {
    return (
        <div className="glass-card p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay"></div>

            <div className="relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 animate-bounce-slow">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                </div>

                <h2 className="text-4xl font-bold run-text-gradient mb-2 text-white">Payment Successful!</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-6 opacity-50"></div>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Welcome to the team! <br />
                    We've sent your offer letter to your email.
                </p>

                <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10 backdrop-blur-md">
                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Transaction ID</p>
                    <p className="font-mono text-xl text-white font-semibold select-all tracking-wide">{paymentId}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3.5 px-6 rounded-xl transition duration-200 border border-white/10 flex items-center justify-center gap-2 group"
                    >
                        <span>Back to Home</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-xs text-gray-500 mt-2">
                        Check your spam folder if you don't see the email.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Success;
