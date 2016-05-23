import * as types from './types'


export function setStep(step){
    return {
        type: types.COUNT_STEP,
        step
    }
}

export function setInit(init){
    return {
        type: types.COUNT_PLUS,
        init
    }
}

export function stop(){
    return {
        type: types.COUNT_STOP
    }
}

export function start(){
    return {
        type: types.COUNT_START
    }
}