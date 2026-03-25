import React from 'react'

interface TextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    description?: React.ReactNode
}

function TextField({
    label,
    description,
    className = '',
    ...props
}: TextFieldProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="flex flex-col gap-1">
                <span className="font-medium text-[#121212]">{label}</span>
                <textarea
                    className={`text-[#4A4A4A] bg-[#F8F9FA] border-2 border-[#DDE2E5] focus:outline-[#024C89] rounded-[16px] px-[12px] py-2 max-w-2xl ${className}`}
                    {...props}
                />
            </label>

            {description && (
                <div className="text-[13px] text-[#4A4A4A] mt-1">
                    {description}
                </div>
            )}
        </div>
    )
}

export default TextField
