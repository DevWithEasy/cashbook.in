import { IoMdCheckmarkCircle } from "react-icons/io"
import { MdCancel } from "react-icons/md"

const Book_AddMember_Selected = ({active,setActive}) => {
    const oparetorTopics = [
        {
            title: 'Permissions',
            roles: [
                'Add Cash In or Cash Out entries',
                'View entries by everyone',
                'View net balance & download PDF or Excel'
            ]
        },
        {
            title: 'Restrictions',
            roles: [
                'Cannot edit entries'
            ]
        }
    ]

    const viewerTopics = [
        {
            title: 'Permissions',
            roles: [
                'View entries by everyone',
                'View net balance & download PDF or Excel'
            ]
        },
        {
            title: 'Restrictions',
            roles: [
            ]
        }
    ]

    const adminTopics = [
        {
            title: 'Permissions',
            roles: [
                'Full access to book settings & activity log',
                'Customize data operator permissions',
                'Change roles of data operator or viewer',
            ]
        },
        {
            title: 'Restrictions',
            roles: [
                'Can’t remove owners or partners',
                'Can’t delete book'
            ]
        }
    ]
    return (
        <div
            className='border rounded'
        >
            <div
                className='p-4 border-b'
            >
                Cloose Role
            </div>
            <div
                className='p-4'
            >
                <div
                    className='space-x-2'
                >
                    <button
                        onClick={() => setActive('Data Operator')}
                        className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'Data Operator' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                    >
                        Data Operator
                    </button>
                    <button
                        onClick={() => setActive('Viewer')}
                        className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'Viewer' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                    >
                        Viewer
                    </button>
                    <button
                        onClick={() => setActive('Admin')}
                        className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'Admin' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                    >
                        Admin
                    </button>
                </div>
                <div
                    className='pt-4'
                >
                    {
                        (active == 'Data Operator' ? oparetorTopics : active == 'Viewer' ? viewerTopics : adminTopics)
                            .map((cat, i) =>
                                <div
                                    key={i}
                                >
                                    {cat?.roles?.length > 0 &&
                                        <div
                                            key={i}
                                            className='pb-5 space-y-2'
                                        >
                                            <p>{cat.title}</p>
                                            <div
                                                className='space-y-2 text-sm'
                                            >
                                                {
                                                    cat.roles.map((role, i) =>
                                                        <div
                                                            key={i}
                                                            className='flex items-center space-x-2'
                                                        >
                                                            <p>
                                                                {cat.title == 'Permissions' ?
                                                                    <IoMdCheckmarkCircle
                                                                        size={23}
                                                                        className='text-[#21b15e]'
                                                                    />
                                                                    :
                                                                    <MdCancel
                                                                        size={23}
                                                                        className='text-[#c93b3b]'
                                                                    />
                                                                }
                                                            </p>
                                                            <p>{role}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Book_AddMember_Selected;