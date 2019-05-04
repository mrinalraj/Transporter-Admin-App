import { SINGUP } from '../actions/types'

const initialState = {
    data: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SINGUP:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}