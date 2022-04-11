import React, { FC, useEffect, useState } from 'react';
import { 
    Keyboard, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    View, 
    ViewStyle
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { useMutation } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigatorParamList } from '../../navigators';
import { CustomButton, HeaderText, TextInputs } from '../../components';
import { useStores } from '../../models';
import { LOGIN_USER } from '../../services/graphql';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalStyle = require('../styles');

const CONTAINER: ViewStyle = {
    flex: 1
};

const REQUIRED_FIELD_ERROR = 'Required Field!!';

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, 'login'>> = observer(
    ({ navigation }) => {
        const isFocused = useIsFocused();
        const [userData, setUserData] = useState({
            userName: '',
            password: ''
        });
        const {userName, password} = userData;

        const [validationErrors, setValidationErrors] = useState({
            userNameError: '',
            passwordError: ''
        });
        const {userNameError, passwordError} = validationErrors;

        const {authenticationStore} = useStores();
        
        const [loginUser, {loading}] = useMutation(LOGIN_USER, {
            onError({graphQLErrors}){
                console.log(graphQLErrors);
            },
        });

        const onChangeData = (value, fieldName) => {
            setUserData({...userData, [fieldName]: value});
            switch(fieldName){
            case 'userName':
                value == '' 
                    ? setValidationErrors({...validationErrors, userNameError: REQUIRED_FIELD_ERROR}) 
                    : setValidationErrors({...validationErrors, userNameError: ''});
                break;
            case 'password':
                value == '' 
                    ? setValidationErrors({...validationErrors, passwordError: REQUIRED_FIELD_ERROR}) 
                    : setValidationErrors({...validationErrors, passwordError: ''});
                break;
            }
        };

        const onLogin = async() => {
            let tempUserNameError = '', 
                tempPasswordError = '';

            userName == '' ? tempUserNameError = REQUIRED_FIELD_ERROR : null;
            password == '' ? tempPasswordError = REQUIRED_FIELD_ERROR : null;
    
            setValidationErrors({userNameError: tempUserNameError, passwordError: tempPasswordError});

            if (
                passwordError == '' && 
                userNameError == '' && 
                tempUserNameError == '' && 
                tempPasswordError == ''
            ){
                let resError:unknown;
                await loginUser({variables: {login: userName, password: password}}).then(res => {
                    resError = res.errors;
                    if(res.data !== undefined){
                        authenticationStore.setToken(res.data.authenticate.token);
                        authenticationStore.setEmail(res.data.authenticate.user.email);
                        authenticationStore.setUserName(res.data.authenticate.user.firstname);
                        AsyncStorage.setItem('token', JSON.stringify(res.data.authenticate.token));
                    }else{
                        console.log(resError);
                        if(resError == 'Error: Failed authentication: Given credentials are not valid')
                            alert('Invalid Credentials');
                        else
                            alert('Server error, Try again later.');
                    }
                });
            }
        };

        useEffect(() => {
            setValidationErrors({
                userNameError: '',
                passwordError: ''
            });
            setUserData({
                userName: '',
                password: ''
            });
        }, [isFocused]);

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}
                style={CONTAINER}
            >
                <ScrollView 
                    keyboardShouldPersistTaps='always' 
                    showsVerticalScrollIndicator={false}
                    style={CONTAINER}
                >
                    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
                        <View style={globalStyle.screenPadding}>
                            <HeaderText headerTitle='Log In' />
                            <TextInputs
                                title='Username'
                                value={userName}
                                placeholder='Enter user name'
                                onChangeText={(value) => onChangeData(value, 'userName')}
                                errorName={userNameError}
                                testID='uname'
                            />
                            <TextInputs
                                title='Password'
                                value={password}
                                placeholder='Enter password'
                                secureTextEntry={true}
                                onChangeText={(value) => onChangeData(value, 'password')}
                                errorName={passwordError}
                                testID='password'
                            />
                            <CustomButton 
                                title='Log In' 
                                onPress={() => onLogin()} 
                                loading={loading} 
                                testID='TEST_ID_SUBMIT_BUTTON'
                            />
                            <Text style={globalStyle.bottomText}>Don&apos;t have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                                <Text style={[globalStyle.bottomText, globalStyle.bold]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    },
);
