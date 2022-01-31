import React, {useEffect, useState,useRef} from 'react';
import {
   View,Text,Image
} from 'react-native';
import TextSample from './Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Voucher = ({
   Images,
   Duration,
   Title
}) => {
return(   
         <View style={{
               height: hp('35%'),
               width: wp('80%'), 
               flexDirection:'column',
               margin: 10,
               borderRadius: 12,
            }}>
            <Image resizeMode='cover' 
                  source={Images} style={{ height: hp('20%'),
                  width: wp('80%'), borderRadius: 12}} />
            <View style={{top: 5, flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
               <TextSample 
                              Label={Title} 
                              Color="#292929" 
                              Size={hp("2.1%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Bold"
                              TextDecorationLine='none'
                              TextTransform='none'
               /> 
               <View style={{backgroundColor: '#e8e8e8', padding: 5, borderRadius: 10}}>
               <TextSample 
                              Label={Duration} 
                              Color="#f54749" 
                              Size={hp("1.5%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Poppins-SemiBold"
                              TextDecorationLine='none'
                              TextTransform='none'
               /> 
            </View>
         </View>
   </View>  
)
}
export default Voucher;