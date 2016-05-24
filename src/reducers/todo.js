import * as types from '../actions/types'

let index = 2

export default function todo(state={todoList:[{text:"todo1",index:1},{text:"todo2",index:2}],filter:''}, action) {
    switch (action.type){
        case types.TODO_ADD:
            let list = [...state.todoList]
            list.push({ text:action.text, index:++index})
            return {
                ...state,
                todoList: list
            }
        case types.TODO_DELETE:
            let list2 = [...state.todoList]
            list2.splice(state.todoList.indexOf(action.item),1)
            return {
                ...state,
                todoList: list2
            }
        case types.TODO_SET_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return {
                ...state
            }
    }
}