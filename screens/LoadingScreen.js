import React, { Component } from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";

import firebase from 'firebase';
import { connect } from 'react-redux'
class LoadingScreen extends Component{



  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn=() =>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        const action = { type: "USER_INFO", value: user}
        this.props.dispatch(action)
        this.props.navigation.navigate('DashboardScreen');
      }
      else{
        this.props.navigation.navigate('LoginScreen');
      }
    })

  }

  render(){
      return(
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
      );
    }
  }
  const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
