import './css/css.less';
import React, { Component } from 'react'
import { render } from 'react-dom'
import { App } from './containers/App'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

function renderDevTools(store) {
    if (__DEBUG__) {
        let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools')

        return (
            <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        )
    }

    return null
}

render(<div>
        <Provider store={store}>
            <App />
        </Provider>
        {renderDevTools(store)}
    </div>, document.getElementById('root'))