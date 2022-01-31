import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from './SettingScreen'
import EditProfile from './EditProfile'
import PasswordChange from './PasswordChange'
import MessageIcon from "../../Components/MessageIcon";
// import EditProfile from '../Home/Profile/EditProfile';
// import PasswordChange from './PasswordChange';
const Stack=createNativeStackNavigator();
function SettingsStack({navigation}){
    return(
            <Stack.Navigator initialRouteName="setting">
                <Stack.Screen 
                    name="setting" 
                    options={({  route }) => ({
                                headerShown: false,
                                headerTransparent: true,
                            })}
                    component={SettingScreen}
                />  
                 <Stack.Screen 
                    name="passwordchange" 
                    options={({  route }) => ({
                                headerShown: false,
                                headerTransparent: true,
                            })}
                    component={PasswordChange}
                /> 
                  <Stack.Screen 
                    name="editprofile" 
                    options={({  route }) => ({
                                headerShown: false,
                                headerTransparent: true,
                            })}
                    component={EditProfile}
                /> 
            </Stack.Navigator>
    )
}

export default SettingsStack