import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image, TouchableOpacity
} from "react-native";

//library imports
import { Button, Container, Header, Content, Left, Body,Title,Right } from 'native-base'
import { connect } from 'react-redux'

//custom components imports
import CustomHeader from '../components/CustomHeader'

class DashboardScreen extends Component{
  render() {
    return (

      <Container style={styles.container}>
        <Header style={styles.header}>
            <Left>
              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Image style={styles.image} source={{ uri: this.props.userInfo.photoURL+'?height=500'}} />
              </TouchableOpacity>
            </Left>
            <Body>
                <Title>{this.props.navigation.getParam('page')}</Title>
            </Body>
            <Right />
        </Header>

      </Container>

    )
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(DashboardScreen)

const styles = StyleSheet.create({
  container: {
    marginTop: 23,
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
});
