import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        "https://khsfusfxylokdoibxrbf.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoc2Z1c2Z4eWxva2RvaWJ4cmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzc0NjYsImV4cCI6MjA1NzgxMzQ2Nn0.vQ6nKgvvLdtjUU7iyxxqsO_s--V_jYIpEYJMHdXOrfQ"
    )
}