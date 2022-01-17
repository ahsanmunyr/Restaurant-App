import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity, View, Text, ImageBackground, StyleSheet, StatusBar, SafeAreaView, FlatList, BackHandler,
  Image, KeyboardAvoidingView, LayoutAnimation, Platform, UIManager, Animated, TouchableHighlight, TextInput, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextSample from '../../Components/Text';
import {
  Avatar
} from 'react-native-paper';
import * as actions from '../../Store/Actions/'
import { connect } from "react-redux";
import AppText from '../../Components/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import LottieView from 'lottie-react-native';
import axios from 'axios'
import MapViewDirections from 'react-native-maps-directions';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, MarkerAnimated } from "react-native-maps";
import { deploy_API } from './../../Config/Apis.json'
import { StackActions } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
const CompleteOrder = ({ navigation, placeOrderStatus }) => {
  const [data, onChangeData] = useState(null);
  const [rest, onChangeRestaurantDetail] = useState(null);
  const [ratting, onChangeRatting] = useState('0');
  const [comment, onChangeComment] = useState('');



  useEffect(() => {

    if (placeOrderStatus.status) {
      alert("SAD")
      onChangeData(placeOrderStatus.data)
      axios.get(`${deploy_API}/api/restaurant/getrestaurant?restaurant_id=${placeOrderStatus.data.restaurant_id}`).then((res) => {
        console.log("=============api/restaurant/getrestaurant?restaurant_id=======================", res.data)
        if (res.data.status) {
          onChangeRestaurantDetail(res.data.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [placeOrderStatus])



  useEffect(() => {
    const backAction = () => {
      navigation.dispatch(StackActions.replace('Home'));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (

    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0.2 }}
      colors={['white', '#f54749']}
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        top: 60, width: '90%',
      }}>
       
        <View style={{
          width: '90%', height: 120,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'flex-start',
        }}>
           <TextSample
          Label={"Order Complete"}
          Color="white"
          Size={hp("4%")}
          TextAlign='center'
          NumberOfLines={1}
          Font="Overpass-SemiBold"
          TextDecorationLine='none'
          TextTransform='none'
        />
          <TextSample
            Label={"Your last delivery"}
            Color="white"
            Size={hp("3%")}
            TextAlign='left'
            NumberOfLines={1}
            Font="Overpass-SemiBold"
            TextDecorationLine='none'
            TextTransform='none'
          />
          <TextSample
            Label={"Dec 16, 2021, 2:08 AM"}
            Color="#F6F6F6"
            Size={hp("1.8%")}
            TextAlign='left'
            NumberOfLines={1}
            Font="Overpass-SemiBold"
            TextDecorationLine='none'
            TextTransform='none'
          />
        </View>

        <View style={{
          
          width: '98%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: 'white',
          borderRadius: 12, elevation: 2,
          flexDirection: 'column'

        }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', width: '100%', padding: 10, elevation: 2, backgroundColor: "white", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>

            {/* <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', backgroundColor:'yellow',}}>
            <Ionicons size={20} name="locate" color="#FF3D58" /> 
         
            <Text style={{
                  width: wp('1%'),
                  height: hp('1%'),
                  borderRadius: 50,
                  textAlign: 'center',
                  backgroundColor: '#ee535d',
                }} />
                <Text style={{
                  width: wp('1%'),
                  textAlign: 'center',
                  height: hp('0.5%'),
                  borderRadius: 50,

                }} />
                <Text style={{
                  width: wp('1%'),
                  height: hp('1%'),
                  textAlign: 'center',
                  borderRadius: 50,
                  backgroundColor: '#ee535d',
                }} />

                <Text style={{
                  width: wp('1%'),
                  height: hp('0.5%'),
                  textAlign: 'center',
                  borderRadius: 50,

                }} />
                 <Text style={{
                  width: wp('1%'),
                  height: hp('1%'),
                  textAlign: 'center',
                  borderRadius: 50,
                  backgroundColor: '#ee535d',
                }} />

                <Text style={{
                  width: wp('1%'),
                  height: hp('0.5%'),
                  textAlign: 'center',
                  borderRadius: 50,

                }} />
           
                <Text style={{
                  width: wp('1%'),
                  height: hp('1%'),
                  borderRadius: 50,
                  textAlign: 'center',
                  backgroundColor: '#ee535d',
                }} />
                <Text style={{
                  width: wp('1%'),
                  textAlign: 'center',
                  height: hp('0.5%'),
                  borderRadius: 50,

                }} />
                <Text style={{
                  width: wp('1%'),
                  height: hp('1%'),
                  textAlign: 'center',
                  borderRadius: 50,
                  backgroundColor: '#ee535d',
                }} />

                <Text style={{
                  width: wp('1%'),
                  height: hp('0.5%'),
                  textAlign: 'center',
                  borderRadius: 50,

                }} />
                 <Text style={{
                  width: wp('1%'),
                  height: hp('1%'),
                  textAlign: 'center',
                  borderRadius: 50,
                  backgroundColor: '#ee535d',
                }} />

                <Text style={{
                  width: wp('1%'),
                  height: hp('0.5%'),
                  textAlign: 'center',
                  borderRadius: 50,

                }} />
                <Text style={{
                  width: wp('1%'),
                  height: hp('1%'),
                  textAlign: 'center',
                  borderRadius: 50,
                  backgroundColor: '#ee535d',
                }} />
                <Ionicons size={20} name="md-navigate-outline" color="#FF3D58" /> 
            

            </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              {/* <Ionicons size={14} name="locate" color="#FF3D58" /> */}
              
              <View style={{alignItems:'flex-start', flexDirection:'column'}}>
              <AppText nol={3} textAlign='center' family="Overpass-Bold" size={hp("1.8%")} color="black" Label={'Order pickup location'} />
              <AppText nol={2} textAlign='left' family="Overpass-Regular" size={hp("2%")} color="grey" Label={'Plot#14, Scheme 24, Adjacent Civic Center, University Road Karachi'} />
              </View>
            
            </View>
          {/* <View style={{marginVertical: 10}}>
            <Text style={{
              width: wp('1%'),
              height: hp('1%'),
              borderRadius: 50,
              textAlign: 'center',
              backgroundColor: '#ee535d',
            }} />
            <Text style={{
              width: wp('1%'),
              textAlign: 'center',
              height: hp('0.5%'),
              borderRadius: 50,

            }} />
            <Text style={{
              width: wp('1%'),
              height: hp('1%'),
              textAlign: 'center',
              borderRadius: 50,
              backgroundColor: '#ee535d',
            }} />

            <Text style={{
              width: wp('1%'),
              height: hp('0.5%'),
              textAlign: 'center',
              borderRadius: 50,

            }} />
            <Text style={{
              width: wp('1%'),
              height: hp('1%'),
              textAlign: 'center',
              borderRadius: 50,
              backgroundColor: '#ee535d',
            }} />
            </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              {/* <Ionicons size={14} name="md-navigate-outline" color="#FF3D58" /> */}
              <View style={{alignItems:'flex-start', flexDirection:'column'}}>
                <AppText nol={3} textAlign='center' family="Overpass-Bold" size={hp("1.8%")} color="black" Label={'Order dropoff location'} />
                <AppText nol={2} textAlign='left' family="Overpass-Regular" size={hp("2%")} color="grey" Label={'P29 Lane 4, D.H.A Phase 6 Bukhari Commercial Area Phase 6 Defence Housing Authority, Karachi, Karachi City, Sindh 75500, Pakistan'} />
              </View>
            
              {/* <AppText nol={3} textAlign='center' family="Overpass-Bold" size={hp("1.8%")} color="black" Label={"   Order dropoff location"} /> */}
            </View>
            {/* <AppText nol={2} textAlign='left' family="Overpass-Regular" size={hp("2%")} color="grey" Label={'29 Lane 4, D.H.A Phase 6 Bukhari Commercial Area Phase 6 Defence Housing Authority, Karachi, Karachi City, Sindh 75500, Pakistan'} /> */}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3, padding: 10, backgroundColor: 'white', width: '100%', top: 3 }}>
            <Avatar.Image
              source={require('./../../Assets/Images/pic4.png')}


              size={60}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '80%' }}>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <AppText nol={3} textAlign='center' family="Overpass-Regular" size={hp("1.5%")} color="black" Label={' Ahsan Muneer'} />
                <AppText nol={3} textAlign='center' family="Overpass-Regular" size={hp("1.5%")} color="grey" Label={' Motorcycle'} />
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <AppText nol={3} textAlign='center' family="Overpass-Regular" size={hp("1.5%")} color="black" Label={'50.00 $'} />
                <AppText nol={3} textAlign='center' family="Overpass-Regular" size={hp("1.5%")} color="grey" Label={'Cash on Delivery'} />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: 140, top: 10  }}>

            <TextSample
              Label={"Rating for driver"}
              Color="grey"
              Size={hp("1.8%")}
              TextAlign='left'
              NumberOfLines={1}
              Font="Overpass-SemiBold"
              TextDecorationLine='none'
              TextTransform='none'
            />
            <Rating style={{ top: 0, height:100 }} imageSize={25} fractions={1} startingValue={ratting} onFinishRating={onChangeRatting} />


          </View>
          <TouchableOpacity 
          onPress={()=>  navigation.dispatch(StackActions.replace('Home'))} 
          style={{ width: '100%', height: 50, backgroundColor: 'white', elevation: 8, position: 'absolute', bottom: 0, borderBottomLeftRadius: 12, borderBottomRightRadius:12 }}>
            <View style={{ width: '100%', height: 50, backgroundColor: 'white',borderBottomLeftRadius: 12, borderBottomRightRadius:12, justifyContent:'center',alignItems:'center'}}>
              <TextSample
                Label={"Submit"}
                Color="#f54749"
                Size={hp("1.8%")}
                TextAlign='left'
                NumberOfLines={1}
                Font="Overpass-ExtraBold"
                TextDecorationLine='none'
                TextTransform='none'
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </LinearGradient>

  )
}

function mapStateToProps({ placeOrderStatus }) {
  return { placeOrderStatus }
}
export default connect(mapStateToProps, actions)(CompleteOrder)



