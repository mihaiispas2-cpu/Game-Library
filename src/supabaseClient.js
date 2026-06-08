import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://isreozzpnvboyifhwtmh.supabase.co";
const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcmVvenpwbnZib3lpZmh3dG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNzI3MTAsImV4cCI6MjA5NTc0ODcxMH0.vaPo4ZXU5g6RJaY4NB2S6RhgjUtjSCarX4ZCiPCKt9o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);