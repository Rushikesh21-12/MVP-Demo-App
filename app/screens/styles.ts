import { StyleSheet } from 'react-native';
import { color } from '../theme';

module.exports = StyleSheet.create({
    screenPadding: {
        paddingHorizontal: 20,
        paddingTop: 50,
        flex: 1
    },

    bottomText: {
        textAlign: 'center',
        color: color.palette.black,
        fontSize: 18,
        marginBottom: 10
    },

    bold:{
        fontWeight: 'bold'
    }
});