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
        console.log(this.props)
        return (
            <div>
                <div>11111</div>
                {
                    this.props.default
                }
            </div>
        )
    }

}

const qq = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./containers/Index'))
  }, 'qq')  
}

const ee = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./containers/List'))
  }, 'ee')  
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
			            <IndexRoute getComponent={qq}/>
			        </Route>
                    <Route path="list">
			            <IndexRoute getComponent={ee}/>
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