import { Icons } from '../../../assets/icons'
import type { Lesson } from '../../../types/models'
import { getEmbedUrl } from '../../../utils/getEmbedUrl'
import { useState, useEffect, useRef } from 'react'
import LessonVideoPlayer from '../LessonVideoPlayer'
import DOMPurify from 'dompurify'

interface PublicLessonCardProps {
    item: Lesson
    index: number
    isOpen: boolean
    onToggle: () => void
    onLessonCompleted?: (lessonId: number) => void
}

function PublicLessonCard({
    item,
    index,
    isOpen,
    onToggle,
    onLessonCompleted,
}: PublicLessonCardProps) {
    const embedUrl = getEmbedUrl(item.video_url)

    const hasVideo = Boolean(embedUrl && embedUrl.trim() !== '')
    const hasContent = Boolean(
        item.content_html && item.content_html.trim() !== ''
    )

    const [videoCompleted, setVideoCompleted] = useState(false)
    const [contentCompleted, setContentCompleted] = useState(!hasContent)
    const [hasViewed, setHasViewed] = useState(false)

    const contentEndRef = useRef<HTMLDivElement>(null)
    const isReportedRef = useRef(false)

    if (isOpen && !hasViewed) {
        setHasViewed(true)
    }

    // Track when user scrolls to the bottom of the text content
    useEffect(() => {
        // Only track when the lesson is open
        if (
            isOpen &&
            hasContent &&
            !contentCompleted &&
            contentEndRef.current
        ) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setContentCompleted(true)
                        observer.disconnect() // Stop observing once reached
                    }
                },
                { threshold: 0.1 }
            )
            observer.observe(contentEndRef.current)
            return () => observer.disconnect()
        }
    }, [hasContent, isOpen, contentCompleted])

    // Trigger the completion callback when requirements are met
    useEffect(() => {
        if (item.id && !isReportedRef.current && hasViewed) {
            const isVideoDone = hasVideo ? videoCompleted : true
            const isContentDone = hasContent ? contentCompleted : true

            if (isVideoDone && isContentDone && onLessonCompleted) {
                onLessonCompleted(item.id)
                // Mutate the ref instead of triggering a setState re-render
                isReportedRef.current = true
            }
        }
    }, [
        videoCompleted,
        contentCompleted,
        hasVideo,
        hasContent,
        item.id,
        onLessonCompleted,
        hasViewed,
    ])

    return (
        <div className="bg-[#F8F9FA] rounded-xl px-6 py-4 md:px-8 md:py-6 w-full shadow-sm border border-gray-100">
            {/* Lesson Header */}
            <div
                onClick={onToggle}
                className="flex flex-row justify-between gap-4 items-center cursor-pointer"
            >
                <h2 onClick={onToggle}>
                    Lesson {index + 1}: {item.title}
                </h2>

                <img
                    src={isOpen ? Icons.iconCollapse : Icons.iconExpand}
                    onClick={onToggle}
                    className="w-[24px] h-[24px]"
                />
            </div>

            {/* Lesson Contents */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
            >
                <div className="flex flex-col gap-4 overflow-hidden">
                    {/* Lesson Description */}
                    <div
                        className="text-gray-700 text-justify whitespace-pre-wrap prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.description),
                        }}
                    />

                    {/* Embedded Video */}
                    {(embedUrl || embedUrl.trim() !== '') && (
                        <LessonVideoPlayer
                            url={embedUrl}
                            onMilestoneReached={() => setVideoCompleted(true)}
                        />
                    )}

                    {/* Additional Lesson Content */}
                    {hasContent && (
                        <div
                            className="text-gray-700 text-justify whitespace-pre-wrap prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(item.content_html),
                            }}
                        />
                    )}

                    {hasContent && (
                        <div ref={contentEndRef} className="h-1 w-full" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PublicLessonCard
