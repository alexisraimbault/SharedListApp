import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    itemsList: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    item: {
      margin: '5%',
      flexBasis: '40%',
      height: 200,
      backgroundColor: 'powderblue'
    },
    itemtext: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    }
});

export default class ListComponent extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  render() {
    return (

        <View style={styles.itemsList}>
          {this.props.items.map((item, index) => {
              return (
                <TouchableOpacity style={styles.item} key={index} onPress={() =>{this.props.nav(this.props.lists[index],item.key)}}>
                  <View >
                      <Text style={styles.itemtext}>{this.props.lists[index]}</Text>
                  </View>
                </TouchableOpacity>
              )
          })}
        </View>
    );
  }
}
