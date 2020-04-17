import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './reducers';
import initialState from './initialState';
// export default function configureStore() {
//     return createStore(rootReducer, initialState);
// }
let createMyStore = applyMiddleware(thunk, promise)(createStore);
const configureStore = function () {
    const store = createMyStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};
const store = configureStore();
export default store;
