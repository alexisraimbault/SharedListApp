import React, { Component } from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import firebase from 'firebase';
import * as Expo from 'expo';

class LoginScreen extends Component{

  async loginWithFacebook(){

    const{type,token}=await Expo.Facebook.logInWithReadPermissionsAsync('539148109924840',{permissions: ['public_profile','email']})
    if (type=='success'){

      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(credential).then(data =>{console.log('USER_ID',data.user.uid);}).catch((error)=>{
        console.log(error)
      })
    }
  }

  isUserEqual=(googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn= googleUser=> {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(){
          console.log('user signed in');
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }
  signInWithGoogleAsync = async () => {
  try {
    console.log("test");
    const result = await Expo.Google.logInAsync({
      behavior:'web',
      androidClientId:'105279780392-qpsvpp1quqvgo1pn5fbte6p2h17t32g8.apps.googleusercontent.com',
      //iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email']
    });
    console.log(result);
    if (result.type == 'success') {
      this.onSignIn(result);
      return result.accessToken;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }

}
  render(){
    return(
      <View style={styles.container}>
        <Button title="Sign In With Google" onPress={()=>this.signInWithGoogleAsync()}/>
        <Button title="Sign In With Facebook" onPress={()=>this.loginWithFacebook()}/>
      </View>
      );
    }
  }
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
