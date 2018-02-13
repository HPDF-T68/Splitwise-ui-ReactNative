import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import {Content} from 'native-base';
import ActivityCard from '../ActivityCard';

class Activity extends Component {
    static navigationOptions = {
        tabBarLabel: 'ACTIVITY'
    }
    render() {
        return(
            <Content>
                <ActivityCard />
            </Content>
        );
    }
}

const styles = StyleSheet.create({

});

export default Activity;
