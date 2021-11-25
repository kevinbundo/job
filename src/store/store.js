import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'job-listing',
    storage,
    whitelist: ['auth'],
    blacklist: ['user', 'favoriteJobs', 'jobs',]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer,
    applyMiddleware(thunk));

let persistor = persistStore(store)

export { store, persistor }