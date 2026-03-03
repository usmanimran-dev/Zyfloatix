import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProjects } from '@/services/public.api';
import { fetchAllBlogs } from '@/services/public.api';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, BookOpen, ArrowRight, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [projectCount, setProjectCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            const [projects, blogs] = await Promise.all([fetchAllProjects(), fetchAllBlogs()]);
            setProjectCount(projects.length);
            setBlogCount(blogs.length);
            setLoading(false);
        };
        loadStats();
    }, []);

    const stats = [
        { label: 'Total Projects', value: projectCount, icon: Briefcase, color: 'violet', href: '/admin/projects' },
        { label: 'Blog Posts', value: blogCount, icon: BookOpen, color: 'cyan', href: '/admin/blogs' },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1 text-sm">
                    Welcome back, {user?.email}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {stats.map(({ label, value, icon: Icon, color, href }) => (
                    <Link
                        key={label}
                        to={href}
                        className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-3">{label}</p>
                                <p className="text-4xl font-black text-white">
                                    {loading ? '—' : value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color === 'violet' ? 'bg-violet-600/20 text-violet-400' : 'bg-cyan-600/20 text-cyan-400'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-slate-500 text-xs group-hover:text-slate-300 transition-colors">
                            <span>Manage {label}</span>
                            <ArrowRight className="w-3 h-3" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-violet-400" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/admin/projects"
                        className="flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-2xl p-5 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">New Project</p>
                            <p className="text-slate-400 text-xs">Add a project to your portfolio</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 ml-auto transition-colors" />
                    </Link>

                    <Link
                        to="/admin/blogs"
                        className="flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">New Blog Post</p>
                            <p className="text-slate-400 text-xs">Write a new article</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 ml-auto transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
