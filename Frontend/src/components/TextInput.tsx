import React from 'react'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>

function TextInput({ className = '', ...props }: TextInputProps) {
    return (
        <input
            className={`text-[#4A4A4A] bg-#F8F9FA border-2 border-[#4A4A4A] focus:outline-[#024C89] rounded-[16px] px-[12px] max-w-2xl py-0.5 ${className}`}
            {...props}
        />
    )
}

export default TextInput
