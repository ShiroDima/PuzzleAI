export const ActionType = {
    SOLVED_PUZZLE: 'SOLVED_PUZZLE',
    OPTION_SELECTED: 'OPTION_SELECTED',
    ANSWER_SELECTED: 'ANSWER_SELECTED',
    RESET_QUESTION_STATE: 'RESET_QUESTION_STATE',
    RESET_PUZZLE_STATE: 'RESET_PUZZLE_STATE',
    PUZZLE_SELECTION_START: 'PUZZLE_SELECTION_START',
    PUZZLE_SELECTION_END: 'PUZZLE_SELECTION_END',
    PUZZLE_SELECTION_PROGRESS: 'PUZZLE_SELECTION_PROGRESS',
    GAME_DATA_CREATED: 'GAME_DATA_CREATED',
    SELECT_DIFFICULTY: 'SELECT_DIFFICULTY',
    GAME_RESET: 'GAME_RESET'
} as const

export const Direction = {
    HORIZONTAL: 'Horizontal',
    VERTICAL: 'Vertical',
    DIAGONAL: 'Diagonal'
}

export const questionCards = [
    {
        heading: 'Light Blue',
        questions: [
            {
                num: 1,
                question: "We __ to wear sunscreen at the beach.",
                options: {
                    A: 'have',
                    B: 'has',
                },
                answer: {
                    A: 'have'
                }
            },
            {
                num: 2,
                question: "I'm going to __ a hole in the sand.",
                options: {
                    A: 'digs',
                    B: 'dig',
                },
                answer: {
                    B: 'dig'
                }
            },
        ],

    },
    {
        heading: 'Dark Blue',
        questions: [
            {
                num: 3,
                question: "My family __ happy today",
                options: {
                    A: 'is',
                    B: 'are',
                },
                answer: {
                    B: 'are'
                }
            },
            {
                num: 4,
                question: "Mom __ us sunscreen to put on.",
                options: {
                    A: 'buys',
                    B: 'buy',
                },
                answer: {
                    A: 'buys'
                }
            },
        ]
    },
    {
        heading: 'Red',
        questions: [
            {
                num: 5,
                question: "My brother __ sunscreen on my back.",
                options: {
                    A: 'rub',
                    B: 'rubs',
                },
                answer: {
                    B: 'rubs'
                }
            },
            {
                num: 6,
                question: "Dad __ in the waves.",
                options: {
                    A: 'dives',
                    B: 'dive',
                },
                answer: {
                    A: 'dives'
                }
            },
        ]
    },
    {
        heading: 'Yellow',
        questions: [
            {
                num: 7,
                question: "My brother __ sunscreen on my back.",
                options: {
                    A: 'rub',
                    B: 'rubs',
                },
                answer: {
                    B: 'rubs'
                }
            },
            {
                num: 8,
                question: "Dad __ in the waves.",
                options: {
                    A: 'dives',
                    B: 'dive',
                },
                answer: {
                    A: 'dives'
                }
            },
        ]
    },
    {
        heading: 'Tan',
        questions: [
            {
                num: 9,
                question: "My brother __ sunscreen on my back.",
                options: {
                    A: 'rub',
                    B: 'rubs',
                },
                answer: {
                    B: 'rubs'
                }
            },
            {
                num: 10,
                question: "Dad __ in the waves.",
                options: {
                    A: 'dives',
                    B: 'dive',
                },
                answer: {
                    A: 'dives'
                }
            },
        ]
    }
]