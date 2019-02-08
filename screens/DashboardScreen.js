import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

//library imports
import { Button, Container, Header, Content, Left } from 'native-base'
import { connect } from 'react-redux'

//custom components imports
import CustomHeader from '../components/CustomHeader'

class DashboardScreen extends Component{
  render() {
    return (

      <Container style={styles.container}>

        <CustomHeader title={this.props.navigation.getParam('page')} uri={this.props.userInfo.photoURL} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

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
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
