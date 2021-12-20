import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,
   Image,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,ScrollView
 } from 'react-native';
import SplashScreen from  "react-native-splash-screen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppText from './../../Components/AppText'
import TouchableOpacityBtn from './../../Components/TouchableOpacity'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const MainScreen  = ({navigation}) => {
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();
const moveToTop = useRef(new Animated.ValueXY({ x: 10, y: 300 })).current;
const fadeAnim = useRef(new Animated.Value(0)).current;
function onAuthStateChanged(user) {
        setUser(user);
        console.log(user)
        if (initializing) setInitializing(false);
      }
const [expanded, setExpanded] = useState(false);

useEffect(() => {
    SplashScreen.hide();
    changePosition()
    fadeChange()
},[]);

const changePosition = () => {
        Animated.timing(moveToTop, {
            toValue: {x: 0, y: 10},
            duration: 1500,
            useNativeDriver: false
          }).start();
};

const fadeChange = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start();
}

return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground style={styles.backgroundImage} resizeMode='stretch' source={require('./../../Assets/Images/bg.png')}>
            <Animated.View style={[{justifyContent: 'center', alignItems:'center', position: 'absolute', alignSelf:'center', top: 30, width: '100%', height: 300}, moveToTop.getLayout()]}>
              <Image style={{height: 300, width: 300, top: 100}} resizeMode='contain' source={require('./../../Assets/Images/logo.png')} />
              <Animated.View  style={[{justifyContent: 'center', alignItems:'center',}, {opacity: fadeAnim}]}>
                  <LottieView 
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems:'center',
                    justifyContent:'center', alignSelf:'center'
                      }} source={require('./../../Assets/Lottie/main.json')} autoPlay loop />
            </Animated.View>
            </Animated.View>
                <Animated.View style={[{ 
                  bottom:0, 
                  height: '40%', 
                  width: '120%', 
                  backgroundColor:'#f54749', 
                  elevation: 10, 
                  zIndex: 1, 
                  borderWidth: 1,
                  borderColor: '#f54749',
                  position:'absolute', 
                  borderTopLeftRadius:225, 
                  borderTopRightRadius:225,
                  justifyContent:'flex-start',
                  alignItems:'center',
                  alignSelf:'center',
                  alignContent: 'flex-end',
                  flexDirection:'column'
              },{opacity: fadeAnim}]}>
                <View style={{alignItems:'center', width: '50%', margin: 10, paddingTop: 30}}>
                  <AppText  nol={2}  textAlign="left"  family="Overpass-Bold" size={hp("4%")} color="white" Label={'The Fastest In Delivery Food'} />
                </View>
                <View style={{alignItems:'center', width: '47%', top: 5, margin: 10}}>
                  <AppText  nol={2}  textAlign="center"  family="Overpass-Bold" size={hp("1.4%")} color="white" Label={'Our job is to filling your tummy with delicious food and fast delivery'} />
                </View>
                <View style={{margin: 10}}>
                <TouchableOpacityBtn  
                              onPress={()=> navigation.navigate('login')}
                              title="Get Started"
                    />
                </View>
            </Animated.View> 
        </ImageBackground>
    </View> 
  );
};

var styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20,
      },
    container: {
        flex: 1,
        justifyContent: "center",
        height: hp('100%'),
    },
    touchableOpacity:{
        borderWidth: 2,
        borderColor: 'white',
        width: wp('60%'),
        height: hp('6%'),
        justifyContent: 'center',
        borderRadius: 25
    },
    touchableOpacityText: {
    color: 'white',
    fontFamily: 'Overpass-Regular',
      fontSize: hp('2'),
      textAlign:'center'
    },
    innerContainer:{
        flexDirection: 'column',
        justifyContent:'space-between',
        marginTop: 30
    },
    backgroundImage: {
        flex: 1,
    },
    imageLogo: {
        width: wp('35%'),
        height: hp('35%'), 
      
    },
    outerContainer:{
        alignSelf:'center', 
        width: wp('80%'),
        height: hp('70%') ,
        justifyContent:'center', 
        flexDirection:'column',
        alignItems:'center', 
        flex:1, 
    },
    icons:{
        width: 60, height: 60 
    }
});

export default MainScreen;