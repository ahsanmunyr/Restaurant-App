import React, { useEffect,useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Component from './Component';
import Receipt from './../../Components/Receipt'
const ReceiptScreen = ({navigation, userAddToCart}) => {



return (
    <View style={styles.container}>
        <View style={{height: 25, flexDirection:'column', justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                    <TextSample 
                                        Label={"Qty"} 
                                        Color="black" 
                                        Size={hp("1.8%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    /> 
                                    <View style={{width:'35%', height: 20, alignItems:'flex-start'}}>
                                    <TextSample 
                                        Label={"Name"} 
                                        Color="black" 
                                        Size={hp("1.8%")} 
                                        TextAlign='left'
                                        NumberOfLines={3} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />
                                    </View>
                                    <View style={{width:'35%', height: 20, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                                    <TextSample 
                                        Label={"Unit Price"} 
                                        Color="black" 
                                        Size={hp("1.8%")} 
                                        TextAlign='left'
                                        NumberOfLines={3} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />
                                    <TextSample 
                                        Label={"Amt"} 
                                        Color="black" 
                                        Size={hp("1.8%")} 
                                        TextAlign='left'
                                        NumberOfLines={3} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />
                                    </View>
                            </View>
                            <View style={{borderColor:'black', borderStyle:'dashed', borderWidth: 1, borderRadius: 12}}/>
                      </View>
             <View style={{justifyContent:'space-around', alignItems:'center', flexDirection:'column',top: 10}}>
                  <FlatList  
                      bounces
                      bouncesZoom
                      // maintainVisibleContentPosition
                      showsVerticalScrollIndicator={false}
                      data={userAddToCart}
                      style={{width: '100%'}}
                      // contentContainerStyle={{ borderLeftWidth: 0.2}}
                      ListFooterComponent={<View style={{height: 10}}></View>}
                      scrollEnabled
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) => 
                        <Receipt 
                          key={index}  
                          Id={item.itemId}
                          Name={item.title}
                          Price={item.price}
                          Qty={item.qty}
                        />
                      }
                          keyExtractor={(item, index) => index}
                      />
                  </View>
                  <View style={{borderColor:'black', borderStyle:'dashed', borderWidth: 1, borderRadius: 50, width:'100%',top: 5}}/>
    </View>
  );
};


function mapStateToProps({userAddToCart}){
    return {userAddToCart}
  }
  

export default connect(mapStateToProps,actions)(ReceiptScreen)
// export default CartScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width:'100%',
    justifyContent:'center',
  },
  
});
