import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { accounts } from '../assets/dummydata/accounts'

interface ProtectedRouteProps {
    children: ReactNode
    allowedRoles?: string[]
}

function ProtectedRoute({
    children,
    allowedRoles = ['admin', 'hr'],
}: ProtectedRouteProps) {
    const userId = localStorage.getItem('userId')

    const foundUser = accounts.find((u) => u.id.toString() === userId)

    // 1. Not logged in at all -> Send to Login
    if (!foundUser) {
        return <Navigate to="/login" replace />
    }

    // 2. Requires admin, but user is something else -> Send to User Home
    if (!allowedRoles.includes(foundUser.role)) {
        return <Navigate to="/home" replace />
    }

    // 3. Authorized -> Render the protected layout/page
    return <>{children}</>
}

export default ProtectedRoute
