import Message from '../../components/Message'
import SearchBar from '../../components/SearchBar.tsx'

function Account() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Account" />
        </div>
    )
}

export default Account
