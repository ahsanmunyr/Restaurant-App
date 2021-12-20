import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from './CartScreen'
import MessageIcon from "../../Components/MessageIcon";
import DetailScreen from './DetailScreen.js'
import Icon from 'react-native-vector-icons/Ionicons';
import OrderCartProcess from "./OrderCartProcess";
import PaymentCard from "./PaymentCard";
const Stack=createNativeStackNavigator();
function CartStack({navigation}){
   
    // console.log("CART STACK")
    return(
            <Stack.Navigator initialRouteName="cartScreen">
                <Stack.Screen 
                    name="cartScreen" 
                    options={({  route }) => ({
                        headerShown: false,
                        headerTransparent: true,
                    })}
                    component={CartScreen}
                />  
                <Stack.Screen 
                    name="ordercartprocess" 
                    options={({  route }) => ({
                        headerShown: false,
                        headerTransparent: true,
                    })}
                    component={OrderCartProcess}
                />  

                    <Stack.Screen 
                    name="paymentcard" 
                    options={({  route }) => ({
                        headerShown: false,
                        headerTransparent: true,
                    })}
                    component={PaymentCard}
                /> 
            </Stack.Navigator>
    )
}

export default CartStack