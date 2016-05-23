import { combineReducers } from 'redux'
import counter from './counter'
import todo from './todo'
import fetch from './fetch'

const rootReducer = combineReducers({
    counter,
    todo,
    fetch
})

export default rootReducer