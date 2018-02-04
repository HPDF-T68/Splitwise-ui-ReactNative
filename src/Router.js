import React from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux';
import Login from './screens/login';
import LoginDetail from './screens/login_detail';
import SigninDetail from './screens/signin_detail';
import HomeScreen from './screens/home_screen';

const RouterComponent = () => {
    return (
        <Router headerMode="none">
            <Stack key='auth'>
                <Scene key='start' component={Login} initial type='reset'/>
                <Scene key='login' component={LoginDetail}/>
                <Scene key='signin' component={SigninDetail}/>
                <Scene key='home' component={HomeScreen} type='reset'/>
            </Stack>
        </Router>
    );
};

export default RouterComponent;
