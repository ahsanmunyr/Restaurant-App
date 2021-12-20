import React, {
    useEffect,
    useState,
    useRef
  } from 'react';
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
    Platform,
    UIManager,
    Animated,
    TouchableHighlight,
    TextInput,
    ScrollView
  } from 'react-native';
  
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import TextSample from '../../Components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const OrderScreen = ({
      navigation
    }) => {

return ( 
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />
            <View style={{position:'absolute', top: 40, width: '90%', flexDirection:'column'}}>
                    <View style={{alignItems:'center', justifyContent:'flex-start', left: 20,}}>
                      <TextSample 
                              Label="Order Screen" 
                              Color="black" 
                              Size={hp("3%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Bold"
                              TextDecorationLine='none'
                              TextTransform='none'
                        />
                </View>
            </View>
        </View>
  )
}
  
  
export default OrderScreen;
  
var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      height: '100%',
      backgroundColor: 'white'
    },
    touchableOpacity:{
      backgroundColor: 'white',
      borderWidth: 0,
      borderColor: 'white',
      width: wp('60%'),
      height: hp('6%'),
      justifyContent: 'center',
      borderRadius: 25,
      alignItems:'center'
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Overpass-Bold',
    fontSize: hp('2'),
    textAlign:'center'
  },
})