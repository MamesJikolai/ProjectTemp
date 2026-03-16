import Message from '../../components/Message.tsx'
import SearchBar from '../../components/SearchBar.tsx'

function Users() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Users" />
        </div>
    )
}

export default Users
