import React from 'react'
import { Stack } from '../common';
import { Login } from '../../screens/auth';

let NewStack = Stack;

const LoginStack = () => {
    return (
        <NewStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <NewStack.Screen name="Login" component={Login} />
        </NewStack.Navigator>
    )
}

export { LoginStack }