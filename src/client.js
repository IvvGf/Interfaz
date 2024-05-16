import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rddvqrdjrprvrjcenyuh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZHZxcmRqcnBydnJqY2VueXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3Mjk2MTksImV4cCI6MjAzMTMwNTYxOX0.k7vGxAlisFMpCaNB9IOeXu_tj3mPbYl-LxV5bglhe-U'
export const supabase = createClient(supabaseUrl, supabaseKey)