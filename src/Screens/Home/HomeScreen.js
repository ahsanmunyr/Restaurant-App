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
  DeviceEventEmitter,
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
  RefreshControl,
  
} from 'react-native';
import AppText from '../../Components/AppText';
import TextSample from '../../Components/Text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostList from './PostList';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import * as actions from '../../Store/Actions';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-paper';
import {Restaurant} from '../../../model/rest';
import {Categories} from '../../../model/categories';
import Restaurants from '../../Components/Restaurant';
import Category from '../../Components/Category';
import Recommended from '../../Components/Recommended';
import Voucher from '../../Components/Voucher';
import {vouchers} from '../../../model/Voucher';
import LottieView from 'lottie-react-native';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import {deploy_API} from './../../Config/Apis.json'

// import {ActivityIndicator, Colors} from 'react-native-paper';
// import {showMessage, hideMessage} from 'react-native-flash-message';
import { MotiView } from 'moti'
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({
  navigation,
  userLocations,
  userSearchApply,
  userGetRestaurant,
  placeOrderStatus,
  getRestaurant,
  orderAccept,
  userLatitudeLongitude,
  saveNavigatorVariable,userLogin,
  firebaseData,acceptOrderDetails,firebaseCoordsRider,orderDataClear
}) => {
  // console.log("NAVIGATION", navigation)
  const [refreshing, setRefreshing] = React.useState(false);
  const [placeName, onChangePlaceName] = useState('');
  const [loading, onLoadingChange] = useState(false);
  const [status, onChangeStatus] = useState(false);
  // console.log(userGetRestaurant, 'data RES', )

  useEffect(()=>{
    // navigation.navigate('ProcessStack')
    saveNavigatorVariable(navigation)
  },[])

  useEffect(()=>{
    if(firebaseData.data){
      // console.log(firebaseData.data.data, "===================FIREBASE DATA====================")
        if (firebaseData.data.data.type == "approveorder") {
          
            // console.log(navigationApp)
            navigation.navigate('ProcessStack')
        }
        if (firebaseData.data.data.type == "acceptorder") {
            navigation.navigate('ProcessStack')
           
        } 
        if (firebaseData.data.data.type == "ridercoords") {
            navigation.navigate('ProcessStack')
        }
        if (firebaseData.data.data.type == "startride") {
            navigation.navigate('ProcessStack')
          
        }
        if (firebaseData.data.data.type == "pickorder") {
            navigation.navigate('ProcessStack')
          
        }
        if (firebaseData.data.data.type == "arriveorder") {
            navigation.navigate('ProcessStack')
           
        }
        if (firebaseData.data.data.type == "completeorder") {
           
            navigation.navigate('completeOrder')
        }
        if (firebaseData.data.data.type == "rejectorder") {
            
            navigation.navigate('ProcessStack')
        }
        if (firebaseData.data.data.type == "declineorder") {
        
            navigation.navigate('ProcessStack')
        }
    }
  },[firebaseData])

  useEffect(() => {
    if (userLocations.PlaceName == undefined) {
      onChangePlaceName('undefine');
    } else {
      onChangePlaceName(userLocations.PlaceName);
    }
    if (userSearchApply.testing != 'abc') {
      // console.log(userSearchApply, "Yaha")
      onChangePlaceName(userSearchApply.PlaceName);
    }
    // onLoadingChange(false)
  }, [userLocations, userSearchApply]);

  useEffect(() => {
    if (userGetRestaurant) {
      onLoadingChange(true);
    }
  }, [userGetRestaurant]);

  useEffect(() => {
    if (orderAccept.order) {
      onChangeStatus(true);
    }
  }, [orderAccept]);

  const onRefresh = React.useCallback(() => {
    
    // getRestaurant()
    if (userLocations.PlaceName == undefined) {
      onChangePlaceName('undefine');
    } else {
      onChangePlaceName(userLocations.PlaceName);
    }
    if(userLatitudeLongitude.lat && userLatitudeLongitude.long){
      getRestaurant(userLatitudeLongitude.lat, userLatitudeLongitude.long, 30)
    }
    // console.log(userLatitudeLongitude)
      setRefreshing(true);
    
    wait(2000).then(() => setRefreshing(false));
  }, [userLatitudeLongitude,userLocations]);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <ScrollView
        style={styles.container}
        // contentContainerStyle={{marginVertical: 20}}
        refreshControl={
          <RefreshControl
            
            refreshing={refreshing}
            onRefresh={onRefresh}
            // colors='#f54749'
            titleColor='#f54749'
            tintColor="#f54749"
            progressBackgroundColor= 'white'
            style={{}}
          />
        }
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}>
        <StatusBar translucent backgroundColor="#f54749" />
        {/* {userGetRestaurant.length == [] ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: '100%',
              backgroundColor: '#f54749',
              position: 'absolute',
              top: 30,
            }}>
            <TextSample
              Label={'No restaurant available in your area. no restaurant in your selected area'}
              Color="white"
              Size={hp('2.1%')}
              TextAlign="left"
              NumberOfLines={2}
              Font="Overpass-Bold"
              TextDecorationLine="none"
              TextTransform="none"
            />
          </View>
        ) : null} */}
        {/* {
                !status?
                    <View style={{justifyContent:'center', alignItems:'center', bottom: 10, right: 10, position:'absolute'}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('ProcessStack')} style={{ borderRadius: 12, backgroundColor:'#f54749', alignItems:'center', justifyContent:'center', margin: 10, padding: 20}}>
                            <TextSample 
                                                                            Label={"Order Details"} 
                                                                            Color="white" 
                                                                            Size={hp("2%")} 
                                                                            TextAlign='left'
                                                                            NumberOfLines={3} 
                                                                            Font="Overpass-Bold"
                                                                            TextDecorationLine='none'
                                                                            TextTransform='none'
                                /> 
                        </TouchableOpacity>
                    </View>: null
                } */}
        <View
          style={{
            width: '100%',
            height: 150,
            top: 55,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              top: 0,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                left: 10,
              }}>
              <View>
                <TextSample
                  Label="Delivery to"
                  Color="black"
                  Size={hp('2%')}
                  TextAlign="left"
                  NumberOfLines={1}
                  Font="Overpass-Bold"
                  TextDecorationLine="none"
                  TextTransform="none"
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start',
                    width: '80%',
                  }}>
                  <Ionicons
                    name="location-outline"
                    style={{}}
                    size={19}
                    color="grey"
                  />
                  <TextSample
                    Label={placeName}
                    Color="grey"
                    Size={hp('2.1%')}
                    TextAlign="left"
                    NumberOfLines={3}
                    Font="Overpass-Regular"
                    TextDecorationLine="none"
                    TextTransform="none"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <View style={{right: 20}}>
                {console.log(userLogin)}
                {
                  userLogin?.user_image == "" ?
                  <Avatar.Image
                    size={45}
                    source={require('./../../Assets/Images/dp.png')} 
                  />:
                  <Avatar.Image
                  size={45}
                  source={{uri: `${deploy_API+'/'+userLogin?.user_image}`}} 
                />
                }
            
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <>
            {
              userGetRestaurant.length != [] ? (
                <View style={{position: 'relative'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: 10,
                    }}>
                    <TextSample
                      Label={'Popular Near You'}
                      Color="#292929"
                      Size={hp('2.1%')}
                      TextAlign="left"
                      NumberOfLines={1}
                      Font="Overpass-Bold"
                      TextDecorationLine="none"
                      TextTransform="none"
                    />
                 <TouchableOpacity onPress={() => navigation.navigate('showall')}>
                      <TextSample
                        Label={'View more'}
                        Color="#f54749"
                        Size={hp('1.5%')}
                        TextAlign="left"
                        NumberOfLines={1}
                        Font="Poppins-SemiBold"
                        TextDecorationLine="none"
                        TextTransform="none"
                      />
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={userGetRestaurant.restaurants}
                    keyExtractor={item => item.restaurant_id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    key={item => item.restaurant_id}
                    initialNumToRender={7}
                    style={{position: 'relative'}}
                    scrollEnabled
                    bounces
                    bouncesZoom
                    // maintainVisibleContentPosition
                    renderItem={({item, index}) => (
                      <Restaurants
                        RestaurantID={item.restaurant_id}
                        Lat={item.restaurant_latitude}
                        Long={item.restaurant_longitude}
                        Title={item.restaurant_name}
                        Description={item.restaurant_subtitle}
                        Images={item.restaurant_image}
                        Ratings={item.rating}
                        Reviews={item.totat_reviews}
                        Distance={item.distance}
                        Status={item.restaurant_status}
                        Address={item.restaurant_address}
                        CloseTime={item.restaurant_close_time}
                        OpenTime={item.restaurant_open_time}
                        Phone={item.restaurant_phone}
                        Email={item.restaurant_email}
                        Navigation={navigation}
                        screen={"main"}
                      />
                    )}
                  />
                </View>
              ) : null

              // </View>
              // <View style={{justifyContent:'space-around', alignItems:'center', width:'100%', position:'relative', alignSelf:'center', flexDirection:'column', height: '25%',  top: 20}}>
              //     <LottieView speed={1} style={{height: '100%', width: '100%'}}  autoPlay loop={true} source={require('./../../Assets/Lottie/close.json')} />
              //     <View style={{justifyContent:'center', alignItems:'center', height: 40, width: '100%', backgroundColor:'#f54749', position:'absolute'}}>
              //     <TextSample
              //                             Label={"No restaurant available in your area."}
              //                             Color="white"
              //                             Size={hp("2.1%")}
              //                             TextAlign='left'
              //                             NumberOfLines={2}
              //                             Font="Overpass-Bold"
              //                             TextDecorationLine='none'
              //                             TextTransform='none'
              //                     />
              //         </View>
              // </View>
            }
            {userGetRestaurant.length != [] ? (
              <View style={{top: 10, position: 'relative'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <TextSample
                    Label={'Explore Categories'}
                    Color="#292929"
                    Size={hp('2.1%')}
                    TextAlign="left"
                    NumberOfLines={1}
                    Font="Overpass-Bold"
                    TextDecorationLine="none"
                    TextTransform="none"
                  />
                  {/* <TextSample
                    Label={'Show all'}
                    Color="#f54749"
                    Size={hp('1.5%')}
                    TextAlign="left"
                    NumberOfLines={1}
                    Font="Poppins-SemiBold"
                    TextDecorationLine="none"
                    TextTransform="none"
                  /> */}
                </View>
                <FlatList
                  data={userGetRestaurant.categories}
                  keyExtractor={item => item.category_id}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  horizontal
                  initialNumToRender={7}
                  style={{position: 'relative'}}
                  contentContainerStyle={{paddingEnd: 10}}
                  scrollEnabled
                  bounces
                  bouncesZoom
                  // maintainVisibleContentPosition
                  renderItem={({item, index}) => (
                    <Category
                      ID={item.category_id}
                      Title={item.category_name}
                      Images={item.category_image}
                      Quantity={item.category_description}
                      Navigation={navigation}
                    />
                  )}
                />
              </View>
            ) : null}
            {userGetRestaurant.length != [] ? (
              <>
                {/* <View style={{top: 10, position: 'relative'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: 10,
                    }}>
                    <TextSample
                      Label={'Recommended'}
                      Color="#292929"
                      Size={hp('2.1%')}
                      TextAlign="left"
                      NumberOfLines={1}
                      Font="Overpass-Bold"
                      TextDecorationLine="none"
                      TextTransform="none"
                    />
                    <TextSample
                      Label={'Show all'}
                      Color="#f54749"
                      Size={hp('1.5%')}
                      TextAlign="left"
                      NumberOfLines={1}
                      Font="Poppins-SemiBold"
                      TextDecorationLine="none"
                      TextTransform="none"
                    />
                  </View>

                  <FlatList
                    data={Restaurant}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    initialNumToRender={7}
                    style={{position: 'relative'}}
                    scrollEnabled
                    bounces
                    bouncesZoom
                    maintainVisibleContentPosition
                    renderItem={({item, index}) => (
                      <Recommended
                        Coordinate={item.coordinate}
                        Title={item.title}
                        Description={item.description}
                        Images={item.image}
                        Ratings={item.rating}
                        Reviews={item.reviews}
                        Distance={item.distance}
                        Status={item.status}
                        Address={item.address}
                      />
                    )}
                  />
                </View> */}
                {/* <View style={{top: 10, position: 'relative'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: 10,
                    }}>
                    <TextSample
                      Label={'Vouchers'}
                      Color="#292929"
                      Size={hp('2.1%')}
                      TextAlign="left"
                      NumberOfLines={1}
                      Font="Overpass-Bold"
                      TextDecorationLine="none"
                      TextTransform="none"
                    />
                    <TextSample
                      Label={'Show all'}
                      Color="#f54749"
                      Size={hp('1.5%')}
                      TextAlign="left"
                      NumberOfLines={1}
                      Font="Poppins-SemiBold"
                      TextDecorationLine="none"
                      TextTransform="none"
                    />
                  </View>
                  <FlatList
                    data={vouchers}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    initialNumToRender={7}
                    style={{position: 'relative'}}
                    scrollEnabled
                    bounces
                    bouncesZoom
                    maintainVisibleContentPosition
                    renderItem={({item, index}) => (
                      <Voucher
                        Images={item.image}
                        Duration={item.duration}
                        Title={item.title}
                      />
                    )}
                  />
                </View> */}
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems:'center',
                  justifyContent:'space-around'
                
                }}>
               <Image resizeMode='contain' style={{height: 200, width: 200}} source={require('./../../Assets/Images/notFound.png')} />
               <TextSample
                  Label={'No restaurant in your selected area'}
                  Color="black"
                  Size={hp('2.1%')}
                  TextAlign="left"
                  NumberOfLines={2}
                  Font="Overpass-Bold"
                  TextDecorationLine="none"
                  TextTransform="none"
                />
           
                  <TouchableOpacityBtn  
                      onPress={() => navigation.navigate('Map')}
                      title="Sorry ! Try again please."
                  />
              
              </View>
            )}
          </>
        ) : null}
        <View style={{height: 100}}></View>
      </ScrollView>
     
    </View>
  );
};

// nearMeUsers
function mapStateToProps({
  userLocations,
  userSearchApply,
  userGetRestaurant,
  placeOrderStatus,
  orderAccept,
  userLatitudeLongitude,firebaseData,userLogin
}) {
  return {
    userLocations,
    userSearchApply,
    userGetRestaurant,
    placeOrderStatus,
    orderAccept,
    userLatitudeLongitude,firebaseData,userLogin
  };
}

export default connect(mapStateToProps, actions)(HomeScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '103%',
    backgroundColor: 'white',
  },
});

{
  /* <View style={{ top: 10, position: 'relative', width:'100%', height: 100}}><ActivityIndicator size="large" animating={true} color="#f54749" /></View>  */
}


// {!status ? (
//     <View
//       style={{
     
//         bottom: 80,
//         right: 10,
//         position: 'absolute',
      
//         // backgroundColor: '#f54749',
//       }}>
//           <Loop />
//       {/* <TouchableOpacity onPress={()=> navigation.navigate('ProcessStack')} style={{ borderRadius: 12, backgroundColor:'#f54749', alignItems:'center', justifyContent:'center', margin: 10, padding: 20}}>
//                         <TextSample 
//                                                                         Label={"+"} 
//                                                                         Color="white" 
//                                                                         Size={hp("2%")} 
//                                                                         TextAlign='left'
//                                                                         NumberOfLines={3} 
//                                                                         Font="Overpass-Bold"
//                                                                         TextDecorationLine='none'
//                                                                         TextTransform='none'
//                             /> 
//                     </TouchableOpacity> */}
//     </View>
//   ) : null}