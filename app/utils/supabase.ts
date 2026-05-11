import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://htaixaqtxnhsuizjyrvu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yI6sXc3hd8rVHpx3PCHDXQ_C2RC29YW';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);