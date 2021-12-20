import React, {useEffect, useState,useRef} from 'react';
import {
  TouchableOpacity,StyleSheet, Text
} from 'react-native';
import {  Badge } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const AddCartBtn = ({ onPress, title, Count }) => {
    return(
        <TouchableOpacity  onPress={onPress} >
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[ 'red','#f54749']}
            style={styles.touchableOpacity}
            >
            <Text style={styles.touchableOpacityText}>{title}</Text>
            <Badge  value={Count} badgeStyle={{ backgroundColor:'#f54749', borderWidth: 1}}  />
          
          </LinearGradient>
        </TouchableOpacity>
    )
}
export default AddCartBtn;
var styles = StyleSheet.create({
    touchableOpacity:{
        borderWidth: 2,
        borderColor:  'white',
        width: wp('60%'),
        height: hp('6%'),
        justifyContent: 'space-around',
        borderRadius: 30,
        elevation: 99, zIndex: 9999,
        flexDirection:'row', 
        alignItems:'center',
    },
    touchableOpacityText: {
    color: 'white',
    fontFamily: 'Overpass-Bold',
      fontSize: hp('2'),
      textAlign:'center'
    },
})