import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
import { persistState } from 'redux-devtools'

var buildStore

if (__DEBUG__) {
    buildStore = compose(
        applyMiddleware(thunk),
        DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/)))
} else {
    buildStore = compose(applyMiddleware(thunk))
}

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, buildStore)
    
    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }
    
    return store
}
