import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';

class Friends extends Component {
    static navigationOptions = {
        tabBarLabel: 'FRIENDS'
    }
    render() {
        return(
            <View style={styles.container}>
                <Text>Tab2</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Friends;
