import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import {Container, Header, Content, Left, Body, Right, Button, 
    Icon, Title, Text, Item, Form, Label, Input,List, ListItem, Separator, Thumbnail } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';
import {getGroupUsers, addMoneyGroup} from '../hasuraApi';
/**
 * ShareBill class
 * @export
 * @class ShareBill
 * @extends {Component}
 */
export default class ShareBill extends Component {
    /**
     * Creates an instance of ShareBill.
     * @param {any} props 
     * @memberof ShareBill
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            member_no: '',
            creation_date: '',
            added_amount: '',
            amount: 0,
            notes: '',
            members: [],
            groupimage: {
                uri: 'https://placeimg.com/100/100/people',
                width: 150,
                height: 150,
            },
            billimage: {
                uri: 'https://placeimg.com/380/200/bill',
                width: 150,
                height: 150,
            }
        }
        this.members = [];
        this.uid = [];
        this.no = 0;
        this.singleAmount = 0;
    }

    componentWillMount(){
        this.handleUserList();
    }

    handleUserList = async() => {
        let responseJson = await getGroupUsers(this.props.Data.gid);
        console.log(responseJson);
        let count = Object.keys(responseJson).length;
        this.no = count;
        var i = 0;
        console.log(count);
        while(count > 0){
            this.members.push(responseJson[i]);
            this.uid.push(responseJson[i].uid);
            count--;
            i++;
        }
        console.log(this.members);
        console.log(this.uid);
        this.setState({members: this.members});
    }

    handleSaveButton = async() => {
        console.log("amount = "+ this.state.amount);
        console.log("no = "+ this.no);
        this.singleAmount = this.state.amount/this.no;
        console.log("samount = "+ this.singleAmount);
        let responseJson = await addMoneyGroup(this.props.Data.gid,this.uid,this.state.amount,this.singleAmount,
            this.state.notes,this.no);
    }
    pickSingle() {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
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
     * Render
     * @return {jsx}
     * @memberof ShareBill
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
                        <Title>SHARE BILL</Title>
                    </Body>
                    <Right style={styles.right}>
                        <Button style={styles.buttonSave} onPress={this.handleSaveButton}>
                            <Text style={styles.textSave}>Save</Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <View style={styles.titleBox}>
                        <Text style={styles.headText}>{this.props.Data.gname}</Text>
                        <Icon name='trash' style={styles.IconDelete}/>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={styles.subImageContainer}>
                            <ImageBackground
                            source={this.state.groupimage}
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
                        <View style={styles.subTextContainer}>
                            <Text style={styles.titleSubText}>{this.props.Data.member_no} members</Text>
                            <Text style={styles.titleSubText}>Created on {this.props.Data.gdate}</Text>
                            <Text style={styles.titleSubText}>${this.props.Data.total_expanse} Added</Text>
                        </View>
                    </View>
                    <View style={{paddingTop: 5}}>
                        <Separator bordered>
                            <Text style={{fontSize: 18}}>MEMBERS</Text>
                        </Separator>
                    </View>
                    <View style={styles.membersBox}>
                        {this.state.members.map((person, index) => (
                            <ListItem avatar key={index}>
                            <Left>
                            <Thumbnail key={index} source={{ uri: person.image_id }} />
                            </Left>
                            <Body>
                            <Text>{person.username}</Text>
                            {person.to_pay == 0? <Text note>Paid</Text>:<Text note>Unpaid</Text>}
                            </Body>
                            </ListItem>
                        ))}
                    </View>
                    <View style={styles.amountBox}>
                        <Item regular style={{width: 200}}>
                            <Input 
                                placeholder='Amount' 
                                onChangeText={(amount) => this.setState({ amount })}
                                keyboardType='numeric' 
                                style={styles.amountText} 
                            />
                        </Item>
                    </View>
                    <View>
                        <Item>
                            <Input 
                                placeholder='Note'
                                value={this.state.notes}
                                onChangeText={(notes) => this.setState({ notes })}
                            />
                        </Item>
                    </View>
                    <View style={styles.billImageContainer}>
                            <ImageBackground
                            source={this.state.billimage}
                            style={styles.billImage}
                            resizeMode='contain'
                            imageStyle={{borderRadius: 5}}
                            >
                                <View>
                                    <Text style={styles.billText}>Add Bill image</Text>
                                    <Icon
                                    name='add-circle'
                                    onPress={() => this.pickSingle()}
                                    style={styles.billImageButton}
                                    />
                                </View>
                            </ImageBackground>
                    </View>
                </Content>
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
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    IconDelete: {
        color: 'grey',
        fontSize: 50
    },
    textSave: {
        fontSize: 18,
        paddingBottom: 5
    },
    content: {
        margin: 8
    },
    headText: {
        fontSize: 35,
        color: 'grey',
    },
    image: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 100,
        height: 100,
    },
    imageButton: {
        fontSize: 60,
        opacity: 0.5,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    titleSubText: {
        fontSize: 20,
        color: 'grey',
        paddingLeft: 10
    },
    subTextContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    subImageContainer: {
        flex:1
    },
    membersBox: {
        marginBottom: 10
    },
    amountText: {
        fontSize: 30,
        textAlign: 'center'
    },
    amountBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    billImageContainer: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    billImage: {
        width: 380,
        height: 200,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'   
    },
    billImageButton: {
        alignSelf: 'center',
        fontSize: 60,
        opacity: 0.7,
    },
    billText: {
        color: 'black',
        fontSize: 30,
        opacity: 0.7,
    }
});
