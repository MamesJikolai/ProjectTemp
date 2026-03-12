import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultButton from '../components/DefaultButton.tsx'
import TextInput from '../components/TextInput.tsx'
import { users } from '../assets/users.ts'

function LogIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const foundUser = users.find(
            (u) => u.username === username && u.password === password
        )

        if (foundUser) {
            localStorage.setItem('userRole', foundUser.role)
            navigate('/dashboard')
        } else {
            setError('Invalid username or password')
        }
    }

    return (
        <div className="flex h-screen flex-col justify-center drop-shadow-md">
            <form
                onSubmit={handleLogin}
                className="flex flex-col items-center gap-[16px] w-fit mx-auto rounded-[32px] px-[64px] py-[32px] bg-[#FEF9FA]"
            >
                <h1>Log In</h1>

                {error && <p className="text-[#DC3545] text-sm m-0">{error}</p>}

                <TextInput
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-[320px]"
                />

                <TextInput
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[320px]"
                />

                <DefaultButton type="submit">Log In</DefaultButton>
            </form>
        </div>
    )
}

export default LogIn
