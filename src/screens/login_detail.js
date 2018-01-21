import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Item, Label, Input, Form } from 'native-base';

export default class LoginDetail extends Component {

    state = {
        email: '',
        password: ''
    };
    render() {
        return (
            <View>
                <Text
                style={styles.title}
                >
                SPLITWISE
                </Text>
                <Form style={styles.form}>
                    <Item floatingLabel style={styles.input}>
                        <Label>Username</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel style={styles.input}>
                        <Label>Password</Label>
                        <Input secureTextEntry />
                    </Item>
                </Form>
                <View style={styles.buttonBox}>
                    <Button light style={styles.button}>
                        <Text style={styles.buttonBack}>Back</Text>
                    </Button>
                    <Button success style={styles.button}>
                        <Text style={styles.buttonDone}>Done</Text>
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
        paddingTop: 5,
        alignItems: 'center',
        margin: 0
    },
    input: {
        height: 50,
        width: 300,
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

