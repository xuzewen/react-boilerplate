import * as types from './types'
import {CALL} from '../middleware/api.js'

export function getNews(type='social'){
    let key = 'faf10506f4b71ba3113a8125f92d0e7f'
    let num = 10
    let url = `/${type}/?key=${key}&num=${num}`
    //let url = 'http://fbi.yuantutech.com:3007/tms/test'

    return dispatch => {
        dispatch({
            [CALL]:{
                types:[types.FETCH_REQUEST,types.FETCH_SUCCESS,types.FETCH_ERROR],
                url: url
            }
        })
    }
}

export function changeType(typeName){
    return {
        type: types.FETCH_CHANGE_TYPE,
        typeName: typeName
    }
}


