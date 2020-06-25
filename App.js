/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContextProvider, ThemeContext } from './src/theme';
import AsyncStorage from '@react-native-community/async-storage';
import MainNavigation from './src/navigation';


const App = () => {
  const Theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    AsyncStorage.setItem('theme', JSON.stringify(Theme.theme))
  }, [Theme.theme]);

  return (
    <NavigationContainer>
      <ThemeContextProvider>
        <MainNavigation />
      </ThemeContextProvider>
    </NavigationContainer>
  );
};

export default App;