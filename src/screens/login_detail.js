import React, {Component} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Button, Text, Item, Label, Input, Form } from 'native-base';
import {tryLogin} from '../hasuraApi';
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
            isLoggedIn: 'false',
            auth_key: '',
        };
    }

    handleLoginPressed = async () => {
        const {username, password} = this.state;
        let resp = await tryLogin(username, password);
        let responseJson = await resp.json();
        console.log(responseJson);
        let authid = JSON.stringify(responseJson.auth_token)
        if(resp.status !== 200){
            if (resp.status === 504) {
              Alert.alert("Network Error", "Check your internet connection" )
            } else {
              Alert.alert("Error", "Unauthorized, Invalid username or password")      
            }
        } else {
            this.setState({isLoggedIn:true, auth_key:authid});
            Actions.home();  
        }
    }

    render() {
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
    }
});

