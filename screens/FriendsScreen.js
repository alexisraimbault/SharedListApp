import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, TouchableOpacity,FlatList, ActivityIndicator
} from "react-native";

//library imports
import { Button, Container, Header, Content, Left, Body,Title,Right } from 'native-base'
import { connect } from 'react-redux'
import  firebase from "firebase";
import {db} from '../config';

import { ListItem, SearchBar } from 'react-native-elements';

class FriendsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
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
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.photoURL } }}
              title={item.displayName}
            />
          )}
          keyExtractor={item => item.displayName}//change
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(FriendsScreen)
