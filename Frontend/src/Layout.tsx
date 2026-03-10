import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar.tsx'
// import Footer from "./components/Footer.tsx";

function Layout() {
    return (
        <div className="flex flex-row min-h-screen">
            <aside className="bg-[#F8F9FA] h-screen fixed">
                <Sidebar />
            </aside>

            <main className="bg-[#E6EDF3] grow ml-[320px]">
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
