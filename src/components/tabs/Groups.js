import React, {Component} from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, ListView, Alert, Platform} from 'react-native';
import {Fab, Icon, Content} from 'native-base';
import {Actions} from 'react-native-router-flux';
import GroupCard from '../GroupCard';
import { getGroupList } from '../../hasuraApi';

class Groups extends Component {
    static navigationOptions = {
        tabBarLabel: 'GROUPS'
    }
    constructor(props) {
        super(props);
        this.state = {
            hasuraId: this.props.screenProps.hasuraId,
            active: false,
            isLoading: true,
        }
    }

    componentDidMount() {
        this.handleGroupList();
    }
   
    handleGroupList = async() => {
        let resp = await getGroupList(this.state.hasuraId);
        console.log(resp);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(resp),
        }, function(){
            //something to do.
        });
    }

    onFabPress= () =>{
        Actions.addGroup();
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
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <View style={{flex:1, flexDirection: 'row', marginLeft: 5,marginRight: 5}}>
                                <GroupCard rowData={rowData} hasuraId={this.state.hasuraId} handleGroup={this.handleGroupList}/>
                            </View>
                        }
                    />     
                </Content>
                <Fab
                    active={this.state.active}
                    position='bottomRight'
                    containerStyle={{}}
                    style={{backgroundColor: '#FF7A5A'}}
                    >
                    <Icon name='add-circle' style={{fontSize: 50}} onPress={() => Actions.addGroup({hasuraId:this.state.hasuraId,
                        handleGroupList:this.handleGroupList})}/>
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
