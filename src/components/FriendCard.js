import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, CardItem, Text, Right, Thumbnail, Body, Left, Button} from 'native-base';

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
                        <Button style={styles.button}>
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

