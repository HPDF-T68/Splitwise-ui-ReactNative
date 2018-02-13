import React from 'react';
import {View} from 'react-native';
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
class App extends React.Component {
  /**
   * Render function.
   * @return {jsx}
   * @memberof App
   */
  render() {
    return (
      <ShareBill />
    );
  }
}

export default App;
