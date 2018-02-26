import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, CardItem, Text, Right, Thumbnail, Body, Left, Button, Toast} from 'native-base';
import { RemoveFriendApi } from '../hasuraApi';

/**
 * Friend class card.
 * @export
 * @class FriendCard
 * @extends {Component}
 */
export default class FriendCard extends Component {
    /**
     * Creates an instance of FriendCard.
     * @param {any} props
     * @memberof FriendCard
     */
    constructor(props) {
        super(props);
    }

    handleRemoveFriend = async() => {
        let resp = await RemoveFriendApi(this.props.hasuraId,this.props.rowData.friend_id);
        let username = this.props.rowData.username;
        if(resp.status !== 200)
        {
            this.setState({isLoading: false});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            if (resp.status === 504) 
            Alert.alert("Network Error", "Check your internet connection" )
        }
        let responseJson = await resp.json();
        console.log(responseJson);
        if(responseJson.affected_rows > 0)
        {
            Toast.show({
                text: username.concat(' removed friend list'),
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            })
        }
        else {
            Toast.show({
                text: 'Some error occured',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            })
        }
        this.props.handleFriendList();
    }

    /**
     * render for friend card
     * @return {jsx}
     * @memberof FriendCard
     */
    render() {
        return (
            <Card style={styles.cardBasic}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://placeimg.com/150/150/people'}} />
                        <Body>
                            <Text style={{fontWeight: 'bold'}}>{this.props.rowData.username}</Text>
                            <Text note>User ID <Text note>{this.props.rowData.friend_id}</Text></Text>
                        </Body>
                    </Left>
                    <Right>
                        <Button style={styles.button} onPress={this.handleRemoveFriend}>
                            <Text style={styles.buttonText}>Remove</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    };
}

const styles = StyleSheet.create({
    cardBasic: {
        borderColor: 'black',
    },
    button: {
        width: 90,
        height: 40,
        margin: 5,
        backgroundColor: '#50E3C2',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 14,
        color: '#FCF4D9',
        fontWeight: 'bold',
    },
});

