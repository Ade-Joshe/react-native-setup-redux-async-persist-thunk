/**
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { storeConfig } from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

AsyncStorage.getItem("_app_auth_token").then(result => {
    if (result) {
        axios.defaults.headers["x-access-token"] = result;
    }
})

const { store, persistor } = storeConfig();

const ProviderComponent = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider >
    );
};

AppRegistry.registerComponent(appName, () => ProviderComponent);