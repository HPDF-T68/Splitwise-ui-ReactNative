import React from 'react';
import {View} from 'react-native';
import {Root} from 'native-base';
import Login from './src/screens/login';
import LoginDetail from './src/screens/login_detail';
import SigninDetail from './src/screens/signin_detail';
import HomeScreen from './src/screens/home_screen';
import Router from './src/Router';
import ShareBill from './src/screens/share_bill';
/**
 * Starting point of app.
 * @export
 * @class App
 * @extends {React.Component}
 */
const App = () => {
    return (
      <Root>
        <Router />
      </Root>
    );
};

export default App;
