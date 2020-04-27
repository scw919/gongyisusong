import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './reducers';
import initialState from './initialState';
// redux - persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const storageConfig = {
    key: 'root', // 必须有的
    storage, // storage is now required
    // stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
    blacklist: [], // reducer 里不持久化的数据
};

// export default function configureStore() {
//     return createStore(rootReducer, initialState);
// }

const configureStore = function () {
    const createMyStore = applyMiddleware(thunk, promise)(createStore);
    const store = createMyStore(persistReducer(storageConfig, rootReducer), initialState);
    // const store = createMyStore(rootReducer, initialState);
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
export const persistor = persistStore(store);
export default store;
