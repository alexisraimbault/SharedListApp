import React, { Component } from 'react';
import {  View, Text, StyleSheet, TextInput, Dimensions, ScrollView,Image, TouchableOpacity, PanResponder, Animated} from 'react-native';
import { CheckBox } from 'react-native-elements'

const { width, height } = Dimensions.get("window");

export default class ListItem extends Component {
  translateX = new Animated.Value(0);
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (evt, gestureState) => {
      const { dx, dy } = gestureState
      return dx > 2 || dx < -2 || dy > 2 || dy < -2
},
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      const { dx, dy } = gestureState
      return dx > 2 || dx < -2 || dy > 2 || dy < -2
},
    onPanResponderMove: Animated.event([null, {dx: this.translateX,
                                              }]),
    onPanResponderRelease: (e, {vx, dx}) => {
      const screenWidth = Dimensions.get("window").width;
      if ( dx >= 0.4 * screenWidth) {
        this.props.doCheck(this.props.index);
      }
      else{
        if ( dx <= -0.6 * screenWidth) {
          this.props.remove(this.props.index);
        }
      }
      Animated.spring(this.translateX, {
        toValue: 0,
        bounciness: 10
      }).start();

    }
  });


  componentDidMount(){
    if((this.props.focus != -1) &&(!this.props.check[this.props.focus])&&(this.props.focus == this.props.index) ){

      this.refs[this.props.focus].focus();
      this.props.focusDone();
    }
  }

  render(){
    const checkOpacity = this.translateX.interpolate( {
      inputRange: [0, width],
      outputRange: [0,1]
    });
    const supprOpacity = this.translateX.interpolate( {
      inputRange: [-width,0],
      outputRange: [1,0]
    });
    const negX = this.translateX.interpolate( {
      inputRange: [-width,0],
      outputRange: [width, 0]
    });
    const w = 0.95%width;
    return this.props.check[this.props.index]
    ?(
      /*<Animated.View
          style={{transform: [{translateX: this.translateX}], height: 75, backgroundColor : 'red', opacity:0.8 }} {...this._panResponder.panHandlers}>
        </Animated.View>*/
        <View style={styles.item} key={this.props.index}{...this._panResponder.panHandlers}>
            <Animated.View
              style={{width: this.translateX,left: 0, height: 75, backgroundColor : 'green',position : 'absolute', opacity : checkOpacity }} >
            </Animated.View>
            <Animated.View
              style={{width: negX,right:w, height: 75, backgroundColor : 'red',position : 'absolute', opacity : supprOpacity }} >
            </Animated.View>
            <View style={styles.checkBox}>
            <CheckBox

            checked={this.props.check[this.props.index]}
            onPress={() => this.props.doCheck(this.props.index)}
            />
            </View>
            <View style={styles.wText}>
            <Text ref={this.props.index} style = {styles.itemtextchecked} multiline={true}>{this.props.item}</Text>
            </View>
            <View style={styles.wAdd}>
            <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.push(this.props.index);}}>
              <Image style={styles.addListFolderImage} source={require('../images/add_button.png')} />
            </TouchableOpacity>
            </View>
            <View style={styles.wRemove}>
            <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.remove(this.props.index);}}>
              <Image style={styles.addListFolderImage} source={require('../images/remove_button.png')} />
            </TouchableOpacity>
            </View>
        </View>
    )
    :
    (
      <View style={styles.item} key={this.props.index}{...this._panResponder.panHandlers}>
      <Animated.View
        style={{width: this.translateX,left: 0, height: 75, backgroundColor : 'green',position : 'absolute', opacity : checkOpacity }} >
      </Animated.View>
      <Animated.View
        style={{width: negX,right:w, height: 75, backgroundColor : 'red',position : 'absolute', opacity : supprOpacity }} >
      </Animated.View>
      <View style={styles.checkBox}>
        <CheckBox
        style= {{zIndex : 5}}
        checked={this.props.check[this.props.index]}
        onPress={() => this.props.doCheck(this.props.index)}
        />

        </View>
        <View style={styles.wText} >
        <TextInput ref={this.props.index} style = {styles.itemtext} value = {this.props.item}
                        onChangeText={(text) =>{this.props.type(this.props.index, text)}}
                        onEndEditing={() =>{this.props.submit(this.props.index)}}
                        multiline={true}
                        keyboardType="default"
                        returnKeyType="done"
                        onKeyPress={(e)=>{this.props.handleKeyDown(e,this.props.index)}}
                        />
        </View>
        <View style={styles.wAdd}>
        <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.push(this.props.index);}}>
          <Image style={styles.addListFolderImage} source={require('../images/add_button.png')} />
        </TouchableOpacity>
        </View>
        <View style={styles.wRemove}>
        <TouchableOpacity style={styles.addListFolder} onPress={() =>{this.props.remove(this.props.index);}}>
          <Image style={styles.addListFolderImage} source={require('../images/remove_button.png')} />
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    itemsList: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    item: {
      marginLeft : '5%',
      marginRight : '5%',
      flexDirection: 'row',
      justifyContent : 'space-between',
      alignItems: 'center',
      flex : 1,
      flexBasis: '90%',
      backgroundColor: 'powderblue'
    },
    addListFolderImage: {
      width: '100%',
      height: '100%',
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150,
      backgroundColor:'red'
    },
    addListFolder: {
      zIndex:3
    },
    itemtext: {
      fontSize: 15,
      textAlign: 'left',
    },
    itemtextchecked: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      fontSize: 15,

      textAlign: 'left',
    },
    checkBox: {

      width: "10%",
      //backgroundColor: 'green'
    },
    wText:{
      marginLeft:"5%",
      width: "65%",
      //backgroundColor: 'white'
    },
    wAdd:{
      height: 30,
      width: 30,
      //backgroundColor: 'yellow'
    },
    wRemove:{
      height: 30,
      width: 30,
      //backgroundColor: 'yellow'
    },
    keyboardSafety:{
      height: 80,
    },
});
