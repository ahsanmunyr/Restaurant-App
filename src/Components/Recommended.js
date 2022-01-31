import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text,Image,ActivityIndicator
 } from 'react-native';
import TextSample from './Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
 const Recommended = ({
    Coordinate,
    Title,
    Description,
    Images,
    Ratings,
    Reviews,
    Distance,
    Status,
    Address
 }) => {

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
      }
      
        return(   
            <View style={{
                height: hp('35%'),
                width: wp('40%'), 
                flexDirection:'column',
                margin: 10,
                borderRadius: 12,
                
               }}>
                <View style={{top: 0, position:'relative'}}>
                    <Image resizeMode='cover' 
                     PlaceholderContent={<ActivityIndicator />}
                    source={Images} style={{ height: hp('20%'),
                    width: wp('40%'), borderRadius: 12}} />
                </View>
                <View style={{ top: 0, left: 2}}>
                    <TextSample 
                                        Label={Title} 
                                        Color="#292929" 
                                        Size={hp("2.1%")} 
                                        TextAlign='left'
                                        NumberOfLines={3} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                    />
                   
                    <TextSample 
                                            Label={Address} 
                                            Color="grey" 
                                            Size={hp("1.4%")} 
                                            TextAlign='left'
                                            NumberOfLines={3} 
                                            Font="Overpass-Regular"
                                            TextDecorationLine='none'
                                            TextTransform='none'
                    />
                </View>
                <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center'}}>
                    <Rating imageSize={15} readonly startingValue={Ratings}  /> 
                </View>
            </View>  
    )
 }
 export default Recommended;