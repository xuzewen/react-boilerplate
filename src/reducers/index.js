import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import todo from './todo'
import fetch from './fetch'

const rootReducer = combineReducers({
    counter,
    todo,
    fetch,
    routing: routerReducer
})

export default rootReducer