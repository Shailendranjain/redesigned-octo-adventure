import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer} from "react-navigation"
import {createBottomTabNavigator} from "react-navigation-tabs"
import ReadStory from "./screens/ReadDetails"
import WriteStory from "./screens/WriteDetails"


export default class App extends React.Component{
  render(){
    return( 
      
      <AppContainer/> 
    ) 
  }
}

const TabNavigator = createBottomTabNavigator({
 
 WriteDetails : {screen: WriteStory},
 ReadDetails : {screen: ReadStory} ,
},

 {
   defaultNavigationOptions : ({navigation})=>({
tabBarIcon:()=>{
  const routeName= navigation.state.routeName
  if(routeName==="ReadDetails"){
    return(
      <Image source={require("./job2.webp")} style={{width:40, height:40}}>
      </Image>
    )
  }
  else if(routeName==="WriteDetails"){
    return(
      <Image source={require("./job1.png")} style={{width:45, height:40}}>
      </Image>
    )
  }
}
})
})

const AppContainer= createAppContainer(TabNavigator)