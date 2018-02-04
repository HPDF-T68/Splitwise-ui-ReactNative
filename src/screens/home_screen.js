import React, {Component} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import {Container} from 'native-base';
import TabHeader from '../components/TabHeader';
import NavBar from '../components/NavBar';
/**
 * Screen shows on login.
 * @class HomeScreen
 * @extends {Component}
 */
class HomeScreen extends Component {
    /**
     * Render function for Home screen.
     * @return {jsx}
     * @memberof HomeScreen
     */
    render() {
        return (
            <View style={styles.container}>
                <NavBar />
                <TabHeader />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});
export default HomeScreen;
