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



class FriendsScreen extends Component{

  render() {
    return (

      <View>
      <Text>
        FRIENDS
      </Text>
      </View>

    )
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(FriendsScreen)
