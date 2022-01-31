import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  FlatList
} from "react-native";
import TextSample from '../../Components/Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CartItmes from '../../Components/CartItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import * as actions from '../../Store/Actions/'
import {connect} from "react-redux";
import { TouchableRipple } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";
const CartScreen = ({navigation, route, props, userAddToCart, cartItemsClear}) => {

  // useEffect(()=>{

  // })
  ClearBucket = () => {
    cartItemsClear()
  }

  OrderConfirm = () => {
    console.log(userAddToCart)
      if(userAddToCart.length > 0){
            navigation.navigate('ordercartprocess')
      }else{
        showMessage({
            message: "WARNING",
            description: "Cart is empty",
            type: "warning",
        });
      }
  }

return (
    <View style={styles.container}>
            <StatusBar translucent backgroundColor="#f54749" />
          <View style={{position:'absolute', top: 40, width: '100%'}}>
                    <View style={{alignItems:'center', justifyContent:'flex-start'}}>
                        <TextSample 
                            Label="Cart" 
                            Color="black" 
                            Size={hp("3%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                      
                  </View>
          </View>
          <View
            style={{
              width: '90%', justifyContent:'flex-start',
              alignSelf:'center', height: '50%',
              alignItems:'center',
             top: 100, position:'absolute'
            }}
          >
          <FlatList  
                bounces
                bouncesZoom
                // maintainVisibleContentPosition
                showsVerticalScrollIndicator={false}
                data={userAddToCart}
                style={{width: '100%' }}
                contentContainerStyle={{ borderLeftWidth: 0.2}}
                // ListHeaderComponent={<View style={{height:50}}></View>}
                ListFooterComponent={<View style={{height: 10}}></View>}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => 
                  <CartItmes
                      Id={item.itemId}
                      Img={item.image} 
                      Name={item.title}
                      Price={item.price}
                      Qty={item.qty}
                      Description={item.description}
                      RestaurantId={item.restaurantId}
                    />
                }
                    keyExtractor={(item, index) => index}
                />
          </View>
          {/* <View style={{borderWidth:0.15, width: '85%', borderStyle:'dotted', alignSelf:'center', zIndex: 999, elevation: 1, backgroundColor:'white'}} /> */}
          {/* <View
            style={{
              width: '95%', justifyContent:'center',
              alignSelf:'center', height: '40%',
              alignItems:'center',
            }}
          > */}
            <View style={{width: '90%', height: '20%',position: 'absolute', bottom: 100, justifyContent: 'flex-end', alignSelf:'center' }}  >
              <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
              {/* <TextSample 
                            Label="Reciept" 
                            Color="black" 
                            Size={hp("2%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        /> */}
              {/* <View style={{justifyContent:'space-between', width: '100%', alignItems:'center', flexDirection:'row', top: 3}}> 
              <TextSample 
                            Label="Subtotal" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              <TextSample 
                            Label="$ 100.00" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              </View> */}
              {/* <View style={{justifyContent:'space-between', width: '100%', alignItems:'center', flexDirection:'row', top: 2}}> 
              <TextSample 
                            Label="VAT (0.00%)" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              <TextSample 
                            Label="$ 0.00" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              </View> */}
              {/* <View style={{justifyContent:'space-between', width: '100%', alignItems:'center', flexDirection:'row',}}> 
              <TextSample 
                            Label="Delivery Fee" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              <TextSample 
                            Label="$ 0.00" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              </View> */}
              {/* <View style={{justifyContent:'space-between', width: '100%', alignItems:'center', flexDirection:'row', marginBottom: 10}}> 
              <TextSample 
                            Label="Discount" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              <TextSample 
                            Label="$ 0.00" 
                            Color="black" 
                            Size={hp("1.9%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-thin"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              </View> */}
              {/* <View style={{borderWidth:0.15, width: '100%', borderStyle:'dotted', alignSelf:'center', zIndex: 999, elevation: 1, backgroundColor:'white'}} /> */}
              {/* <View style={{justifyContent:'space-between', width: '100%', alignItems:'center', flexDirection:'row',}}> 
              <TextSample 
                            Label="Total" 
                            Color="black" 
                            Size={hp("2%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              <TextSample 
                            Label="$ 100.00" 
                            Color="black" 
                            Size={hp("2%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
              </View> */}
              <View style={{borderWidth:2 , width: '100%',borderRadius: 12, borderStyle:'dotted', alignSelf:'center',  borderColor:'#f54749', bottom: 10 }} />
           
              <View style={{height: 0, justifyContent:'space-around', flexDirection:'column',alignItems:'center', width: '100%'}} >
              {/* <TouchableRipple   
                borderless={true}
                rippleColor="rgba(255, 255, 255, .2)" 
                onPress={()=> console.log("RED")}
                style={{
                  width: '95%', 
                  alignSelf:'center', 
                  height: 40,
                  borderRadius: 12, 
                  borderColor: "rgba(96, 28, 29, .1)", 
                  elevation: 3, zIndex: 1, 
                  backgroundColor:'#f54749',
                  justifyContent:'center',
                  alignItems:'center'
                }}
              >
              <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row',  width: '100%',}}>
                <View style={{flexDirection:'row', padding: 5}}>
                <MaterialCommunityIcons name="label-percent-outline" style={{}} size={22} color='white' />
                <TextSample 
                             Label=" Add Promo Code" 
                             Color="white" 
                             Size={hp("2.1%")} 
                             TextAlign='left'
                             NumberOfLines={1} 
                             Font="Overpass-Regular"
                             TextDecorationLine='none'
                             TextTransform='none'
                        />
                </View>
                 <MaterialIcons name="keyboard-arrow-right" style={{}} size={22} color='white' />
              </View>

              </TouchableRipple> */}
              {/* <TouchableRipple   
                borderless={true}
                rippleColor="rgba(255, 255, 255, .2)" 
                onPress={()=> console.log("RED")}
                style={{
                  width: '95%', 
                  alignSelf:'center', 
                  height: 40,
                  borderRadius: 12, 
                  borderColor: "rgba(96, 28, 29, .1)", 
                  elevation: 3, zIndex: 1, 
                  backgroundColor:'#f54749',
                  justifyContent:'center',
                  alignItems:'center'
                 }}
              >
              <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row', width: '100%'}}>
                <View style={{flexDirection:'row', padding: 5}}>
                <MaterialCommunityIcons name="cash-register" style={{}} size={22} color='white' />
                <TextSample 
                             Label=" Payment Method" 
                             Color="white" 
                             Size={hp("2.1%")} 
                             TextAlign='left'
                             NumberOfLines={1} 
                             Font="Overpass-Regular"
                             TextDecorationLine='none'
                             TextTransform='none'
                        />
                </View>
                <View style={{backgroundColor:'#f54749', right: 10, borderRadius: 5, width: 120, alignItems:'center', borderColor: 'white', borderWidth: 2, borderStyle:'dotted' }}>
                <TextSample 
                             Label="Card" 
                             Color="white" 
                             Size={hp("2.1%")} 
                             TextAlign='left'
                             NumberOfLines={1} 
                             Font="Overpass-Regular"
                             TextDecorationLine='none'
                             TextTransform='none'
                        />
                </View>
              </View>
              </TouchableRipple> */}
              </View>
              </View>
              <View style={{justifyContent:'space-around', alignItems:'center', marginTop: 10, height: 100, bottom: 10  }}>
              <TouchableOpacityBtn  

                                onPress={ClearBucket}
                                title="CLEAR BUCKET"
                    />
              <TouchableOpacityBtn  
              // navigation.navigate('ordercartprocess')
                                onPress={OrderConfirm}
                                title="ORDER CONFIRM"
                    />
              </View>
            </View>
          {/* </View> */}
    </View>
  );
};


function mapStateToProps({userAddToCart}){
  return { userAddToCart}
}

export default connect(mapStateToProps,actions)(CartScreen)
// export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'white'
  },
  
});
