import React, { Component } from 'react';
import {  View, Text, StyleSheet, TextInput, ScrollView,Image, TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements'
import PropTypes from 'prop-types';

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

export default class ListCheck extends Component {
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
  if((this.props.focus != -1) &&(!this.props.check[this.props.focus]) ){

    this.refs[this.props.focus].focus();
    this.props.focusDone();
  }
}

  render() {
    return (

        <View style={styles.itemsList}>
          {this.props.items.map((item, index) => {
              return this.props.check[index]
              ?(
                  <View style={styles.item} key={index}>
                      <View style={styles.checkBox}>
                      <CheckBox

                      checked={this.props.check[index]}
                      onPress={() => this.props.doCheck(index)}
                      />
                      </View>
                      <View style={styles.wText}>
                      <Text ref={index} style = {styles.itemtextchecked} multiline={true}>{item}</Text>
                      </View>
                      <View style={styles.wAdd}>
                      <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.push(index);}}>
                        <Image style={styles.addListFolderImage} source={require('../images/add_button.png')} />
                      </TouchableOpacity>
                      </View>
                      <View style={styles.wRemove}>
                      <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.remove(index);}}>
                        <Image style={styles.addListFolderImage} source={require('../images/remove_button.png')} />
                      </TouchableOpacity>
                      </View>
                  </View>
              )
    :
    (
        <View style={styles.item} key={index}>
          <View style={styles.checkBox}>
            <CheckBox
            checked={this.props.check[index]}
            onPress={() => this.props.doCheck(index)}
            />
            </View>
            <View style={styles.wText}>
            <TextInput ref={index} style = {styles.itemtext} value = {item}
                            onChangeText={(text) =>{this.props.type(index, text)}}
                            onEndEditing={() =>{this.props.submit(index)}}
                            multiline={true}
                            keyboardType="default"
                            returnKeyType="done"
                            onKeyPress={(e)=>{this.props.handleKeyDown(e,index)}}
                            />
            </View>
            <View style={styles.wAdd}>
            <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.push(index);}}>
              <Image style={styles.addListFolderImage} source={require('../images/add_button.png')} />
            </TouchableOpacity>
            </View>
            <View style={styles.wRemove}>
            <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.remove(index);}}>
              <Image style={styles.addListFolderImage} source={require('../images/remove_button.png')} />
            </TouchableOpacity>
            </View>
        </View>
    )
})}
</View>
)
  }
}
