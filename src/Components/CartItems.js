import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text, ImageBackground, TouchableOpacity,Image,ActivityIndicator
 } from 'react-native';
 import TextSample from './Text';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import {deploy_API} from  './../Config/Apis.json'
 import * as actions from '../Store/Actions'
import {connect} from "react-redux";
 const CartItmes = ({
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
        <View style={{marginBottom: 10,  borderColor:'#f54749', height: 130, width: '100%', justifyContent:'space-around', alignSelf:'center', padding: 5, borderRadius: 12, }}>
            {console.log(deploy_API+'/'+Img)}
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'   }}>
                        {
                                Img != null ?
                                <Image resizeMode='cover' 
                                PlaceholderContent={<ActivityIndicator />}
                                    source={{uri: `${deploy_API+'/'+Img}`}}   style={{width: 100, height: 100, borderRadius: 12 }} />: 
                                <Image resizeMode='cover' 
                                    source={require('./../Assets/Images/imageNotFound.png')}   style={{width: 100, height: 100, borderRadius: 12 }} />
                        }
                {/* <Image source={Img} resizeMode='contain' style={{width: 90, height: 100, }} /> */}
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

                    <View style={{justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'row', width: '70%',}}>
                    <TextSample 
                            Label={'Price: $'} 
                            Color="#f54749" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                        <TextSample 
                            Label={ Price } 
                            Color="#f54749" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                    </View>
                    <View style={{justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'row', width: '70%',}}>
                    <TextSample 
                            Label={'Total: $'} 
                            Color="#f54749" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                        <TextSample 
                            Label={ Price * Qty } 
                            Color="#f54749" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                    </View>
                    <View style={{height: 30, width: '60%', justifyContent:'space-around', alignSelf:'flex-start', flexDirection:'row', top: 10 }}>
                        <TouchableOpacity onPress={minusQty}>
                                <View style={{width: 40, height: 30, backgroundColor:'grey', borderRadius: 10,   justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="md-remove-outline" style={{}} size={22} color='white' />
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addQty}>
                                <View style={{width: 40, height: 30, backgroundColor:'#f54749', borderRadius: 10,  justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="md-add" style={{}} size={22} color='white' />
                                </View>
                        </TouchableOpacity>
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
                {/* <View style={{
                    width:'30%', height: 50, justifyContent:'space-between', alignItems:'center', flexDirection:'row',
                }}>
                    <TouchableOpacity onPress={minusQty}>
                    <View style={{width: 40, height: 40, backgroundColor:'grey', borderRadius: 3, elevation: 9, zIndex: 999, justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name="md-remove-outline" style={{}} size={19} color='white' />
                    </View>
                    </TouchableOpacity>
                    <TextSample 
                            Label={Qty} 
                            Color="#f54749" 
                            Size={hp("1.4%")} 
                            TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                    <TouchableOpacity onPress={addQty}>
                    <View style={{width: 40, height: 40, backgroundColor:'#f54749', borderRadius: 3, elevation: 9, zIndex: 999, justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name="md-add" style={{}} size={19} color='white' />
                    </View>
                    </TouchableOpacity>
                </View>                     */}
                
            </View>
            
        </View>     
    )
            }
}

function mapStateToProps({userAddToCart}){
    return {userAddToCart}
}

export default connect(mapStateToProps,actions)(CartItmes)
// export default CartItmes;