import React from 'react';
import { View, TextStyle, Text, TextInput, ViewStyle } from 'react-native';
import { color } from '../../theme';
import { TextInputProps } from './text-input.props';

const TITLE: TextStyle = { fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginVertical: 10, color: color.palette.black };

const INPUT: ViewStyle = {
    backgroundColor: color.palette.white,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: color.palette.grey,
    borderWidth: 2,
};

const ERROR: TextStyle = {
    color: 'red'
};
export function TextInputs(props: TextInputProps) {
    const {title, errorName, ...rest} = props;
    return (
        <View>
            <Text style={TITLE}>{title}</Text>
            <TextInput {...rest} style={INPUT}/>
            {props.errorName ? <Text style = {ERROR}>{errorName}</Text> : null}
        </View>
    );
}
