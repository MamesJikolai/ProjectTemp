import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiService } from '../services/userService'
import type { Course } from '../types/models'
import DefaultButton from '../components/DefaultButton'
import Message from '../components/Message'
import LessonCard from '../components/Courses/LessonCard'
import CourseDetailsInput from '../components/Courses/CourseDetailsInput'
import CourseDetailsField from '../components/Courses/CourseDetailsField'

function CourseDetail() {
    const { courseId } = useParams<{ courseId: string }>()
    const navigate = useNavigate()

    const { user } = useAuth()
    const role = user?.role?.toLowerCase() || 'public'

    const [course, setCourse] = useState<Course | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [openLessonIndex, setOpenLessonIndex] = useState<number | null>(null)

    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (course) {
            setEditTitle(course.title)
            setEditDescription(course.description)
        }
    }, [course])

    useEffect(() => {
        if (!courseId) return

        const fetchCourse = async () => {
            try {
                // Assuming your apiService has a getOne method
                const data = await apiService.getOne<Course>(
                    'courses',
                    courseId
                )
                setCourse(data)
            } catch (err) {
                console.error('Failed to load course details:', err)
            } finally {
                setIsLoading(false)
            }
        }
        if (courseId) fetchCourse()
    }, [courseId])

    const handleUpload = async (fileToUpload: File) => {
        if (!fileToUpload || !courseId) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('thumbnail', fileToUpload)

            const response = await apiService.uploadFile<Course>(
                `courses/${courseId}/upload-thumbnail/`,
                formData
            )

            setCourse(response)
        } catch (err) {
            console.error('Failed to upload thumbnail:', err)
            alert('Upload failed. Please try again.')
        } finally {
            setIsUploading(false)
            setFile(null)
        }
    }

    const handleSaveDetails = async () => {
        if (!courseId) return

        setIsSaving(true)
        try {
            // Your apiService expects a number for the ID, so we cast courseId
            const updatedCourse = await apiService.update<Course>(
                'courses',
                Number(courseId),
                {
                    title: editTitle,
                    description: editDescription,
                }
            )

            // Update the main course state with the fresh data from the server
            setCourse(updatedCourse)
            // Optional: Show a little success message!
            alert('Course details saved successfully!')
        } catch (err) {
            console.error('Failed to save course details:', err)
            alert('Failed to save changes. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <div className="p-8">Loading course details...</div>
    if (!course) return <div className="p-8">Course not found.</div>

    return (
        <div className="flex flex-col items-start gap-4 m-8">
            {(role === 'hr' || role === 'admin') && (
                <DefaultButton
                    onClick={() => navigate('/courses')}
                    className="bg-[#024C89] hover:bg-[#3572A1] text-[#F8F9FA] self-start mb-8"
                >
                    Go Back
                </DefaultButton>
            )}
            {role === 'public' && (
                <div>
                    <DefaultButton
                        onClick={() => navigate('/home')}
                        className="bg-[#024C89] hover:bg-[#3572A1] text-[#F8F9FA] self-start mb-8"
                    >
                        Go Back
                    </DefaultButton>
                </div>
            )}

            {!course.thumbnail || course.thumbnail.trim() === '' ? (
                <div className="bg-gradient-to-br from-[#3572A1] to-[#024C89] w-full h-[400px]"></div>
            ) : (
                <img
                    src={course.thumbnail || undefined}
                    alt={course.title}
                    className="w-full h-[400px] object-cover"
                />
            )}

            {role === 'admin' && (
                <CourseDetailsInput
                    label="Upload Thumbnail"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, .png, .jpg, .jpeg, .webp"
                    onChange={(e) => {
                        const selectedFile = e.target.files?.[0]
                        if (selectedFile) {
                            setFile(selectedFile) // Keep this if you want to show the file name in the UI later
                            handleUpload(selectedFile) // Pass it directly!
                        }
                    }}
                    className="w-full cursor-pointer"
                />
            )}

            {role === 'admin' ? (
                <>
                    <CourseDetailsInput
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="font-bold text-4xl text-[#121212] w-full"
                    />
                    <CourseDetailsField
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full"
                        rows={8}
                    />
                </>
            ) : (
                <>
                    <Message text={course.title} />
                    <p className="text-justify whitespace-pre-wrap mb-8">
                        {course.description}
                    </p>
                </>
            )}

            <div className="flex flex-col gap-4 w-full">
                {course.lessons?.map((item, index) => (
                    <LessonCard
                        key={index}
                        item={item}
                        index={index}
                        isOpen={openLessonIndex === index}
                        onToggle={() =>
                            setOpenLessonIndex(
                                openLessonIndex === index ? null : index
                            )
                        }
                        role={role}
                    />
                ))}
            </div>

            {role === 'admin' &&
                (editTitle !== course.title ||
                    editDescription !== course.description) && (
                    <DefaultButton
                        onClick={handleSaveDetails}
                        disabled={isSaving}
                        className="bg-[#024C89] hover:bg-[#3572A1] text-[#F8F9FA] self-end"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </DefaultButton>
                )}
        </div>
    )
}

export default CourseDetail
