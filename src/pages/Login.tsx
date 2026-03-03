import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { adminLogin } from '@/services/admin.api';
import { Loader2, Lock, Mail, X } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await adminLogin(email, password);
            navigate('/admin');
        } catch (err: any) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const closeLogin = () => {
        setSearchParams({});
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 min-h-screen">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={closeLogin}
                    className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
                    title="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
                        <Lock className="w-7 h-7 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin Access</h1>
                    <p className="text-white/40 mt-2 text-sm">Secure portal — authorized users only</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                                <input
                                    id="login-email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@yourdomain.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                                <input
                                    id="login-password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold text-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    VERIFYING...
                                </>
                            ) : (
                                'AUTHENTICATE'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/30 text-xs mt-6 font-medium tracking-widest uppercase">
                    PORTFOLIO CMS · SECURED BY SUPABASE
                </p>
            </div>
        </div>
    );
};

export default Login;
