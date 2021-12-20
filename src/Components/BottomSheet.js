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
 const BottomSheets = ({
    Id,
    Img,
    Name,
    Price,
    Qty,
    Description,
    RestaurantId,
    addcardQuantity,
    userAddToCart,
    minuscardQuantity
}) => {

    // Id={item.itemId}
    // Img={item.image} 
    // Name={item.title}
    // Price={item.price}
    // Qty={item.qty}
    // Description={item.description}
    // RestaurantId={item.restaurantId}

    const addQty = () => {
        const createOBJ = {
            restaurantId: RestaurantId,
            itemId: Id,
            qty: 1,
            price: Price,
            image: Img,
            title: Name,
            description: Description
        }
        const existItem=userAddToCart.filter(item=>item.itemId==Id)
        if(existItem.length>0){
            addcardQuantity(createOBJ)
        }

    }

    const minusQty = () =>{
        const createOBJ = {
            restaurantId: RestaurantId,
            itemId: Id,
            qty: -1,
            price: Price,
            image: Img,
            title: Name,
            description: Description
        }
        const existItem=userAddToCart.filter(item=>item.itemId==Id)
        if(existItem.length>0){
            minuscardQuantity(createOBJ)
        }
    }
if(Id){
    return(   
        <View style={{marginBottom: 20,  borderColor:'#f54749', height: 90, width: '100%', justifyContent:'space-around', alignSelf:'center', padding: 5, flexDirection:'column' }}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                <View style={{justifyContent:'flex-start', alignItems: 'flex-start', flexDirection:'column', width: '60%', height: 100,left: 10  }}>
                        <TextSample 
                            Label={Name} 
                            Color="black" 
                            Size={hp("2%")} 
                            TextAlign='left'
                            NumberOfLines={2} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        /> 
                        <TextSample 
                            Label={Description} 
                            Color="black" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                    <View style={{justifyContent:'space-between', alignItems:'flex-start', flexDirection:'row', width: '70%',}}>
                        
                        <TextSample 
                            Label={'Price: $' + Price } 
                            Color="#f54749" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                    </View>
                </View>
                <View style={{
                    width:'10%', height: 40, justifyContent:'center', alignItems:'center', flexDirection:'row', alignSelf:'flex-start'
                }}>
                    <TextSample 
                            Label={'X'} 
                            Color="black" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                    <TextSample 
                            Label={Qty} 
                            Color="#f54749" 
                            Size={hp("2.5%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                </View>
            </View>
            <View style={{width: '100%', borderWidth: 0.3, borderColor: 'grey' }} />
        </View>     
    )
            }
}

function mapStateToProps({userAddToCart}){
    return {userAddToCart}
}

export default connect(mapStateToProps,actions)(BottomSheets)
// export default CartItmes;