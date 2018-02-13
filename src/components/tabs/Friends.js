import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import {Fab, Icon, Content} from 'native-base';
import {Actions} from 'react-native-router-flux';
import FriendCard from '../FriendCard';

class Friends extends Component {
    static navigationOptions = {
        tabBarLabel: 'FRIENDS'
    }

    render() {
        return(
            <View style={styles.container}>
                <Content>
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />                    
                </Content>
                <Fab
                    position='bottomRight'
                    containerStyle={{}}
                    style={{backgroundColor: '#FF7A5A'}}
                    onPress={() => Actions.addFriend()}>
                    <Icon name='add-circle' style={{fontSize: 50}}/>
                </Fab>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Friends;
