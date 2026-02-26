import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

const PortalAccessForm = ({ paymentId, onComplete }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : 'https://zentropay-backend.onrender.com';
            const response = await axios.post(`${API_URL}/api/portal/register`, {
                name,
                email,
                password,
                payment_id: paymentId
            });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    if (onComplete) onComplete();
                    else window.location.href = '/';
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register portal access. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="glass-card p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay"></div>
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Portal Access Created!</h3>
                <p className="text-gray-300">You will be redirected shortly...</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-20 blur-xl group-hover:opacity-30 transition duration-700"></div>

            <div className="bg-slate-900/50 backdrop-blur-xl relative rounded-xl p-8 border border-white/5">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Create Portal Access</h2>
                    <p className="text-gray-400 text-sm">
                        Set up your account to access the internship portal and your resources.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                        <div className="relative">
                            <input type="text" required className="input-field pl-11" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
                            <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <input type="email" required className="input-field pl-11" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Set Password</label>
                        <div className="relative">
                            <input type="password" required className="input-field pl-11" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10 mt-2">
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Customizing...
                            </span>
                        ) : (
                            <>
                                Complete Setup
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Your credentials are securely stored</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PortalAccessForm;
