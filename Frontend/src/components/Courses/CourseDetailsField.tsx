import React from 'react'

interface CourseDetailsFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

function CourseDetailsField({
    label,
    className = '',
    ...props
}: CourseDetailsFieldProps) {
    return (
        <label className="w-full">
            <span className="font-medium text-[#121212]">{label}</span>
            <textarea
                className={`text-[#121212] bg-#F8F9FA border-1 border-[#121212] focus:outline-[#024C89] rounded-md px-[12px] py-1 ${className}`}
                {...props}
            >
                Template
            </textarea>
        </label>
    )
}

export default CourseDetailsField
