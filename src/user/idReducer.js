const initialState = {
    data: null
}

const idReducer = (state = initialState, action) => {
    if (action.type === 'ID_UPDATED')
    {
        return Object.assign({}, state, {
            data: action.payload
        })
    }

    return state
}

export default idReducer
