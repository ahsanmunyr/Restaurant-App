import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text,Image,ActivityIndicator
 } from 'react-native';
import TextSample from './Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deploy_API} from  './../Config/Apis.json'
import { TouchableRipple } from 'react-native-paper';
import * as actions from '../Store/Actions'
import {connect} from "react-redux";
const Category = ({
    ID,
    Title,
    Images,
    Quantity,
    Navigation,
    getItem,
    RestaurantID,
    RestaurantCategoryID,
    restInfo
}) => {
    const obj = {
        categoryID: ID ,
        name: Title,
        image: Images,
        quantity: Quantity,
        navigation: 'itemscreen',
        restaurantID: RestaurantID,
        restaurantCategoryID: RestaurantCategoryID,
        }

    const objA = {
        categoryID: ID ,
        title: Title,
        image: Images,
        quantity: Quantity,
        navigation: 'restaurantItemScreen',
        restaurantID: RestaurantID,
        restaurantCategoryID: RestaurantCategoryID,
    }

//     const obj = {
//         restaurantID: RestaurantID ,
//         title: Title,
//         description: Description,
//         images: Images,
//         ratings: Ratings,
//         reviews: Reviews,
//         distance: Distance,
//         status: Status,
//         address: Address,
//         phone: Phone,
//         email: Email,
//         navigation: 'category'
// }

return( 
    <View key={ID} style={{    width: wp('34%'), margin: 10, height: 160,    borderRadius: 12, justifyContent:'center',
            alignItems:'center',   backgroundColor: 'white',
            flexDirection:'column',}}>
        <TouchableRipple
            onPress={() => {  
                Navigation.push('OrderStack', {OBJ: obj});
                restInfo(objA)
                getItem(ID)
            }}
            rippleColor="rgba(96, 28, 29, .09)"
            borderless={false}
            style={{
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 12, padding: 10
                // justifyContent:'center',
                // alignItems:'center',
                // width: wp('34%'), 
                // flexDirection:'column',
                // margin: 10,
                // height: 100,
                // borderRadius: 12,
                // paddingBottom: 6,
                // shadowColor: "#000",
                // shadowOffset: {
                //     width: 0,
                //     height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3.84,

                // elevation: 5
            }}
            >
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                margin: 10,
                borderRadius: 12,
                paddingBottom: 6
                
            }}>
            {/* {console.log(`${deploy_API+'/'+Images}`, "CATEGORY IMAGE")} */}
            <View style={{top: 0, position:'relative'}}>
                {
                Images != null ?
                <Image resizeMode='contain' 
                PlaceholderContent={<ActivityIndicator />}
                    source={{uri: `${deploy_API+'/'+Images}`}} style={{ height: hp('10%'),
                    width: wp('16%'), borderRadius: 12}} />: 
                <Image resizeMode='contain' 
                    source={require('./../Assets/Images/imageNotFound.png')} style={{ height: hp('10%'),
                    width: wp('16%'), borderRadius: 12}} />
                }
            </View>
            <TextSample 
                                            Label={Title} 
                                            Color="black" 
                                            Size={hp("1.4%")} 
                                            TextAlign='left'
                                            NumberOfLines={1} 
                                            Font="Overpass-Bold"
                                            TextDecorationLine='none'
                                            TextTransform='none'
            />
            <TextSample 
                                            Label={Quantity} 
                                            Color="grey" 
                                            Size={hp("1.2%")} 
                                            TextAlign='center'
                                            NumberOfLines={3} 
                                            Font="Poppins-SemiBold"
                                            TextDecorationLine='none'
                                            TextTransform='none'
            />
        </View>  
        </TouchableRipple>
    </View>
    )
}
export default connect(null,actions)(Category)
