import React, {Component} from 'react';
import {StyleSheet, View, Alert, ImageBackground} from 'react-native';
import {Text, Form, Item, Label, Input, Button, Picker, Icon} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { trySignup } from "../hasuraApi";
/**
 * Class for Signin.
 * @class SigninDetail
 * @extends {Component}
 */
class SigninDetail extends Component {
    /**
     * Constrcutor for states.
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            fullname: '',
            email: '',
            password: '',
            mobile: '',
            selectedCurrency: 'INR',
            image: {
                uri: 'https://placeimg.com/150/150/people',
                width: 150,
                height: 150,
            },
        };
    }
    /**
     * functions to perform before component mounts.
     * @memberof SigninDetail
     */
    componentWillMount() {

    }
    /**
     * Event handling for currency selector
     * @param {string} value Selected currency value.
     * @memberof SigninDetail
     */
    onValueChange(value: string) {
        this.setState({
            selectedCurrency: value,
        });
    }
    /**
     * To clean images in tmp folder.
     * @memberof SigninDetail
     */
    cleanupImages() {
        ImagePicker.clean().then(() => {
          console.log('removed tmp images from tmp directory');
        }).catch((e) => {
          alert(e);
        });
    }
    /**
     * Pick a single image from gallery for profile.
     * @memberof SigninDetail
     */
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
    handleSignupPressed = async () => {
        let resp = await trySignup(this.state.email, this.state.password);
        if(resp.status !== 200){
        if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" )
        } else {
            Alert.alert("Error", "Password too short / User already exists")      
        }
        } else {
        this.setState({isLoggedIn:true})  
        }
    }
    /**
     * Rendering Sign in Screen.
     * @return {jsx}
     * @memberof SigninDetail
     */
    render() {
        return (
            <View>
                <Text
                style={styles.title}
                >
                SPLITWISE
                </Text>
                <View style={{alignItems: 'center'}}>
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
                <View style={styles.form}>
                    <Form>
                        <Item floatingLabel style={styles.input}>
                            <Label>Full name</Label>
                            <Input 
                                value={this.state.fullname}
                                onChangeText={(fullname) => this.setState({fullname})}
                            />
                        </Item>
                        <Item floatingLabel style={styles.input}>
                            <Label>Email</Label>
                            <Input 
                                value={this.state.email}
                                onChangeText={(email) => this.setState({email})}
                            />
                        </Item>
                        <Item floatingLabel style={styles.input}>
                            <Label>Password</Label>
                            <Input 
                                value={this.state.password}
                                onChangeText={(password) => this.setState({password})}
                            />
                        </Item>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flex: 1}}>
                                <Item floatingLabel style={{height: 50}}>
                                    <Label>Code</Label>
                                    <Input />
                                </Item>
                            </View>
                            <View style={{flex: 4}}>
                                <Item floatingLabel style={{height: 50}}>
                                        <Label>Mobile Number</Label>
                                        <Input 
                                            value={this.state.mobile}
                                            onChangeText={(mobile) => this.setState({mobile})}
                                        />
                                </Item>
                            </View>
                        </View>
                        <View
                        style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 10}}
                        >
                            <View style={{flex: 2, alignItems: 'flex-end', paddingTop: 10}}>
                                <Text style={{fontSize: 18}}>I use</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Picker
                                iosHeader="Select one"
                                mode="dropdown"
                                style={{width: 100}}
                                selectedValue={this.state.selectedCurrency}
                                onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="INR" value="INR" />
                                    <Picker.Item label="USD" value="USD" />
                                    <Picker.Item label="DHS" value="DHS" />
                                    <Picker.Item label="BHR" value="BHR" />
                                    <Picker.Item label="SAR" value="SAR" />
                                </Picker>
                            </View>
                            <View style={{flex: 3, alignItems: 'flex-end', paddingTop: 10}}>
                                <Text style={{fontSize: 18}}> as my currency. </Text>
                            </View>
                        </View>
                    </Form>
                </View>
                <View style={styles.buttonBox}>
                    <Button light style={styles.button}>
                        <Text style={styles.buttonBack}>Back</Text>
                    </Button>
                    <Button success style={styles.button} onPress={this.handleSignupPressed}>
                        <Text style={styles.buttonDone}>Signin</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        fontFamily: 'monospace',
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
    },
    input: {
        height: 50,
    },
    buttonBox: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    button: {
        width: 100,
        justifyContent: 'center',
    },
    buttonBack: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonDone: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default SigninDetail;
