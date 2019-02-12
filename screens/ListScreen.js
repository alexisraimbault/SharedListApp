//TODO : faire un stackNavigator avec DashboardScreen et List et le mettre dans le drawerNavigator à la place de DashboardScreen
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, TouchableOpacity
} from "react-native";

//library imports
import { Button, Container, Header, Content, Left, Body,Title,Right } from 'native-base'
import { connect } from 'react-redux'
import  firebase from "firebase";
import {db} from '../config';




//custom components imports



class ListScreen extends Component{

  render() {
    return (

      <View style={styles.container}>
      <Text>
        {this.props.navigation.getParam('liste')}
      </Text>
      </View>

    )
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(ListScreen)

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:'center'
    },
    header: {

    },
    image: {
      width: 35,
      height: 35,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    },
    addListFolderImage: {
      width: 70,
      height: 70,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150,
      backgroundColor:'red'
    },
    addListFolder: {
      position: 'absolute',
      top: '85%',
      left: '70%',
      zIndex:3
    }
});
