import React, { FC } from 'react';
import { Text, TextStyle, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { NavigatorParamList } from '../../navigators';
import { CustomButton, HeaderText } from '../../components';
import { useStores } from '../../models';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalStyle = require('../styles');

const MARGIN: TextStyle = {
    marginBottom: 80
};

export const SignupSuccess: FC<StackScreenProps<NavigatorParamList, 'signUpSuccess'>> = observer(
    () => {

        const {authenticationStore} = useStores();

        const onLogout = () => {
            authenticationStore.setToken('');
            AsyncStorage.removeItem('token');
        };

        return (
            <View style={globalStyle.screenPadding}>
                <HeaderText headerTitle='Log In Success' />
                <Text style={globalStyle.bottomText}>Your email is</Text>
                <Text style={[globalStyle.bottomText, globalStyle.bold, MARGIN]}>
                    {authenticationStore.email}
                </Text>
                <Text style={globalStyle.bottomText}>Your username is</Text>
                <Text style={[globalStyle.bottomText, globalStyle.bold]}>
                    {authenticationStore.userName}
                </Text>
                <CustomButton title='Log Out' onPress={() => onLogout()}/>
            </View>
        );
    },
);
