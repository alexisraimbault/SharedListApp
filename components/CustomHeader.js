import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import { Header, Body, Title, Content, Left, Right } from 'native-base'

class CustomHeader extends Component {
    render() {
      console.log(this.props)
        return (
            <Header style={styles.header}>
                <Left>
                  <TouchableOpacity onPress={() => this.props.drawerOpen()}>
                    <Image style={styles.image} source={{ uri: this.props.uri}} />
                  </TouchableOpacity>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
export default CustomHeader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {

  },
  image: {
    width: 35,
    height: 35,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})
