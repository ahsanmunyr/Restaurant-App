import React, {useEffect, useState,useRef, useMemo} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,Modal,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView,
 } from 'react-native';
import AlertModal from './../../Components/AlertModal'
import Logo from './../../Components/Logo'
import TextInputFeild from './../../Components/TextFeild'
import IconImage from './../../Components/Icons'
import Underline from './../../Components/Underline'
import Heading from './../../Components/Heading'
import TouchableOpacityBtn from './../../Components/TouchableOpacity'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PhoneInput from "react-native-phone-number-input";
import OTPTextView from 'react-native-otp-textinput';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextSample from './../../Components/Text'
// import CustomRadio from './../../Components/CustomRadio'
import DropDownPicker from "react-native-dropdown-picker";
// import RNCheckboxCard from "react-native-checkbox-card";
// import {isPortrait, isLandscape} from './../../Platform'
import * as actions from '../../Store/Actions';
// import auth from '@react-native-firebase/auth';
import {connect} from "react-redux";
import SplashScreen from  "react-native-splash-screen";
import LinearGradient from 'react-native-linear-gradient'
// import { trueFunc } from 'boolbase';
// import { color } from 'react-native-elements/dist/helpers';
const OTPScreen = ({navigation, SignUpStepOne, Otp, userOtp, verifyOtp,OTPPhone}) => {

    const [value, setValue] = useState("");
    const [otp, setOtp] = useState("")
    const [onClick, onChangeOnClick] = React.useState(false);

    const onSubmit2=()=>{
        // console.log(otp)
        if(OTPPhone?.data){
            verifyOtp(otp, OTPPhone.data)
        }
        // fadeChange()
    }
      return(
        <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" /> 
             <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1}}
                > 
    
                 
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        <View style={{ flexDirection:'column', height: hp('100%'), width: '100%', flex: 1, justifyContent:'space-around', alignItems:'center', alignSelf:'center'}}> 
                        <TextSample 
                                    Label="Verification" 
                                    Color="black" 
                                    Size={hp("4%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                        />
                         <TextSample 
                                    Label="Verify Your Phone Number with OTP" 
                                    Color="#f54730" 
                                    Size={hp("2%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Regular"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                        />
                        
                        <OTPTextView
                            inputCount={4}
                            handleTextChange={text => setOtp(text)}
                            containerStyle={styles.textInputContainer}
                            textInputStyle={[styles.roundedTextInput, {borderRadius: 100}]}
                            tintColor="#FF3D46"
                            offTintColor="#FF3D46"
                            />
                            <View style={{ height:hp('20%'), alignItems:'center' ,flexDirection: 'row', alignContent:'space-between', marginTop: 30, width:'100%', justifyContent:'center'}}>
                            {/* <TouchableOpacity    onPress={() => onChangestepOne(false)}>
                                        <LinearGradient
                                            start={{ x: -1, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ '#B01125','#f54730']}
                                            style={styles.touchableOpacityBack}
                                            >
                                                {
                                                    !onClick ?
                                                <TextSample 
                                                    Label="BACK" 
                                                    Color="white" 
                                                    Size={hp("2%")} 
                                                    TextAlign='center'
                                                    NumberOfLines={2} 
                                                    Font="Overpass-Bold"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                                                />:  
                                                <ActivityIndicator size='large' color="white" />
                                                }
                                        </LinearGradient>
                                </TouchableOpacity> */}
                        
                            <TouchableOpacity  disabled={onClick}  onPress={onSubmit2} >
                                        <LinearGradient
                                            start={{ x: -1, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ '#B01125','#f54730']}
                                            style={styles.touchableOpacityOne}
                                            >
                                                {
                                                    !onClick ?
                                                <TextSample 
                                                    Label="Continue" 
                                                    Color="white" 
                                                    Size={hp("2%")} 
                                                    TextAlign='center'
                                                    NumberOfLines={2} 
                                                    Font="Overpass-Bold"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                                                />:  
                                                <ActivityIndicator size='large' color="white" />
                                                }
                                        </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View> 
                        </ScrollView>
           
                </KeyboardAvoidingView>

        </View>
    )
}

const mapStatetoProps = ({OTPPhone}) =>
{
      return {OTPPhone}
}

export default connect(mapStatetoProps,actions)(OTPScreen)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // height: hp('103%')
    },
    scrollView: {
        // marginHorizontal: 20,
        // backgroundColor: 'grey'
      },
    input: {
        height: 40,
        padding:10,
        borderWidth: 0,
        color: 'black',
        width: wp('80%'),
        justifyContent: 'center',
        borderColor: 'white',
        fontFamily: 'Overpass-Regular',
        fontWeight: '200',
        fontSize: hp('2%'),
      },
      textField: {
        width: wp('90%'),
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 5,
        backgroundColor:'white',
        // zIndex: 9999,
        // elevation: 5,
        borderRadius: 12,
        height:45,
        alignItems:'center',
        alignSelf:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
        
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    textInputContainer: {
        marginBottom: 20,
        color: 'white'
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 4,
        backgroundColor: '#FF3D46',
        color: 'white'
        
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200,
       alignSelf:'center'
        
      },

    modalView: {
        width: wp('100%'),
        flexDirection:'column',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      touchableOpacity:{
        borderWidth: 2,
        borderColor: '#f54749',
        width: wp('40%'),
        height: hp('6%'),
        justifyContent: 'center',
        // borderRadius: 25,
        flexDirection:'row',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        alignItems:'center',
        alignSelf:'center',
        alignContent:'center'
        
    },
    touchableOpacityOne:{
        borderWidth: 2,
        borderColor: '#f54749',
        width: wp('40%'),
        height: hp('6%'),
        justifyContent: 'center',
        // borderRadius: 25,
        flexDirection:'row',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius:25,
        alignItems:'center',
        alignSelf:'center',
        alignContent:'center'
    },
    touchableOpacityBack:{
        borderWidth: 2,
        borderColor: '#f54749',
        width: wp('40%'),
        height: hp('6%'),
        justifyContent: 'center',
        // borderRadius: 25,
        flexDirection:'row',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        alignItems:'center',
        alignSelf:'center',
        alignContent:'center'
        
    },
    
        touchableOpacityText: {
        color: 'white',
        fontFamily: 'Overpass-Bold',
        fontSize: hp('2'),
        textAlign:'center'
        },
})

