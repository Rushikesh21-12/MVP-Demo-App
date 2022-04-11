import React from 'react';
import { TextStyle, Text } from 'react-native';
import { color } from '../../theme';
import { HeaderTextProps } from './header-text.props';

const TITLE: TextStyle = { fontSize: 35, fontWeight: 'bold', color: color.palette.black, marginBottom: 60 };

export function HeaderText(props: HeaderTextProps) {
    const { headerTitle } = props;

    return (
        <Text style={TITLE}>{headerTitle}</Text>
    );
}
