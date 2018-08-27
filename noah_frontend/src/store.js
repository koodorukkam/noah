import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'

export default function configureStore(initialState) {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(
            applyMiddleware(
                reduxThunk
            )
        ))
}
