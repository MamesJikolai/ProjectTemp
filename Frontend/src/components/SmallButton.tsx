// interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
// }

type SmallButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function SmallButton({ className = '', children, ...props }: SmallButtonProps) {
    return (
        <button
            {...props}
            className={`text-[12px] rounded-[8px] px-[8px] py-[4px] mt-2 w-full font-medium 
                transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed 
                disabled:bg-gray-400 disabled:border-gray-400 ${className}`}
        >
            {children}
        </button>
    )
}

export default SmallButton
