import React from 'react';
import { Text, View , Header, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, TextInput} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context"
import db from "../config"

export default class ReadStory extends React.Component {
  constructor(){
    super()
    this.state={
        allStories:[],
        lastVisibleStory:null,
        search:""
      }
  }
  componentDidMount=async()=>{
    const query = await db.collection("Story").get()
    query.docs.map((doc)=>{
      this.setState({
        allStories:[...this.state.allStories, doc.data()]
      })
    })
  }

  
  searchStories=async(text)=>{
    var enteredtext = text.split("")
    var text=text.toUpperCase()

    if(enteredtext[0].toUpperCase()=== "B"){
      const searchstory = await db.collection("Story").where("author","==", text).get()
      searchstory.doc.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories,doc.data()],
          lastVisibleStory:doc
        })
      })
    }
    else if(enteredtext[0].toUpperCase()=== "S"){
      const searchstory = await db.collection("Story").where("title","==", text).get()
      searchstory.doc.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories,doc.data()],
          lastVisibleStory:doc
        })
      })
    }
  }

   render() {
      return (
        
        <View style={styles.container}>
         <Text style ={styles.text}>Job Portal</Text>
        <View style={styles.searchBar}>
        <TextInput style={styles.bar} placeholder = "Enter Name..." onChangeText={(text)=>{this.setState({search:text})}}/>
       
        <TouchableOpacity style={styles.searchButton} onPress={()=>{this.searchStories(this.state.search)}}>
       
        <Image style={{width:30, height:30,marginTop:0}} source={require("../search.png")}></Image>
        </TouchableOpacity>
        
        </View>
        
      
    <ScrollView>{this.state.allStories.map((story,index)=>{
          return(
        <View key={index} style={{borderBottomWidth:2, marginTop:40, alignItems:"center", borderColor:"#fed7ff",}}>
           <Text>{"Title: " + story.title}</Text>
           <Text>{"Author: " + story.author}</Text>
          </View>
          )
        })}
          
       </ScrollView>
    
      </View> 
      )
  }
}
const styles = StyleSheet.create({
 
    text:{
    color:"black",
    fontSize:32, 
    fontWeight: 'bold',
    textAlign :"center",
    height: 50,
    marginTop: 10,
   alignItems: 'center',
   justifyContent: 'center',
    backgroundColor : 'pink'
 },

 container:{
   flex:1,  
 },

searchBar:{
  flexDirection:"row",
  height:40,
  width:"auto",
  borderWidth:0.5,
  alignItems:"center",
},

bar:{
  borderWidth:2,
  height:30,
  width:300,
  paddingLeft:10
},

searchButton:{
  borderWidth:2,
  borderLeftWidth:0,
  height:30,
  width:50,
  alignItems:"center",
  justifyContent:"center",
}
})