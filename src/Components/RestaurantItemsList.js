import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text,TouchableOpacity,ActivityIndicator
 } from 'react-native';
import TextSample from './Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deploy_API} from  './../Config/Apis.json'
import * as actions from '../Store/Actions'
import {connect} from "react-redux";
import { TouchableRipple } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Image } from 'react-native-elements';
const RestaurantItemsList = ({
    CategoryID,
    ItemID,
    ItemName,
    ItemPrice,
    ItemStatus,
    Images,
    RestaurantName,
    RestaurantID,
    Ratings,
    Navigation,
    Description,
    addToCartItems,
    userAddToCart,
    addcardQuantity,
}) => {

useEffect(()=>{
        // console.log(userAddToCart)
    },[userAddToCart])

const addToCart = () => {
        const createOBJ = {
            restaurantId: RestaurantID,
            itemId: ItemID,
            qty: 1,
            price: ItemPrice,
            image: Images,
            title: ItemName,
            description: Description
        }
        const existItem=userAddToCart.filter(item=>item.itemId==ItemID)
        const existRest=userAddToCart.filter(item=>item.restaurantId==RestaurantID)
        // console.log(existRest, "EXIST RESTUARANT")
        if (userAddToCart.length > 0){
            if(existRest.length > 0){
                if(existItem.length > 0){
                    addcardQuantity(createOBJ)
                }else{
                    addToCartItems(createOBJ)
                }
            }else{
                showMessage({
                    message: "Warning",
                    description: "Please select the same restaurant item",
                    type: "warning",
                });
            }    
        }else{
            if(existItem.length>0){
                addcardQuantity(createOBJ)
            }else{
                addToCartItems(createOBJ)
            }
        }
    }

return(   
            <TouchableRipple key={ItemID}
                    rippleColor="rgba(96, 28, 29, .09)"
                    borderless={true}
                    onPress={addToCart}
                    style={{width: '95%', alignSelf:'center', height: 130, margin: 5, borderRadius: 12, borderColor: "rgba(96, 28, 29, .1)",  zIndex: 1, backgroundColor:'white'}}
            >
            <View 
            style={{
                height: 130,
                width: wp('95%'), 
                flexDirection:'row',
                borderRadius: 12,
                justifyContent:'space-between',
                alignSelf:'center',
                alignItems:'center',
            }}
            >
                <View style={{ alignItems:'center', height:120, width: '60%',   paddingLeft: 10,  flexDirection:'column', justifyContent:'space-around'}}> 
                        <View style={{ flexDirection:'column', justifyContent:'space-between', height: 50,  width: '100%'}}>
                            <TextSample 
                                                        Label={ItemName} 
                                                        Color="black" 
                                                        Size={hp("2.4%")} 
                                                        TextAlign='left'
                                                        NumberOfLines={2} 
                                                        Font="Overpass-Bold"
                                                        TextDecorationLine='none'
                                                        TextTransform='none'
                            />
                            <TextSample 
                                                        Label={Description} 
                                                        Color="grey" 
                                                        Size={hp("1.8%")} 
                                                        TextAlign='left'
                                                        NumberOfLines={3} 
                                                        Font="Overpass-Regular"
                                                        TextDecorationLine='none'
                                                        TextTransform='none'
                            />
                        </View>
                        <View style={{justifyContent:'space-between', alignItems:'flex-start',alignSelf:'center',   width: '100%', flexDirection: 'row'}}>
                            <TextSample 
                                                        Label={'$'+ItemPrice+',00'} 
                                                        Color="#f54749" 
                                                        Size={hp("1.9%")} 
                                                        TextAlign='left'
                                                        NumberOfLines={1} 
                                                        Font="Overpass-Bold"
                                                        TextDecorationLine='none'
                                                        TextTransform='none'
                            />
                        </View>
                        {/* <View style={{justifyContent:'space-between', alignItems:'flex-start',alignSelf:'center',   width: '100%', flexDirection: 'row'}}>
                                <Rating imageSize={15} readonly startingValue={Ratings}  /> 
                        </View> */}
                </View>
                    <View style={{justifyContent:'center', alignItems:'flex-end', height:180, width: '40%'}}> 
                        {
                                Images != null ?
                                <Image resizeMode='cover' 
                                    
                                    source={{uri: `${deploy_API+'/'+Images}`}}  PlaceholderContent={<ActivityIndicator />} style={{ height: 130,
                                    width: wp('36%'), borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />: 
                                <Image resizeMode='cover' 
                                    source={require('./../Assets/Images/imageNotFound.png')}  PlaceholderContent={<ActivityIndicator />} style={{ height: 130,
                                    width: wp('36%'),borderTopLeftRadius: 20, borderBottomLeftRadius: 20  }} />
                        }
                    </View>
                </View> 
            </TouchableRipple>
    )
}

function mapStateToProps({userAddToCart}){
    return {userAddToCart}
}


export default connect(mapStateToProps,actions)(RestaurantItemsList)
//  export default Restaurants;