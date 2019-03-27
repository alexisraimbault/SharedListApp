import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  Image, TouchableOpacity,FlatList, ActivityIndicator
} from "react-native";
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

//library imports
import { Container, Header, Content, Left, Body,Title,Right } from 'native-base'
import { connect } from 'react-redux'
import  firebase from "firebase";
import {db} from '../config';

import { ListItem, SearchBar } from 'react-native-elements';

var screen = Dimensions.get('window');

export default class UserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      users:[],
      error: null,
    };

    this.arrayholder = [];
  }

  openModal(){
    this.refs.myModal.open();
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  getUsers(items){
    var tmp1 = [];
    for(let i=0; i < items.length ; i++){
      tmp1.push(items[i].user);
      }
      this.setState({users : tmp1},()=>{
        var ref = db.ref("userList/");
        ref.once("value", function(snapshot) {
          if (snapshot.exists()){
            let data = snapshot.val();
            let users = Object.values(data);
            tmp=[]
            for(let i=0; i < users.length ; i++){
              if(this.state.users.includes(users[i].uid)){
                tmp.push(users[i]);
              }
            }
            this.setState({
              data: tmp,
              error: null,
              loading: false,
            });
            this.arrayholder = items;
          }
        }.bind(this));
      });
  }

  makeRemoteRequest = () => {

    this.setState({ loading: true });
    var ref2 = db.ref("lists/"+this.props.list+'/users');
    ref2.once("value", function(snapshot) {
      if (snapshot.exists()){
        let data = snapshot.val();
        let keys = Object.keys(data);
        let items = Object.values(data);
        this.setState({users : []},()=> this.getUsers(items));
    }
    }.bind(this));

  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
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
      >
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity>
            <ListItem
              leftAvatar={{ source: { uri: item.photoURL } }}
              title={item.displayName}

            />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.displayName}//change
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return state
}
