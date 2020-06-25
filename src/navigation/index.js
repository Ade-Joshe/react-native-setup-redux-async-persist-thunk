import React, { useContext } from 'react'
import { View, StatusBar, Platform } from 'react-native';
import { Stack } from './common';
import { LoginStack } from './auth';
import { ThemeContext } from '../theme/themeContext';

let Root = Stack;

//navigation reference
export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function NavigationReset(name) {
    navigationRef.current?.reset({
        index: 0,
        routes: [{ name: name }]
    });
}


const MainNavigation = () => {

    let Theme = useContext(ThemeContext)

    return (
        <View style={{ flex: 1 }}>

            {/* The statusbar using theming */}
            {
                Platform.select({
                    ios: <StatusBar backgroundColor={Theme.theme.background} barStyle={`${Theme.theme.type === 'light' ? 'dark' : Theme.theme.type === 'dark' && 'light'}-content`} />,
                    android: <StatusBar barStyle={'light-content'} backgroundColor={'darkgrey'} />
                })
            }

            <Root.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Root.Screen name="Auth" component={LoginStack} />
            </Root.Navigator>

        </View>
    )
}

export default MainNavigation