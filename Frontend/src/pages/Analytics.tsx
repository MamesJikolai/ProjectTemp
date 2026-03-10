import Message from '../components/Message.tsx'
import SearchBar from '../components/SearchBar.tsx'

function Analytics() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Analytics & Reports" />
        </div>
    )
}

export default Analytics
