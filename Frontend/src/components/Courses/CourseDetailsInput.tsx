import React from 'react'

interface CourseDetailsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    checkboxClass?: string
}

function CourseDetailsInput({
    className = '',
    ...props
}: CourseDetailsInputProps) {
    return (
        <label
            className={`flex ${props.type === 'file' ? 'flex-row items-center gap-2' : 'flex-col'} w-full`}
        >
            <div>
                <input
                    className={`text-[#121212] border-1 border-[#121212] focus:outline-[#024C89] rounded-md px-4 py-1 ${className}`}
                    {...props}
                />
            </div>
        </label>
    )
}

export default CourseDetailsInput
