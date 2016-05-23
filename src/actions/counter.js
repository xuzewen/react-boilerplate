import * as types from './types'


export function setStep(step){
    return {
        type: types.COUNT_STEP,
        step
    }
}


export function setFre(frequency){
    return {
        type: types.COUNT_FREQUENCY,
        frequency
    }
}