import { supabase } from '@/lib/supabase';
import { Project, BlogPost } from '@/types';

// ─── Projects ────────────────────────────────────────────────────────────────

export const fetchAllProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[fetchAllProjects]', error.message);
        return [];
    }
    return data as Project[];
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('[fetchProjectBySlug]', error.message);
        return null;
    }
    return data as Project;
};

// ─── Blogs ────────────────────────────────────────────────────────────────────

export const fetchAllBlogs = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[fetchAllBlogs]', error.message);
        return [];
    }
    return data as BlogPost[];
};

export const fetchBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('[fetchBlogBySlug]', error.message);
        return null;
    }
    return data as BlogPost;
};
