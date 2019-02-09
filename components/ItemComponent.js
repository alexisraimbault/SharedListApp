import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView} from 'react-native';
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

export default class ItemComponent extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.itemsList}>
          {this.props.items.map((item, index) => {
              return (
                  <View style={styles.item} key={index}>
                      <Text style={styles.itemtext}>{item.name}</Text>
                  </View>
              )
          })}
          <View style={styles.item} >
              <Text style={styles.itemtext}>Test</Text>
          </View>
          <View style={styles.item} >
              <Text style={styles.itemtext}>Test</Text>
          </View>
          <View style={styles.item} >
              <Text style={styles.itemtext}>Test</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
