import Message from '../../components/Message.tsx'
import SearchBar from '../../components/SearchBar.tsx'

function Settings() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Settings" />
        </div>
    )
}

export default Settings
