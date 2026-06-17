import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://kfjhjnclcujvjhklxphh.supabase.co';  // ✅ ya la tenés
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmamhqbmNsY3Vqdmpoa2x4cGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDQyMTgsImV4cCI6MjA5NjYyMDIxOH0.TN2jQqKu_nAGuo4qoUOX7cBTm75UeJZVwWwf5XT3FWI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});