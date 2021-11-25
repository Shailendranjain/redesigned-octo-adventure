import React from 'react';
import { Text, View , TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import {Header} from "react-native-elements"
import {SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context"
import db from "../config"
import firebase from "firebase"


export default class WriteStory extends React.Component {
  constructor(){
    super()
    this.state={
      titleText:"",
      authorText:"",
      storyText:""
    }
  }

  submitStory=()=>{
    db.collection("Story").add({
      title:this.state.titleText,
      author:this.state.authorText,
      storyText:this.state.storyText
      
    })
    this.setState({
      titleText:"",
      authorText:"",
      storyText:""
    })
    alert("Your profile has been submitted!!")
    ToastAndroid.show("Your profile has been submitted!!",ToastAndroid.SHORT)
  }

  addStory=()=>{
   db.collection("Story").add({
     title:this.state.titleText,
     author:this.state.authorText
   }) 
  }
    render() {
      return (
        <SafeAreaProvider>
        <KeyboardAvoidingView behavior="padding">
         <Header
       backgroundColor={"pink"}
       centerComponent={{
         text:"Job Portal",
       style:{color:"black",fontSize:30, fontWeight: 'bold',} 
       }}>
      </Header>

      <TextInput style={styles.inputBox} placeholder="Full Name" onChangeText={(text)=>{
      this.setState({titleText:text})
    }}
    value={this.state.titleText}>
    </TextInput>

     <TextInput style={styles.inputBox} placeholder="E-mail or Contact Number" onChangeText={(text)=>{
      this.setState({authorText:text})
    }}
    
    value={this.state.authorText}>
    </TextInput>
     
      <TextInput style={{width:"80%", marginTop: 40, alignSelf: "center", height: 200, textAlign: "center", borderWidth: 2, borderRadius:20,outline:"none",}} placeholder="Expain your Profile in Detail" onChangeText={(text)=>{
      this.setState({storyText:text})
    }}
    multiline={true}
    value={this.state.storyText}>
    </TextInput>

    <TouchableOpacity style={styles.submitButton} onPress={this.submitStory}>
    <Text style={styles.buttonText}> Submit </Text>
    </TouchableOpacity>

    </KeyboardAvoidingView>

      </SafeAreaProvider>

      )
      
    }
  }

  const styles=StyleSheet.create({
    inputBox:{
  marginTop:50,
  width:"80%",
  alignSelf:"center",
  height:40,
  textAlign:"center",
  borderWidth:2,
  outline:"none",
  borderRadius:20,
  alignItems:"center"
},
buttonText:{
  fontSize : 18, 
  fontWeight :"bold", 
  color :"white",
   alignItems : "center",
},
submitButton:{
 borderWidth : 3, 
 padding : 5,
  margin : 30,
   justifyContent : "center", 
   alignItems : "center",
   alignSelf : "center",
    height : 30,
     width : "30%",
     borderRadius : 5,
      backgroundColor : "black" 
}
  })