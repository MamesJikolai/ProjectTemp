import { users } from '../../assets/dummydata/users.ts'
import BasicTable from '../../components/Tables/BasicTable.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import Message from '../../components/Message.tsx'

export type Users = {
    name: string
    email: string
    department: string
    campaign: string
    emailStatus: string
    clicked: false
    training: false
    score: number
}

function Users() {
    // const openEditModal = (users: Users) => {
    //     //
    // }

    // const handleRemoveUser = (users: Users) => {
    //     //
    // }

    const columns: ColumnDef<string>[] = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'department', header: 'Department' },
        { accessorKey: 'campaign', header: 'Campaign' },
        { accessorKey: 'emailStatus', header: 'Email Status' },
        { accessorKey: 'clicked', header: 'Clicked?' },
        { accessorKey: 'training', header: 'Training' },
        { accessorKey: 'score', header: 'Score' },
        {
            id: 'actions',
            header: 'Actions',
            cell: (info) => {
                // const userData = info.row.original

                return (
                    <div className="flex flex-row gap-2 text-[12px]">
                        <button
                            // onClick={openEditModal(userData)}
                            className="hover:text-[#17A2B8] text-[#4ECFE0] font-bold cursor-pointer"
                        >
                            Edit
                        </button>
                        <button
                            // onClick={handleRemoveUser(userData)}
                            className="hover:text-[#DC3545] text-[#FF6B6B] font-bold cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="flex flex-col items-start m-8">
            <Message text="Users" />
            <BasicTable data={users} columns={columns} tableStyle="w-full" />
        </div>
    )
}

export default Users
