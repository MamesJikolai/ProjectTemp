function PhishingPage() {
    const handleNavigate = () => {
        localStorage.removeItem('userRole')
        window.location.href = '/'
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4 h-screen bg-[#F8F9FA]">
            <h1>Wait! This was a Phishing Simulation</h1>
            <p>
                Don't worry, your data is safe. However, a real attacker could
                have used that link to access your
                <strong>
                    {' '}
                    personal details, address, and credit information.
                </strong>
            </p>
            <p className="text-sm">
                Your security is a priority. Please follow the link below to
                complete your <strong>required</strong> phishing awareness
                module.
            </p>
            <button
                onClick={handleNavigate}
                className="text-[#FFFAFA] bg-[#024C89] hover:bg-[#3572A1] px-4 py-2 cursor-pointer"
            >
                Go to Training Portal
            </button>
        </div>
    )
}

export default PhishingPage
