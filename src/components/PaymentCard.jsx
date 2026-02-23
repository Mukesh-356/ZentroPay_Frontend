import React, { useState } from 'react';
import axios from 'axios';
import { CreditCard, User, Mail, ShieldCheck, Sparkles } from 'lucide-react';

const PaymentCard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const loadRazorpay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay failed to load. Are you online?");
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order
            const result = await axios.post("http://localhost:5000/api/payment/order");

            if (!result) {
                alert("Server error. Are you online?");
                setLoading(false);
                return;
            }

            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyHere",
                amount: amount.toString(),
                currency: currency,
                name: "Zentro Solutions",
                description: "Internship Payment",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        name: name,
                        email: email
                    };

                    try {
                        const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", data);
                        if (verifyRes.data.success) {
                            window.location.href = verifyRes.data.redirect_url;
                        } else {
                            alert("Payment verification failed");
                        }
                    } catch (error) {
                        console.log(error);
                        alert("Error verifying payment");
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: "",
                },
                theme: {
                    color: "#4f46e5",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.log(error);
            alert("Error creating order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-1 relative overflow-hidden group">
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-30 transition duration-700"></div>

            <div className="bg-slate-900/50 backdrop-blur-xl relative rounded-xl p-8 border border-white/5">

                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="Zentro Logo" className="w-16 h-16 mx-auto mb-4 object-contain drop-shadow-lg" />
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Zentro Solutions</h2>
                    <p className="text-gray-400 flex items-center justify-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Official Internship Portal
                    </p>
                </div>

                {/* Amount Card */}
                <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10 flex justify-between items-center backdrop-blur-sm">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Registration Fee</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">₹99 <span className="text-lg text-gray-500 font-normal">/ one-time</span></h3>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                        <CreditCard className="w-6 h-6 text-indigo-400" />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                className="input-field pl-11"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                className="input-field pl-11"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-indigo-600/30 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            <>
                                Pay ₹99 Now
                                <ShieldCheck className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-6">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Secured by Razorpay • 256-bit SSL Encrypted</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentCard;
