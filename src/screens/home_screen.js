import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Drawer} from 'native-base';
import TabHeader from '../components/TabHeader';
import NavBar from '../components/NavBar';
import SideBar from '../components/sideBar';
import { getUserDetails } from '../hasuraApi';
/**
 * Screen shows on login.
 * @class HomeScreen
 * @extends {Component}
 */
class HomeScreen extends Component {
    /**
     * Creates an instance of HomeScreen.
     * @param {any} props
     * @memberof HomeScreen
     */
    constructor(props) {
        super(props);
        this.state = {
            hasuraId: this.props.hasuraId,
            authId: this.props.authId,
            userName: '',
            email: '',
            mobile: '',
            accountMoney: ''
        };
    }
    componentWillMount() {
        this.handleUserDetails();
    }

    handleUserDetails = async () => {
        let resp = await getUserDetails(this.state.authId);
        if(resp.status !== 200){
            this.setState({loading: false});
            if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" )
            } 
        }
        let responseJson = await resp.json();
        let username = '';
        let email = '';
        let mobile = '';
        let currency = '';
    }
    /*function for close drawer*/
    closeDrawer = () => {
        this.drawer._root.close();
    };
    /*function for open drawer*/
    openDrawer = () => {
        this.drawer._root.open();
    };
    /**
     * Render function for Home screen.
     * @return {jsx}
     * @memberof HomeScreen
     */
    render() {
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar navigator={this.navigator} />}
            onClose={() => this.closeDrawer()}
            onOpen={() => this.openDrawer()}
            panOpenMask={0.25} 
            side="left"
            >
                <View style={styles.container}>
                    <NavBar logoutCallback={this.props.logoutCallback} openDrawer={this.openDrawer}/>
                    <TabHeader screenProps={this.props}/>
                </View>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});
export default HomeScreen;
