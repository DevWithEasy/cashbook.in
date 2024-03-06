export const ownTopics = [
    {
        title: 'Permissions',
        roles: [
            'Full access to all books of this business',
            'Full access to business settings',
            'Add/remove members in business'
        ]
    },
    {
        title: 'Restrictions',
        roles: []
    }
]
export const partnerTopics = [
    {
        title: 'Permissions',
        roles: [
            'Full access to all books of this business',
            'Full access to business settings',
            'Add/remove members in business'
        ]
    },
    {
        title: 'Restrictions',
        roles: [
            'Can’t delete business',
            'Can’t remove owner from business'
        ]
    }
]
export const stuffTopics = [
    {
        title: 'Permissions',
        roles: [
            'Limited access to selected book',
            'Owner/Partner can assign Admin, Viewer or Operator role to staff in any book'
        ]
    },
    {
        title: 'Restrictions',
        roles: [
            'No access to books they are not part of',
            'No access to business settings',
            'No option to delete books'
        ]
    }
]

//book permission

export const bookOwner = [
    {
        title: 'Permissions',
        roles: [
            'View entries and download reports',
            'Add Cash In or Cash Out entries',
            'Edit and delete entries',
            'Access to all Book Settings',
            'Move or copy entries from one book to other book',
            'Access Book Activity and Entry’s Edit History',
            'Duplicate and Delete Book',
        ]
    },
    {
        title: 'Restrictions',
        roles: []
    }
]
export const bookParner = [
    {
        title: 'Permissions',
        roles: [
            'View entries and download reports',
            'Add Cash In or Cash Out entries',
            'Edit and delete entries',
            'Access to all Book Settings',
            'Move or copy entries from one book to other book',
            'Access Book Activity and Entry’s Edit History',
            'Duplicate and Delete Book',
        ]
    },
    {
        title: 'Restrictions',
        roles: []
    }
]
export const bookDataOperator = [
    {
        title: 'Permissions',
        roles: [
            'Add Cash In or Cash Out entries',
            'View entries by everyone',
            'View net balance & download PDF or Excel',
        ]
    },
    {
        title: 'Restrictions',
        roles: [
            'Cannot edit entries',
        ]
    }
]

export const bookAdmin = [
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
            'Can’t delete book',
        ]
    }
]

export const bookViewer = [
    {
        title: 'Permissions',
        roles: [
            'View entries by everyone',
            'View net balance & download PDF or Excel',
        ]
    },
    {
        title: 'Restrictions',
        roles: []
    }
]