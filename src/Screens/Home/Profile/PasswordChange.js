import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,Dimensions,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import LinearGradient from 'react-native-linear-gradient'
 import AppText from '../../../Components/AppText';
 import Feather from 'react-native-vector-icons/Feather';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


 
 const ChangePassword = ({navigation, route}) => {
    useEffect(()=>{
        // console.log(navigation)
    },[])

     return(
         <View style={styles.container}>
              <StatusBar translucent backgroundColor="transparent" />
            
             <Text>Change Password</Text>
            
        </View>
     )
 }
 export default ChangePassword;


 var styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center",
        height: hp('103%'),
        backgroundColor: 'white'
    },
    touchableOpacity:{
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: 'white',
        width: wp('100%'),
        // height: hp('50%'),
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        bottom: 20,
        marginTop: 10,
   
    },
    touchableOpacity1:{
        
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: 'white',
        width: wp('29%'),
        height: hp('4%'),
        justifyContent: 'center',
        borderRadius: 25,
        alignItems:'center',
        flexDirection:'row',
        alignContent:'center',
        alignSelf:'center',
        elevation: 4,
        zIndex: 999,
    },
    container2: {
        flex: 1,
        marginVertical: 20,
      },
      item: {
        borderRadius:12,
   
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: -4,
        
      },
      itemInvisible: {
        backgroundColor: 'transparent',
      },
      itemText: {
        color: '#fff',
      },
})