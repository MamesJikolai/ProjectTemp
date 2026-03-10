import SmallButton from './SmallButton'

interface CourseCardProps {
    title: string
    caption: string
    image?: string
}

function CourseCard({ title, caption }: CourseCardProps) {
    return (
        <div className="bg-[#F8F9FA] w-[240px] rounded-[16px] p-[16px] gap-[4px]">
            <div className="bg-[#024C89] w-full h-[120px]"></div>
            <h3>{title}</h3>
            <p className="text-[12px]">{caption}</p>
            <SmallButton label="Start Lesson" />
        </div>
    )
}
export default CourseCard
