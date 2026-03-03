import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Admin features will be disabled. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Environment Variables.');
}

// Fallback to placeholder strings to prevent a complete app crash on init
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-domain.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
