import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
import {Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, Item, Form, Label, Input, Toast} from 'native-base';
import {Actions} from 'react-native-router-flux';
import { AddFriendApi } from '../hasuraApi';
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
            hasuraId: this.props.hasuraId
        };
    }
    handleAddFriend = async () => {
        let resp = await AddFriendApi(this.state.hasuraId,this.state.name);
        if(resp.status !== 200){
            if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" )
            } 
        }
        let responseJson = await resp.json();
        console.log(responseJson);
        let response = JSON.stringify(responseJson.resp[0].message);
        let username = this.state.name;
        console.log(response);
        if(responseJson.resp[0].message === "User Added"){
            Alert.alert(username + " added to friend list");
        }else if(responseJson.resp[0].message === 'This user does not exists'){
            Alert.alert(username + " does not exist");
        }
        this.props.handleFriendList();
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
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={styles.body}>
                        <Title>ADD FRIEND</Title>
                    </Body>
                    <Right style={styles.right}>
                        <Button style={styles.buttonSave} onPress={this.handleAddFriend}>
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
