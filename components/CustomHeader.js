import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import { Header, Body, Title, Content, Left, Right } from 'native-base'
import { connect } from 'react-redux'

class CustomHeader extends Component {
    render() {
      console.log(this.props)
        return (
          <Header style={styles.drawerHeader}>
            <Body>
              <Image style={styles.drawerImage} source={{ uri: this.props.userInfo.photoURL+'?height=500'}} />
            </Body>
          </Header>
        );
    }
}
const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(CustomHeader);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }

})
