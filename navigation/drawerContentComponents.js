
import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image } from 'react-native'
import { white } from 'ansi-colors';
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
  return state
}
export default class connect(mapStateToProps)(drawerContentComponents) extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                  <Image source={{uri:this.props.userInfo.photoURL}}/>
            </View>
            <View style={styles.screenContainer}>
                <View style={styles.screenStyle}>
                    <Text onPress={this.navigateToScreen('DashboardScreen')}>Maison</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text onPress={this.navigateToScreen('DashboardScreen')}>Travail</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text onPress={this.navigateToScreen('DashboardScreen')}>Loisirs</Text>
                </View>
            </View>
        </View>

    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 20
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },

});
