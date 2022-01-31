import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from "./ProfileScreens";
import PasswordChange from "./PasswordChange";
import EditProfile from "./EditProfile";
import AppText from "../../../Components/AppText";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/Feather'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
function ProfileStack({navigation}){
    const Stack=createNativeStackNavigator();
    return(
      
            <Stack.Navigator initialRouteName="Profile">
                  <Stack.Screen 
                    name="Profile" 
                    options={({  route, navigation }) => ({
                         headerShown: false,
                         
                        headerStyle: {  height: 110, backgroundColor:'#B01125', borderBottomWidth: 0, borderBottomColor:'#B01125' },
                        headerStatusBarHeight: 32,
                        headerTitle: props => null,
                        headerTransparent: true,
                        headerLeft: ()=>  <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{}}>
                                                    <View style={{padding:10, top: 3}}>
                                                        <Image resizeMode="contain" style={{height: 25, width: 25}} source={require('./../../../Assets/Images/menu1.png')} />
                                                    </View>
                                              </TouchableOpacity>,
                        headerRight: ()=>   <View style={{ flexDirection: 'row', right: 30, alignContent:'space-around'}}>
                                                  <TouchableOpacity onPress={()=> navigation.navigate('EditProfile')}>
                                                    <MaterialIcons
                                                          name="edit-3"
                                                          color='white'
                                                          size={25}
                                                          style={{}}
                                                      />
                                                  </TouchableOpacity>
                                                  <View style={{marginLeft: 20}}></View>
                                                  <TouchableOpacity onPress={()=> navigation.navigate('newpost')}>
                                                    <FontAwesome
                                                          name="plus-square-o"
                                                          color='white'
                                                          size={25}
                                                          style={{}}
                                                      />
                                                  </TouchableOpacity>
                                             
                                            </View>
                                 })}
                    component={ProfileScreen}
                /> 
                <Stack.Screen 
                    name="EditProfile" 
                    options={({  route, navigation }) => ({
                        headerShown: false,
                         
                        headerStyle: {  height: 110, backgroundColor:'white', borderBottomWidth: 0, borderBottomColor:'white' },
                        headerStatusBarHeight: 32,
                        headerTitle: props => <Text style={{textAlign:'center', fontSize: 18, color:'black', fontFamily: 'Poppins-SemiBold'}}>Edit Profile</Text>,
                        headerTransparent: false,
                        headerLeft: ()=>      <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{}}>
                                                    <View style={{padding:10, top: 3}}>
                                                        <Image resizeMode="contain" style={{height: 25, width: 25}} source={require('./../../../Assets/Images/menu.png')} />
                                                    </View>
                                              </TouchableOpacity>,
                        headerRight: ()=>   <View style={{right: 20}}><TouchableOpacity onPress={()=> navigation.goBack()}><Icon name="ios-enter-outline" size={30} color="#B01125" /></TouchableOpacity></View>,
                                 })}
                    component={EditProfile}
                /> 
                <Stack.Screen 
                    name="PasswordChange" 
                    options={({  route, navigation }) => ({
                         headerShown: true,
                         
                         headerStyle: {  height: 110, backgroundColor:'white', borderBottomWidth: 0, borderBottomColor:'white' },
                        headerStatusBarHeight: 32,
                        headerTitle: props => <Text style={{textAlign:'center', fontSize: 18, color:'black', fontFamily: 'Poppins-SemiBold'}}>Change Password</Text>,
                        headerTransparent: false,
                        headerLeft: ()=>      <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{}}>
                                                    <View style={{padding:10, top: 3}}>
                                                        <Image resizeMode="contain" style={{height: 25, width: 25}} source={require('./../../../Assets/Images/menu.png')} />
                                                    </View>
                                              </TouchableOpacity>,
                        headerRight: ()=>   <View style={{right: 20}}><TouchableOpacity onPress={()=> navigation.goBack()}><Icon name="ios-enter-outline" size={30} color="#B01125" /></TouchableOpacity></View>,
                                 })}
                    component={PasswordChange}
                /> 
         
            </Stack.Navigator>
     
    )
}

export default ProfileStack