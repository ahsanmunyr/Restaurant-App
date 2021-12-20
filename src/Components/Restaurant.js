import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text,Image,TouchableOpacity
 } from 'react-native';
import TextSample from './Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deploy_API} from  './../Config/Apis.json'
import * as actions from '../Store/Actions'
import {connect} from "react-redux";

 const Restaurants = ({
    RestaurantID,
    Long,
    Lat,
    OpenTime,
    CloseTime,
    Title,
    Description,
    Images,
    Ratings,
    Reviews,
    Distance,
    Status,
    Address,
    Phone,
    Email,
    Navigation,
    getCategory,
    restInfo
 }) => {

    // const ratingCompleted = (rating) => {
    //     console.log("Rating is: " + rating)
    //   }
    const obj = {
                    restaurantID: RestaurantID ,
                    long: Long,
                    lat: Lat,
                    openTime: OpenTime,
                    closeTime: CloseTime,
                    title: Title,
                    description: Description,
                    images: Images,
                    ratings: Ratings,
                    reviews: Reviews,
                    distance: Distance,
                    status: Status,
                    address: Address,
                    phone: Phone,
                    email: Email,
                    navigation: 'category'
    }
    // console.log(obj, "A")
        return(   
            
            <View key={RestaurantID}  style={{
                height: hp('35%'),
                width: wp('80%'), 
                flexDirection:'column',
                margin: 10,
                borderRadius: 12,
            }}>
                <TouchableOpacity onPress={()=> {
                    // Navigation.navigate('OrderStack', {obj}
                    restInfo(obj)
                    Navigation.push('OrderStack', {OBJ: obj});
                    getCategory(RestaurantID)
                }}>
                <View style={{top: 0, position:'relative'}}>
                    {
                        Images != null ?
                        <Image resizeMode='cover' 
                            source={{uri: `${deploy_API+'/'+Images}`}} style={{ height: hp('25%'),
                            width: wp('80%'), borderRadius: 12}} />: 
                        <Image resizeMode='cover' 
                            source={require('./../Assets/Images/imageNotFound.png')} style={{ height: hp('25%'),
                            width: wp('80%'), borderRadius: 12}} />
                            
                    }
                    
                </View>
                <View style={{ top: 0, left: 2}}>
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
                     <TextSample 
                                        Label={Description} 
                                        Color="grey" 
                                        Size={hp("1.4%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Regular"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                    />
                    {/* <TextSample 
                                            Label={Address} 
                                            Color="grey" 
                                            Size={hp("1.4%")} 
                                            TextAlign='left'
                                            NumberOfLines={1} 
                                            Font="Overpass-Regular"
                                            TextDecorationLine='none'
                                            TextTransform='none'
                    /> */}
                </View>
                <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                    <Rating imageSize={15} readonly startingValue={Ratings}  /> 
                    <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                    <View style={{ 
                                    padding: 5, 
                                    borderRadius: 12, 
                                    backgroundColor:'#e8e8e8',
                                    flexDirection:'row', 
                                    justifyContent:'flex-end', 
                                    alignItems:'flex-start', right: 5
                                }}>
                            <Ionicons name="location-outline" style={{padding: 1}} size={13} color='#f54749' />
                            <TextSample 
                                                Label={(Distance*10).toFixed(2)+" Km"} 
                                                Color="#f54749" 
                                                Size={hp("1.5%")} 
                                                TextAlign='left'
                                                NumberOfLines={1} 
                                                Font="Overpass-Regular"
                                                TextDecorationLine='none'
                                                TextTransform='none'
                            />
                    </View>
                    <View style={{padding: 5, borderRadius: 12, backgroundColor:'#e8e8e8',flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                       <TextSample 
                                            Label={'reviews '} 
                                            Color="#f54749" 
                                            Size={hp("1.4%")} 
                                            TextAlign='left'
                                            NumberOfLines={1} 
                                            Font="Overpass-Regular"
                                            TextDecorationLine='none'
                                            TextTransform='none'
                        /> 
                        <TextSample 
                                            Label={Reviews} 
                                            Color="#f54749" 
                                            Size={hp("1.4%")} 
                                            TextAlign='left'
                                            NumberOfLines={1} 
                                            Font="Overpass-Regular"
                                            TextDecorationLine='none'
                                            TextTransform='none'
                        /> 
                    </View>
                    </View>
                </View>
            </TouchableOpacity>
    </View>  

    )
 }


 export default connect(null,actions)(Restaurants)
//  export default Restaurants;