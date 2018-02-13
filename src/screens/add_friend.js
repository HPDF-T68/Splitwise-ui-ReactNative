import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, Item, Form, Label, Input} from 'native-base';
/**
 * Add friend class
 * @export
 * @class AddFriend
 * @extends {Component}
 */
export default class AddFriend extends Component {
    /**
     * Creates an instance of AddFriend.
     * @param {any} props
     * @memberof AddFriend
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',

        };
    }
    /**
     * Add friend render
     * @return {jsx}
     * @memberof AddFriend
     */
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left style={styles.left}>
                        <Button transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={styles.body}>
                        <Title>ADD FRIEND</Title>
                    </Body>
                    <Right style={styles.right}>
                        <Button style={styles.buttonSave}>
                            <Text style={styles.textSave}>Add</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.textInfo}>Enter username of user</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <Form style={styles.form}>
                            <Item floatingLabel style={styles.input}>
                                <Label>User Name</Label>
                                <Input
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({name})}
                                />
                            </Item>               
                        </Form>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#50E3C2',
        justifyContent: 'space-around',
        height: 50
    },
    left: {
        flex: 1
    },
    body: {
        flex: 5,
    },
    right: {
        flex: 1
    },
    buttonSave: {
        backgroundColor: '#FF7A5A',
        height: 40,
        width: 90,
        justifyContent: 'center',
    },
    textSave: {
        fontSize: 18,
        paddingBottom: 5
    },
    form: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 15,
        marginBottom: 10
    },
    input: {
        height: 50,
        width: 300
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        flexDirection: 'row'
    },
    textInfo: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold'
    }
});
