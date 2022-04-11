import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../app/screens/login-screen/login-screen';
import { MockedProvider } from '@apollo/client/testing';
// import { useStores } from '../app/models';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const mocks = [];

const component = (
    <NavigationContainer>
        <MockedProvider mocks={mocks} addTypename={false}>
            <LoginScreen navigation={undefined} route={undefined}/>
        </MockedProvider>
    </NavigationContainer>
);

describe('Testing login screen', () => {

    test('username check', () => {
        const { getByTestId } = render(component);
    
        const username = getByTestId('uname');
        fireEvent.changeText(username, 'Rushi');
    
        expect(username.props.value).toBe('Rushi');
    });

    test('password check', () => {
        const { getByTestId } = render(component);
    
        const password = getByTestId('password');
        fireEvent.changeText(password, 'Rushi@21');
    
        expect(password.props.value).toBe('Rushi@21');
    });

    test('login check with right data', async() => {
        const { getByTestId } = render(component);
    
        const username = getByTestId('uname');
        const password = getByTestId('password');

        await waitFor(() => {
            fireEvent.changeText(password, 'Rushi@21');
            fireEvent.changeText(username, 'Rushi');
        });

        const btnLogin = getByTestId('uname');
        fireEvent.press(btnLogin);

        const token = AsyncStorage.getItem('token');

        expect(token).not.toBe('');
    });
});