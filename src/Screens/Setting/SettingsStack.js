import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from './SettingScreen'
import MessageIcon from "../../Components/MessageIcon";
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
            </Stack.Navigator>
    )
}

export default SettingsStack