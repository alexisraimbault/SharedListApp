import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, TouchableOpacity
} from "react-native";

//library imports
import { Button, Container, Header, Content, Left, Body,Title,Right } from 'native-base'
import { connect } from 'react-redux'
import  firebase from "firebase";
import ItemComponent from '../components/ItemComponent';
import AddModal from '../components/AddModal';
import {db} from '../config';




//custom components imports
import CustomHeader from '../components/CustomHeader'



class DashboardScreen extends Component{
  constructor(props){
    super(props);
    this.openAddModal = this.openAddModal.bind(this);
    this.update = this.update.bind(this);
    this.scrollEnd = this.scrollEnd.bind(this);
    this.nav=this.nav.bind(this);
  }
  state = {
        items: [],
        keys: []
    }
    update() {
    // Force a render with a simulated state change
    this.setState({ state: this.state });
    }
    scrollEnd(){
      this.refs.scroll.scrollToEnd({animated: true});
    }
    openAddModal(){
      this.refs.addModal.openModal();
    }
    nav(name, ind){
      console.log(ind);
      this.props.navigation.navigate('Listes',{liste:name, index: ind});
    }
    componentDidMount() {
        let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists/');
        listsRef.on('value', (snapshot) => {
          if(snapshot.exists()){
              let data = snapshot.val();
              let keys = Object.keys(data);
              let items = Object.values(data);
              this.setState({items});
              this.setState({keys});
            }
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
        <TouchableOpacity style={styles.addListFolder} onPress={this.openAddModal}>
          <Image style={styles.addListFolderImage} source={require('../images/add_button.png')} />
        </TouchableOpacity>
        <View style={styles.container}>
        <ScrollView ref={'scroll'}>
                        {
                            this.state.items.length > 0
                            ? <ItemComponent items={this.state.items} keys={this.state.keys} nav={this.nav}/>
                            : <Text>No Lists</Text>
                        }
        </ScrollView>
        </View>

        <AddModal ref={'addModal'} uid={this.props.userInfo.uid} update={this.update} scroll={this.scrollEnd}>

        </AddModal>
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
      justifyContent:'center',
    },
    header: {

    },
    image: {
      width: 35,
      height: 35,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    },
    addListFolderImage: {
      width: 70,
      height: 70,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150,
      backgroundColor:'red'
    },
    addListFolder: {
      position: 'absolute',
      top: '85%',
      left: '70%',
      zIndex:3
    }
});
