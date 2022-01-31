import React, {useEffect, useState,useRef} from 'react';
import {
    View, TextInput,StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const TextInputFeild = ({placeholder, value, onchange, keyboardType, SecureTextEntry, Color}) => {
    return(
                <TextInput
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={Color}
                    style={styles.input}
                    onChangeText={onchange}
                    value={value}
                    caretHidden={false}
                    secureTextEntry={SecureTextEntry}
                    textAlignVertical='bottom'
                />
    )
}
export default TextInputFeild;
var styles = StyleSheet.create({
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
        fontFamily: 'Poppins-SemiBold',
        // backgroundColor:'red',
        fontWeight: '200',
        fontSize: hp('2%'),
    },
    textField: {
        width: wp('95%'),
        justifyContent: 'center',
        flexDirection: 'row',
        
        alignSelf:'center',
    },
})