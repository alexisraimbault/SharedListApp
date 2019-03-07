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
        firebase.database().ref('users/'+user.uid).once("value", snapshot => {
          if (!snapshot.exists()){
              firebase.database().ref('users/'+user.uid).set({
                lists:{
                }
              });
              firebase.database().ref('users/'+user.uid+'/lists').push({
                name:"maison",
                listes:{}
              });
              firebase.database().ref('users/'+user.uid+'/lists').push({
                name:"travail",
                listes:{}
              });
              firebase.database().ref('users/'+user.uid+'/lists').push({
                name:"loisirs",
                listes:{}
              });
              firebase.database().ref('userList').push({
                uid : user.uid,
                displayName : user.displayName,
                photoURL : user.photoURL,
              });
          }
        });
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
