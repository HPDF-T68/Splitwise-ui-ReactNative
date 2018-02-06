import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Icon } from 'native-base';
/**
 * NavBar for HomeScreen.
 * @class NavBar
 * @extends {React.Component}
 */
class NavBar extends React.Component {
 
  handleLogoutPressed = () => {
    this.setState({
      loading:true
    })
    this.props.logoutCallback();
  }
  /**
   * render for NavBar
   * @return {jsx}
   * @memberof NavBar
   */
  render() {
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
            <Button transparent onPress={this.handleLogoutPressed}>
                <Icon name='log-out' />
            </Button>
        </Right>
      </Header>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#50E3C2',
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
