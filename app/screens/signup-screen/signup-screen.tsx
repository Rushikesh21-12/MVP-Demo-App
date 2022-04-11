import React, { FC, useState } from 'react';
import { 
    Text, 
    TouchableOpacity, 
    Keyboard, 
    View, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    ViewStyle
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { useMutation } from '@apollo/client';

import { NavigatorParamList } from '../../navigators';
import { CustomButton, HeaderText, TextInputs } from '../../components';
import { CREATE_NEW_USER } from '../../services/graphql';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalStyle = require('../styles');

const CONTAINER: ViewStyle = {
    flex: 1
};

const REQUIRED_FIELD_ERROR = 'Required Field!!';

const isValidEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\.,;:\s@\']+(\.[^<>()[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i;
    return re.test(String(email));
};

export const SignupScreen: FC<StackScreenProps<NavigatorParamList, 'signUp'>> = observer(
    ({ navigation }) => {
        const [userData, setUserData] = useState({
            email: '',
            userName: '',
            password: '',
        });
        const { email, userName, password } = userData;

        const [validationErrors, setValidationErrors] = useState({
            emailError: '',
            userNameError: '',
            passwordError: '',
        });
        const { emailError, userNameError, passwordError } = validationErrors;

        const [registerUser, {loading}] = useMutation(CREATE_NEW_USER, {
            onError({graphQLErrors}){
                console.log(graphQLErrors);
            },
        });
        
        const onSignUp = () => {
            let tempEmailError = '', 
                tempPasswordError = '', 
                tempUserNameError = '';

            email == '' ? tempEmailError = REQUIRED_FIELD_ERROR : null;
            userName == '' ? tempUserNameError = REQUIRED_FIELD_ERROR : null;
            password == '' ? tempPasswordError = REQUIRED_FIELD_ERROR : null;

            setValidationErrors({
                emailError: tempEmailError, 
                userNameError: tempUserNameError, 
                passwordError: tempPasswordError
            });

            if (
                emailError == '' && 
                passwordError == '' && 
                userNameError == '' && 
                tempUserNameError == '' && 
                tempPasswordError == '' && 
                tempEmailError == ''
            ) {
                let resError: unknown;
                registerUser({
                    variables: {
                        email: email, 
                        password: password, 
                        firstname:userName, 
                        surname: 'Solanki',
                        phoneNumber:'7383169938',
                        role:'User'
                    }
                }).then(res => {
                    resError = res.errors;
                    console.log(res);
                    if(res.data !== undefined) {
                        alert('Successfully Registered');
                        navigation.goBack();
                    }else{
                        if(resError == 'Error: 409: Conflict')
                            alert('Email or mobile number is already Registered.');
                        else 
                            alert('Something went wrong. Try again later.');
                    }
                });
            }
        };

        const onUserDataChange = (value: string, fieldName: string) => {
            setUserData({ ...userData, [fieldName]: value });
            switch (fieldName) {
            case 'email':
                if (value == '') 
                    setValidationErrors({...validationErrors, emailError: REQUIRED_FIELD_ERROR});
                else 
                    !isValidEmail(value) 
                        ? setValidationErrors({...validationErrors, emailError: 'Invalid Email'}) 
                        : setValidationErrors({...validationErrors, emailError: ''});
                break;
            case 'password':
                value == '' 
                    ? setValidationErrors({...validationErrors, passwordError: REQUIRED_FIELD_ERROR}) 
                    : setValidationErrors({...validationErrors, passwordError: ''});
                break;
            case 'userName':
                value == '' 
                    ? setValidationErrors({...validationErrors, userNameError: REQUIRED_FIELD_ERROR}) 
                    : setValidationErrors({...validationErrors, userNameError: ''});
                break;
            }
        };

        return (
            <KeyboardAvoidingView 
                behavior={Platform.OS == 'ios' ? 'padding' : undefined} 
                style={CONTAINER}
            >
                <ScrollView showsVerticalScrollIndicator={false} style={CONTAINER}>
                    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
                        <View style={globalStyle.screenPadding}>
                            <HeaderText headerTitle='Sign Up' />
                            <TextInputs
                                title='Email'
                                placeholder='Enter your email'
                                onChangeText={(value: string) => onUserDataChange(value, 'email')}
                                errorName={emailError}
                            />
                            <TextInputs
                                title='Username'
                                placeholder='Enter user name'
                                onChangeText={(value: string) => onUserDataChange(value, 'userName')}
                                errorName={userNameError}
                            />
                            <TextInputs
                                title='Password'
                                placeholder='Enter password'
                                secureTextEntry={true}
                                onChangeText={(value: string) => onUserDataChange(value, 'password')}
                                errorName={passwordError}
                            />
                            <CustomButton title='Sign Up' onPress={() => onSignUp()} loading={loading}/>
                            <Text style={globalStyle.bottomText}>Have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                <Text style={[globalStyle.bottomText, globalStyle.bold]}>Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    },
);
