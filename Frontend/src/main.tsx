import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Courses from './pages/Courses.tsx'
import Settings from './pages/Settings.tsx'
import Achievements from './pages/Achievements.tsx'
import Campaigns from './pages/Campaigns.tsx'
import Analytics from './pages/Analytics.tsx'
import Notifications from './pages/Notifications.tsx'
import Account from './pages/Account.tsx'
import Users from './pages/Users.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            {
                path: '/campaigns',
                element: <Campaigns />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/courses',
                element: <Courses />,
            },
            {
                path: '/analytics',
                element: <Analytics />,
            },
            {
                path: '/Achievements',
                element: <Achievements />,
            },
            {
                path: '/settings',
                element: <Settings />,
            },
            {
                path: '/notifications',
                element: <Notifications />,
            },
            {
                path: '/account',
                element: <Account />,
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
