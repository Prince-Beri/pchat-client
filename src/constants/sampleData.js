export const sampleChats = [
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John Doe',
        _id: '1',
        groupChat: false,
        members: ['1' ,'2']
    },
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John Boi',
        _id: '2',
        groupChat: false,
        members: ['1' ,'2']
    },
    
];

export const sampleUser = [
    {
        avatar: ['https://res.cloudinary.com/dyf1mzzat/image/upload/dpr_auto/w_200/v1722088565/f3b0e093-99fc-424c-9ba9-a14df48ba266.png'],
        name: 'Shreya Kashyap',
        _id: '1',
    },
    {
        avatar: ['https://res.cloudinary.com/dyf1mzzat/image/upload/dpr_auto/w_200/v1722087362/dc2491de-4642-47f4-85f6-600119ffbbb5.png'],
        name: 'Shreyakhp',
        _id: '2',
    },
]

export const sampleNotificaitons = [
    {
        sender: {
            avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
            name: 'John Doe',
        },
        _id: '1',
    },
    {
        sender: {
            avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
            name: 'John Boi',
        },
        _id: '2',
    },
]

export const sampleMessage = [
    {
        attachments: [],
        content: 'Hey!!! bhai kesa hai ?',
        _id: 'askjlkdflkslkfdndlfs',
        sender: {
            _id: 'user._id',
            name: 'Ashwani',   
        },
        chat: 'chatId',
        createdAt: '2024-02-12T10:41:30.630Z',
    },
    {
        attachments: [
            {
                public_id: 'asdsad',
                url: 'https://www.w3schools.com/howto/img_avatar.png'
            },
        ],
        content: '',
        _id: 'askjlkdflkdsdsslkfdndlfs',
        sender: {
            _id: 'sfjhslfjkksdfj',
            name: 'Ashwani',   
        },
        chat: 'chatId',
        createdAt: '2024-06-13T10:41:30.630Z',
    },
];

export const sampleGrops = [
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John Doe',
        _id: '1',
        members: ['1' ,'2']
    },
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John Boi',
        _id: '2',
        members: ['1' ,'2']
    },
    
];

export const dashboardData = {
    users: [
        {
            name: 'Jhon Doe',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            _id: '1',
            username: 'jhon_doe',
            friends: 20,
            groups: 5

        },
        {
            name: 'Jhon Boi',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            _id: '2',
            username: 'jhon_boi',
            friends: 10,
            groups: 25

        },
    ],
    chats: [
        {
            name: 'The Boys',
            avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
            _id: '1',
            groupChat: false,
            members: [{_id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png'}, {_id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png'}],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: 'Prince Beri',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            }
        },
        {
            name: 'The Chattu\'s',
            avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
            _id: '2',
            groupChat: false,
            members: [{_id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png'}, {_id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png'}],
            totalMembers: 4,
            totalMessages: 45,
            creator: {
                name: 'Jhon Boi',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            }
        },

    ],
    messages: [
        {
            attachments: [],
            content: 'There is sample message to testing purpose\'s',
            _id: 'klsdlkjsdl',
            sender: {
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                name: 'Chaman',
            },
            chat: 'chatId',
            groupChat: false,
            createdAt: '2024-02-12T10:41:30.630Z',
        },
        {
            attachments: [
                {
                    public_id: 'askljdlfjsld',
                    url: 'https://www.w3schools.com/howto/img_avatar.png',
                }
            ],
            content: '',
            _id: 'lkfsldkmflsk',
            sender: {
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                name: 'Chaman 2',
            },
            chat: 'chatId',
            groupChat: true,
            createdAt: '2024-02-12T10:41:30.630Z',
        },

    ]
}