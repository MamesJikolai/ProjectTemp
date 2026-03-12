import { Outlet } from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar.tsx'
import UserSidebar from './components/UserSidebar.tsx'

function Layout() {
    const role = localStorage.getItem('userRole') || 'user'

    return (
        <div className="flex flex-row min-h-screen">
            <aside className="bg-[#F8F9FA] h-screen fixed">
                {role === 'admin' ? <AdminSidebar /> : <UserSidebar />}
            </aside>

            <main className="bg-[#E6EDF3] grow ml-[320px] min-w-0 overflow-x-hidden">
                <div>
                    <Outlet />
                </div>
            </main>

            {/* <footer className="bg-emerald-600">
                <Footer />
            </footer> */}
        </div>
    )
}

export default Layout
