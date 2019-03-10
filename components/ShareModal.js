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

export default class ShareModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
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

  makeRemoteRequest = () => {
    var ref = db.ref("userList");
    this.setState({ loading: true });
    ref.once("value", function(snapshot) {
      if (snapshot.exists()){
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({
          data: items,
          error: null,
          loading: false,
        });
        this.arrayholder = items;
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

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.displayName.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (

      <SearchBar
        placeholder="Chercher..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
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
      onClosed={() =>{
        this.setState({newListName:''});
      }}
      >
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress = {() =>{this.props.share(item.uid)}}>
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
