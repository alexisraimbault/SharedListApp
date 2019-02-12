import React, { Component } from "react";
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

import firebase from 'firebase';
import { connect } from 'react-redux'
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity
} from "react-native";

var screen = Dimensions.get('window');

export default class AddModal extends Component{
  constructor(props){
    super(props);
    this.state ={
      newListName:''
    }
  }
  openModal(){
    this.refs.myModal.open();
  }
  render(){
    return(
      <Modal ref={'myModal'}
      style={{
        justifyContent: 'center',
        borderRadius: Platform.OS ==='ios'? 30:0,
        shadowRadius:10,
        width: screen.width-80,
        height: 280
      }}
      position='center'
      backdrop={true}
      onClosed={() =>{
        this.setState({newListName:''});
      }}
      >
        <Text> New List </Text>
        <TextInput
        onChangeText={(text) => this.setState({newListName: text})}
        placeholder="new list name"
        value={this.state.newListName}
        />
        <Button style={{fontSize: 18, color: 'white'}}
        containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height:40,
            borderRadius:6,
            backgroundColor:'mediumseagreen'
        }}
        onPress={
          () =>{
            if(this.state.newListName.length ==0){
              alert("enter a proper list name");
              return;
            }
            firebase.database().ref('users/'+this.props.uid+'/lists').push({
              name:this.state.newListName
            });
            this.props.update();
            this.props.scroll();
            this.refs.myModal.close();
          }
        }
        >
        Save
        </Button>
      </Modal>
    );
  }
}
