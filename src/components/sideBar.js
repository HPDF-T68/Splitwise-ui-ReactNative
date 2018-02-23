import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Container, Thumbnail, Content, Item, Input, Button, Icon} from 'native-base';
/**
 * Drawer template
 * @export
 * @class SideBar
 * @extends {Component}
 */
export default class SideBar extends Component {
    /**
     * Render for SideBar.
     * @return {jsx}
     * @memberof SideBar
     */
    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Thumbnail large source={{uri: 'https://placeimg.com/150/150/people'}} style={styles.thumbnail} />
                    <Text style={styles.username}>Niyas N S</Text>
                    <Text style={styles.email}>niyasns007@outlook.com</Text>
                    <Text style={styles.addedMoney}><Text style={styles.addedMoney}>$ </Text>5000</Text>
                    <Item rounded style={styles.inputBox}>
                        <Input placeholder='Add money' keyboardType = 'numeric' style={{textAlign: 'center', fontSize: 22}}/>
                        <Button rounded style={styles.addButton}>
                            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Add</Text>
                        </Button>
                    </Item>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#50E3C2',
        alignItems: 'center'
    },
    content: {
        margin: 5,
        padding: 5,
        paddingTop: 10,
    },
    thumbnail: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        justifyContent: 'center',
        borderRadius: 80
    },
    username: {
        alignSelf: 'center',
        paddingTop: 5,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    email: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    addedMoney: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: 'bold',
    },
    inputBox: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        width: 280,
    },
    addButton: {
        alignSelf: 'center',
        marginRight: 3,
        backgroundColor: 'tomato',
        width: 80,
        borderRadius: 60,
        paddingBottom: 11,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
