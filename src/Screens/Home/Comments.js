import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import Avatar from '../../Components/Avatar';
 import AppText from '../../Components/AppText';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
 import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItems'
//  import Carousel, {Pagination } from 'react-native-snap-carousel'


 const Comment = ({img, name, time, message}) => {


    //  console.log(Name)

    //  console.log(route.params)
    return (
          <View style={{ flexDirection:'row', width: '100%', margin: 2, padding: 5, justifyContent:'center', flexDirection:'column',  alignSelf:'center', alignItems:'center'}}>
           <View style={{justifyContent: 'flex-start', flexDirection:'column'}}>
                 <View style={{justifyContent: 'flex-start', flexDirection:'row'}}>
                    <Avatar
                                    size='small'
                                    source={img}
                                    />
                        <View style={{flexDirection:'row', padding: 4,justifyContent:'space-between', alignContent:'center', left:5, width: '80%' }}>
                                <View style={{ justifyContent:'flex-start', flexDirection:'column', padding: 3}}>
                                    <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.9%")} color="black" Label={name} />
                                  
                                </View>
                                <View style={{ justifyContent:'flex-start', flexDirection:'column', padding: 3}}>
                        
                                    <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.5%")} color="grey" Label={time} /> 
                                </View>
                        </View> 
                 </View>
                 <View style={{ justifyContent:'flex-start',alignItems:'flex-start', }}>
                      <AppText  nol={12}  textAlign="left"  family="Overpass-Regular" size={hp("1.9%")} color="black" Label={message} /> 
                </View>  
            </View>
         </View>
     )
 }
 export default Comment;


 const styles = StyleSheet.create({
   

  }); 