import { useEffect, useState } from 'react';
import { fetchAllBlogs } from '@/services/public.api';
import { adminCreateBlog, adminDeleteBlog } from '@/services/admin.api';
import { BlogPost, InsertBlog } from '@/types';
import { formatDate, readingTime } from '@/utils/formatters';
import { Plus, Trash2, Loader2, X, Tag } from 'lucide-react';

const defaultForm: InsertBlog = {
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    tags: [],
};

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<InsertBlog>(defaultForm);
    const [tagInput, setTagInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const loadBlogs = async () => {
        setLoading(true);
        const data = await fetchAllBlogs();
        setBlogs(data);
        setLoading(false);
    };

    useEffect(() => { loadBlogs(); }, []);

    const handleAddTag = () => {
        const tag = tagInput.trim().toLowerCase();
        if (tag && !form.tags.includes(tag)) {
            setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await adminCreateBlog(form);
            setForm(defaultForm);
            setShowForm(false);
            await loadBlogs();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        try {
            await adminDeleteBlog(id);
            await loadBlogs();
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
                    <p className="text-slate-400 text-sm mt-1">{blogs.length} articles published</p>
                </div>
                <button
                    id="add-blog-btn"
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm rounded-xl transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                    <h2 className="text-white font-bold text-lg mb-6">New Blog Post</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-2">Title *</label>
                                <input
                                    required
                                    value={form.title}
                                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                                    placeholder="Building Scalable Fintech Systems"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-2">Featured Image URL</label>
                                <input
                                    value={form.featured_image || ''}
                                    onChange={e => setForm(p => ({ ...p, featured_image: e.target.value }))}
                                    placeholder="https://..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-2">Excerpt *</label>
                            <textarea
                                required
                                rows={2}
                                value={form.excerpt}
                                onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                                placeholder="A short summary shown on the blog listing page..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-2">Content (Markdown) *</label>
                            <textarea
                                required
                                rows={10}
                                value={form.content}
                                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                                placeholder="Write your full blog post content here in Markdown..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none font-mono"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-2">Tags</label>
                            <div className="flex gap-2 mb-3 flex-wrap">
                                {form.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 text-xs rounded-full">
                                        <Tag className="w-2.5 h-2.5" />
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(tag)}>
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                    placeholder="e.g. fintech, supabase, typescript"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-xl transition-all"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                id="submit-blog"
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-semibold text-sm rounded-xl transition-all"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                {submitting ? 'Publishing...' : 'Publish Post'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowForm(false); setForm(defaultForm); }}
                                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Blog List */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    <p className="text-lg">No blog posts yet.</p>
                    <p className="text-sm mt-1">Click "New Post" to publish your first article.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-5 hover:border-slate-700 transition-all">
                            {blog.featured_image && (
                                <img src={blog.featured_image} alt={blog.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-bold">{blog.title}</h3>
                                <p className="text-slate-400 text-sm mt-1 line-clamp-2">{blog.excerpt}</p>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {blog.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-cyan-900/30 text-cyan-400 text-xs rounded-full border border-cyan-800/50">{tag}</span>
                                    ))}
                                </div>
                                <p className="text-slate-600 text-xs mt-2">
                                    {formatDate(blog.created_at)} · {readingTime(blog.content)}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(blog.id, blog.title)}
                                className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-all flex-shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
