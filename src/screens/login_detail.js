import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Text, Item, Label, Input, Form } from 'native-base';
/**
 * defines login actions.
 * @export
 * @class LoginDetail
 * @extends {Component}
 */
export default class LoginDetail extends Component {

    state = {
        email: '',
        password: '',
    };

    onButtonPress() {
        const { email, password } = this.state;

    }
    render() {
        return (
            <View>
                <Text
                style={styles.title}
                >
                SPLITWISE
                </Text>
                <View style={styles.form}>
                    <Form>
                        <Item floatingLabel style={styles.input}>
                            <Label>Email</Label>
                            <Input
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
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
                    <Button light style={styles.button}>
                        <Text style={styles.buttonBack}>Back</Text>
                    </Button>
                    <Button success style={styles.button} onPress={this.onButtonPress.bind(this)}>
                        <Text style={styles.buttonDone}>Log In</Text>
                    </Button>
                </View>
            </View>  
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

