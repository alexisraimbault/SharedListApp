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
      marginBottom: '5%',
      marginLeft : '3%',
      paddingLeft : '2%',
      justifyContent : 'center',
      flexBasis: '94%',
      height: 50,
      backgroundColor: 'powderblue'
    },
    addListFolderImage: {
      width: 35,
      height: 35,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150,
      backgroundColor:'red'
    },
    addListFolder: {
      position: 'absolute',
      top: '20%',
      left: '90%',
      zIndex:3
    },
    itemtext: {
      position: 'absolute',
      fontSize: 20,
      top: '20%',
      left : '15%',
      textAlign: 'left',
    },
    itemtextchecked: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      position: 'absolute',
      fontSize: 20,
      top: '20%',
      left : '15%',
      textAlign: 'left',
    }
});

export default class ListCheck extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  render() {
    return (

        <View style={styles.itemsList}>
          {this.props.items.map((item, index) => {
              return this.props.check[index]
              ?(
                  <View style={styles.item} key={index}>
                      <CheckBox
                      checked={this.props.check[index]}
                      onPress={() => this.props.doCheck(index)}
                      />
                      <Text style = {styles.itemtextchecked} >{item}</Text>


                      <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.push(index)}}>
                        <Image style={styles.addListFolderImage} source={require('../images/add_button.png')} />
                      </TouchableOpacity>
                  </View>
              )
    :
    (
        <View style={styles.item} key={index}>
            <CheckBox
            checked={this.props.check[index]}
            onPress={() => this.props.doCheck(index)}
            />

            <TextInput style = {styles.itemtext} value = {item}
                            onChangeText={(text) =>{this.props.type(index, text)}}/>

            <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.push(index)}}>
              <Image style={styles.addListFolderImage} source={require('../images/add_button.png')} />
            </TouchableOpacity>
        </View>
    )
})}
</View>
)
  }
}
