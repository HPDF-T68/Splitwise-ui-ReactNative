import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, Item, Form, Label, Input} from 'native-base';
import SelectMultiple from 'react-native-select-multiple';
import ImagePicker from 'react-native-image-crop-picker';

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
        this.friends = ['niyasns','manish','arun','mahesh','ajmal','arjun','rohit'];
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
                        <Button transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={styles.body}>
                        <Title>Add Group</Title>
                    </Body>
                    <Right style={styles.right}>
                        <Button style={styles.buttonSave}>
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
        fontWeight: 'bold'
    }
});
