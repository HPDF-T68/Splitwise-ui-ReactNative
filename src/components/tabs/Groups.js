import React, {Component} from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import {Fab, Icon, Content} from 'native-base';
import {Actions} from 'react-native-router-flux';
import GroupCard from '../GroupCard';

class Groups extends Component {
    static navigationOptions = {
        tabBarLabel: 'GROUPS'
    }
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }
   
    
    onFabPress= () =>{
        Actions.addGroup();
    }
    render() {
        return(
            <View style={styles.container}>
                <Content>
                    <GroupCard />
                </Content>
                <Fab
                    active={this.state.active}
                    position='bottomRight'
                    containerStyle={{}}
                    style={{backgroundColor: '#FF7A5A'}}
                    >
                    <Icon name='add-circle' style={{fontSize: 50}} onPress={() => Actions.addGroup()}/>
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
