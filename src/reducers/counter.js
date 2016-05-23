import * as types from '../actions/types'

export default function counter(state={init:0, step:1, frequency:1000, stop:true}, action) {
    switch (action.type){
        case types.COUNT_PLUS:
            return {
                ...state,
                init: action.init
            }
        case types.COUNT_STEP:
            return {
                ...state,
                step: action.step
            }
        case types.COUNT_STOP:
            return {
                ...state,
                stop: true
            }
        case types.COUNT_START:
            return {
                ...state,
                stop: false
            }
        default:
            return {
                ...state
            }
    }
}