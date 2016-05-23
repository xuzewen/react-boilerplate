import * as types from '../actions/types'

export default function counter(state={step:1, frequency:1000}, action) {
    switch (action.type){
        case types.COUNT_STEP:
            return {
                ...state,
                step: action.step
            }
        case types.COUNT_FREQUENCY:
            return {
                ...state,
                frequency: action.frequency
            }
        default:
            return {
                ...state
            }
    }
}