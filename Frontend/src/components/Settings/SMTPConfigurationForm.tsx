import { useState } from 'react'
import DefaultButton from '../DefaultButton'
import TextInput from '../TextInput'

function SMTPConfigurationForm() {
    const [smtpConfig, setSmtpConfig] = useState({
        host: '',
        port: '',
        username: '',
        password: '',
        from: '',
        to: '',
        tls: false,
    })
    const [smtpError, setSmtpError] = useState('')

    const handleSmtpConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setSmtpConfig((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSmtpConfigSubmit = (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setSmtpError('')

        if (
            !smtpConfig.host ||
            !smtpConfig.port ||
            !smtpConfig.username ||
            !smtpConfig.password ||
            !smtpConfig.from ||
            !smtpConfig.to ||
            !smtpConfig.tls
        ) {
            setSmtpError('Fields are required!')
            return
        }
    }

    return (
        <div>
            <h2 className="mb-2">Test SMTP Connection</h2>

            <form
                onSubmit={handleSmtpConfigSubmit}
                className="flex flex-col gap-[8px] bg-[#F8F9FA] w-[600px] h-fit max-h-[90vh] px-[32px] py-[24px] rounded-xl drop-shadow-md"
            >
                {smtpError && (
                    <p className="text-[#DC3545] text-sm m-0">{smtpError}</p>
                )}

                <div className="flex flex-row gap-4">
                    <TextInput
                        label="SMTP Host"
                        type="text"
                        name="host"
                        placeholder="SMTP Host"
                        value={smtpConfig.host}
                        onChange={handleSmtpConfigChange}
                        className="w-full"
                    />
                    <TextInput
                        label="Port"
                        type="text"
                        name="port"
                        placeholder="Port"
                        value={smtpConfig.port}
                        onChange={handleSmtpConfigChange}
                        className="w-full"
                    />
                </div>

                <TextInput
                    label="SMTP Username"
                    type="text"
                    name="username"
                    placeholder="SMTP Username"
                    value={smtpConfig.username}
                    onChange={handleSmtpConfigChange}
                    className="w-full"
                />

                <TextInput
                    label="SMTP Password"
                    type="text"
                    name="password"
                    placeholder="SMTP Password"
                    value={smtpConfig.password}
                    onChange={handleSmtpConfigChange}
                    className="w-full"
                />

                <div className="flex flex-row gap-4">
                    <TextInput
                        label="From Email"
                        type="text"
                        name="from"
                        placeholder="From Email"
                        value={smtpConfig.from}
                        onChange={handleSmtpConfigChange}
                        className="w-full"
                    />
                    <TextInput
                        label="Send Test To"
                        type="text"
                        name="to"
                        placeholder="Send Test To"
                        value={smtpConfig.to}
                        onChange={handleSmtpConfigChange}
                        className="w-full"
                    />
                </div>

                <TextInput
                    label="Use TLS"
                    type="checkbox"
                    onChange={handleSmtpConfigChange}
                    className="accent-[#3572A1] mr-1 cursor-pointer"
                    checkboxClass="font-medium"
                />

                <DefaultButton
                    type="submit"
                    children="Save Settings"
                    className="bg-[#024C89] hover:bg-[#3572A1] text-[#F8F9FA] self-center mt-4"
                />
            </form>
        </div>
    )
}

export default SMTPConfigurationForm
