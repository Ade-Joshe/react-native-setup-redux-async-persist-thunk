import React from 'react';
import { ThemeContext } from './themeContext';

export function theme() {
    return React.useContext(ThemeContext).theme;
}

export * from './themeContext';
export * from './themeContextProvider';