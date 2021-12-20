import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageIcon from "../../Components/MessageIcon";
import MapScreen from "./MapScreen";
function MapStack({navigation}){
    const Stack=createNativeStackNavigator();
    return(
            <Stack.Navigator initialRouteName="map">
                <Stack.Screen 
                    name="map" 
                    options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,
                                })}
                    component={MapScreen}
            />  
            </Stack.Navigator>
    )
}

export default MapStack