import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from './HistoryScreen'
const Stack=createNativeStackNavigator();
function HistoryStack({navigation}){
    return(
            <Stack.Navigator initialRouteName="history">
                <Stack.Screen 
                    name="history" 
                    options={({  route }) => ({
                                headerShown: false,
                                headerStyle: {alignSelf:'center'},  
                            })}
                    component={HistoryScreen}
                />  
            </Stack.Navigator>
    )
}

export default HistoryStack