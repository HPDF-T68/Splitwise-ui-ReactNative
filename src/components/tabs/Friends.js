import React, {Component} from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, ListView, Alert, Platform} from 'react-native';
import {Fab, Icon, Content} from 'native-base';
import {Actions} from 'react-native-router-flux';
import FriendCard from '../FriendCard';
import { getFriendList } from "../../hasuraApi";

class Friends extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasuraId: this.props.screenProps.hasuraId,
            isLoading: true,
        };
    }
    static navigationOptions = {
        tabBarLabel: 'FRIENDS'
    }

    componentDidMount(){
        console.log(this.state.hasuraId);
        this.handleFriendList();
    }
    comp

    handleFriendList = async() => {
        let resp = await getFriendList(this.state.hasuraId);
        if(resp.status !== 200){
            this.setState({loading                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              : false});
            if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" )
            } 
        }
        let responseJson = await resp.json();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson),
        }, function(){
            //something to do.
        });
    }

    render() {

        if( this.state.isLoading) {
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return(
            <View style={styles.container}>
                <Content>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <View style={{flex:1, flexDirection: 'row', marginLeft: 5,marginRight: 5}}>
                                <FriendCard rowData={rowData} />
                            </View>
                        }
                    />                 
                </Content>
                <Fab
                    position='bottomRight'
                    containerStyle={{}}
                    style={{backgroundColor: '#FF7A5A'}}
                    onPress={() => Actions.addFriend({hasuraId: this.state.hasuraId})}>
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
