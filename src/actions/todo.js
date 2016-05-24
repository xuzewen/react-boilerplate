import * as types from './types'


export function addItem(text){
    return {
        type: types.TODO_ADD,
        text
    }
}

export function deleteItem(item){
    return {
        type: types.TODO_DELETE,
        item
    }
}

export function setFilter(filter){
    return {
        type: types.TODO_SET_FILTER,
        filter
    }
}
