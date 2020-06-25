import React, { useState } from 'react';
import { ThemeContext } from './themeContext';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native';

export const ThemeContextProvider = props => {

    const theme = {
        light: {
            type: 'light',
            primary: '#1C2D55',
            inactive: '#999999',
            others: '#D3E0EA',
            pending: '#F2C94C',
            white: '#FFFFFF',
            black: '#1D1D1D',
            background: '#F8F8F8',
            error: '#FF647C',
            inactiveInput: '#E6E6E6',
            success: '#27AE60',
            ongoing: '#3CE1FA',
            placeholder: '#8B9EB4',
            divider: '#F7F7F7'
        },
        dark: {
            type: 'dark',
            primary: '#212121',
            text: '#ffffff'
        }
    }

    const setTheme = type => {
        setState({ ...state, theme: type === 'dark' ? theme.light : theme.dark });
    }

    const initState = () => {
        let setLin = AsyncStorage.getItem('theme');
        if (setLin && setLin.theme) {
            return {
                theme: theme[setLin.type],
                setTheme: setTheme
            }
        }
        else {
            return {
                theme: theme.light,
                setTheme: setTheme
            }
        }
    }

    const [state, setState] = useState(initState)

    return (
        <ThemeContext.Provider value={state}>
            <SafeAreaView style={{ flex: 1, backgroundColor: state.theme.background }}>
                {props.children}
            </SafeAreaView>
        </ThemeContext.Provider>
    )
}