import React from 'react';

export const ThemeContext = React.createContext({
    theme: {
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
    setTheme: () => { }
})