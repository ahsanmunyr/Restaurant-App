import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,TouchableWithoutFeedback,
   StyleSheet,StatusBar,KeyboardAvoidingView,Keyboard,
   ScrollView,DeviceEventEmitter,BackHandler,Alert,Image, TextInput, ActivityIndicator
 } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient'
import TextSample from './../../Components/Text'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextInputFeild from './../../Components/TextFeild'
import {connect, useDispatch, useSelector} from "react-redux";
import * as actions from '../../Store/Actions';
import SplashScreen from  "react-native-splash-screen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const LoginScreen = ({navigation, route,loginUser, userLogin}) => {

    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [onClick, onChangeOnClick] = React.useState(false);
useEffect(() => {
        SplashScreen.hide();
        console.log(userLogin, "asdadasdasd")
        onChangeOnClick(userLogin.userLogin)
},[userLogin]);


return(
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}
        >
             <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                 <View style={{flex:1, }}>
                {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}> */}
                        <Image style={{width: '100%', height: '60%',}} resizeMode='cover' source={require('./../../Assets/Images/header.png')}  />
                        <View style={{ 
                            flexDirection:'column',
                            flex: 1,
                            borderRadius: 28,
                            width: '100%', 
                            justifyContent: 'center',
                            alignSelf:'center',
                        }}> 
                            
                        
            
                            <View style={{justifyContent:'center', flexDirection:'column', alignItems:'flex-start', paddingLeft: 10, zIndex: 1, top: 90 }}>
                                    <View style={{alignItems:'flex-start', }}>
                                        <TextSample 
                                            Label="Let's sign you in." 
                                            Color="black" 
                                            Size={hp("3.5%")} 
                                            TextAlign='left'
                                            NumberOfLines={1} 
                                            Font="Overpass-Bold"
                                            TextDecorationLine='none'
                                            TextTransform='none'
                                            />
                                        <TextSample 
                                            Label="Welcome Back" 
                                            Color="black" 
                                            Size={hp("3%")} 
                                            TextAlign='left'
                                            NumberOfLines={1} 
                                            Font="Overpass-Regular"
                                            TextDecorationLine='none'
                                            TextTransform='uppercase'
                                        />
                                        <TextSample 
                                            Label="You've been Missed!" 
                                            Color="black" 
                                            Size={hp("3%")} 
                                            TextAlign='left'
                                            NumberOfLines={2} 
                                            Font="Overpass-Regular"
                                            TextDecorationLine='none'
                                            TextTransform='capitalize'
                                        />
                                    </View>
                                </View>
                            <View style={{ justifyContent:'flex-start', flexDirection:'column',  height: 600, top: 90}}>
                                <View style={{ justifyContent:'flex-start', flexDirection:'column',}}>
                                <View style={styles.textField}>
                                <FontAwesome name="user-o"  size={20} color="#f54730" />
                                    <TextInputFeild
                                        placeholder="Email"
                                        value={username}
                                        onchange={onChangeUsername}
                                        keyboardType='email-address'
                                        secureTextEntry={false}
                                        Color='grey'
                                    />
                                </View>
                                <View style={styles.textField}>
                                <Ionicons name="md-lock-closed-outline" size={20} color="#f54730" /> 
                                    <TextInput
                                        keyboardType='default'
                                        placeholder="Password"
                                        placeholderTextColor="grey"
                                        style={styles.input}
                                        onChangeText={onChangePassword}
                                        value={password}
                                        // caretHidden={true}
                                        textAlignVertical='bottom'
                                        secureTextEntry={true}
                                    />
                                </View>
                            
                                <View style={{
                                        width: '100%',
                                        height: 100,
                                            flexDirection: 'row',
                                            alignItems:'center',
                                            right: 0,
                                            bottom: 0,
                                            justifyContent:'flex-end',
                                        
                                            alignSelf:'flex-end'
                                    }}>
                                        <TouchableOpacity style={{width: 150}} onPress={()=> navigation.navigate('forgotpassword')}>
                                        <TextSample 
                                                Label="Forgot Password   " 
                                                Color="black" 
                                                Size={hp("2%")} 
                                                TextAlign='left'
                                                NumberOfLines={2} 
                                                Font="Overpass-Regular"
                                                TextDecorationLine='underline'
                                                TextTransform='capitalize'
                                        />
                                        </TouchableOpacity>
                                        <TouchableOpacity  disabled={onClick}  onPress={() => {
                                            loginUser( username, password, navigation )
                                            onChangeOnClick(true)
                                            }} >
                                                <LinearGradient
                                                    start={{ x: -1, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    colors={[ '#B01125','#f54730']}
                                                    style={styles.touchableOpacity}
                                                    >
                                                        {
                                                            !onClick ?
                                                        <TextSample 
                                                            Label="LOGIN" 
                                                            Color="white" 
                                                            Size={hp("2%")} 
                                                            TextAlign='center'
                                                            NumberOfLines={2} 
                                                            Font="Overpass-Bold"
                                                            TextDecorationLine='none'
                                                            TextTransform='none'
                                                        />:  
                                                        <ActivityIndicator size='large' color="white" />
                                                        }
                                                </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity  style={{ top: 100, position:'absolute', right: 0}} onPress={()=> navigation.navigate('signup')} >
                                            <View style={{
                                                        alignItems:'flex-end',
                                                        alignContent:'flex-end',
                                                        flexDirection:'row',
                                                        alignSelf:'flex-end', 
                                                    
                                                    
                                                }}>
                                                <TextSample 
                                                        Label="Sign Up " 
                                                        Color="black" 
                                                        Size={hp("4%")} 
                                                        TextAlign='center'
                                                        NumberOfLines={2} 
                                                        Font="Overpass-Bold"
                                                        TextDecorationLine='none'
                                                        TextTransform='none'
                                                />
                                                    <MaterialIcons name="keyboard-arrow-right" size={38} color="black" /> 
                                                </View>
                                            </TouchableOpacity>
                        
                                </View>
                            </View> 
                            
                            </View>
                        
                        
                            
                        </View> 
                        </View>
                {/* </ScrollView>  */}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // height: hp('103%'),
        backgroundColor: 'white', 
     
    },
    scrollView: {
        
            height: '103%',
            // bottom: 60,
            // backgroundColor:'black'
        // marginHorizontal: 20,
    
      },
      input: {
        height: 40,
        // padding:5,
        left: 10,
        // top:-5,
        borderWidth: 0,
        color: 'black',
        width: wp('80%'),
        justifyContent: 'center',
        borderColor: 'black',
        fontFamily: 'Overpass-Bold',
        fontWeight: '200',
        fontSize: hp('2%'),
        
        
        
        
      },
    textField: {
        width: wp('90%'),
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 5,
        backgroundColor:'white',
        // zIndex: 9999,
        // elevation: 5,
        borderRadius: 12,
        height:45,
        alignItems:'center',
        alignSelf:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
        
    },
        backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        opacity: 0.9    
    },

    touchableOpacity:{
            borderWidth: 2,
            borderColor: '#f54749',
            width: wp('50%'),
            height: hp('6%'),
            justifyContent: 'center',
            // borderRadius: 25,
            flexDirection:'row',
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            alignItems:'center',
            alignSelf:'center',
            alignContent:'center'
            
        },
        touchableOpacityText: {
          color: 'white',
          fontFamily: 'Overpass-Regular',
          fontSize: hp('2'),
          textAlign:'center'
        },
})

const mapStatetoProps = ({userLogin}) =>
{
    return {userLogin}
}
export default connect(mapStatetoProps,actions)(LoginScreen)