import React, {useEffect, useState,useRef} from 'react';
import {
  TouchableOpacity,StyleSheet, Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const TouchableOpacityBtnSmall = ({ onPress, title, color }) => {
    return(
        <TouchableOpacity  onPress={onPress} >
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[ color,color]}
            style={styles.touchableOpacity}
            >
            <Text style={styles.touchableOpacityText}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
    )
}
export default TouchableOpacityBtnSmall;
var styles = StyleSheet.create({
    touchableOpacity:{
        borderWidth: 2,
        borderColor: '#f54749',
        width: wp('35%'),
        height: hp('4%'),
        justifyContent: 'center',
        borderRadius: 25,
        elevation: 3, zIndex: 9999
    },
    touchableOpacityText: {
    color: '#f54749',
    fontFamily: 'Overpass-Bold',
      fontSize: hp('1.5'),
      textAlign:'center'
    },
})