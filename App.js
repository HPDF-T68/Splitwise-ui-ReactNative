import React from 'react';
import { View } from 'react-native';
import Login from './src/screens/login';
import LoginDetail from './src/screens/login_detail';
import SigninDetail from './src/screens/signin_detail';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <SigninDetail />
      </View>
    );
  }
}

