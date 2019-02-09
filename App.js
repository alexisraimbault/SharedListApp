import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import{createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Container} from 'native-base'

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';

import Drawer from './navigation/DrawerNav';
import { Font, AppLoading } from "expo";
import { Provider } from 'react-redux'
import Store from './store/configureStore'

import firebase from "firebase";
import {db} from './config';
import DashboardScreen from './screens/DashboardScreen';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <AppLoading/>
      );
    }
    return (
      <Provider store={Store}>
        <Container style={styles.container}>
          <AppNavigator/>
        </Container>
      </Provider>
    )
  }
}


const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen : LoadingScreen,
  LoginScreen : LoginScreen,
  DashboardScreen : Drawer
})

const AppNavigator= createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    marginTop: 23,
  },
});
