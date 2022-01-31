import React, {useState, useEffect} from 'react';
import AuthRootStackScreen from './AuthRootStackScreen';
import {connect} from 'react-redux';
import {Text, View, ActivityIndicator, StatusBar} from 'react-native';
import * as actions from './Store/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import MainAppScreens from './InApp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextSample from './Components/Text';
const Main = ({userLogin, userOtpVerify}) => {
  const [token, onChangeToken] = React.useState('');
  const [loading, setLoading] = useState(true);

  async function remoteMessageDevices() {
    const deviceRemote = await messaging().registerDeviceForRemoteMessages();
    // console.log(
    //   deviceRemote,
    //   '================================================',
    // );
  }

  useEffect(() => {
    remoteMessageDevices();
    try {
      if (userLogin?.token) {
        onChangeToken(userLogin.token);
      }
      async function GetToken() {
        await AsyncStorage.getItem('token', (err, value) => {
          if (err) {
            console.log(err);
          } else {
            const va = JSON.parse(value); // boolean false
            // console.log('userinformation MAIN', va);
            if (va) {
              // console.log('userinformation', va);
              onChangeToken(va.token);
            }
          }
        });
        setLoading(false);
      }
      GetToken();
    } catch (error) {
      console.log(error);
    }
  }, [userLogin]);

  useEffect(() => {
    console.log(userOtpVerify.data, 'MAIN SIGNUP');
    if (userOtpVerify.data) {
      onChangeToken(userOtpVerify.data.token);
    } else {
      onChangeToken(null);
    }
  }, [userOtpVerify]);

  if (loading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: '#f54749',
          flex: 1,
          alignContent: 'center',
        }}>
        <StatusBar translucent backgroundColor="transparent" />
        <LottieView
          speed={2}
          style={{
            height: '100%',
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          autoPlay
          loop
          source={require('./Assets/Lottie/loading.json')}
        />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        {userLogin.userLogin || token != null ? (
          <MainAppScreens />
        ) : (
          <AuthRootStackScreen />
        )}
      </NavigationContainer>
    );
  }
};

const mapStatetoProps = ({userLogin, userOtpVerify}) => {
  return {userLogin, userOtpVerify};
};
export default connect(mapStatetoProps, actions)(Main);
