import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,TextInput,
  ScrollView,
  Image, Switch, TouchableOpacity
} from "react-native";

//library imports
import { Button, Container, Header, Content, Left, Body,Title,Right } from 'native-base'
import { connect } from 'react-redux'
import  firebase from "firebase";
import ListCheck from '../components/ListCheck';
import {db} from '../config';

//custom components imports

class WriteList extends Component{
  constructor(props){
    super(props);
    this.state ={
      keys: [],
      newListContent:'',
      items: [],
      list: true
    }
  }

  componentDidMount() {
      let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists/'+this.props.navigation.getParam('index1')+'/'+this.props.navigation.getParam('liste1')+'/'+this.props.navigation.getParam('index'));
      listsRef.once('value', (snapshot) => {
          if (snapshot.exists()){
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({newListContent: data.text});
            this.setState({list: data.list})
          }
       });
       let listsRef2 = db.ref('users/'+this.props.userInfo.uid+'/lists/'+this.props.navigation.getParam('index1')+'/'+this.props.navigation.getParam('liste1')+'/'+this.props.navigation.getParam('index')+'/items');
       listsRef2.on('value', (snapshot) => {
         if (!snapshot.exists()){
           listsRef2.push({
             check : false,
             text : ''
           });
         }
         });

  }
  render() {
    let listsRef2 = db.ref('users/'+this.props.userInfo.uid+'/lists/'+this.props.navigation.getParam('index1')+'/'+this.props.navigation.getParam('liste1')+'/'+this.props.navigation.getParam('index')+'/items');
    listsRef2.on('value', (snapshot) => {
      if (!snapshot.exists()){
        listsRef2.push({
          check : false,
          text : ''
        });
      }
      else{
        var data1 = [];
        snapshot.forEach(function(data) {
          var tmp=data.val().text;
          data1.push(tmp);
        });
        console.log('DATA1');
        console.log(data1);
      }
      });
    return (

      <View>
      <Text>
        Rédiger la liste {this.props.navigation.getParam('liste')}
      </Text>
      <Switch
         onValueChange = {()=>{
           let listsRef = db.ref('users/'+this.props.userInfo.uid+'/lists/'+this.props.navigation.getParam('index1')+'/'+this.props.navigation.getParam('liste1')+'/'+this.props.navigation.getParam('index'));
           if(this.state.list){
             this.setState({list: false});
             listsRef.update({
                 list: false
              });
          }else{
            this.setState({list: true});
            listsRef.update({
                list: true
             });
          }
         }}

         value = {this.state.list}/>

         <View style={styles.container}>
         <ScrollView ref={'scroll'}>
                         {   <ListCheck items={["tesssst"]}/>
                         }
         </ScrollView>
         </View>
      </View>

    )
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(WriteList)

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
