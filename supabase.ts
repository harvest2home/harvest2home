
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhgadfdwfevounfhbkvx.supabase.co';
const supabaseKey = 'sb_publishable_9pZkpcetzRwoNxzVAAQALg_W8IKG5g8';

export const supabase = createClient(supabaseUrl, supabaseKey);
