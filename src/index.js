import './css/css.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { App } from './containers/App'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import DevTools from './containers/DevTools'
import {connect} from 'react-redux'
import createAction from './actions'


const store = configureStore()

function renderDevTools() {
    if (__DEBUG__) {
        return (
            <DevTools />
        )
    }

    return null
}

render(<Provider store={store}>
            <div>
                <App />
                {renderDevTools()}
            </div>
        </Provider>, document.getElementById('root'))