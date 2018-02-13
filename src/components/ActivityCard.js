import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, CardItem, Text, Right, Thumbnail, Body, Left, Button} from 'native-base';

/**
 * Activity class card.
 * @export
 * @class FriendCard
 * @extends {Component}
 */
export default class ActivityCard extends Component {
    /**
     * render for Activity card
     * @return {jsx}
     * @memberof ActivityCard
     */
    render() {
        return (
            <Card style={styles.cardBasic}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://placeimg.com/150/150/people'}} />
                        <Body>
                            <Text style={{fontWeight: 'bold'}}>Group Name</Text>
                            <Text note>on Date</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody style={styles.cardBody}>
                    <View>
                        <Text style={styles.activityText}>Added money to group</Text>
                    </View>
                </CardItem>
            </Card>
        );
    };
}

const styles = StyleSheet.create({
    cardBasic: {
        borderColor: 'black',
        padding: 5
    },
    cardBody: {
        justifyContent: 'flex-start'
    },
    activityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey'
    }
});

