'use client'

import {useState, useEffect} from 'react'
import {createClient} from '@/utils/supabase/client'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import {useRouter} from 'next/navigation'

interface Todo {
    id: number
    task: string
    is_complete: boolean
}

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState('')
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        fetchTodos()
    }, [])

    async function fetchTodos() {
        const {data} = await supabase.from('todos').select('*')
        if (data) setTodos(data)
    }

    async function addTodo() {
        const user = (await supabase.auth.getUser()).data.user
        const {data, error} = await supabase
            .from('todos')
            .insert({
                user_id: user?.id,
                task: newTodo,
                is_complete: false
            })
            .select()
        if (data) {
            setTodos([...todos, data[0]])
            setNewTodo('')
        }
    }

    async function toggleTodo(id: number, is_complete: boolean) {
        const {data} = await supabase
            .from('todos')
            .update({is_complete: !is_complete})
            .eq('id', id)
            .select()
        if (data) {
            setTodos(todos.map(todo => todo.id === id ? data[0] : todo))
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/auth')
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <div className="flex mb-4">
                <Input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                    className="mr-2"
                />
                <Button onClick={addTodo}>Add</Button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="flex items-center mb-2">
                        <Checkbox
                            checked={todo.is_complete}
                            onCheckedChange={() => toggleTodo(todo.id, todo.is_complete)}
                            className="mr-2"
                        />
                        <span className={todo.is_complete ? 'line-through' : ''}>
                          {todo.task}
                        </span>
                    </li>
                ))}
            </ul>
            <Button onClick={handleLogout} className="mt-4">Logout</Button>
        </div>
    )
}

