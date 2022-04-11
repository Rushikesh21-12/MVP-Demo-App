import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import {SignupSuccess} from '../app/screens';
// import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

configure({ adapter: new Adapter() });

describe('Configure testing', () => {
    test('Login success test', () => {
        const wrapper = shallow(
            <NavigationContainer>
                <Text>Hellow</Text>
            </NavigationContainer>
        );
        console.log(wrapper.debug());
        expect(wrapper.find('Text').text()).toEqual('Hellow');
    });
});