import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderProcess from "./OrderProcess"
import AnimatedGradient from "./CompleteOrder"

const Stack=createNativeStackNavigator();
const ProcessStack = ({navigation}) => {

return(
        <Stack.Navigator initialRouteName="process" >
                <Stack.Screen name="process" options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,    
                    })}>
                        {props => <OrderProcess {...props}  />}
                </Stack.Screen>
                <Stack.Screen name="completeOrder" options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,    
                    })}>
                        {props => <AnimatedGradient {...props}  />}
                </Stack.Screen>
        </Stack.Navigator>
    )
}

export default ProcessStack