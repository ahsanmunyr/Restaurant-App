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
const SignupScreen = ({navigation, SignUpStepOne, Otp, userOtp}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [value, setValue] = useState("");
    const [otp, setOtp] = useState("")
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);
    const [error, onChangeError] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [confirmPassword, onChangeConfirmPassword] = React.useState("");
    const [name, onChangeName] = React.useState("");
    const [phoneNumber, onChangePhone] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [stepOne, onChangestepOne] = React.useState(false);
    const [stepTwo, onChangestepTwo] = React.useState(false);
    const [validation, setValidation] = useState(false);
    const [checkedMale, onChangeCheckMale] = React.useState(false);
    const [checkedFemale, onChangeCheckFemale] = React.useState(false);
    const [checkedMaleText, onChangeCheckMaleText] = React.useState("");
    const [checkedFemaleText, onChangeCheckFemaleText] = React.useState("");
    const [onClick, onChangeOnClick] = React.useState(false);
    // const [genderImage, onChangeGenderImage] = React.useState(require('./../../Assets/Images/gender1.png'))
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [items, setItems] = useState([
        {label: '    Male', value: 'male', icon: () => <Icon name="male" size={30} color="white" />},
        {label: '    Female', value: 'female', icon: () => <Icon name="female" size={30} color="white" />},
    ]);
    useEffect(() => {
    });

    useMemo(()=>{
        SplashScreen.hide();
    })

    const onSubmit=()=>{
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if(emailRegex.test(username)){
                console.log(value.length)
                if(value.length > 5){
                    const mobileNumber = '+'+phoneInput.current.state.code + value
                    onChangePhone(mobileNumber)
                        if(password === confirmPassword){
                            SignUpStepOne(name,username, password ,confirmPassword , mobileNumber, fadeChange, onChangeError)
                        }else{
                            onChangeError("Password not match") 
                            setValidation(true)
                        }
                    }else{
                onChangeError("Invalid Mobile Number") 
                setValidation(true)
                }
        }else{
            setValidation(true)
            onChangeError("Invalid Email Address")
        }
    }

    const onSubmit2=()=>{
        console.log(otp)
        Otp(otp, phoneNumber, fadeChange)
        // fadeChange()
    }

    const fadeChange = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false
          }).start();
          if(stepOne == false){
            onChangestepOne(true)
          }else if(stepTwo == false){
            onChangestepTwo(true)
          }
         
    }

    const showModal = () => {
        setModalVisible(true)
    }

    return(
        <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
                <>   
             <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}
            > 
        {
            stepOne == false  ?
            // <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            // style={{flex:1}}
            // >  
                
                <ScrollView  style={styles.scrollView}>
                      <Image style={{width: '100%', height: 350, top: -10}} resizeMode='cover' source={require('./../../Assets/Images/header.png')}  />
                <View style={{  justifyContent:'flex-start', flexDirection:'column', height: '50%',  width:'100%'}}>
                    
                <View style={{flexDirection:'row',  height: 40,  left: 10}}>
                                <TextSample 
                                    Label="Create Account" 
                                    Color="black" 
                                    Size={hp("3.5%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                                />
                            </View>
                    <View style={styles.textField}>
                        <FontAwesome name="user-o"  size={20} color="#f54730" />
                            <TextInputFeild
                                placeholder="Username"
                                value={name}
                                onchange={onChangeName}
                                keyboardType='email-address'
                                secureTextEntry={false}
                                Color='grey'
                            />
                        </View>
                    <View style={styles.textField}>
                        <FontAwesome name="envelope-o"  size={20} color="#f54730" />
                            <TextInputFeild
                                placeholder="Email"
                                value={username}
                                onchange={onChangeUsername}
                                keyboardType='email-address'
                                secureTextEntry={false}
                                Color='grey'
                            />
                        </View>
                        <View style={styles.textField}>
                        <Ionicons name="md-lock-closed-outline" size={20} color="#f54730" /> 
                            <TextInput
                                keyboardType='default'
                                placeholder="Password"
                                placeholderTextColor="grey"
                                style={styles.input}
                                onChangeText={onChangePassword}
                                value={password}
                                caretHidden={false}
                                textAlignVertical='bottom'
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.textField}>
                        <Ionicons name="md-lock-closed-outline" size={20} color="#f54730" /> 
                            <TextInput
                                keyboardType='default'
                                placeholder="Confirm Password"
                                placeholderTextColor="grey"
                                style={styles.input}
                                onChangeText={onChangeConfirmPassword}
                                value={confirmPassword}
                                caretHidden={true}
                                textAlignVertical='bottom'
                                secureTextEntry={true}
                            />
                        </View>
                 
                    <View style={styles.textField}>
                    <Ionicons name="call-outline" size={20} color="#f54730" /> 

                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="PK"
                            // layout="first"
                            onChangeText={(text) => {
                            setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                            }}
                            placeholder=" "
                            containerStyle={{ height: 35, elevation: 0}}
                            textContainerStyle={{backgroundColor: 'white',top: 0}}
                            codeTextStyle={{color: 'black',  height: 20, left: -10}}
                            textInputStyle={{color: 'black', textAlignVertical:'bottom', height: 45}}
                            flagButtonStyle={{color: 'white',height: 30,  backgroundColor: 'white',}}
                            countryPickerButtonStyle={{color: 'white',}}
                            withShadow
                            withDarkTheme
                            disableArrowIcon='false'
                        />
                    </View>
                    <View style={{ alignItems:'center' ,flexDirection: 'column', alignContent:'space-between', top:5}}>
                    <View style={{ height:hp('10%'), alignItems:'center' ,flexDirection: 'row', alignContent:'space-between', marginTop: 10, width:'100%', justifyContent:'space-between'}}>
                            <TouchableOpacity    onPress={() => navigation.navigate('login')}>
                                        <LinearGradient
                                            start={{ x: -1, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ '#B01125','#f54730']}
                                            style={styles.touchableOpacityBack}
                                            >
                                                <TextSample 
                                                    Label="LOGIN" 
                                                    Color="white" 
                                                    Size={hp("2%")} 
                                                    TextAlign='center'
                                                    NumberOfLines={2} 
                                                    Font="Overpass-Bold"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                                                />
                                        </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={onSubmit} >
                                        <LinearGradient
                                            start={{ x: -1, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ '#B01125','#f54730']}
                                            style={styles.touchableOpacity}
                                            >
                                                <TextSample 
                                                    Label="CONTINUE" 
                                                    Color="white" 
                                                    Size={hp("2%")} 
                                                    TextAlign='center'
                                                    NumberOfLines={2} 
                                                    Font="Overpass-Bold"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                                                /> 
                                        </LinearGradient>
                                </TouchableOpacity>
                            </View>
                </View>
                </View> 
                </ScrollView> : stepTwo == false && stepOne == true ? 
                    <Animated.View style={{opacity: fadeAnim}}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        <View style={{ flexDirection:'column', height: hp('70%'), width: '100%', flex: 1, justifyContent:'space-around', alignItems:'center', alignSelf:'center'}}> 
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
                                                    Label="SIGN UP" 
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
                    </Animated.View>: null
                    
                }
         
                </KeyboardAvoidingView>
                </> 
                <AlertModal modalVisible={validation} closeModal={()=>{setValidation(false)}} message={error} />
        </View>
    )
}

// const mapStatetoProps = ({userOtp}) =>
// {
//       return {userOtp}
// }

export default connect(null,actions)(SignupScreen)

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

