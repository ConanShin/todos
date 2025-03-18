'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {createClient} from '@/utils/supabase/client'

export default function AuthCallback() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { error } = await supabase.auth.exchangeCodeForSession(window.location.hash)
            if (!error) {
                router.push('/todos')
            } else {
                console.error('Error during auth callback:', error)
                router.push('/auth')
            }
        }

        handleAuthCallback()
    }, [router, supabase.auth])

    return <div>처리 중...</div>
}
