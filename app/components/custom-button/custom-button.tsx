import React from 'react';
import { TextStyle, ViewStyle, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { color } from '../../theme';
import { ButtonProps } from './custom-button.props';

const CONTAINER: ViewStyle = {
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: color.palette.grey,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5
};

const TITLE: TextStyle = {
    color: color.palette.white,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
};

export function CustomButton(props: ButtonProps) {
    const { title, onPress, loading } = props;

    return (
        <TouchableOpacity style={CONTAINER} onPress={onPress}>
            {loading ? <ActivityIndicator size={'large'}/> : <Text style={TITLE}>{title}</Text>}
        </TouchableOpacity>
    );
}
