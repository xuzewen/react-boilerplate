import {bindActionCreators} from 'redux';
import * as counter from './counter';

const actions = {
    ...counter
}

export default function createActions(dispatch) {
    return bindActionCreators(actions, dispatch)
}