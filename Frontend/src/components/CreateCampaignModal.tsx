import DefaultButton from '../components/DefaultButton.tsx'
import TextInput from './TextInput.tsx'
import { useState } from 'react'

function CreateCampaignModal() {
    const [showCreate, setShowCreate] = useState(false)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [target, setTarget] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')

    const handleCreateCampaign = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (!name || !status || !target || !date) {
            setError('All fields are required!')
            return
        }
        console.log(name, status, target, date)

        setShowCreate(false)

        setName('')
        setStatus('')
        setDate('')
        setTarget('')
    }

    return (
        <>
            <DefaultButton
                className="mb-[16px] mt-[16px]"
                onClick={() => setShowCreate(true)}
            >
                Create Campaign
            </DefaultButton>

            {showCreate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <form
                        onSubmit={handleCreateCampaign}
                        className="flex flex-col gap-[16px] bg-[#F8F9FA] relative w-full max-w-2xl max-h-[90vh] px-[32px] py-[48px] overflow-y-auto rounded-xl shadow-2xl"
                    >
                        <button
                            onClick={() => setShowCreate(false)}
                            className="absolute top-1 right-4 text-[#4A4A4A] hover:text-[#DC3545] text-3xl font-bold z-10 transition-colors"
                            aria-label="Close filters"
                        >
                            &times;
                        </button>

                        <h2>Create Campaign</h2>

                        {error && (
                            <p className="text-[#DC3545] text-sm m-0">
                                {error}
                            </p>
                        )}

                        <label>
                            <span className="font-bold text-[#121212]">
                                Name
                            </span>
                            <br />
                            <TextInput
                                type="text"
                                placeholder="Campaign Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                            />
                        </label>

                        <label>
                            <span className="font-bold text-[#121212]">
                                Status
                            </span>
                            <br />
                            <select
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="text-[#4A4A4A] bg-#F8F9FA border-2 border-[#4A4A4A] focus:outline-[#024C89] active:outline-[#024C89] w-full rounded-[16px] px-[12px] max-w-2xl py-0.5"
                            >
                                <option value="" disabled hidden>
                                    -- Select an option --
                                </option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="completed">Completed</option>
                            </select>
                        </label>

                        <label>
                            <span className="font-bold text-[#121212]">
                                Target
                            </span>
                            <br />
                            <TextInput
                                type="text"
                                placeholder="Campaign Target"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                className="w-full"
                            />
                        </label>

                        <label>
                            <span className="font-bold text-[#121212]">
                                Date
                            </span>
                            <br />
                            <TextInput
                                type="date"
                                placeholder="Campaign Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full"
                            />
                        </label>

                        <DefaultButton type="submit" className="self-center">
                            Create
                        </DefaultButton>
                    </form>
                </div>
            )}
        </>
    )
}

export default CreateCampaignModal
