import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';

class Activity extends Component {
    static navigationOptions = {
        tabBarLabel: 'ACTIVITY'
    }
    render() {
        return(
            <View style={styles.container}>
                <Text>Tab3</Text>
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

export default Activity;
