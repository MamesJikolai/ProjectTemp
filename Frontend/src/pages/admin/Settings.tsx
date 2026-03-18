import Message from '../../components/Message.tsx'
import PlatformConfigurationForm from '../../components/Settings/PlatformConfigurationForm.tsx'
import SMTPConfigurationForm from '../../components/Settings/SMTPConfigurationForm.tsx'
import AdminUsers from '../../components/Settings/AdminUsers.tsx'

function Settings() {
    return (
        <div className="flex flex-col items-start m-8">
            <Message text="Settings" />

            <div className="flex flex-row justify-center flex-wrap gap-16">
                <PlatformConfigurationForm />

                <SMTPConfigurationForm />

                <AdminUsers />
            </div>
        </div>
    )
}

export default Settings
