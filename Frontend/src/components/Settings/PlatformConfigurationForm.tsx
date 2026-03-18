import { useState } from 'react'
import DefaultButton from '../DefaultButton'
import TextInput from '../TextInput'

function PlatformConfigurationForm() {
    const [platformConfig, setPlatformConfig] = useState({
        name: '',
        url: '',
        senderName: '',
        sessionExpiry: '',
        retake: false,
        saved: '',
    })
    const [platformError, setPlatformError] = useState('')

    const handlePlatformConfigChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target
        setPlatformConfig((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handlePlatformConfigSubmit = (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setPlatformError('')

        if (
            !platformConfig.name ||
            !platformConfig.url ||
            !platformConfig.senderName ||
            !platformConfig.sessionExpiry ||
            !platformConfig.retake
        ) {
            setPlatformError('Fields are required!')
            return
        }
    }

    return (
        <div>
            <h2 className="mb-2">Platform Configuration</h2>

            <form
                onSubmit={handlePlatformConfigSubmit}
                className="flex flex-col gap-[8px] bg-[#F8F9FA] w-[600px] h-fit max-h-[90vh] px-[32px] py-[24px] rounded-xl drop-shadow-md"
            >
                {platformError && (
                    <p className="text-[#DC3545] text-sm m-0">
                        {platformError}
                    </p>
                )}
                <TextInput
                    label="Platform Name"
                    type="text"
                    name="name"
                    placeholder="Platform Name"
                    value={platformConfig.name}
                    onChange={handlePlatformConfigChange}
                    className="w-full"
                />

                <TextInput
                    label="Platform Base URL"
                    type="text"
                    name="url"
                    placeholder="Platform Base URL"
                    value={platformConfig.url}
                    onChange={handlePlatformConfigChange}
                    className="w-full"
                />

                <TextInput
                    label="Default Sender Display Name"
                    type="text"
                    name="senderName"
                    placeholder="Default Sender Display Name"
                    value={platformConfig.senderName}
                    onChange={handlePlatformConfigChange}
                    className="w-full"
                />

                <TextInput
                    label="LMS Session Expiry (days)"
                    type="number"
                    name="senderName"
                    placeholder="LMS Session Expiry (days)"
                    value={platformConfig.senderName}
                    onChange={handlePlatformConfigChange}
                    className="w-[200px]"
                />

                <TextInput
                    label="Allow Quiz Retake"
                    type="checkbox"
                    onChange={handlePlatformConfigChange}
                    className="accent-[#3572A1] mr-1 cursor-pointer"
                    checkboxClass="font-medium"
                />

                <DefaultButton
                    type="submit"
                    children="Save Settings"
                    className="bg-[#024C89] hover:bg-[#3572A1] text-[#F8F9FA] self-center mt-4"
                />

                {/* <div className="flex flex-col gap-2 justify-center border-t-1 border-[#DDE2E5] pt-4">
                    <p className="text-[12px]">
                        Last saved: {platformConfig.saved}
                    </p>
                    <DefaultButton
                        type="submit"
                        children="Save Settings"
                        className="bg-[#024C89] hover:bg-[#3572A1] text-[#F8F9FA] self-center"
                    />
                </div> */}
            </form>
        </div>
    )
}

export default PlatformConfigurationForm
