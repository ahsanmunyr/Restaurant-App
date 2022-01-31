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
import { StackActions, CommonActions } from '@react-navigation/native';
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
    if (riderCoord?.condition) {
      // console.log(riderCoord.data, "---------------RIDER COORDS-------------------------")
      onChangeRiderCoords({
        latitude: parseFloat(riderCoord?.data?.lat),
        longitude: parseFloat(riderCoord?.data?.long),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
    }
  }, [riderCoord])


  useEffect(() => {
  //   navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault()
  //     //clear setInterval here and go back
  //  })
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

  useEffect(()=>{
    saveNavigatorVariable(navigation)
  },[])

  useEffect(() => {
    if (restaurantID) {
      axios.get(`${deploy_API}/api/restaurant/getrestaurant?restaurant_id=${restaurantID}`).then((res) => {
        // console.log("=============api/restaurant/getrestaurant?restaurant_id=======================", res.data)
        if (res.data.status) {
          onChangeRestaurantDetail(res.data.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    }

  }, [restaurantID])

  useEffect(()=>{
    console.log(placeOrderStatus, "SATA 2")
    if (placeOrderStatus?.data?.order_status == 2) {
      updateLoading(true)
      onChangeStatus(placeOrderStatus.data.order_status)
      onChangeLocation(placeOrderStatus.data.order_location)
      onChangeTitle("Order Placed")
      onChangeMessage("Thank you, your order has been placed. Wait for restaurant approval")
      onChangeLottifiles(require('./../../Assets/Lottie/OPS.json'))
      onChangeShowMap(false)
    }
    if (firebaseData?.data?.data.type == "rejectorder") {
      updateLoading(true)
      onChangeTitle("Order Rejected")
      onChangeMessage("Sorry, your order has been rejected!!!")
      onChangeLottifiles(require('./../../Assets/Lottie/cancel-animation.json'))
      onChangeShowMap(false)
    }
  },[placeOrderStatus, firebaseData])


  useEffect(() => {
    onChangeOrderData(userLogin)

    axios.get(`${deploy_API}/api/orders/getuserorderdetails?user_id=${userLogin.user_id}`).then((res) => {
      if (res.data.status) {
          console.log("====================================API RESPONSE================================", res.data.data)
          onChangeRestaurantID(res.data.data.restaurant_id)
          onChangeStatus(res.data.data.order_status)
          onChangeLocation(res.data?.data?.order_location)
          // console.log("RIDER COORDS")
          // console.log(res.data.data.restaurant_latitude,res.data.data.restaurant_longitude, "RESTAURANT LOCATION")
          // console.log(res.data.data.order_latitude,res.data.data.order_longitude, "USER ---- LOCATION")
          // console.log(res.data?.data?.rider_latitude, res.data?.data?.rider_longitude, "-----------")
          // onChangeRiderCoords({
          //   latitude: parseFloat(res.data?.data?.rider_latitude),
          //   longitude: parseFloat(res.data?.data?.rider_longitude),
          //   latitudeDelta: LATITUDE_DELTA,
          //   longitudeDelta: LONGITUDE_DELTA,
          // })

        if (res.data.data.order_status == 6) {
          onChangeTitle("Order Accepted")
          onChangeMessage("Thank you, your order has been accepted. Waiting for rider approval")
          onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
          onChangeShowMap(false)
        }
        if (res.data.data.order_status == 2) {
      
          onChangeStatus(res.data.data.order_status)
          onChangeLocation(res.data.data.order_location)
          onChangeTitle("Order Placed")
          onChangeMessage("Thank you, your order has been placed. Wait for restaurant approval")
          onChangeLottifiles(require('./../../Assets/Lottie/OPS.json'))
          onChangeShowMap(false)
        }
        if (res.data.data.order_status == 5) {
          onChangeTitle("Order Rejected")
          onChangeMessage("Sorry, your order has been rejected!!!")
          onChangeLottifiles(require('./../../Assets/Lottie/cancel-animation.json'))
          onChangeShowMap(false)
        }
        if (res.data.data.order_status == 4) {
          onChangeTitle("Rider Accepted")
          onChangeMessage("Rider has accepted your order")
          onChangeLottifiles(require('./../../Assets/Lottie/your.json'))
          acceptOrderDetails(userLogin.user_id)
          onChangeShowMap(false)
        }
        if (res.data.data.order_status == 7) {
          console.log("RIDER ON THE WAY REDUX API", res.data.data?.restaurant_latitude,res.data.data?.restaurant_longitude)
          onChangeTitle("Rider On The Way")
          onChangeMessage("Rider has start the ride")
          acceptOrderDetails(userLogin.user_id)
          onChangeShowMap(true)
          setRestaurantCoords({
            latitude: parseFloat(res.data.data?.restaurant_latitude),
            longitude: parseFloat(res.data.data?.restaurant_longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          })
        }

        if (res.data.data.order_status == 8) {

          onChangeTitle("Rider Picked Order")
          onChangeMessage("Rider has pick up your order")
          acceptOrderDetails(userLogin.user_id)
          onChangeShowMap(true)
          setRestaurantCoords({
            latitude: parseFloat(res.data.data?.order_latitude),
            longitude: parseFloat(res.data.data?.order_longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          })
        }

        if (res.data.data.order_status == 9) {
          onChangeTitle("Rider Arrived")
          onChangeMessage("Rider has arrived. Please pickup your order from the rider.")
          onChangeShowMap(false)
          acceptOrderDetails(userLogin.user_id)
          onChangeLottifiles(require('./../../Assets/Lottie/arrived.json'))
        }

      }
      updateLoading(true)
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
    // console.log(orderAccept.data, "=======================ss=======================")
    if (orderAccept.order) { 
      onChangeDataa(orderAccept.data)
      onChangeRestaurantID(orderAccept.data.restaurant_id)
      onChangeStatus(orderAccept.data.order_status)
      // onChangeLocation(orderAccept?.data?.order_location)
      onChangeRiderCoords({
        latitude: parseFloat(orderAccept.data?.rider_latitude),
        longitude: parseFloat(orderAccept.data?.rider_longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
      // console.log(orderAccept.data, "=======================ss=======================")
      // console.log(orderAccept.data.restaurant_latitude,orderAccept.data.restaurant_longitude, "RESTAURANT LOCATION")
      // console.log(orderAccept.data.order_latitude,orderAccept.data.order_longitude, "USER LOCATION")
      if (orderAccept.data.order_status == 2) {
        onChangeLocation(orderAccept.data.order_location)
        onChangeTitle("Order Placed")
        onChangeMessage("Thank you, your order has been placed. Wait for restaurant approval")
        onChangeLottifiles(require('./../../Assets/Lottie/OPS.json'))
        onChangeShowMap(false)
      }
      if (orderAccept.data.order_status == 6) {
        onChangeTitle("Order Accepted")
        onChangeMessage("Thank you, your order has been accepted. Waiting for rider approval")
        onChangeLottifiles(require('./../../Assets/Lottie/congratulation.json'))
        onChangeShowMap(false)
      }
      if (orderAccept.data.order_status == 4) {
        onChangeTitle("Rider Accepted")
        onChangeMessage("Rider has accepted your order")
        onChangeLottifiles(require('./../../Assets/Lottie/your.json'))
        onChangeShowMap(false)
      }
   
      if (orderAccept.data.order_status == 7) {
        onChangeTitle("Rider On The Way")
        onChangeMessage("Rider has start the ride")
        console.log("RIDER ON THE WAY REDUX", orderAccept?.data?.restaurant_latitude,orderAccept?.data?.restaurant_longitude )
        setRestaurantCoords({
          latitude: parseFloat(orderAccept?.data?.restaurant_latitude),
          longitude: parseFloat(orderAccept?.data?.restaurant_longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
        onChangeShowMap(true)
      }
      if (orderAccept.data.order_status == 8) {
        // alert("ASDASD")
        onChangeTitle("Rider Picked Order")
        onChangeMessage("Rider has pick up your order")
    
        setRestaurantCoords({
          latitude: parseFloat(orderAccept?.data?.order_latitude),
          longitude: parseFloat(orderAccept?.data?.order_longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
        onChangeShowMap(true)
      }
      if (orderAccept.data.order_status == 9) {
        onChangeTitle("Rider Arrived")
        onChangeMessage("Rider has arrived. Please pickup your order from the rider.")
        onChangeShowMap(false)
        onChangeLottifiles(require('./../../Assets/Lottie/arrived.json'))
      }
      updateLoading(true)
    }

  }, [orderAccept])




  // const onRegionChange = (mark) => {
  //   const Delta = 0.025
  //   setRestaurantCoords({
  //     latitude: mark?.nativeEvent?.coordinate?.latitude,
  //     longitude: mark?.nativeEvent?.coordinate?.longitude,
  //     latitudeDelta: Delta,
  //     longitudeDelta: Delta
  //   })
  // }


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
    {
      loading ? 
    
      <>
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
                // onMarkerDragEnd={onRegionChange}
                ref={(ref) => updateMapRef(ref)}
                zoomControlEnabled
                // onRegionChange={onRegionChange}
                showsCompass={true}
                // zoomEnabled={true}
                maxZoomLevel={18}
                // minZoomLevel={10}
                // followsUserLocation={true}
                scrollEnabled={true}
                mapPadding={{ top: 100, left: 50, right: 50, bottom: 200 }}
                mapType={Platform.OS == 'android' ? 'terrain' : 'standard'}
                // initialRegion={{
                //   latitude: riderCoords?.latitude,
                //   longitude: riderCoords?.latitude, 
                //   latitudeDelta: LATITUDE_DELTA,
                //   longitudeDelta: LONGITUDE_DELTA,
                // }}
                // zoomEnabled={false}
                style={{ width: '100%', height: '100%', position: 'relative' }}
                provider={Platform.OS == 'android' ? PROVIDER_GOOGLE: null}
                onMapReady={() => {
                  mapRef.fitToCoordinates([riderCoords, restaurantCoords], {
                    animated: true,
                    edgePadding: {
                      top: 150,
                      right: 50,
                      bottom: 100,
                      left: 10,
                    },
                    
                  });
                
                }}
              >
                {/* {console.log(riderCoords?.latitude,riderCoords?.longitude, "RETURN RIDER")} */}
                {console.log(restaurantCoords?.latitude,restaurantCoords?.longitude,"RETURN USER")}
                <MarkerAnimated
                  ref={(ref) => updateMapmarkerRef(ref)}
                  // coordinate={riderCoords}
                  coordinate={{
                    "latitude": riderCoords?.latitude,
                    "longitude": riderCoords?.longitude
                  }}
                  title={"Rider Location"}
                  identifier={'mk1'}
                />
                <Marker
                  identifier={'mk2'}
                  coordinate={{
                    "latitude": restaurantCoords?.latitude,
                    "longitude": restaurantCoords?.longitude
                  }}
                  title={status == 8 ? "Your Location":"Restaurant Location"}
                />
                <MapViewDirections
                  strokeColor="#FF3D58"
                  splitWaypoints={true}
                  origin={{
                    "latitude": riderCoords?.latitude,
                    "longitude": riderCoords?.longitude,
                    
                  }}
                  
                  destination={{
                    "latitude": restaurantCoords?.latitude,
                    "longitude": restaurantCoords?.longitude,
                  }}
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
        position: 'absolute', bottom: animatedFullScreen,
        alignContent: 'center', width: '90%', 
        flexDirection: 'column', borderRadius: 20,
        backgroundColor: '#f54749', alignSelf: 'center', margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
      <>
      {console.log(status)}
      {
        status != 5 && status != 2 ?
      
      <View
        style={{
          width: '90%',
          position: 'absolute',
          height: '8%', alignItems: 'center',
          bottom: 10, alignSelf: 'center',
          backgroundColor: '#f54749',
          borderRadius: 25,
          justifyContent: 'space-around',
          borderColor: 'white',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
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




      </View>: null
     
     }
      </>
      
      </>: 
      <>
        <LottieView speed={1} style={{ height: '100%', width: '100%', alignSelf: 'center', }} autoPlay loop={true} source={require('./../../Assets//Lottie/loading.json')} />
      </>
    }
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