function Message({ text }: { text: string }) {
    return (
        <h1 className="font-bold text-4xl text-gray-800 w-[100%] py-4">
            {text}
        </h1>
    )
}

export default Message
