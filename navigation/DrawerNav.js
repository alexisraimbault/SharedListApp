import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

//library imports
import { Container, Content, Header, Body } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation'

//custom files
import DashboardScreen from "../screens/DashboardScreen";


const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);

const Drawer = createDrawerNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  Travail: {
    screen: DashboardScreen,
    params:{'page':'Travail'}
  },
  Maison: {
    screen: DashboardScreen,
    params:{'page':'Maison'}
  },
  Loisirs: {
    screen: DashboardScreen,
    params:{'page':'Loisirs'}
  }
},
  {
    initialRouteName: 'Maison',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });

export default Drawer;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }

})
