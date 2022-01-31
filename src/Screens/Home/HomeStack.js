import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'
// import AnimatedGradient from "./../Process/CompleteOrder"
import MainPost from './MainPost'
import MessageIcon from "../../Components/MessageIcon";
import ShowAllRestaurant from "./ShowAllRestaurants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack=createNativeStackNavigator();
function HomeStack({navigation}){
    // completeOrder
    console.log("HOME STACK")
    return(
      
            <Stack.Navigator initialRouteName="home">
                 {/* <Stack.Screen 
                    name="completeOrder" 
                    options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,
                                 })}
                    component={HomeScreen}
                />  */}
                <Stack.Screen 
                    name="home" 
                    options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,
                                 })}
                    component={HomeScreen}
                /> 
                 <Stack.Screen 
                    name="showall" 
                    options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,
                                 })}
                    component={ShowAllRestaurant}
                />
                <Stack.Screen 
                    name="mainpost" 
                    options={({  route }) => ({
                        headerShown: false,
                        headerStyle: { borderBottomColor: 'grey', borderBottomWidth: 0.7, height: 110  },
                        headerStatusBarHeight: 32,
                        headerTitle: null,
                        headerTransparent: false,
                        headerLeft: ()=>      <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{}}>
                                                    <View style={{padding:10, top: 3}}>
                                                        <Image resizeMode="contain" style={{height: 25, width: 25}} source={require('./../../Assets/Images/menu.png')} />
                                                    </View>
                                              </TouchableOpacity>,
                        headerRight: ()=>   <MessageIcon  navigation={navigation}  /> 
                                 })}
                    component={MainPost}
                /> 
         
            </Stack.Navigator>

     
    )
}

export default HomeStack