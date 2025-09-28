import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://ubscwajfelhjjoqugkqn.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVic2N3YWpmZWxoampvcXVna3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMDY3MjQsImV4cCI6MjA3NDU4MjcyNH0.P7k1hDSbLyPGLfQc09_8Bph2Lyn4fUoSGh9toSZ_dEI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

