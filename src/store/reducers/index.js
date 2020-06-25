import { combineReducers } from 'redux';
import Authentication from './authReducer';

const RootReducer = combineReducers({
    Auth: Authentication
})

export { RootReducer }