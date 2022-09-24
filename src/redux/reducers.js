

const initialState = {
    columns: [{_id: 1, status: 'todo'}],
    cards: [],
    priority: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    modalWindow: {
        type: '',
        data: {},
        modalIsOpen: false,
    },
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COLUMNS':
            return {
                ...state,
                columns: action.payload
            };
        case 'GET_CARDS':
            return {
                ...state,
                cards: action.payload
            };
        case ('OPEN_MODAL'):
            return {
                ...state,
                modalWindow: action.payload
            };
        case ('CLOSE_MODAL'):
            return {
                ...state,
                modalWindow: {
                    type: '',
                    data: {},
                    modalIsOpen: false
                }
            }

        default:
            return state
    }
}
