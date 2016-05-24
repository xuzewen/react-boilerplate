import {bindActionCreators} from 'redux'
import * as counter from './counter'
import * as todo from './todo'
import * as fetch from './fetch'

const actions = {
    ...counter,
    ...todo
}

export default function createActions(dispatch) {
    return bindActionCreators(actions, dispatch)
}