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
    this.type = this.type.bind(this);
    this.push = this.push.bind(this);
    this.check = this.check.bind(this);
    this.submit = this.submit.bind(this);
    this.state ={
      text: [],
      items: [],
      keys: [],
      sortedKeys: [],
      newListContent:'',
      check: [],
      list: true,
      updating: false,
      listText : ""
    }
  }

  type(ind, text){
    //var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items/'+this.state.keys[ind]);
    //ref.update({text : text});
    var tmp = this.state.text;
    tmp[ind] = text;
    this.setState({text : tmp});
  }
  submit(ind){
    var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items/'+this.state.keys[ind]);
    ref.update({text : this.state.text[ind]});
    //var tmp = this.state.text;
    //tmp[ind] = text;
    //this.setState({text : tmp});
  }

  push(ind){
    for(let i = ind+1; i < this.state.keys.length; i++){
      var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items/'+this.state.keys[i]);
      ref.update({ind : i+1});
    }


    var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items');
    var tmpKey = ref.push({
      check : false,
      text : '',
      ind : ind+1
    }).key;

    //var tmp1 = this.state.keys;
    //var tmp2 = this.state.text;
    //tmp1.splice(ind+1, 0, tmpKey);
    //tmp2.splice(ind+1, 0, '');
    //this.setState({keys: tmp1});
    //this.setState({text: tmp2});
  }

  check(ind){
    var tmp1 = this.state.check;
    tmp1[ind] = !tmp1[ind];
    //this.setState({check : tmp1});
    var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items/'+this.state.keys[ind]);
    ref.update({check : tmp1[ind]});
  }

  addList(listItem,i){
    var tmp1 = this.state.check;
    var tmp2 = this.state.text;
    const tmp3 = this.state.listText;
    tmp1.push(listItem.check);
    tmp2.push(listItem.text);
    const tmp4 = tmp3  + listItem.text;
    this.setState({check : tmp1});
    this.setState({text : tmp2});
    this.setState({listText : tmp4});
  }
  getLists(items){
    for(let i=0; i < items.length ; i++){
      items[i].key = this.state.keys[i];
    }
    items.sort((a,b)=> a.ind - b.ind)
    console.log("teest1 :")
    var tmp1 = [];
    var tmp2 = [];
    var tmpk = [];
    var tmp3 = '';
    console.log(this.state.text);
    for(let i=0; i < items.length ; i++){
      tmp1.push(items[i].check);
      tmp2.push(items[i].text);
      tmpk.push(items[i].key);
      var tmp4 = tmp3  + items[i].text;
      }
      this.setState({check : tmp1});
      this.setState({text : tmp2});
      this.setState({keys : tmpk});
      this.setState({listText : tmp4});
      console.log("teest2 :")
      console.log(this.state.text)
  }
  componentDidMount() {
    var ref = db.ref("lists/"+this.props.navigation.getParam('index'));
    ref.once("value", function(snapshot) {
      if (snapshot.exists()){
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({newListContent: data.text});
        this.setState({list: data.list})
      }
    }.bind(this));

    var ref2 = db.ref("lists/"+this.props.navigation.getParam('index')+'/items');
    ref2.orderByChild('ind').on("value", function(snapshot) {
      if (!snapshot.exists()){
        ref2.push({
          check : false,
          text : '',
          ind : 0
        });
      }
      else{

        let data = snapshot.val();
        let keys = Object.keys(data);
        let items = Object.values(data);

        this.setState({items},()=>{
          this.setState({keys});
          this.setState({listText:""});
          this.setState({check : []});
          this.setState({text : []},()=> this.getLists(items));
        });

      }

    }.bind(this));

  }
  render() {
    return (
      <Container >
      <Switch
         onValueChange = {()=>{
           let listsRef = db.ref("lists/"+this.props.navigation.getParam('index'));
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


         {
           this.state.list
           ?<View style={styles.container}><ScrollView ref={'scroll'}>
           {
               this.state.text.length > 0
               ? <ListCheck items = {this.state.text} check = {this.state.check} type = {this.type} submit = {this.submit} push = {this.push} doCheck = {this.check}/>
               : <Text>No Items</Text>
           }
           </ScrollView></View>
           :<TextInput multiline = {true} numberOfLines = {this.state.text.length} value = {this.state.text.join('\n')}/>
        }

         </Container>
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
