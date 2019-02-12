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
import { connect } from 'react-redux'

//custom files
import Stack from "./StackNavList"
import DashboardScreen from "../screens/DashboardScreen";
import CustomHeader from "../components/CustomHeader"


const CustomDrawerContentComponent = (props) => (

  <Container>
    <CustomHeader />
    <Content>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </Content>

  </Container>

);

const Drawer = createDrawerNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  Listes: {
    screen: Stack,
  },
  Amis: {
    screen: DashboardScreen,
    params:{'page':'Amis'}
  },
  Parametres: {
    screen: DashboardScreen,
    params:{'page':'Parametres'}
  }
},
  {
    initialRouteName: 'Listes',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });

  const mapStateToProps = (state) => {
    return state
  }
export default connect(mapStateToProps)(Drawer);


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
