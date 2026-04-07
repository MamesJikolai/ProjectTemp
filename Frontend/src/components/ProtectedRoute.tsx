import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
    children: ReactNode
    allowedRoles?: string[]
}

function ProtectedRoute({
    children,
    allowedRoles = ['admin', 'hr'],
}: ProtectedRouteProps) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Checking authorization...
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/home" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
