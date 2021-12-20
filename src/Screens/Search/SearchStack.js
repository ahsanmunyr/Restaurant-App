import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen  from './SearchScreen'
import MessageIcon from "../../Components/MessageIcon";
import SearchFilter from "./SearchFilter";
import Icon from 'react-native-vector-icons/Ionicons';
const Stack=createNativeStackNavigator();
const SearchStack = ({navigation}) => {
    return(
            <Stack.Navigator initialRouteName="search">
                <Stack.Screen 
                    name="search" 
                    options={({  route }) => ({
                        headerShown: false,
                        headerTransparent: true,
                    })}
                    component={SearchScreen}
                />  
                <Stack.Screen 
                    name="searchfilter" 
                    options={({  route }) => ({
                        headerShown: false,
                        headerTransparent: true,
                    })}
                    component={SearchFilter}
                />  
            </Stack.Navigator>
    )
}

export default SearchStack