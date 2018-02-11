import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import {Fab, Icon, Content} from 'native-base';
import GroupCard from '../GroupCard';

class Groups extends Component {
    static navigationOptions = {
        tabBarLabel: 'GROUPS'
    }
    state = {
        active: true
    }
    render() {
        return(
            <View style={styles.container}>
                <Content>
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                </Content>
                <Fab
                    active={this.state.active}
                    position='bottomRight'
                    containerStyle={{}}
                    style={{backgroundColor: '#FF7A5A'}}
                    onPress={() => this.setState({active: !this.state.active})}>
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

export default Groups;
