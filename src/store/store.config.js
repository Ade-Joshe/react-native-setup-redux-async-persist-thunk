import { createStore, applyMiddleware } from 'redux';
import { RootReducer } from './reducers'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { composeWithDevTools } from 'redux-devtools-extension';


const persistConfig = {
    key: 'lawyerpp_ticket',
    storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, RootReducer);
const saver = store => next => action => {
    let result = next(action);
    let stateToSave = store.getState();

    AsyncStorage.setItem("lawyerpp_ticket", JSON.stringify(stateToSave));
    return result;

}

const storeConfig = () => {
    const middleWares = [
        thunk, saver
    ];
    var store = createStore(persistedReducer,
        composeWithDevTools(applyMiddleware(...middleWares)));
    var persistor = persistStore(store);

    return {
        store, persistor
    }
}

export { storeConfig };
