import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,TextInput,
  ScrollView,
  Image, Switch, TouchableOpacity, KeyboardAvoidingView
} from "react-native";

//library imports
import { Button, Container, Header, Content, Left, Body,Title,Right } from 'native-base'
import { connect } from 'react-redux'
import  firebase from "firebase";
import ListCheck from '../components/ListCheck';
import ShareModal from '../components/ShareModal';
import {db} from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dismissKeyboard from 'react-native-dismiss-keyboard';

//custom components imports

class WriteList extends Component{
  constructor(props){
    super(props);
    this.openShareModal = this.openShareModal.bind(this);
    this.focusDone=this.focusDone.bind(this);
    this.type = this.type.bind(this);
    this.push = this.push.bind(this);
    this.remove = this.remove.bind(this);
    this.check = this.check.bind(this);
    this.submit = this.submit.bind(this);
    this.share = this.share.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state ={
      focus: -1,
      text: [],
      tmpText: [],
      items: [],
      keys: [],
      sortedKeys: [],
      newListContent:'',
      check: [],
      list: true,
      return :false,
      updating: false,
      listText : ""
    }
  }

  handleKeyDown(e) {
    if(e.nativeEvent.key == "Enter"){
        dismissKeyboard();
        this.setState({return : true});
    }
  }
  openShareModal(){
    this.refs.shareModal.openModal();
  }

  type(ind, text){
    //var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items/'+this.state.keys[ind]);
    //ref.update({text : text});
    if(!this.state.return){
      var tmp = this.state.text;
      tmp[ind] = text;
      this.setState({text : tmp});
    }
    else{
      this.setState({return : false});
    }
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
    this.setState({focus :ind+1});
    //var tmp1 = this.state.keys;
    //var tmp2 = this.state.text;
    //tmp1.splice(ind+1, 0, tmpKey);
    //tmp2.splice(ind+1, 0, '');
    //this.setState({keys: tmp1});
    //this.setState({text: tmp2});
  }
  remove(ind){
    for(let i = ind+1; i < this.state.keys.length; i++){
      var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items/'+this.state.keys[i]);
      ref.update({ind : i-1});
    }


    db.ref('lists/'+this.props.navigation.getParam('index')+'/items/').child(this.state.keys[ind]).remove();
    //var tmp1 = this.state.keys;
    //var tmp2 = this.state.text;
    //tmp1.splice(ind+1, 0, tmpKey);
    //tmp2.splice(ind+1, 0, '');
    //this.setState({keys: tmp1});
    //this.setState({text: tmp2});
  }
  share(uid){
      var ref = db.ref('users/'+uid+'/lists');
      ref.once('value', function(snapshot) {
        if(snapshot.exists()){
            let data = snapshot.val();
            let keys = Object.keys(data);
            let items = Object.values(data);
            if(!items.includes('shared')){
              var key = ref.push({name : 'shared'}).key;
              ref = db.ref("users/"+uid+"/lists/"+key+"/shared");
              ref.push({key :this.props.navigation.getParam('index')});
            }
            else{
              var index = items.indexOf('shared');
              ref = db.ref("users/"+uid+"/lists/"+keys[index]);
              ref.push(this.props.navigation.getParam('index'));
            }
          }
       }.bind(this))
  }
  editText(){
    this.setState({text : this.state.listText.split('\n')});
  }
  focusDone(){
    this.setState({focus :-1});
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
    var tmp1 = [];
    var tmp2 = [];
    var tmpk = [];
    for(let i=0; i < items.length ; i++){
      tmp1.push(items[i].check);
      tmp2.push(items[i].text);
      tmpk.push(items[i].key);
      }
      this.setState({check : tmp1});
      this.setState({text : tmp2});
      this.setState({keys : tmpk});
      this.setState({listText : tmp2.join("\n")});
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
             for(let i = 0; i < this.state.tmpText.length; i++){
               if(i<this.state.text.length){
                 if(this.state.tmpText[i]!=this.state.text[i]){
                   var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items/'+this.state.keys[i]);
                   ref.update({text : this.state.tmpText[i]});
                 }
               }
               else{
                 var ref = db.ref("lists/"+this.props.navigation.getParam('index')+'/items');
                 ref.push({
                   check : false,
                   text : this.state.tmpText[i],
                   ind : i
                 });
               }
          }
        }}}

         value = {this.state.list}/>
         <TouchableOpacity style={styles.shareModal} onPress={this.openShareModal}>
           <Image style={styles.shareModalImage} source={require('../images/add_button.png')} />
         </TouchableOpacity>


         {
           this.state.list
           ?<KeyboardAvoidingView
            style={styles.container}
            behavior="padding"><ScrollView ref={'scroll'}>
           {
               this.state.text.length > 0
               ? <ListCheck items = {this.state.text} check = {this.state.check} focus = {this.state.focus} focusDone = {this.focusDone} handleKeyDown = {this.handleKeyDown} type = {this.type} submit = {this.submit} push = {this.push} remove = {this.remove} doCheck = {this.check}/>
               : <Text>No Items</Text>
           }
           </ScrollView>
           <View style={styles.keyboardSafety} >
           </View></KeyboardAvoidingView>
           :<TextInput multiline = {true}
           onChangeText={(text) =>{this.setState({listText:text});this.setState({tmpText : this.state.listText.split('\n')});}}
           onEndEditing={() =>{this.setState({tmpText : this.state.listText.split('\n')});}}
           value = {this.state.listText}/>
        }
        <ShareModal ref={'shareModal'} uid={this.props.userInfo.uid}  share = {this.share}>

        </ShareModal>
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
    shareModalImage: {
      width: 70,
      height: 70,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150,
      backgroundColor:'red'
    },
    shareModal: {
      position: 'absolute',
      top: '85%',
      left: '70%',
      zIndex:3
    },
    keyboardSafety:{
      height: 40,
    },
});
