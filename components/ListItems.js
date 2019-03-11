import React, { Component } from 'react';
import {  View, Text, StyleSheet, TextInput, ScrollView,Image, TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements'
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const styles = StyleSheet.create({
    itemsList: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    item: {
      marginLeft : '5%',
      marginRight : '5%',
      flexDirection: 'row',
      justifyContent : 'space-between',
      alignItems: 'center',
      flex : 1,
      flexBasis: '90%',
      backgroundColor: 'powderblue'
    },
    addListFolderImage: {
      width: '100%',
      height: '100%',
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150,
      backgroundColor:'red'
    },
    addListFolder: {
      zIndex:3
    },
    itemtext: {
      fontSize: 15,
      textAlign: 'left',
    },
    itemtextchecked: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      fontSize: 15,

      textAlign: 'left',
    },
    checkBox: {

      width: "10%",
      //backgroundColor: 'green'
    },
    wText:{
      marginLeft:"5%",
      width: "65%",
      //backgroundColor: 'white'
    },
    wAdd:{
      height: 30,
      width: 30,
      //backgroundColor: 'yellow'
    },
    wRemove:{
      height: 30,
      width: 30,
      //backgroundColor: 'yellow'
    },
    keyboardSafety:{
      height: 80,
    },
});

export default class ListItems extends Component {
  constructor(props){
    super(props);
    this.state ={
      focus : -1,
    }
  }
  static propTypes = {
      items: PropTypes.array.isRequired
  };

componentDidMount(){
  /*if((this.props.focus != -1) &&(!this.props.check[this.props.focus]) ){

    this.refs[this.props.focus].focus();
    this.props.focusDone();
  }*/
}

  render() {
    return (

        <View style={styles.itemsList}>
          {this.props.items.map((item, index) => {
              return <ListItem item = {item} index = {index} items = {this.props.items} check = {this.props.check} focus = {this.props.focus} focusDone = {this.props.focusDone} handleKeyDown = {this.props.handleKeyDown} type = {this.props.type} submit = {this.props.submit} push = {this.props.push} remove = {this.props.remove} doCheck = {this.props.doCheck}/>
})}
</View>
)
  }
}
