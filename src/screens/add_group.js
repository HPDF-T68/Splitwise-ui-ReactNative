import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Alert} from 'react-native';
import {Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, Item, Form, Label, Input, Toast} from 'native-base';
import SelectMultiple from 'react-native-select-multiple';
import ImagePicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';
import { tryAddGroup, getFriendList, getUserID } from '../hasuraApi';

/**
 * Add Group screen.
 * @export
 * @class AddGroup
 * @extends {Component}
 */
export default class AddGroup extends Component {
    /**
     * Creates an instance of AddGroup.
     * @param {any} props
     * @memberof AddGroup
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: {
                uri: 'https://placeimg.com/150/150/people',
                width: 150,
                height: 150,
            },
            selectedFriends: [],
        };
        this.friends = [];
        this.selectedId = [];
    }

    componentDidMount(){
        this.handleFriendList();
    }

    handleFriendList = async() => {
        let resp = await getFriendList(this.props.hasuraId);
        if(resp.status !== 200)
        {
            this.setState({isLoading: false});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            if (resp.status === 504) 
            Alert.alert("Network Error", "Check your internet connection" )
        } 
        let responseJson = await resp.json();
        console.log(responseJson);
        let count = Object.keys(responseJson).length;
        var i = 0;
        console.log(count);
        var that = this;
        while(count > 0) {
            this.friends.push(responseJson[i].username);
            count--;
            i++;
            console.log(count);
        }
        this.setState({ friends: this.friend, ID: this.userid });
    }

    handleAddPressed = async() => {
        let ownerId = Number(this.props.hasuraId);
        this.selectedId.push(ownerId);
        let length = this.state.selectedFriends.length;
        let len = length + 1;
        var j = 0;
        console.log(this.state.selectedFriends);
        while(length > 0){
            let respID = await getUserID(this.state.selectedFriends[j].value);
            let responseID = await respID.json();
            console.log(responseID);
            console.log("User ID fetched " + responseID[0].uid);
            this.selectedId.push(responseID[0].uid)
            j++;
            length--;
        }
        console.log(this.selectedId);
        let resp = await tryAddGroup(this.props.hasuraId,this.state.name,this.selectedId);
        if(resp.status !== 200){
            this.setState({loading: false});
            if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" )
            } 
        }
        let responseRes = await resp.json();
        console.log(responseRes);
        if(responseRes.count === len){
            Alert.alert(this.state.name+' group added with '+responseRes.count+' members');
        }else {
            Alert.alert("Some error occured try again");
        }
        this.props.handleGroupList();
    }
    onSelectionsChange = (selectedFriends) => {
        this.setState({ selectedFriends });
    };

    pickSingle() {
        ImagePicker.openPicker({
            width: 150,
            height: 150,
            cropping: true,
            }).then((image) => {
            this.setState({
                image: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        },
            });
            }).catch((e) => alert(e));
    }
    /**
     * render function.
     * @return {jsx}
     * @memberof AddGroup
     */
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left style={styles.left}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={styles.body}>
                        <Title>ADD GROUP</Title>
                    </Body>
                    <Right style={styles.right}>
                        <Button style={styles.buttonSave} onPress={this.handleAddPressed}>
                            <Text style={styles.textSave}>Save</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.content}>
                    <View style={{alignItems: 'center', flex: 2}}>
                        <ImageBackground
                        source={this.state.image}
                        style={styles.image}
                        resizeMode='contain'
                        imageStyle={{borderRadius: 40}}
                        >
                            <View>
                                <Icon
                                name='add-circle'
                                onPress={() => this.pickSingle()}
                                style={styles.imageButton}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{flex: 1}}>
                        <Form style={styles.form}>
                            <Item floatingLabel style={styles.input}>
                                <Label>Group Name</Label>
                                <Input 
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({name})}  
                                />
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.selectTextBox}>
                        <Text style={styles.selectText}>Select Maximum 4 friends</Text>
                    </View>
                    <View style={styles.friendList}>
                        <SelectMultiple
                        items={this.friends}
                        selectedItems={this.state.selectedFriends}
                        onSelectionsChange={this.onSelectionsChange} />
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#50E3C2',
        justifyContent: 'space-around',
        height: 50
    },
    left: {
        flex: 1
    },
    body: {
        flex: 5,
    },
    right: {
        flex: 1
    },
    buttonSave: {
        backgroundColor: '#FF7A5A',
        height: 40,
        width: 90,
        justifyContent: 'center',
    },
    textSave: {
        fontSize: 18,
        paddingBottom: 5
    },
    content: {
        flex: 1,
        margin: 10,
        flexDirection: 'column'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 150,
        height: 150,
    },
    imageButton: {
        fontSize: 100,
        opacity: 0.5,
    },
    form: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 15,
        marginBottom: 10
    },
    input: {
        height: 50,
    },
    friendList: {
        flex: 5,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 20
    },
    selectTextBox: {
        flex: .5,
        marginLeft: 12
    },
    selectText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey'
    }
});
