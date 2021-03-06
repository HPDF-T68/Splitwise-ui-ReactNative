import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Button, Text } from 'native-base';
import LoginDetail from './login_detail';
/**
 * Start screen of the app.
 * @export
 * @class Login
 * @extends {Component}
 */
export default class Login extends Component {
    /**
     * Render function for Login.
     * @return {jsx}
     * @memberof Login
     */
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image
                        resizeMethod='auto'
                        style={styles.logo}
                        source={require('../img/logo.png')}
                    />
                    <Button 
                        light
                        style={styles.login}
                        resizeMethod='auto'
                        onPress={() => Actions.login()}
                    >
                        <Text style={styles.loginText}>Log in</Text>
                    </Button>
                    <Button
                        light
                        style={styles.signup}
                        resizeMethod='auto'
                        onPress={() => Actions.signin()}
                    >
                        <Text style={styles.loginText}>Sign Up</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        marginTop: 20,
        width: 300,
        height: 300
    },
    login: {
        marginTop: 30,
        alignSelf: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#B0BEC5',
        justifyContent: 'center',
    },
    signup: {
        marginTop: 15,
        alignSelf: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#69F0AE',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
});
