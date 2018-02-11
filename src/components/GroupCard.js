import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, CardItem, Text, Icon, Right, Thumbnail, Body, Left, Button} from 'native-base';

state = {
    total_amount: 0,
    pay_amount: 0,
    isPaid: true,
    date: '',
    members: 0,
    name: '',
};
/**
 * Group card class
 * @export
 * @class GroupCard
 * @extends {Component}
 */
export default class GroupCard extends Component {
    /**
     * Group card render.
     * @return {jsx}
     * @memberof GroupCard
     */
    render() {
        return (
            <Card style={styles.cardBasic}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://placeimg.com/150/150/people'}} />
                        <Body>
                            <Text style={{fontWeight: 'bold'}}>Group Name</Text>
                            <Text note>Date</Text>
                            <Text note>4 Members</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text style={styles.totalText}>100</Text>
                    </Right>
                </CardItem>
                <CardItem cardBody style={styles.cardBody}>
                    <View>
                        <Text style={styles.settleText}>Closed</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button style={styles.button}>
                        <Text style={styles.buttonText}>Pay</Text>
                        </Button>
                        <Button style={styles.button}>
                        <Text style={styles.buttonText}>Share</Text>
                        </Button>
                   </View>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardBasic: {
        borderColor: 'black',
        padding: 5
    },
    cardBody: {
        justifyContent: 'space-between'
    },
    button: {
        width: 80,
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
    totalText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'grey'
    },
    buttonBox: {
        flexDirection: 'row',
    },
    settleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey'
    }
});
