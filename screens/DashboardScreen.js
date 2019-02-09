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
import  firebase from "firebase";
import ItemComponent from '../components/ItemComponent';
import {db} from '../config';




//custom components imports
import CustomHeader from '../components/CustomHeader'



class DashboardScreen extends Component{
  state = {
        items: []
    }

    componentDidMount() {
        let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists');
        listsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
         });
    }
  render() {
    let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists');
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
        <View style={styles.container}>
                        {
                            this.state.items.length > 0
                            ? <ItemComponent items={this.state.items} />
                            : <Text>No Lists</Text>
                        }
                    </View>
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
      flex:1,
      justifyContent:'center'
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
