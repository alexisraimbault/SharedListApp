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
import ListComponent from '../components/ListComponent';
import AddModal1 from '../components/AddModal1';
import {db} from '../config';




//custom components imports



class ListScreen extends Component{

  constructor(props){
    super(props);
    this.openAddModal = this.openAddModal.bind(this);
    this.update = this.update.bind(this);
    this.scrollEnd = this.scrollEnd.bind(this);
    this.nav=this.nav.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.getLists=this.getLists.bind(this);
    this.addList=this.addList.bind(this);
  }
  state = {
        items: [],
        keys: [],
        lists: []
    }
    update() {
      let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists/'+this.props.navigation.getParam('index')+'/'+this.props.navigation.getParam('liste'));
      listsRef.once('value', (snapshot) => {
          if (snapshot.exists()){
            let data = snapshot.val();
            let keys = Object.keys(data);
            let items = Object.values(data);
            this.setState({items});
            this.setState({keys});
          }
       });
    }
    scrollEnd(){
      this.refs.scroll.scrollToEnd({animated: true});
    }
    openAddModal(){
      this.refs.addModal.openModal();
    }
    nav(name, ind){
      this.props.navigation.navigate('Write',{liste:name, index: ind, index1: this.props.navigation.getParam('index'), liste1: this.props.navigation.getParam('liste')});
    }
    addList(listItem,i){//todo add items
      var tmp=this.state.lists;
      tmp.push(listItem[1]);
      this.setState({list : tmp});
    }
    getLists(items){
      for(let i=0; i < items.length ; i++){
        var ref = db.ref("lists/"+items[i].key);
        ref.on("value", function(snapshot) {
          if (snapshot.exists()){
            let data = snapshot.val();
            this.addList(Object.values(data),i);
          }
        }.bind(this));
     }
    }
    componentDidMount() {
        let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists/'+this.props.navigation.getParam('index')+'/'+this.props.navigation.getParam('liste'));
        listsRef.once('value').then(function(snapshot) {
            if (snapshot.exists()){
              let data = snapshot.val();
              let keys = Object.keys(data);
              let items = Object.values(data);
              this.getLists(items);
              this.setState({items});
              this.setState({keys});
            }
         }.bind(this));
    }
  render() {
    let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists'+this.props.navigation.getParam('index')+'/'+this.props.navigation.getParam('liste'));
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
                            this.state.lists.length > 0
                            ? <ListComponent items={this.state.items} keys={this.state.keys} nav={this.nav} lists={this.state.lists}/>
                            : <Text>No Lists</Text>
                        }
        </ScrollView>
        </View>

        <AddModal1 ref={'addModal'} uid={this.props.userInfo.uid} update={this.update} scroll={this.scrollEnd} liste={this.props.navigation.getParam('liste')} index={this.props.navigation.getParam('index')}>

        </AddModal1>
      </Container>

    )
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(ListScreen)

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
