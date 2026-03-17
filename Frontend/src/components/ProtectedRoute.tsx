import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { users } from '../assets/users'

interface ProtectedRouteProps {
    children: ReactNode
    requireAdmin?: boolean
}

function ProtectedRoute({
    children,
    requireAdmin = false,
}: ProtectedRouteProps) {
    const userId = localStorage.getItem('userId')

    const foundUser = users.find((u) => u.id.toString() === userId)

    // 1. Not logged in at all -> Send to Login
    if (!foundUser) {
        return <Navigate to="/login" replace />
    }

    // 2. Requires admin, but user is something else -> Send to User Home
    if (requireAdmin && foundUser.role !== 'admin') {
        return <Navigate to="/home" replace />
    }

    // 3. Authorized -> Render the protected layout/page
    return <>{children}</>
}

export default ProtectedRoute
