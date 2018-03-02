import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Container, Thumbnail, Content, Item, Input, Button, Icon} from 'native-base';
import {tryAddMoney,getUser} from '../hasuraApi';
/**
 * Drawer template
 * @export
 * @class SideBar
 * @extends {Component}
 */
export default class SideBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            uid: this.props.hasuraId,
            username: '',
            email: '',
            mobile: '',
            owe: '',
            amount: 0,
            currency: '',
            authkey: this.props.authkey,
            input: 0,
        }
    }

    componentWillMount(){
        this.handleDetails();
    }

    handleDetails = async() => {
        let resp = await getUser(this.state.uid);
        let responseJson = await resp.json();
        console.log("User Details");
        console.log(responseJson);
        this.setState({
            username: responseJson[0].username,
            email: responseJson[0].email,
            amount: responseJson[0].owed,
            owe: responseJson[0].owe,
            mobile: responseJson[0].mobile,
            currency: responseJson[0].currency
        });
    }

    handleAddMoney = async() => {
        let resp = await tryAddMoney(this.state.uid,this.state.input);
        let responseJson = await resp.json();
        this.setState({
            amount: responseJson.returning[0].owed,
        })
    }
    /**
     * Render for SideBar.
     * @return {jsx}
     * @memberof SideBar
     */
    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Thumbnail large source={{uri: 'https://placeimg.com/150/150/people'}} style={styles.thumbnail} />
                    <Text style={styles.username}>{this.state.username}</Text>
                    <Text style={styles.email}>{this.state.email}</Text>
                    <Text style={styles.email}>{this.state.mobile}</Text>
                    <Text style={styles.addedMoney}><Text style={styles.addedMoney}>$ </Text>{this.state.amount}</Text>
                    <Text style={styles.email}>in wallet</Text>
                    <Item rounded style={styles.inputBox}>
                        <Input 
                        placeholder='Add money' 
                        onChangeText={(input) => this.setState({ input })}
                        keyboardType = 'numeric' 
                        style={{textAlign: 'center', fontSize: 22}}/>
                        <Button rounded style={styles.addButton} onPress={this.handleAddMoney}>
                            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Add</Text>
                        </Button>
                    </Item>
                    <Text style={styles.addedMoney}><Text style={styles.addedMoney}>$ </Text>{this.state.owe}</Text>
                    <Text style={styles.email}>to Pay</Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#50E3C2',
        alignItems: 'center'
    },
    content: {
        margin: 5,
        padding: 5,
        paddingTop: 10,
    },
    thumbnail: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        justifyContent: 'center',
        borderRadius: 80
    },
    username: {
        alignSelf: 'center',
        paddingTop: 5,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    email: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    addedMoney: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: 'bold',
    },
    inputBox: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        width: 280,
    },
    addButton: {
        alignSelf: 'center',
        marginRight: 3,
        backgroundColor: 'tomato',
        width: 80,
        borderRadius: 60,
        paddingBottom: 11,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
