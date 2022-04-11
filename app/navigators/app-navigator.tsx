import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupScreen, SignupSuccess, LoginScreen } from '../screens';
import { navigationRef } from './navigation-utilities';
import { useStores } from '../models';
import { observer } from 'mobx-react-lite';

export type NavigatorParamList = {
  login: undefined
  signUp: undefined
  signUpSuccess: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="signUpSuccess" component={SignupSuccess} />
        </Stack.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="login"
        >
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signUp" component={SignupScreen} />
        </Stack.Navigator>
    );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer((props: NavigationProps) => {

    const colorScheme = useColorScheme();
    const {authenticationStore} = useStores();
  
    return (
        <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            {...props}
        >
            {authenticationStore.token == '' ? <AuthStack/> : <AppStack/>}
        </NavigationContainer>
    );
});

AppNavigator.displayName = 'AppNavigator';

const exitRoutes = ['login'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
