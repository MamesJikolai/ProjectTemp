import Message from '../components/Message.tsx'
import SearchBar from '../components/SearchBar.tsx'

function Achievements() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Achievements" />
        </div>
    )
}

export default Achievements
