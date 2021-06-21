const INITIAL_STATE = {
    shopData: null,
    fetching: false,
    errorMessage: undefined,
    alertState: false
}

const collection = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'IS_FETCHING_DATA':
            return {
                ...state,
                fetching: true,
            }
        case 'FETCH_COLLECTIONS_SUCCESS':
            return {
                ...state,
                fetching: false,
                shopData: action.payload
            }
        case 'FETCH_COLLECTIONS_FAILURE':
            return {
                ...state,
                fetching: false,
                errorMessage: action.payload
            }
        case 'TOGGLE_ALERT':
            return {
                ...state,
                alertState: action.payload
            }
        default:
            return state
    }
}

export default collection