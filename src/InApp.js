import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Animated,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Home from 'react-native-vector-icons/Feather';
import SplashScreen from 'react-native-splash-screen';

import HomeStack from './Screens/Home/HomeStack';
import CartStack from './Screens/Cart/CartStack';
import SearchStack from './Screens/Search/SearchStack';
import SettingsStack from './Screens/Setting/SettingsStack';
import HistoryStack from './Screens/History/HistoryStack';
import HistoryScreen from './Screens/History/HistoryScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OfferADrink from './Screens/Offer/OfferADrink';
import OutOfDrink from './Screens/Offer/OutOfDrink';
import ProceedToPay from './Screens/Offer/ProceedToPay';
import {CreditCards} from './Screens/Offer/AddCard/CreditCards';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileStack from './Screens/Home/Profile/ProfileStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import * as actions from './Store/Actions';
import Geolocation from '@react-native-community/geolocation';
import OrderStack from './Screens/OrderStack/OrderStack';
import ProcessStack from './Screens/Process/ProcessStack';
import CustomDrawer from './CustomDrawer';
import Loop from './Utils/Loop';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import MapStack from './Screens/Map/MapStack';
const Drawer = createDrawerNavigator();

const HOMESS = () => {
  return <View style={{flex: 1, backgroundColor: 'blue'}} />;
};

const SETTINGS = () => {
  return <View style={{flex: 1, backgroundColor: 'red'}} />;
};

const CARTSS = () => {
  return <View style={{flex: 1, backgroundColor: 'yellow'}} />;
};
const HISTORYSS = () => {
  return <View style={{flex: 1, backgroundColor: 'purple'}} />;
};
const SEARCHSS = () => {
  return <View style={{flex: 1, backgroundColor: 'grey'}} />;
};

const Tab = createBottomTabNavigator();
const STACK = createStackNavigator();
function MyTabs({navigation, body}) {
  return (
    <Tab.Navigator
      initialRouteName="homes"
      screenOptions={{
        tabBarInactiveBackgroundColor: 'wihte',
        tabBarActiveBackgroundColor: 'whtie',
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          height: 80,
          position: 'absolute',
          backgroundColor: 'white',
          bottom: 0,
          shadowColor: 'white',
          borderWidth: 0,
          borderTopColor: 'white',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },

        tabBarActiveTintColor: '#f54749',
        tabBarInactiveTintColor: '#f54749',
        tabBarShowLabel: true,
        tabBarItemStyle: {
          borderRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}>
      <Tab.Screen
        name="homes"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: ({color, size, focused}) =>
            focused ? (
              <Text
                style={{
                  color: color,
                  fontFamily: 'Overpass-Bold',
                  fontSize: 12,
                  bottom: 5,
                }}>
                Home
              </Text>
            ) : null,
          tabBarLabelStyle: {bottom: 5, color: 'white'},
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" style={{}} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="historyscreen"
        component={HistoryStack}
        options={{
          headerShown: false,
          tabBarLabel: ({color, size, focused}) =>
            focused ? (
              <Text
                style={{
                  color: color,
                  fontFamily: 'Overpass-Bold',
                  fontSize: 12,
                  bottom: 5,
                }}>
                History
              </Text>
            ) : null,
          tabBarLabelStyle: {bottom: 5, color: 'white'},
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="history"
              style={{}}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="searchStack"
        component={SearchStack}
        options={{
          headerShown: false,
          tabBarLabel: ({color, size, focused}) =>
            focused ? (
              <Text
                style={{
                  color: color,
                  fontFamily: 'Overpass-Bold',
                  fontSize: 12,
                  bottom: 5,
                }}>
                Search
              </Text>
            ) : null,
          tabBarLabelStyle: {bottom: 5, color: 'white'},
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                position: 'absolute',
                backgroundColor: '#f54749',
                bottom: 15,
                height: 65,
                flex: 1,
                justifyContent: 'center',
                width: 65,
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <Home name="search" style={{}} size={size} color="white" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarBadge: body.length,
          headerShown: false,
          tabBarLabel: ({color, size, focused}) =>
            focused ? (
              <Text
                style={{
                  color: color,
                  fontFamily: 'Overpass-Bold',
                  fontSize: 12,
                  bottom: 5,
                }}>
                Cart
              </Text>
            ) : null,
          tabBarLabelStyle: {bottom: 5, color: 'white'},
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="cart-outline"
              style={{}}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsStack}
        options={{
          headerShown: false,
          tabBarLabel: ({color, size, focused}) =>
            focused ? (
              <Text
                style={{
                  color: color,
                  fontFamily: 'Overpass-Bold',
                  fontSize: 12,
                  bottom: 5,
                }}>
                Setting
              </Text>
            ) : null,
          tabBarLabelStyle: {bottom: 5, color: 'white'},
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="settings-outline"
              style={{}}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainAppScreens({
  UserLatLong,
  UserLocation,
  getRestaurant,
  getDeals,
  userAddToCart,
  orderDetails,
  acceptOrderDetails,
  placeOrderStatus,
  orderAccept,
  userDetailsSave,
  navigationApp,
  orderPlaceDataClear,
  firebaseCoordsRider,
  orderDataClear,
  firebaseMessageData,
  getHistory
}) {
  const [status, onChangeStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [FCMToken, setFCMToken] = useState(null);
  const [userID, setuserID] = useState(null);
  const [initialRoute, setInitialRoute] = useState('');
  const userGet = async () => {
    let Token = await AsyncStorage.getItem('token', (err, value) => {
      if (err) {
        console.log(err);
      } else {
        const va = JSON.parse(value); // boolean false
        if (va) {
          userDetailsSave(va);
          console.log('USER INFORMATION INAPP>JS FILE', va.user_id);
          const userID = va.user_id;
          setuserID(userID);
          orderDetails(userID);
          acceptOrderDetails(userID);
          getHistory(userID)
          messaging()
            .subscribeToTopic(userID.toString())
            .then(() => {
              setLoading(false);
            });
        }
      }
    });
  };


 
  useEffect(() => {
    userGet();
    orderPlaceDataClear();
    // alert("DDS")
    Geolocation.getCurrentPosition(
      info => {
        const kilometer = 30;
        UserLatLong(info.coords.latitude, info.coords.longitude);
        UserLocation(info.coords.latitude, info.coords.longitude);
        getRestaurant(info.coords.latitude, info.coords.longitude, kilometer);
        getDeals(info.coords.latitude, info.coords.longitude, kilometer);
      },
      e => {
        console.log(e);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
    Geolocation.getCurrentPosition(
      info => {
        // console.log(info);
      },
      err => console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
    requestUserPermission();

    try {
      messaging()
        .getToken()
        .then(token => {
          setFCMToken(token);
          console.log(token, "FCM")
        });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage, 'remoteMessage');
        firebaseMessageData(remoteMessage);
        // if(remoteMessage.data.type){
        //   firebaseMessageData(remoteMessage)
        // }
        if (remoteMessage.data.type == 'approveorder') {
          acceptOrderDetails(userID);
        }
        if (remoteMessage.data.type == 'acceptorder') {
          acceptOrderDetails(userID);
        }
        if (remoteMessage.data.type == 'ridercoords') {
          acceptOrderDetails(userID);
          firebaseCoordsRider(remoteMessage.data);
        }
        if (remoteMessage.data.type == 'startride') {
          acceptOrderDetails(userID);
        }
        if (remoteMessage.data.type == 'pickorder') {
          acceptOrderDetails(userID);
        }
        if (remoteMessage.data.type == 'arriveorder') {
          acceptOrderDetails(userID);
        }
        if (remoteMessage.data.type == 'completeorder') {
          orderDataClear();
          onChangeStatus(false);
        }
        if (remoteMessage.data.type == 'rejectorder') {
          orderDataClear();
          onChangeStatus(false);
        }
        if (remoteMessage.data.type == 'declineorder') {
          orderDataClear();
          onChangeStatus(false);
        }

        //rejectorder reducer khali karwanba hai
        // acceptorder
        // declineorder // reducer khali karwanba hai
        // startride
        // pickorder
        // arriveorder
        // completeorder

        if (remoteMessage.notification) {
          PushNotification.localNotification({
            channelId: 'channel-id',
            channelName: 'My channel',
            message: remoteMessage.notification.body,
            playSound: true,
            title: remoteMessage.notification.title,
            priority: 'high',
            soundName: 'default',
          });
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // console.log('Authorization status:', authStatus);
      SplashScreen.hide();
    }
  }

  useEffect(()=>{
    console.log(placeOrderStatus, "IN APP")
    if(placeOrderStatus?.order){
        onChangeStatus(true)
    }
  },[placeOrderStatus])

  if (loading) {
    return null;
  } else {
    return (
      <>
        <STACK.Navigator initialRouteName={initialRoute}>
          <STACK.Screen
            name="Home"
            options={({route}) => ({
              headerShown: false,
              headerTransparent: true,
            })}>
            {props => <MyTabs {...props} body={userAddToCart} />}
          </STACK.Screen>
          <STACK.Screen
            name="Map"
            options={{headerShown: false}}
            component={MapStack}
          />
          <STACK.Screen
            name="OrderStack"
            options={{headerShown: false}}
            component={OrderStack}
          />
          <STACK.Screen
            name="ProcessStack"
            options={{headerShown: false}}
            component={ProcessStack}
          />
        </STACK.Navigator>
        {status ? (
          <View
            style={{
              bottom: 150,
              right: 10,
              position: 'absolute',
            }}>
            <Loop />
          </View>
        ) : null}
      </>
    );
  }
}

function mapStateToProps({
  userAddToCart,
  orderAccept,
  placeOrderStatus,
  navigationApp,
}) {
  return {userAddToCart, orderAccept, placeOrderStatus, navigationApp};
}

export default connect(mapStateToProps, actions)(MainAppScreens);

var styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

// <STACK.Navigator initialRouteName={initialRoute}>
// <STACK.Screen name="Home" options={({  route }) => ({
//                       headerShown: false,
//                       headerTransparent: true,
//       })}>
//           {props => <MyTabs {...props} body={userAddToCart} />}
// </STACK.Screen>
// {/* <STACK.Screen  name="Home" options={{ headerShown: false,}} component={MyTabs} />          */}
// <STACK.Screen  name="MapScreen" options={{ headerShown: false,}} component={MapStack} />
// <STACK.Screen  name="OrderStack" options={{ headerShown: false,}}   component={OrderStack} />
// </STACK.Navigator>
