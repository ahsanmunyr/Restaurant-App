import React, {useEffect, useState,useRef} from 'react';
import {
   StyleSheet, View, Image,TouchableOpacity
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import { Badge } from 'react-native-elements'
 import Icon from 'react-native-vector-icons/Ionicons';
 const MessageIcon = ({navigation}) => {
    return(
        <TouchableOpacity  onPress={()=> navigation.navigate('message')} style={{right: 17}}>
            <View style={{  backgroundColor:'#EA2C2E', borderWidth: 0, borderRadius: 50, padding: 8 , zIndex: 99999, elevation: 4, justifyContent:'center', flexDirection:"column",alignItems:'center' }}>
                <Badge status='#B01125'    value={1} containerStyle={{  position: 'absolute', top: -11, right: -4, borderWidth:1, borderColor: 'white', borderRadius:50, backgroundColor:'#B01125'}} />
                <Icon name="md-paper-plane-outline" style={{top:1}} size={20} color="white" />
            </View>
        </TouchableOpacity>
    )
 }
 export default MessageIcon;
