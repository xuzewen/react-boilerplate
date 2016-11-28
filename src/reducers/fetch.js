import * as types from '../actions/types'


export default function counter(state={newslist:[],error:'',typeName:"social"}, action) {
    switch (action.type){
        case types.FETCH_SUCCESS:
            return {
                ...state,
                newslist: action.data.newslist
            }
        case types.FETCH_ERROR:
            return {
                ...state,
                error: action.error
            }
        case types.FETCH_CHANGE_TYPE:
            return {
                ...state,
                typeName: action.typeName
            }
        default:
            return {
                ...state
            }
    }
}