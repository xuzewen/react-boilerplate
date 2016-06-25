import './css/css.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import {Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory,useRouterHistory } from 'react-router'
import {Provider} from 'react-redux'
import {createHashHistory} from 'history' 
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import DevTools from './containers/DevTools'
import createAction from './actions'

import { Index, List } from './containers/App'

const store = configureStore()

function renderDevTools() {
    if (__DEBUG__) {
        return (
            <DevTools />
        )
    }

    return null
}

const makeHashHistory = useRouterHistory(createHashHistory)({queryKey: false})

const history = syncHistoryWithStore(makeHashHistory, store)

class Page extends Component{
    constructor(props){
        super(props)
    }

    render() {

        return (
            <div>
                {
                    this.props.children
                }
            </div>
        )
    }

}

export default class App extends Component{
    constructor(props){
        super(props)
    }

     render() {
        return (
        	<Router history={history}>
			    <Route path="/" component={Page}>
                    <IndexRedirect to="index"/>
			        <Route path="index">
			            <IndexRoute component={Index}/>
			        </Route>
                    <Route path="list">
			            <IndexRoute component={List}/>
			        </Route>
			    </Route>
			</Router>
        )
     }

}


render(<Provider store={store}>
            <div>
                <App />
                {renderDevTools()}
            </div>
        </Provider>, document.getElementById('root'))