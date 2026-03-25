import type { Lesson } from '../../types/models'
import { getEmbedUrl } from '../../utils/getEmbedUrl'
import DefaultButton from '../DefaultButton'
import CourseDetailsField from './CourseDetailsField'
import CourseDetailsInput from './CourseDetailsInput'
import { useState } from 'react'

interface LessonCardProps {
    item: Lesson
    index: number
    isOpen: boolean
    onToggle: () => void
    role: string
    editTitle: string
    editDescription: string
    onLessonChange: (field: 'title' | 'description', value: string) => void
}

function LessonCard({ item, index, isOpen, onToggle, role }: LessonCardProps) {
    const [editTitle, setEditTitle] = useState(item.title || '')
    const [editDescription, setEditDescription] = useState(
        item.description || ''
    )
    const [editVideoUrl, setEditVideoUrl] = useState(item.video_url || '')
    const embedUrl = getEmbedUrl(item.video_url)

    return (
        <div className="bg-[#F8F9FA] rounded-xl px-8 py-6 w-full shadow-sm border border-gray-100">
            {/* Header (Always visible) */}
            <div
                className="flex flex-row justify-between items-center cursor-pointer"
                onClick={onToggle}
            >
                {role === 'admin' ? (
                    <div
                        className="w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CourseDetailsInput
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="font-bold text-4xl text-[#121212] w-full"
                        />
                    </div>
                ) : (
                    <h2>
                        Lesson {index + 1}: {item.title}
                    </h2>
                )}

                <button className="text-[#024C89] font-bold text-xl px-3 py-1 rounded-md transition-colors cursor-pointer">
                    {isOpen ? '⌃' : '˅'}
                </button>
            </div>

            {/* Content (Smoothly animates open and closed using CSS Grid) */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
            >
                <div className="overflow-hidden">
                    {role === 'admin' ? (
                        <CourseDetailsField
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full"
                            rows={8}
                        />
                    ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {item.description}
                        </p>
                    )}

                    {!embedUrl || embedUrl.trim() === '' ? (
                        ''
                    ) : (
                        <div>
                            <iframe
                                src={embedUrl}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="w-[90%] aspect-video mx-auto my-4"
                            ></iframe>

                            {role === 'admin' ? (
                                <div className="flex flex-row gap-2">
                                    <CourseDetailsInput
                                        type="text"
                                        value={editVideoUrl}
                                        onChange={(e) =>
                                            setEditVideoUrl(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <DefaultButton className="bg-[#024C89] hover:bg-[#3572A1] text-[#F8F9FA]">
                                        Save
                                    </DefaultButton>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LessonCard
