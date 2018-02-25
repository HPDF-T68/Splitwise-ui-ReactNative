import React from 'react';
import {Text, View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Groups from './tabs/Groups';
import Friends from './tabs/Friends';
import Activity from './tabs/Activity';

const TabHeader = TabNavigator(
  {
    GROUPS: {
    screen: (props) => <Groups hasuraId={props.hasuraId} />
    },
    FRIENDS: {
      screen: Friends
    },
    ACTIVITY: {
      screen: (props) => <Activity hasuraId={props.hasuraId} />
    }
  },
  {
   tabBarPosition: 'top',
   swipeEnabled: true,
   tabBarOptions: {
     activeTintColor: '#FF7A5A',
     inactiveTintColor: 'white',
     labelStyle: {
      fontSize: 20,
     },
     indicatorStyle: {
       backgroundColor: '#FF7A5A',
     },
     style: {
       backgroundColor: '#50E3C2',
       height: 50
     }
   }
});

export default TabHeader;
