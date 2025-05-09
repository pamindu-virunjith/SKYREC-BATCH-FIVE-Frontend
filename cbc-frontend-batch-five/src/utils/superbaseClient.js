import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_MEDIAUPLAD_URL
const key = import.meta.env.VITE_MEDIAUPLAD_KEY

export const supabase = createClient(url,key)
