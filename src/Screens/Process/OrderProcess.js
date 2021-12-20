import React, {
  useEffect,
  useState,
  useRef,
  useMemo
} from 'react';
import * as actions from '../../Store/Actions/'
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform, Linking,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
  BackHandler,
  Dimensions,Alert
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import TextSample from '../../Components/Text';
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
// import {useNavigation} from "@react-navigation/native"

const OrderProcess = ({ navigation, restaurantInfo, orderAccept, placeOrderStatus, userLogin, acceptOrderDetails, userLatitudeLongitude, riderCoord, orderDetails,saveNavigatorVariable, firebaseData }) => {
  // const navigation=useNavigation()
  // const [data, onChangeData] = useState(null)
  const [fullScreens, onChangeFullScreen] = useState(false)
  const { width, height } = Dimensions.get('window')
  const [lottifiles, onChangeLottifiles] = useState(require('./../../Assets/Lottie/loading.json'))
  const [location, onChangeLocation] = useState("")
  const [restaurantID, onChangeRestaurantID] = useState(null)
  const [restaurantDetail, onChangeRestaurantDetail] = useState(null)
  const [name, onChangeName] = useState("")
  const [time, onChangeTime] = useState("")
  const [title, onChangeTitle] = useState("")
  const [message, onChangeMessage] = useState("")
  const [dataa, onChangeDataa] = useState(null)
  const [orderData, onChangeOrderData] = useState(null)
  const [showMap, onChangeShowMap] = useState(false)
  const [mapRef, updateMapRef] = useState(null);
  const [loading, updateLoading] = useState(false);
  const [markerRef, updateMapmarkerRef] = useState(null);
  const [status, onChangeStatus] = useState(0);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCAcgEQMvho7rnMg-cV7wLEZjJLoH50ehk';
  const ASPECT_RATIO = width / height
  const LATITUDE_DELTA = 0.05
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  const animatedFullScreen = React.useRef(new Animated.Value(80)).current;
  const [userCoords, setUserCoords] = React.useState({
    latitude: 24.788982,
    longitude: 67.066329,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [restaurantCoords, setRestaurantCoords] = React.useState({
    latitude: 24.788982,
    longitude: 67.066329,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });


  const [riderCoords, onChangeRiderCoords] = React.useState(new AnimatedRegion({
    latitude: 24.788982,
    longitude: 67.066329,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }))

  const x = useMemo(() => {

    if (riderCoord.condition) {
      console.log(riderCoord.data, "---------------RIDER COORDS-------------------------")
      onChangeRiderCoords({
        latitude: parseFloat(riderCoord.data.lat),
        longitude: parseFloat(riderCoord.data.long),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
    }

  }, [riderCoord])

  useEffect(()=>{
    saveNavigatorVariable(navigation)
  },[])

  useEffect(() => {
    if (restaurantID) {
      axios.get(`${deploy_API}/api/restaurant/getrestaurant?restaurant_id=${restaurantID}`).then((res) => {
        console.log("=============api/restaurant/getrestaurant?restaurant_id=======================", res.data)
        if (res.data.status) {
          onChangeRestaurantDetail(res.data.data)
        }
      }).catch((err) => {
        console.log(err)
      })
      // alert(restaurantID)
    }

  }, [restaurantID])
  // MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS
  // {"assigned_to": 0, 
  // "order_created_at": "2021-12-14T07:35:59.000Z", 
  // "order_id": 11, 
  // "order_is_deleted": 0, 
  // "order_latitude": "24.792994", 
  // "order_location": "Q3V7+5W Defence Housing Authority, Karachi, Pakistan", 
  // "order_longitude": "67.064844", 
  // "order_payment_method": "1", 
  // "order_price": "110", 
  // "order_remarks": "TEST REMARK", 
  // "order_status": 2, 
  // "restaurant_id": 1, 
  // "user_id": 4}, 
  // "msg": "Order details fetched successfully", 
  // "status": true}


  useEffect(() => {
    console.log(userLogin, "USER DETAILS")
    onChangeOrderData(userLogin)
    // orderDetails(userLogin.user_id)
    axios.get(`${deploy_API}/api/orders/getuserorderdetails?user_id=${userLogin.user_id}`).then((res) => {
      console.log(res.data, "=======================/api/orders/getuserorderdetails?user_id IN FUNCTION=======================")
      if (res.data.status) {
        // orderDetailsInFunctionComponent(res)
        console.log(res.data.data, "AS")
        updateLoading(true)
        onChangeRestaurantID(res.data.data.restaurant_id)
        onChangeStatus(res.data.data.order_status)
        // if(res.data.data.order_status == 1){
        //   navigation.navigate('Home')
        // }
        if (res.data.data.order_status == 2) {
          // location("48C Lane 9, Bukhari Commercial Area Phase 6 DHA karachi, Karachi, Karachi City, Sindh 75500, Pakistan")
          // name("Restaurant Name")
          // alert("SAD")
          // const [location, onChangeLocation] = useState("")
          // const [name, onChangeName] = useState("")
          // const [time, onChangeTime] = useState("")

          onChangeLocation(res.data.data.order_location)
          onChangeTitle("Order Placed")
          onChangeMessage("Thank you, your order has been placed. Wait for restaurant approval")
          onChangeLottifiles(require('./../../Assets/Lottie/OPS.json'))
          onChangeShowMap(false)
          //order acceptrequire('./../../Assets/Lottie/OPS.json')
          // onChangeLottifiles
        }
        if (res.data.data.order_status == 6) {
          onChangeTitle("Order Accepted")
          onChangeMessage("Thank you, your order has been accepted. Waiting for rider approval")
          onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
          //approved by admin
          onChangeShowMap(false)
          // onChangeLottifiles()
        }
        if (res.data.data.order_status == 4) {
          onChangeTitle("Rider Accepted")
          onChangeMessage("Rider has accepted your order")
          // acceptOrderDetails(res.data.data.order_id)
          acceptOrderDetails(userLogin.user_id)
          onChangeShowMap(false)
          // onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
        }
        if (res.data.data.order_status == 7) {
          onChangeTitle("Rider On The Way")
          onChangeMessage("Rider has start the ride")
          // acceptOrderDetails(res.data.data.order_id)
          acceptOrderDetails(userLogin.user_id)
          onChangeShowMap(true)
          // onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
        }

        if (res.data.data.order_status == 8) {
          onChangeTitle("Rider Picked Order")
          onChangeMessage("Rider has pick up your order")
          // acceptOrderDetails(res.data.data.order_id)
          acceptOrderDetails(userLogin.user_id)
          onChangeShowMap(true)
          // onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
        }
        if (res.data.data.order_status == 9) {
          onChangeTitle("Rider Arrived")
          onChangeMessage("Rider has arrived. Please pickup your order from the rider.")
          onChangeShowMap(false)
          // acceptOrderDetails(res.data.data.order_id)
          acceptOrderDetails(userLogin.user_id)
          // onChangeShowMap(true)
          // onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
        }

      }
    })

    // return navigation.dispatch(StackActions.replace('Home'));
  }, [userLogin, firebaseData])

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

  useEffect(() => {
    console.log(orderAccept, "=======================ss=======================")
    if (orderAccept.order) { // true or false

      onChangeDataa(orderAccept.data)

      setRestaurantCoords({
        latitude: parseFloat(orderAccept.data.restaurant_latitude),
        longitude: parseFloat(orderAccept.data.restaurant_longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
      console.log(orderAccept.data, "=======================setRestaurantCoords=======================")
      updateLoading(true)
      onChangeRestaurantID(orderAccept.data.restaurant_id)
      onChangeStatus(orderAccept.data.order_status)
      
      // if(orderAccept.data.order_status == 1){
      //   navigation.navigate('Home')
      // }
      if (orderAccept.data.order_status == 2) {
        // location("48C Lane 9, Bukhari Commercial Area Phase 6 DHA karachi, Karachi, Karachi City, Sindh 75500, Pakistan")
        // name("Restaurant Name")
        onChangeLocation(res.data.data.order_location)
        onChangeTitle("Order Placed")
        onChangeMessage("Thank you, your order has been placed. Wait for restaurant approval")
        onChangeLottifiles(require('./../../Assets/Lottie/OPS.json'))
        onChangeShowMap(false)
        //order accept
        // onChangeLottifiles
      }
      if (orderAccept.data.order_status == 6) {
        onChangeTitle("Order Accepted")
        onChangeMessage("Thank you, your order has been accepted. Waiting for rider approval")
        onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
        //approved by admin
        onChangeShowMap(false)
        //approved by admin
        // onChangeLottifiles()
      }
      if (orderAccept.data.order_status == 4) {
        onChangeTitle("Rider Accepted")
        onChangeMessage("Rider has accepted your order")
        // acceptOrderDetails(res.data.data.order_id)
        // acceptOrderDetails(userLogin.user_id)
        onChangeLottifiles(require('./../../Assets/Lottie/your.json'))
        onChangeShowMap(false)
        // onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
      }
      if (orderAccept.data.order_status == 7) {
        onChangeTitle("Rider On The Way")
        onChangeMessage("Rider has start the ride")
        // acceptOrderDetails(res.data.data.order_id)
        // acceptOrderDetails(orderData.user_id)
        onChangeShowMap(true)

      }
      if (orderAccept.data.order_status == 8) {
        onChangeTitle("Rider Picked Order")
        onChangeMessage("Rider has pick up your order")
        onChangeShowMap(true)
        //approved by admin
        // onChangeLottifiles()
      }
      if (orderAccept.data.order_status == 9) {
        onChangeTitle("Rider Arrived")
        onChangeMessage("Rider has arrived. Please pickup your order from the rider.")
        onChangeShowMap(false)
        onChangeLottifiles(require('./../../Assets/Lottie/arrived.json'))
        // onChangeShowMap(true)
        //approved by admin
        // onChangeLottifiles()
      }
      // if(orderAccept.data.order_status == 9){
      //   onChangeTitle("Rider Arrived")
      //     onChangeMessage("Rider has arrived")
      //     // onChangeShowMap(true)
      //   //approved by admin
      //   // onChangeLottifiles()
      // }
      // if(orderAccept.data.order_status == 4){
      //   onChangeTitle("Rider Accepted")
      //   onChangeMessage("Rider has accepted your order")
      //   acceptOrderDetails(orderAccept.data.order_id)
      //   // onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
      // }
    }
  }, [orderAccept])


  // useEffect(()=>{
  //   if(firebaseData){
  //     console.log(firebaseData.data)
    //   if (firebaseData.data.data.type == "approveorder") {
    //   onChangeTitle("Order Accepted")
    //   onChangeMessage("Thank you, your order has been accepted. Waiting for rider approval")
    //   onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
    //   onChangeShowMap(false)
    // }
    // if (firebaseData.data.data.type == "acceptorder") {
    //   onChangeTitle("Order Accepted")
    //   onChangeMessage("Thank you, your order has been accepted. Waiting for rider approval")
    //   onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
    //   onChangeShowMap(true)
    // }
    // if (firebaseData.data.data.type == "ridercoords") {
    //     onChangeTitle("Rider Accepted")
    //     onChangeMessage("Rider has accepted your order")
    //     // acceptOrderDetails(res.data.data.order_id)
    //     // acceptOrderDetails(userLogin.user_id)
    //     onChangeLottifiles(require('./../../Assets/Lottie/your.json'))
    //     onChangeShowMap(false)
    // }                                                                                              
    // if (firebaseData.data.data.type == "pickorder") {
    //   onChangeTitle("Rider Picked Order")
    //   onChangeMessage("Rider has pick up your order")
    //   onChangeShowMap(true)
    // }
    // if (firebaseData.data.data.type == "arriveorder") {
    //   onChangeTitle("Rider Arrived")
    //   onChangeMessage("Rider has arrived")
    //   onChangeShowMap(false)
    //   onChangeLottifiles(require('./../../Assets/Lottie/arrived.json'))
    // }
    // if (firebaseData.data.data.type == "rejectorder") {
    //   onChangeTitle("Order Rejected")
    //   onChangeMessage("We are sorry, your order has been rejected. Please try again.")
    //   onChangeLottifiles(require('./../../Assets/Lottie/crossCancel.json'))
    //   onChangeShowMap(false)
    // }
    // if (firebaseData.data.data.type == "declineorder") {
    //   onChangeTitle("Order Decline")
    //   onChangeMessage("We are sorry, your order has been rejected. Please try again.")
    //   onChangeLottifiles(require('./../../Assets/Lottie/crossCancel.json'))
    //   onChangeShowMap(false)
    // }
    // }
   
    
  // },[firebaseData])
//   if (remoteMessage.data.type == "approveorder") {
//     acceptOrderDetails(userID)
// }
// if (remoteMessage.data.type == "acceptorder") {
//     acceptOrderDetails(userID)
// }
// if (remoteMessage.data.type == "ridercoords") {
//     acceptOrderDetails(userID)
//     firebaseCoordsRider(remoteMessage.data)
// }
// if (remoteMessage.data.type == "startride") {
//     acceptOrderDetails(userID)
// }
// if (remoteMessage.data.type == "pickorder") {
//     acceptOrderDetails(userID)
// }
// if (remoteMessage.data.type == "arriveorder") {
//     acceptOrderDetails(userID)
// }
// if (remoteMessage.data.type == "completeorder") {
//     orderDataClear()
//     onChangeStatus(false)
// }
// if (remoteMessage.data.type == "rejectorder") {
//     orderDataClear()
//     onChangeStatus(false)
// }
// if (remoteMessage.data.type == "declineorder") {
//     orderDataClear()
//     onChangeStatus(false)
// }
  //   {
  //     "data":{
  //        "assigned_to":6,
  //        "order_created_at":"2021-11-25T10:20:06.000Z",
  //        "order_id":5,
  //        "order_is_deleted":0,
  //        "order_latitude":"24.7929966",
  //        "order_location":"48C Lane 9, Bukhari Commercial Area Phase 6 DHA karachi, Karachi, Karachi City, Sindh 75500, Pakista",
  //        "order_longitude":"67.0648322",
  //        "order_payment_method":"1",
  //        "order_price":"50",
  //        "order_remarks":"TEST REMARK",
  //        "order_status":4,
  //        "restaurant_address":"KFC - Gulshan-e-Iqbal, Block 7 Gulshan-e-Iqbal, Karachi",
  //        "restaurant_email":"farooq.khan@gmail.com",
  //        "restaurant_id":1,
  //        "restaurant_image":"uploads/1637139878931rest4.jpg",
  //        "restaurant_latitude":"24.9180588",
  //        "restaurant_longitude":"67.0947953",
  //        "restaurant_name":"sasaas",
  //        "restaurant_phone":"11223344556",
  //        "rider_email":"ahsanmuneer81@gmail.com",
  //        "rider_id":6,
  //        "rider_name":"M Ahsan Muneer",
  //        "user_id":4
  //     },
  //     "msg":"Order details fetched successfully",
  //     "status":true
  //  }
  // useEffect(()=>{
  //   if(dataa){
  //     if(dataa.order_status == 4){
  //       onChangeTitle("Rider Accepted")
  //       onChangeMessage("Rider has accepted your order")
  //       acceptOrderDetails(dataa.order_id)
  //       // onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
  //     }
  //   }
  // },[dataa])

  // useEffect(()=>{

  //   axios.get(`${deploy_API}/api/orders/getclientorderdetails?user_id=${userID}`)

  // },[])

  // useEffect(()=>{

  //     return navigation.addListener('blur',()=>{
  //       navigation.navigate('Home')
  //     })
  // },[navigation])

  //   const setUserLocation = (coordinate) => {
  //     const Delta = 0.025
  //     //alert("User location changed MAP SHOULDNT MOVE")
  //     setRiderCoords({
  //         latitude: coordinate.latitude,
  //         longitude: coordinate.longitude,
  //         latitudeDelta: Delta,
  //         longitudeDelta: Delta
  //     })
  // }

  const onRegionChange = (mark) => {
    const Delta = 0.025
    // console.log(mark.nativeEvent.coordinate)
    // console.log(mark)
    setRestaurantCoords({
      latitude: mark.nativeEvent.coordinate.latitude,
      longitude: mark.nativeEvent.coordinate.longitude,
      latitudeDelta: Delta,
      longitudeDelta: Delta
    })
  }


  const openMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${restaurantCoords.latitude},${restaurantCoords.longitude}`;
    const label = dataa.restaurant_name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
  }

  const directCall = () => {
    Linking.openURL(`tel:+${parseInt(dataa.restaurant_phone)}`)
  }

  const sendMessage = () => {
    const num = `${parseInt(dataa.restaurant_phone)}`
    Linking.openURL(`sms:${num}?body=rider body`)
  }


  const fullScreen = () => {
    if (!fullScreens) {
      onChangeFullScreen(true)
      Animated.timing(
        animatedFullScreen, {
        toValue: -hp('60%'),
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    else {
      onChangeFullScreen(false)
      Animated.timing(
        animatedFullScreen,
        {
          toValue: 90,
          duration: 500,
          useNativeDriver: false,
        }).start();
    }
  }



  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#f54749" />

      <View style={{ position: 'absolute', top: 80, width: '75%', flexDirection: 'column', alignSelf: 'center', }}>
        <View style={{ alignItems: 'center' }}>
          <TextSample
            Label={title}
            Color="black"
            Size={hp("3%")}
            TextAlign='left'
            NumberOfLines={1}
            Font="Overpass-Bold"
            TextDecorationLine='none'
            TextTransform='none'
          />
          <TextSample
            Label={message}
            Color="black"
            Size={hp("2%")}
            TextAlign='center'
            NumberOfLines={3}
            Font="Overpass-Regular"
            TextDecorationLine='none'
            TextTransform='none'
          />
        </View>
      </View>
      <>
        {
          showMap ?
            <>
             <Animated.View style={{
              zIndex: 9,
              position: 'absolute', top: animatedFullScreen ,width: '90%', height: '10%',
              flexDirection: 'column', borderRadius: 20, alignItems:'center', justifyContent:'center',
              elevation: 6, backgroundColor: '#f54749', alignSelf: 'center', margin: 5
            }}>
               
                <TextSample
                  Label={title}
                  Color="white"
                  Size={hp("3%")}
                  TextAlign='left'
                  NumberOfLines={1}
                  Font="Overpass-Bold"
                  TextDecorationLine='none'
                  TextTransform='none'
                />
                <TextSample
                  Label={message}
                  Color="white"
                  Size={hp("2%")}
                  TextAlign='center'
                  NumberOfLines={3}
                  Font="Overpass-Regular"
                  TextDecorationLine='none'
                  TextTransform='none'
                />
          
            </Animated.View>
              <MapView
                onMarkerDragEnd={onRegionChange}
                ref={(ref) => updateMapRef(ref)}
                zoomControlEnabled
                // onRegionChange={onRegionChange}
                zoomEnabled={false}
                style={{ width: '100%', height: '100%', position: 'relative' }}
                provider={PROVIDER_GOOGLE}
                onMapReady={() => {
                  mapRef.fitToCoordinates([riderCoords, restaurantCoords], {
                    animated: true,
                    edgePadding: {
                      top: 150,
                      right: 50,
                      bottom: 100,
                      left: 50,
                    },
                  });
                }}
              >
                <MarkerAnimated
                  ref={(ref) => updateMapmarkerRef(ref)}
                  coordinate={riderCoords}
                  title={"Rider Location"}
                  identifier={'mk1'}
                />
                <Marker
                  identifier={'mk2'}
                  coordinate={{
                    "latitude": restaurantCoords.latitude,
                    "longitude": restaurantCoords.longitude
                  }}
                  title={"Restaurant Location"}
                />
                <MapViewDirections
                  strokeColor="#FF3D58"
                  splitWaypoints={true}
                  origin={riderCoords}
                  destination={restaurantCoords}
                  strokeWidth={5}
                  apikey={GOOGLE_MAPS_APIKEY}
                />

              </MapView>
            </>
            :
            <>
              <View style={{ alignItems: 'center', alignSelf: 'center', bottom: 60, width: '90%', height: '40%' }}>
                {
                  lottifiles ?
                    <LottieView speed={1} style={{ height: '100%', width: '100%', alignSelf: 'center', }} autoPlay loop={true} source={lottifiles} /> : null
                }
              </View>




            </>
        }
      </>
      <Animated.View style={{
        zIndex: 9,
        position: 'absolute', bottom: animatedFullScreen,
        alignContent: 'center', width: '90%', height: '20%',
        flexDirection: 'column', borderRadius: 20,
        elevation: 6, backgroundColor: '#f54749', alignSelf: 'center', margin: 10
      }}>
        <View style={{ margin: 5, padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="restaurant" style={{}} size={25} color='white' />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', left: 10 }}>
            <TextSample
              Label={restaurantDetail?.restaurant_name}
              Color="white"
              Size={hp("1.8%")}
              TextAlign='left'
              NumberOfLines={3}
              Font="Overpass-Bold"
              TextDecorationLine='none'
              TextTransform='none'
            />
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: 'white', width: '100%' }} />

        <View style={{ margin: 5, padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="md-location" style={{}} size={25} color='white' />
          </View>
          <View style={{ alignItems: 'flex-start', justifyContent: 'center', left: 10 }}>

            <TextSample
              Label={restaurantDetail?.restaurant_address}
              Color="white"
              Size={hp("1.8%")}
              TextAlign='left'
              NumberOfLines={3}
              Font="Overpass-Regular"
              TextDecorationLine='none'
              TextTransform='none'
            />
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: 'white', width: '100%' }} />

        <View style={{ margin: 5, padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
            <Foundation name="dollar-bill" style={{}} size={25} color='white' />
          </View>
          <View style={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', left: 10 }}>
            <TextSample
              Label={"Payment Type: "}
              Color="white"
              Size={hp("1.8%")}
              TextAlign='left'
              NumberOfLines={3}
              Font="Overpass-Regular"
              TextDecorationLine='none'
              TextTransform='none'
            />
            <TextSample
              Label={"Cash on Delivery"}
              Color="white"
              Size={hp("1.8%")}
              TextAlign='left'
              NumberOfLines={3}
              Font="Overpass-Regular"
              TextDecorationLine='none'
              TextTransform='none'
            />
          </View>
        </View>
      </Animated.View>
      <View
        style={{
          width: '90%',
          position: 'absolute',
          height: '10%', alignItems: 'center',
          bottom: 10, alignSelf: 'center',
          elevation: 6, backgroundColor: '#f54749',
          zIndex: 999, borderRadius: 25,
          justifyContent: 'space-around',
          borderColor: 'white'
        }}>


        <View style={{
          alignItems: 'center',
          alignSelf: 'center',
          width: '90%',

          flexDirection: 'row', justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={openMap} style={{ backgroundColor: 'white', zIndex: 1, elevation: 8, borderRadius: 50, height: 35, width: 35, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Ionicons size={20} name="md-navigate-outline" color="#FF3D58" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={directCall} style={{ backgroundColor: 'white', zIndex: 1, elevation: 8, borderRadius: 50, height: 35, width: 35, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Ionicons size={20} name="ios-call-outline" color="#FF3D58" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={fullScreen} style={{ backgroundColor: 'white', zIndex: 1, elevation: 8, borderRadius: 50, height: 35, width: 35, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <MaterialIcons size={20} name={fullScreens ? "fullscreen" : "fullscreen-exit"} color="#FF3D58" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: 'white', zIndex: 1, elevation: 8, borderRadius: 50, height: 35, width: 35, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <AntDesign size={20} name="message1" color="#FF3D58" />
            </View>
          </TouchableOpacity>
        </View>




      </View>
    </View>
  )
}
function mapStateToProps({ restaurantInfo, orderAccept, placeOrderStatus, userLogin, userLatitudeLongitude, riderCoord, firebaseData }) {
  return { restaurantInfo, orderAccept, placeOrderStatus, userLogin, userLatitudeLongitude, riderCoord,firebaseData }
}
export default connect(mapStateToProps, actions)(OrderProcess)
var styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'white'
  },

  touchableOpacity: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('60%'),
    height: hp('6%'),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center'
  },

  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Overpass-Bold',
    fontSize: hp('2'),
    textAlign: 'center'
  },

})