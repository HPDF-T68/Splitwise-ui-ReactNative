import React from 'react';
import {Text, View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Groups from './tabs/Groups';
import Friends from './tabs/Friends';
import Activity from './tabs/Activity';

const TabHeader = TabNavigator({
  GROUPS: {screen: Groups},
  FRIENDS: {screen: Friends},
  ACTIVITY: {screen: Activity}
}, {
   tabBarPosition: 'top',
   swipeEnabled: true,
   tabBarOptions: {
     activeTintColor: 'tomato',
     inactiveTintColor: '#00b248',
     labelStyle: {
      fontSize: 20,
     },
     indicatorStyle: {
       backgroundColor: 'tomato',
     },
     style: {
       backgroundColor: '#00E676',
       height: 50
     }
   }
});

TabHeader.navigationOptions = {
  
};

export default TabHeader;
