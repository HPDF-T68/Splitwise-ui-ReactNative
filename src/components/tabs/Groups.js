import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import {Fab, Icon} from 'native-base';

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
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Groups;
