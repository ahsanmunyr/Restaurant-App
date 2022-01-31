import React, {useEffect, useState,useRef} from 'react';
import {
    TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,Dimensions,Keyboard,TouchableWithoutFeedback,
    Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextSample from '../../Components/Text';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import {connect} from "react-redux";
import * as actions from '../../Store/Actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import TextInputFeild from '../../Components/TextFeild';
import {deploy_API} from './../../Config/Apis.json'
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios"
const {width, height} = Dimensions.get('window');
const EditProfile = ({navigation, SignOut, userLogin, profileUpdated}) => {
    const [userImage, setUserImage] = useState(null);
    const [address, onChangeAddress] = useState('');
    const [username, onChangeUsername] = useState('');
    
    const submit = async () => {
      
      try{
        if(username != '' &&  address != '' && userImage != null){

          console.log(username, address, userImage, userLogin?.user_id)
          profileUpdated(username, address, userImage, userLogin?.user_id )
        //   var bodyFormData = new FormData();
         
       
        // console.log({
        //      uri:userImage.uri,
        //     name:userImage.fileName,
        //     type:userImage.type
        // })

        // bodyFormData.append('user_name', username);
        // bodyFormData.append('user_address', address);
        // bodyFormData.append('image', {
        //   name:userImage.fileName,
        //   uri:userImage.uri,
        //   type:userImage.type
        // });
        // bodyFormData.append('user_id', userLogin?.user_id);

        // const res =  await axios({
        //     method: "post",
        //     url: `${deploy_API}/rider/register`,
        //     data: bodyFormData,
        //     headers: { Accept: 'application/json',
        //                     "Content-Type": "multipart/form-data"
        //                 },
        //   })
        //   if(res.data.status){
        //          showMessage({
        //           message: "Success",
        //           description: "Profile Updated!!!",
        //           type: "success",
        //       });
        //   }else{
        //     showMessage({
        //       message: "Error",
        //       description: "Profile Updated Failed",
        //       type: "error",
        //   });
        //   }
            // axios.post(`${deploy_API}/api/user/updateuser`, {
            // user_name: username,
            // user_address: address,
            // image: userImage,
            // user_id: userLogin?.user_id,
            // })
            // .then(function (response) {
            //   const { msg , status} = response.data;
            //   if(status){
            //     showMessage({
            //       message: "Success",
            //       description: "Profile Updated!!!",
            //       type: "success",
            //   });
            //   }
            //   console.log(response.data);
            // })
      }else{
        showMessage({
          message: "WARNING",
          description: "Please fill the required fields",
          type: "warning",
      });
      }
      }catch(eer){
        console.log(eer)
      }
    }

    const uploadPhoto = async () => {
        var options = {
          title: 'Select Image',
          allowsEditing: true,
          quality: 0.9,
          maxWidth: 1200,
          maxHeight: 1200,
          mediaType: 'photo',
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        ImagePicker.launchCamera(options, response => {
          // var ArraySingleImage = []
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            // SelectMultipleImage()
          } else {
            // setUserImage(
            //   `data:${response.assets[0].type};base64,${response.assets[0].base64}`,
            // );
           
            setUserImage(response.assets[0]);
          }
        });
      };

    return(
        <View style={styles.container}>
              <StatusBar translucent backgroundColor="#f54749" />
              <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{flex:1}}
                >
                        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                            <ScrollView style={{flex:1, }}>
                              <View style={{top: 40, width: '100%', flexDirection:'row', alignItems:'center', justifyContent:'space-around', height: 70,}}>
                                            <TouchableOpacity onPress={()=> navigation.goBack()}>
                                        
                                                    <Ionicons name="arrow-back-outline" style={{}} size={30} color='black' />
                                          
                                            </TouchableOpacity>
                                            <View style={{alignItems:'center', justifyContent:'flex-start'}}>
                                                <TextSample 
                                                    Label="Edit Profile" 
                                                    Color="black" 
                                                    Size={hp("3%")} 
                                                    TextAlign='left'
                                                    NumberOfLines={1} 
                                                    Font="Overpass-Bold"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                                                />
                                            
                                            </View>
                                            <View></View>
                              </View>
                              <View style={styles.boxContainer}>
                                      {userLogin?.user_image || userImage ? (
                                        <Image
                                          source={{
                                            uri: userImage
                                              ? `data:${userImage.type};base64,${userImage.base64}`
                                              : `${deploy_API+'/'+userLogin?.user_image}`,
                                              }}
                                              style={[StyleSheet.absoluteFill, {borderRadius: 100}]}
                                              // style={styles.imageStyle}
                                          />
                                          ) : (
                                          <TextSample 
                                              Label={userLogin?.user_name?.match(/\b(\w)/g).join('')}
                                              Color="black" 
                                              Size={hp("3%")} 
                                              TextAlign='left'
                                              NumberOfLines={1} 
                                              Font="Overpass-Bold"
                                              TextDecorationLine='none'
                                              TextTransform='none'
                                          />
                                          )}
                                          <TouchableOpacity
                                          style={styles.iconTouchable}
                                          onPress={() => uploadPhoto()}>
                                          <MaterialIcons
                                              name="camera-alt"
                                              type={'MaterialIcons'}
                                              color="black"
                                              size={30}
                                              style={styles.icon}
                                          />
                                          </TouchableOpacity>
                              </View>
                              <View style={{height: '40%', width:'100%', marginVertical: 10,}}>
                                              <View style={styles.textField}>
                                                <FontAwesome name="user-o"  size={20} color="#f54730" />
                                                    <TextInputFeild
                                                        placeholder="Username"
                                                        value={username}
                                                        onchange={onChangeUsername}
                                                        keyboardType='email-address'
                                                        secureTextEntry={false}
                                                        Color='grey'
                                                    />
                                                </View>
                                                <View style={styles.textField}>
                                                <FontAwesome name="address-book-o"  size={20} color="#f54730" />
                                                    <TextInputFeild
                                                        placeholder="Address"
                                                        value={address}
                                                        onchange={onChangeAddress}
                                                        keyboardType='default'
                                                        secureTextEntry={false}
                                                        Color='grey'
                                                    />
                                                </View>
                                                <View style={{ alignSelf:'center', top: 40}}>
                                                  <TouchableOpacityBtn  
                                                      onPress={()=> submit()}
                                                      title="Submit"
                                                  />
                                                </View>
                              </View>
                             
                          </ScrollView>
                          </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              
        </View>
    )
}

function mapStateToProps({
        userLogin
  }) {
    return {
      userLogin
    };
  }

export default connect(mapStateToProps,actions)(EditProfile)



const styles = StyleSheet.create({
  textField: {
    width: wp('90%'),
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
    backgroundColor:'white',
    // borderRadius: 12,
    height:45,
    alignItems:'center',
    alignSelf:'center',
    borderBottomWidth: 1,
    borderColor: '#f54730'
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5
  },
    loadingComponent: {
      borderRadius: width * 0.02,
      position: 'relative',
      backgroundColor: "#f54749",
      justifyContent: 'center',
      alignItems: 'center',
      height: height * 0.08,
      width: width * 0.8,
      marginVertical: height * 0.02,
    },
    lottieStyles: {
      height: height * 0.15,
      position: 'absolute',
      left: 0,
      right: 0,
      top: height * -0.02,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: 'white',
    },
    pencilIcon: {
      color: 'black',
      fontSize: width * 0.045,
      paddingLeft: width * 0.02,
    },
    usernameWordsStyle: {
      fontSize: width * 0.12,
      marginBottom: -20,
      textTransform: 'uppercase',
      color: "#f54749",
      // backgroundColor:'red'
    },
    btnStyle: {
      borderRadius: width * 0.02,
      backgroundColor: "#f54749",
    },
    btnTextColor: {
      color: 'white',
      fontFamily: 'Poppins-SemiBold',
      fontSize: width * 0.045,
    },
    btnContainer: {
      alignItems: 'center',
      marginTop: height * 0.05,
      // paddingBottom: 100,
    },
    horizontalLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#707070',
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontalLinePosition: {
      flexDirection: 'row',
      marginLeft: width * 0.1,
      marginRight: width * 0.1,
    },
    heading: {
      color: 'black',
      marginLeft: width * 0.08,
      fontSize: width * 0.08,
      marginTop: height * 0.04,
    },
    boxContainer: {
      borderRadius: width * 0.8,
      height: width * 0.48,
      width: width * 0.48,
      alignItems: 'center',
      marginHorizontal: width * 0.22,
      marginTop: 70,
      justifyContent: 'center',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: 'rgba(0,0,0,0.008)',
      // paddingHorizontal: width * 0.2,
      // paddingVertical: height * 0.005,
    },
    nameLabel: {
      fontSize: height * 0.027,
      color: 'black',
      textTransform: 'capitalize',
      marginHorizontal: width * 0.1,
    },
    usernameStyle: {
      fontSize: height * 0.027,
      marginRight: width * 0.01,
      color: "#f54749",
      textTransform: 'capitalize',
    },
    icon: {
        backgroundColor: "#f54749",
      color: '#ffffff',
      padding: height * 0.01,
      borderRadius: width,
    },
    iconTouchable: {
      position: 'absolute',
      top: height * 0.19,
      right: width * 0.025,
      borderRadius: 50,
       overflow:'hidden'
    },
    border_line: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.12)',
      width: width * 0.95,
      fontFamily: 'Poppins-Regular',
    },
    imageStyle: {
      width: width * 0.5,
      height: height * 0.28,
      borderRadius: width * 0.8,
    },
    usernameViewStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      // justifyContent: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: "#f54749",
      marginHorizontal: width * 0.1,
      marginVertical: height * 0.03,
    },
  });