import Message from '../../components/Message.tsx'
import SearchBar from '../../components/SearchBar.tsx'

function Notifications() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Notifications" />
        </div>
    )
}

export default Notifications
