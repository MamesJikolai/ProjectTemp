import Message from '../../components/Message.tsx'
import SearchBar from '../../components/SearchBar.tsx'
import CourseCard from '../../components/CourseCard.tsx'
import { courseList } from '../../assets/courses.ts'

function Courses() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Courses" />

            {/* Cards Container */}
            <div className="flex flex-row flex-wrap justify-center gap-[16px]">
                {courseList.map((item, index) => (
                    <CourseCard
                        title={item.title}
                        caption={item.caption}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Courses
