import React, { Component, useEffect, useState } from "react";
// import {View,TouchableOpacity, Image, Text} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Screens/Main/MainScreen'
import LoginScreen from './Screens/Login/LoginScreen'
// import FavoriteDScreen from './Screens/Signup/FavoriteDScreen'
// import SignupScreen from './Screens/Signup/SignupScreen'
// import InterestScreen from './Screens/Signup/InterestScreen'
// import ForgotScreen from './Screens/Forgot/ForgotScreen'
// import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux";
import * as actions from './Store/Actions';
import SignupScreen from './Screens/Signup/SignupScreen'
import OTPScreen from "./Screens/Login/OTPScreen";
import ForgotPassword from "./Screens/Login/ForgotPassword";
import ForgotPasswordOTP from "./Screens/Login/ForgotPasswordOTP";
import ChangePassword from "./Screens/Login/ChangePassword";
// import { 
//     NavigationContainer, 
//   } from '@react-navigation/native';
// import { SignUpStepOne } from "./Store/Actions";
const AuthStack = createNativeStackNavigator();

const SignUpFunction = (userSignup, userFavourite, userInterest,SignupAll) => {
    SignupAll(userSignup, userFavourite, userInterest)
    // console.log(userSignup,userFavourite,userInterest, "-----")
}
// Stack Navigator: 'headerMode' is moved to 'options'. Moved it to 'screenOptions' to keep current behavior
const AuthRootStackScreen = ({navigation, userSignup, userFavourite, userInterest, SignupAll}) => (
            <AuthStack.Navigator  headerTransparent={true}   screenOptions={{gestureEnabled:true}}  initialRouteName="main">
                <AuthStack.Screen 
                    name="main" 
                    options={{headerShown:false, headerMode:'float'}} 
                    component={MainScreen}
                /> 
                <AuthStack.Screen 
                    name="login" 
                    options={{headerShown:false, headerMode:'float'}} 
                    component={LoginScreen}
                /> 
                <AuthStack.Screen 
                    name="signup" 
                    options={{headerShown:false, headerMode:'float'}} 
                    component={SignupScreen}
                /> 
                <AuthStack.Screen 
                    name="otpverify" 
                    options={{headerShown:false, headerMode:'float'}} 
                    component={OTPScreen}
                /> 
                <AuthStack.Screen 
                    name="forgotpassword" 
                    options={{headerShown:false, headerMode:'float'}} 
                    component={ForgotPassword}
                /> 
                <AuthStack.Screen 
                    name="forgotpasswordotp" 
                    options={{headerShown:false, headerMode:'float'}} 
                    component={ForgotPasswordOTP}
                /> 
                <AuthStack.Screen 
                    name="changepassword" 
                    options={{headerShown:false, headerMode:'float'}} 
                    component={ChangePassword}
                /> 


                {/* <AuthStack.Screen 
                    name="login" 
                    options={{headerShown:false}} 
                    component={LoginScreen}
                /> 
                <AuthStack.Screen 
                    name="forgot" 
                    options={{headerShown:false}} 
                    component={ForgotScreen}
                /> 
                <AuthStack.Screen 
                    name="signup" 
                    options={({ navigation, route }) => ({
                        headerTitle: props => null,
                        headerTransparent: true,
                        headerLeft: ()=> null,
                    })}
                    component={SignupScreen}
                />
                <AuthStack.Screen 
                    name="YourInterests" 
                    options={({ navigation, route }) => ({
                        headerTitle: props => <Text style={{textAlign:'center', fontSize: 18, color:'black', fontFamily: 'Poppins-SemiBold'}}>Your Interests</Text>,
                        headerTransparent: false,
                        headerLeft: ()=>        <View style={{left: 20}}><TouchableOpacity onPress={()=> navigation.goBack()}><Icon name="arrow-back" size={25} color="#B01125" /></TouchableOpacity></View>,
                        headerRight: ()=>   
                                        <View style={{right: 20}}>
                                            <TouchableOpacity onPress={()=>   navigation.navigate('FavoriteDrinks')}>
                                                <View  style={{backgroundColor: '#B01125', width: 30, height: 30, borderRadius: 50, borderColor:'white', borderWidth:1}}>
                                                                                <Image 
                                                                                    resizeMode='contain' 
                                                                                    source={require('./Assets/Images/Check.png')} 
                                                                                    style={{width: 20, height: 20, margin: 4,}} 
                                                                                />
                                                </View>
                                            </TouchableOpacity> 
                                        </View>  
                        })}               
                    component={InterestScreen}
                /> 
                <AuthStack.Screen 
                    name="FavoriteDrinks" 
                    options={({ navigation, route }) => ({
                        headerTitle: props => <Text style={{textAlign:'center', fontSize: 18, color:'black', fontFamily: 'Poppins-SemiBold'}}>Favorite Drinks</Text>,
                        headerTransparent: false,
                        headerLeft: ()=>        <View style={{left: 20}}><TouchableOpacity onPress={()=> navigation.goBack()}><Icon name="arrow-back" size={25} color="#B01125" /></TouchableOpacity></View>,
                        headerRight: ()=>      
                                        <View style={{right: 20}}>
                                            <TouchableOpacity onPress={()=>SignUpFunction(userSignup, userFavourite, userInterest,SignupAll)}>
                                                <View  style={{backgroundColor: '#B01125', width: 30, height: 30, borderRadius: 50, borderColor:'white', borderWidth:1}}>
                                                                                <Image 
                                                                                    resizeMode='contain' 
                                                                                    source={require('./Assets/Images/Check.png')} 
                                                                                    style={{width: 20, height: 20, margin: 4,}} 
                                                                                />
                                                </View>
                                            </TouchableOpacity> 
                                        </View>   
                                    })}                    
                    component={FavoriteDScreen}
                />  */}
            </AuthStack.Navigator>
)

const mapStatetoProps = ({userSignup, userFavourite, userInterest}) =>
  {
        return {userSignup, userFavourite, userInterest}
  }
export default connect(mapStatetoProps,actions)(AuthRootStackScreen)