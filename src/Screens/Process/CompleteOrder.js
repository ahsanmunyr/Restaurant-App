import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextSample from '../../Components/Text';
import {Avatar} from 'react-native-paper';
import * as actions from '../../Store/Actions/';
import {connect} from 'react-redux';
import AppText from '../../Components/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  MarkerAnimated,
} from 'react-native-maps';
import {deploy_API} from './../../Config/Apis.json';
import {StackActions} from '@react-navigation/native';
import {Rating, AirbnbRating} from 'react-native-ratings';
const CompleteOrder = ({
  navigation,
  placeOrderStatus,
  orderAccept,
  userLogin,orderPlaceDataEmpty
}) => {
  const [data, onChangeData] = useState(null);
  const [rest, onChangeRestaurantDetail] = useState(null);
  const [ratting, onChangeRatting] = useState('0');
  const [comment, onChangeComment] = useState('');
  const [daa, onChangeDaa] = useState(null);
  const [loading, onChangeLoading] = useState(true);
  const [reviewMessage, onChangeReviewMessage] = React.useState('');

  useEffect(() => {
    try {
      let id = userLogin?.user_id;
      axios.get(`${deploy_API}/api/orders/getorderreview?user_id=${id}`)
        .then(response => {
          if (response.data.status) {
            console.log(response.data.data, "COMPLETE ORDER")
            onChangeData(response.data.data);
            onChangeLoading(false);
            orderPlaceDataEmpty()
          }
        })
        .catch(err => {
          console.log('ERROR');
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (placeOrderStatus.status) {
      // alert("SAD")
      onChangeData(placeOrderStatus.data);
      axios
        .get(
          `${deploy_API}/api/restaurant/getrestaurant?restaurant_id=${placeOrderStatus.data.restaurant_id}`,
        )
        .then(res => {
          console.log(
            '=============api/restaurant/getrestaurant?restaurant_id=======================',
            res.data,
          );
          if (res.data.status) {
            onChangeRestaurantDetail(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [placeOrderStatus]);

  useEffect(() => {
    if (orderAccept) {
      console.log(
        '=============COMPLETE ORDER======================',
        orderAccept.data,
      );
      onChangeDaa(orderAccept.data);
    }
  }, [orderAccept]);


  useEffect(() => {
    const backAction = () => {
      navigation.dispatch(StackActions.replace('Home'));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const submitFunction = () => {
    let id = userLogin?.user_id;
    axios.post(`${deploy_API}/api/review/createreview`, {
      user_id: id,
      restaurant_id: data.restaurant_id,
      review_text: reviewMessage,
      rating: ratting
    })
    .then(function (response) {
      if(response.data.status){
        navigation.dispatch(StackActions.replace('Home'))
        showMessage({
          message: "Success",
          description: "Review submitted successfully!!!",
          type: "success",
      });
      }
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      showMessage({
        message: "Error",
        description: "",
        type: "error",
    });
    });
  }

  if (loading) {
    return <LottieView speed={1} style={{ height: '100%', width: '100%', alignSelf: 'center', }} autoPlay loop={true} source={require('./../../Assets/Lottie/loading.json')} />
  } else {
    return (
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0.2}}
        colors={['white', '#f54749']}
        style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1}}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              alignSelf: 'center',
              top: 60,
              width: '90%',
            }}>
            <View
              style={{
                width: '90%',
                height: 120,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'flex-start',
              }}>
              <TextSample
                Label={'Order Complete'}
                Color="white"
                Size={hp('4%')}
                TextAlign="center"
                NumberOfLines={1}
                Font="Poppins-SemiBold"
                TextDecorationLine="none"
                TextTransform="none"
              />
              <TextSample
                Label={'Your last delivery'}
                Color="white"
                Size={hp('3%')}
                TextAlign="left"
                NumberOfLines={1}
                Font="Poppins-SemiBold"
                TextDecorationLine="none"
                TextTransform="none"
              />
              <TextSample
                // Label={'Dec 16, 2021, 2:08 AM'}
                Label={" "+ moment(data.order_created_at).format('MMMM Do YYYY h:mm:ss A')} 
                Color="#F6F6F6"
                Size={hp('1.8%')}
                TextAlign="left"
                NumberOfLines={1}
                Font="Poppins-SemiBold"
                TextDecorationLine="none"
                TextTransform="none"
              />
            </View>

            <View
              style={{
                width: '98%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 12,
                elevation: 2,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'column',
                  width: '100%',
                  padding: 10,
                  elevation: 2,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                      width: '100%',
                    }}>
                    <AppText
                      nol={3}
                      textAlign="center"
                      family="Overpass-Bold"
                      size={hp('1.8%')}
                      color="black"
                      Label={'Order pickup location'}
                    />
                    <AppText
                      nol={2}
                      textAlign="left"
                      family="Overpass-Regular"
                      size={hp('2%')}
                      color="grey"
                      Label={
                        data.order_location
                      }
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Ionicons size={14} name="md-navigate-outline" color="#FF3D58" /> */}
                  <View
                    style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                    <AppText
                      nol={3}
                      textAlign="center"
                      family="Overpass-Bold"
                      size={hp('1.8%')}
                      color="black"
                      Label={'Order dropoff location'}
                    />
                    <AppText
                      nol={2}
                      textAlign="left"
                      family="Overpass-Regular"
                      size={hp('2%')}
                      color="grey"
                      Label={
                        data.restaurant_address
                      }
                    />
                  </View>

                  {/* <AppText nol={3} textAlign='center' family="Overpass-Bold" size={hp("1.8%")} color="black" Label={"   Order dropoff location"} /> */}
                </View>
                {/* <AppText nol={2} textAlign='left' family="Overpass-Regular" size={hp("2%")} color="grey" Label={'29 Lane 4, D.H.A Phase 6 Bukhari Commercial Area Phase 6 Defence Housing Authority, Karachi, Karachi City, Sindh 75500, Pakistan'} /> */}
              </View>
              <View style={{width: '90%', height: 1, backgroundColor:'grey'}}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  elevation: 3,
                  padding: 10,
                  backgroundColor: 'white',
                  width: '100%',
                  // top: 3,
                }}>
                  
                {/* <Avatar.Image
                  source={{uri: `${deploy_API+'/'+data.rider_image}`}} 
              
                  size={60}
                /> */}
             
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}>
                       <AppText
                      nol={3}
                      textAlign="center"
                      family="Overpass-Bold"
                      size={hp('1.8%')}
                      color="black"
                      Label={'Payment Details'}
                    />
                  {/* <View
                    style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                    <AppText
                      nol={3}
                      textAlign="center"
                      family="Overpass-Regular"
                      size={hp('1.5%')}
                      color="black"
                      Label={data.rider_name}
                    />
                    <AppText
                      nol={3}
                      textAlign="center"
                      family="Overpass-Regular"
                      size={hp('1.5%')}
                      color="grey"
                      Label={' Motorcycle'}
                    />
                  </View> */}
                  <View
                    style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                      
                    <AppText
                      nol={3}
                      textAlign="center"
                      family="Overpass-Regular"
                      size={hp('2%')}
                      color="black"
                      Label={"Price  " + data.order_price+ '$'}
                    />
                    <AppText
                      nol={3}
                      textAlign="center"
                      family="Overpass-Regular"
                      size={hp('2%')}
                      color="grey"
                      Label={data.order_payment_method == 1 ? 'Cash on Delivery': 'Card'} 
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                  height: 220,
                  top: 0,
                  alignSelf: 'center',
                }}>
                <TextInput
                  placeholder="Message"
                  placeholderTextColor="grey"
                  style={styles.input}
                  onChangeText={onChangeReviewMessage}
                  value={reviewMessage}
                  multiline
                  textAlignVertical="center"
                  // textAlign='left'
                />
                <TextSample
                  Label={'Rating for restaurant'}
                  Color="grey"
                  Size={hp('1.8%')}
                  TextAlign="left"
                  NumberOfLines={1}
                  Font="Poppins-SemiBold"
                  TextDecorationLine="none"
                  TextTransform="none"
                />
                <Rating
                  style={{top: 0, height: 100}}
                  imageSize={25}
                  fractions={1}
                  startingValue={ratting}
                  onFinishRating={onChangeRatting}
                />
              </View>
              <TouchableOpacity
                onPress={submitFunction}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  width: '100%',
                  height: 50,
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: 0,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextSample
                    Label={'Submit'}
                    Color="#f54749"
                    Size={hp('3%')}
                    TextAlign="left"
                    NumberOfLines={1}
                    Font="Overpass-ExtraBold"
                    TextDecorationLine="none"
                    TextTransform="none"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
};

function mapStateToProps({placeOrderStatus, orderAccept, userLogin}) {
  return {placeOrderStatus, orderAccept, userLogin};
}

var styles = StyleSheet.create({
  input: {
    height: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
    // borderWidth: 1,
    color: 'black',
    width: wp('80%'),
    justifyContent: 'center',
    borderColor: 'black',
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: 'white',
    fontWeight: '200',
    fontSize: hp('2%'),
  },
});

export default connect(mapStateToProps, actions)(CompleteOrder);
