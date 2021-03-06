import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, CardItem, Text, Icon, Right, Thumbnail, Body, Left, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
import prompt from 'react-native-prompt-android';
import {payMoney} from '../hasuraApi';

/**
 * Group card class
 * @export
 * @class GroupCard
 * @extends {Component}
 */
export default class GroupCard extends Component {
    /**
     * Creates an instance of GroupCard.
     * @param {any} props
     * @memberof GroupCard
     */
    constructor(props) {
        super(props);
        this.state = {
            amount: 0
        };
        var that = this;
    }
    /**
     * function to show prompt
     * @memberof GroupCard
     */
    showPrompt() {
        prompt(
            'Enter amount to pay',
            'This amount will be deducted from your wallet.',
            [
             {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
             {text: 'Pay', onPress: amount => this.payButtonPress(amount)},
            ],
            {
                type: 'numeric',
                cancelable: false,
                defaultValue: 0,
                placeholder: 'Enter amount'
            }
        );
    };

    payButtonPress(amount){
        this.setState({amount: amount})
        this.onPayPress();
    }

    onPayPress = async() => {
        let resp = await payMoney(this.props.hasuraId,this.props.rowData.gid,this.state.amount);
        this.props.handleGroup();
        let responseJson = await resp.json();
        console.log(responseJson);
    }

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
                            <Text style={{fontWeight: 'bold'}}>{this.props.rowData.gname}</Text>
                            <Text note>{this.props.rowData.gdate}</Text>
                            <Text note><Text note>{this.props.rowData.member_no}</Text> Members</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text style={styles.totalText}>{this.props.rowData.total_expanse}</Text>
                    </Right>
                </CardItem>
                <CardItem cardBody style={styles.cardBody}>
                    <View>
                        <Text style={styles.settleText}>Open</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button style={styles.button} onPress={this.showPrompt.bind(this)}>
                        <Text style={styles.buttonText}>Pay</Text>
                        </Button>
                        <Button style={styles.button} onPress={() => Actions.shareBill({Data: this.props.rowData, handleGroups: this.props.handleGroup})}>
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
