import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';

class Groups extends Component {
    static navigationOptions = {
        tabBarLabel: 'GROUPS'
    }
    render() {
        return(
            <View style={styles.container}>
                <Text>Tab1</Text>
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

export default Groups;
