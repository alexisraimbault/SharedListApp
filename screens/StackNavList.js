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
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

//custom files
import DashboardScreen from "../screens/DashboardScreen";
import ListScreen from "../screens/ListScreen";

const Stack = createStackNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  DashBoard: {
    screen: DashboardScreen,
  },
  Listes: {
    screen: ListScreen,
  }
},
  {
    initialRouteName: 'DashBoard',
  });

export default Stack
