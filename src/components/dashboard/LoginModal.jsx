"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '@/context/DashboardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
    const { login } = useDashboard();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (success) {
            onClose();
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[32px] p-10 shadow-2xl border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Welcome Back</h2>
                            <p className="text-gray-500 text-sm">Sign in to edit your dashboard data.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="admin@gammaincome.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-2xl h-12 bg-gray-50 border-gray-100 focus:border-blue-500 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="rounded-2xl h-12 bg-gray-50 border-gray-100 focus:border-blue-500 focus:ring-0"
                                    required
                                />
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-xl border border-red-100"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-2xl bg-[#0f172a] hover:bg-black text-white font-bold transition-all"
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                                Gamma Income Property Management
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
