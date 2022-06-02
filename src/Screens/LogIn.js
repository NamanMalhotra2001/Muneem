import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from 'react-native-vector-icons';

const LogIn = () => {
    const login = (evt) => {

    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.paperShadow}>
                <Text>
                    Hec
                </Text>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    paperShadow: {
        width: '70%',
        height: '60%',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#ddd',
        shadowColor: '#ddd',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
    },

})
export default LogIn;