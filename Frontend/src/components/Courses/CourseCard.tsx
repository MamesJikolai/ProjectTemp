import { useAuth } from '../../context/AuthContext'
import SmallButton from '../SmallButton'
import type { Course } from '../../types/models'

interface CourseCardProps {
    item: Course
    image?: string
    customCSS?: string
    userRole?: string
    openEditModal?: () => void
    handleDeleteCourse?: () => void
}

function CourseCard({
    item,
    customCSS,
    openEditModal,
    handleDeleteCourse,
}: CourseCardProps) {
    // Grab the logged-in user directly from context
    const { user } = useAuth()
    const userRole = user?.role || ''

    return (
        <div
            className={`flex flex-col bg-[#F8F9FA] w-[300px] rounded-2xl p-4 shrink-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 ${customCSS}`}
        >
            <div className="relative w-full h-[180px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3572A1] to-[#024C89]" />
            </div>
            <div className="flex flex-col grow mt-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm mt-1 grow">{item.caption}</p>
            </div>

            {userRole &&
                userRole?.toLowerCase() !== 'hr' &&
                userRole?.toLowerCase() !== 'admin' && (
                    <SmallButton className="bg-[#024C89] hover:bg-[#3572A1]">
                        Start Lesson
                    </SmallButton>
                )}

            {userRole !== 'hr' && (
                <div>
                    <SmallButton
                        disabled={item.is_published}
                        className="bg-[#024C89] text-[#F8F9FA] hover:bg-[#3572A1]"
                    >
                        {item.is_published ? 'Published' : 'Publish'}
                    </SmallButton>
                    <div className="flex flex-row gap-4">
                        <SmallButton
                            onClick={openEditModal}
                            className="border-2 border-[#024C89] text-[#024C89] hover:bg-[#024C89] hover:text-[#F8F9FA]"
                        >
                            Edit
                        </SmallButton>
                        <SmallButton
                            onClick={handleDeleteCourse}
                            className="bg-[#DC3545] text-[#F8F9FA] hover:bg-[#FF6B6B]"
                        >
                            Delete
                        </SmallButton>
                    </div>
                </div>
            )}

            {userRole !== 'admin' && (
                <div>
                    <SmallButton className="bg-[#024C89] text-[#F8F9FA] hover:bg-[#3572A1]">
                        View
                    </SmallButton>
                </div>
            )}
        </div>
    )
}
export default CourseCard
