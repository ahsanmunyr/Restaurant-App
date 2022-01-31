import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import AppText from './../../Components/AppText'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SplashScreen from  "react-native-splash-screen";
const OfferADrink = ({navigation}) => {

  useEffect(() => {
    SplashScreen.hide();
   },[]);

    return(

         
            <View
                style={{justifyContent: 'center', flex: 1, alignItems:'center',backgroundColor: '#EA2C2E' }}
                >
              <StatusBar translucent backgroundColor="transparent" />
                <View style={{top: -150}}>
                   <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("4%")} color="white" Label={"Cheers!"} />
                </View>
              <View style={{
                  justifyContent: 'space-between', flexDirection:'column', position:'relative', alignContent:'center', alignItems:'center',alignSelf:'center'
              }}>
              
                    <View style={{justifyContent:'center', flexDirection:'row', alignContent:"center", alignItems:'center',alignSelf:'center', right:50}}>
                        <View style={{position: 'absolute', left: 10}}>
                        <Image style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                                borderWidth: 10,
                                borderColor:'#EA2C2E'
                                }} resizeMethod='auto'    source={require('./../../Assets/Images/near5.png')} />
                        </View>
                        <View style={{position: 'absolute'}}>
                        <Image style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                                borderWidth: 10, borderColor:'#EA2C2E'
                                }} resizeMethod='auto'    source={require('./../../Assets/Images/near3.png')} />
                        </View>
                    </View>
              </View>
              <View style={{top:120, justifyContent:'center', alignItems:'center', width: '70%'}}>
              <AppText  nol={5}  textAlign="center"  family="Poppins-SemiBold" size={hp("2%")} color="white" Label={"Proceed to Offer a Drink to Violet Today!"} />
              </View>
              <View style={{justifyContent:'center', alignItems:'center',position: 'absolute', bottom: 0, marginBottom: 100}}>
                  <TouchableOpacity onPress={()=> navigation.navigate('ProceedToPay')} style={styles.touchableOpacity}> 
                  <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={hp("2.5%")}
                      color="black"
                      Label={"Proceed"}
                    />
                  </TouchableOpacity>
                </View>
            </View>
      
    )
}

export default OfferADrink



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
      height: hp('9%'),
      justifyContent: 'center',
      borderRadius: 35,
      alignItems:'center'
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Overpass-Bold',
    fontSize: hp('2'),
    textAlign:'center'
  },
  })