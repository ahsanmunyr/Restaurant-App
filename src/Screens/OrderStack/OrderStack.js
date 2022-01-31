import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScreen from "./ItemScreen";
import CategoryScreen from "./CategoryScreen";
import OrderScreen from "./OrderScreen";
import LeftTabBar from "./LeftTabBar";
import RestaurantItemScreen from './RestaurantItemScreen'
const Stack=createNativeStackNavigator();
const OrderStack = ({navigation, route}) => {
    
    const [nav, setNav] = useState('');

useEffect(()=>{
        setNav(route.params.OBJ.navigation)
        console.log(route.params.OBJ, "Behen ka ghora")
},[])

return(
        <Stack.Navigator initialRouteName={route.params.OBJ.navigation} >
                <Stack.Screen name="category" options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,    
                    })}>
                        {props => <CategoryScreen {...props} body={route.params.OBJ} />}
                </Stack.Screen>
                <Stack.Screen name="itemscreen" options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,    
                    })}>
                        {props => <ItemScreen {...props} body={route.params.OBJ} />}
                </Stack.Screen>
                <Stack.Screen name="lefttabbar" options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,    
                    })}>
                        {props => <LeftTabBar {...props} body={route.params.OBJ} />}
                </Stack.Screen>
                <Stack.Screen name="restaurantItemScreen" options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,    
                    })}>
                        {props => <RestaurantItemScreen {...props} body={route.params.OBJ} />}
                </Stack.Screen>
                <Stack.Screen 
                    name="orderscreen" 
                    options={({  route }) => ({
                                    headerShown: false,
                                    headerTransparent: true,
                    })}
                    component={OrderScreen}
                />    
        </Stack.Navigator>
    )
}

export default OrderStack