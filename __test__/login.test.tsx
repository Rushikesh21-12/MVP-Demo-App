/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginScreen } from '../app/screens/login-screen/login-screen';
import { MockedProvider } from '@apollo/client/testing';


jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
})); 

configure({ adapter: new Adapter() });

const mocks = [];

describe('Test case for testing login', () => {
    test('username check',() => {
 
        const wrapper = shallow(
            <MockedProvider mocks={mocks} addTypename={false}>
                <LoginScreen navigation={undefined} route={undefined}/>
            </MockedProvider>
        );
        expect(wrapper.find('Textinputs[testID="uname"]').props('placeholder')).toEqual('Enter your password');
        // wrapper.find('TextInputs[title="Username"]').simulate('changeText', 'abc');
        // // wrapper.find('TextInputs[title="Username"]').prop('value');
        // expect(wrapper.state('userData.userName')).toEqual('abc');
    });
    // it('password check',() => {
    //     const wrapper = shallow(<LoginScreen navigation={undefined} route={undefined}/>);
    //     wrapper.find('input[title="password"]').simulate('changeText', {target: {value: 'abc'}});
    //     expect(wrapper.state('userData.password')).toEqual('abc');
    // });
    // it('login check with right data',()=>{
    //     const wrapper = shallow(<LoginScreen navigation={undefined} route={undefined}/>);
    //     wrapper.find('TextInputs[title="Username"]').simulate('changeText', 'test111@gmail.com');
    //     wrapper.find('TextInputs[title="Password"]').simulate('changeText', 'Tatva@123');
    //     wrapper.find('CustomButton').simulate('press');
    //     expect(token).not.toBe(undefined);
    // });
    // it('login check with wrong data',()=>{
    //     let token:string;
    //     AsyncStorage.getItem('token').then(res => token = res);
    //     const wrapper = shallow(<LoginScreen navigation={undefined} route={undefined}/>);
    //     wrapper.find('TextInputs[title="Username"]').simulate('changeText', 'abcde');
    //     wrapper.find('TextInputs[title="Password"]').simulate('changeText', 'abcde');
    //     wrapper.find('CustomButton').simulate('press');
    //     expect(token).toEqual(undefined);
    // });
});