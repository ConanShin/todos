'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {createClient} from '@/utils/supabase/client'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleSignUp = async () => {
        const isGithubPage = location.origin.endsWith('github.io')
        const basePath = isGithubPage ? location.origin + '/todos' : location.origin
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${basePath}/auth/callback`,
            },
        })
    }

    const handleSignIn = async () => {
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            if (error.message === 'Email not confirmed') {
                toast.error('이메일 확인이 필요합니다. 이메일을 확인해주세요.');
            } else {
                toast.error(error.message);
            }
        } else {
            router.push('/todos')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <ToastContainer />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2"
            />
            <div className="space-x-2">
                <Button onClick={handleSignUp}>Sign Up</Button>
                <Button onClick={handleSignIn}>Sign In</Button>
            </div>
        </div>
    )
}

