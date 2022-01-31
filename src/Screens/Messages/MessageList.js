import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
 import { Badge } from 'react-native-elements';
 import AppText from '../../Components/AppText';
 import Avatar from './../../Components/Avatar'
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 export const MessageList = ({Image, Name, Message,Navigation,Time,OnlineStatus }) => {

    return(
    <View style={{
            height: hp('10%'), 
            flexDirection:'row',
            justifyContent:'center',
            margin: 20,
            alignItems:'center',
            alignContent:'center',
            alignSelf:'center'
        
           }}>
        <View style={{flexDirection:'row', justifyContent:'space-between',alignSelf:'center',alignItems:'center', width: '100%'}}>
        <View style={{flexDirection:'row', alignContent:'flex-start'}}>
            <View style={{padding: 0, flexDirection:'column', alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                    <Avatar
                                    size='large'
                                    source={Image}
                                    />
                    <Badge 
                    badgeStyle={{height:15,width: 15, borderRadius:50, borderColor: 'white', borderWidth: 1, position: 'absolute'}}
                    status={OnlineStatus ? 'success': 'warning'}
                    containerStyle={{ position: 'absolute', top: 0, right: 12 }}
                    />
            </View>
            <View style={{ justifyContent:'space-around', flexDirection:'column', left: 15}}>
                        <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.8%")} color="#757575" Label={Name} />
                          <View style={{width: wp('60%')}}><AppText  nol={2}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.8%")} color="#757575" Label={Message} /></View>
                    </View>
        </View>

                    
                    <View style={{ alignSelf:'flex-start'}}>
                        <AppText  nol={1}  textAlign="left"  family="Overpass-Regular" size={hp("1.5%")} color="#757575" Label={Time} /> 
                    </View>
          
        </View>
    </View>
    )
 }

 const Styles = StyleSheet.create({
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 150,
        width: 150,
      },
})
 export default MessageList;