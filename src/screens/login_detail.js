import React, {Component} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Button, Text, Item, Label, Input, Form, Spinner } from 'native-base';
import {tryLogin, tryLogout} from '../hasuraApi';
import HomeScreen from './home_screen';
/**
 * defines login actions.
 * @export
 * @class LoginDetail
 * @extends {Component}
 */
export default class LoginDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            auth_key: '',
            loading: false,
        };
    }

    handleLoginPressed = async () => {
        const {username, password} = this.state;
        if((username && password) != '')
        {
            this.setState({loading: true});
            let resp = await tryLogin(username, password);
            let responseJson = await resp.json();
            console.log(responseJson);
            let authid = JSON.stringify(responseJson.auth_token)
            console.log(authid);
            if(resp.status !== 200){
                this.setState({loading: false});
                if (resp.status === 504) {
                Alert.alert("Network Error", "Check your internet connection" )
                } else {
                Alert.alert("Error", "Unauthorized, Invalid username or password")      
                }
            } else {
                this.setState({
                    auth_key: authid,
                });
                Actions.home({logoutCallback:this.handleLogout});
            }
        } else {
            Alert.alert('Enter login credentials!!');
        }
    }

    handleLogout = async () => {
        const {auth_key} = this.state;
        let resp = await tryLogout(auth_key);
        if(resp.status !== 200){
            if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" );
            } else {
            Alert.alert('Unexpected error. Try again later');      
            }
        } else {
            
            Actions.start();
        }
    }

    render() {
        if(this.state.loading) {
            return (
                <View style={styles.spinnerStyle}>
                    <Spinner color='green'/>
                    <Text>Trying to login</Text>
                </View>
            );
        }
        return (
            <KeyboardAvoidingView>
                <Text
                style={styles.title}
                >
                SPLITWISE
                </Text>
                <View style={styles.form}>
                    <Form>
                        <Item floatingLabel style={styles.input}>
                            <Label>Username</Label>
                            <Input
                            value={this.state.username}
                            onChangeText={username => this.setState({ username })}
                            />
                        </Item>
                        <Item floatingLabel style={styles.input}>
                            <Label>Password</Label>
                            <Input 
                            secureTextEntry
                            value={this.state.password} 
                            onChangeText={password => this.setState({ password })}
                            />
                        </Item>
                    </Form>
                </View>
                <View style={styles.buttonBox}>
                    <Button light style={styles.button} onPress={() => Actions.start()}>
                        <Text style={styles.buttonBack}>Back</Text>
                    </Button>
                    <Button success style={styles.button} onPress={this.handleLoginPressed}>
                        <Text style={styles.buttonDone}>Log In</Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>  
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        fontFamily: 'monospace',   
    },
    form: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 15
    },
    input: {
        height: 50,
    },
    buttonBox: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },
    button: {
        width: 100,
        justifyContent: 'center',
    },
    buttonBack: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    buttonDone: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    spinnerStyle: {
        flex: 1,
        paddingTop: 300,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

