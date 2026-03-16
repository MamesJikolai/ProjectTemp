import Message from '../../components/Message.tsx'
import SearchBar from '../../components/SearchBar.tsx'

function Assessments() {
    return (
        <div className="flex flex-col items-start m-8">
            <SearchBar />
            <Message text="Assessments" />
        </div>
    )
}

export default Assessments
