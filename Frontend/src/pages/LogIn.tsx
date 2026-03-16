import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { users } from '../assets/users.ts'

function LogIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')
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

    const handleToggle = () => {
        setType((prev) => (prev === 'password' ? 'text' : 'password'))
    }

    return (
        <div className="flex h-screen flex-col justify-center drop-shadow-md">
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4 bg-[#FEF9FA] w-[90%] max-w-[600px] mx-auto px-[48px] py-[32px]"
            >
                <div className="flex flex-col gap-1">
                    <h1>Login</h1>
                    {error && <p className="text-rose-500">{error}</p>}
                </div>

                <label>
                    <span>Email</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-[#DDE2E5] border-2 w-full px-4 py-2 rounded-[32px]"
                    />
                </label>

                <label>
                    <span>Password</span>
                    <input
                        type={type}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-[#DDE2E5] border-2 w-full px-4 py-2 mb-1 rounded-[32px]"
                    />

                    <label className="flex-row! items-center w-fit cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={type === 'text'}
                            className="accent-[#3572A1] cursor-pointer"
                        />
                        <span>Show password</span>
                    </label>
                </label>

                <button
                    type="submit"
                    className="text-[#FFFAFA] bg-[#024C89] hover:bg-[#3572A1] py-2 cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default LogIn
