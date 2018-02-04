import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Icon } from 'native-base';

const NavBar = () => {
  return (
    <Header hasTabs style={styles.header}>
      <Left style={styles.left}>
          <Button transparent>
              <Icon name='menu' />
          </Button>
      </Left>
      <Body style={styles.body}>
          <Title style={styles.title}>SPLITWISE</Title>
      </Body>
      <Right style={styles.right}>
          <Button transparent>
              <Icon name='log-out' />
          </Button>
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00E676',
    justifyContent: 'space-around',
    height: 50
  },
  title: {
    color: 'white',
    fontSize: 25
  },
  left: {
    flex: 1,
  },
  body: {
    flex: 5,
  },
  right: {
      flex: 1,
  }
});

export default NavBar;
