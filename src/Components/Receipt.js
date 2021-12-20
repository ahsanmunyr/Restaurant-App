import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text, ImageBackground, TouchableOpacity,Image
 } from 'react-native';
 import TextSample from './Text';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import {deploy_API} from  './../Config/Apis.json'
 import * as actions from '../Store/Actions'
import {connect} from "react-redux";
 const Receipt = ({
    Id,
    Name,
    Price,
    Qty,
}) => {



  
    
return(   <View style={{width:'100%'}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
                        <TextSample 
                            Label={Qty} 
                            Color="black" 
                            Size={hp("2%")} 
                            TextAlign='left'
                            NumberOfLines={2} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                        /> 
                        <View style={{width:150, height: 20, alignItems:'flex-start',}}>
                        <TextSample 
                            Label={Name} 
                            Color="black" 
                            Size={hp("2%")} 
                            // TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                        </View>
                        <TextSample 
                            Label={Price} 
                            Color="black" 
                            Size={hp("2%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                
                <TextSample 
                            Label={Price * Qty} 
                            Color="black" 
                            Size={hp("2%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                
                    
                
            </View>
        </View>
    )    
}

function mapStateToProps({userAddToCart}){
    return {userAddToCart}
}

export default connect(mapStateToProps,actions)(Receipt)
// export default CartItmes;