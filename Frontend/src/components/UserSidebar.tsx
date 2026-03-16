import { Link } from 'react-router-dom'
import MenuItem from './MenuItem.tsx'
import { Icons } from '../assets/icons.ts'

const navLinksTop = [
    {
        title: 'Home',
        link: '/',
        href: Icons.dashboard,
        hrefActive: Icons.dashboardActive,
    },
    {
        title: 'My Courses',
        link: '/my-courses',
        href: Icons.courses,
        hrefActive: Icons.coursesActive,
    },
    {
        title: 'Achievements',
        link: '/achievements',
        href: Icons.achievements,
        hrefActive: Icons.achievementsActive,
    },
]

const navLinksBottom = [
    {
        title: 'Sign In',
        link: '/login',
        href: Icons.account,
        hrefActive: Icons.accountActive,
    },
]

function UserSidebar() {
    return (
        <div className="flex flex-col justify-between w-[240px] text-[#4A4A4A] h-full">
            <div>
                {/* logo */}
                <Link to="/dashboard">
                    <div className="bg-[#024C89] w-fill h-[120px] m-2"></div>
                </Link>

                {/* nav links */}
                <MenuItem items={navLinksTop} />
            </div>

            <div>
                <MenuItem items={navLinksBottom} />
            </div>
        </div>
    )
}

export default UserSidebar
