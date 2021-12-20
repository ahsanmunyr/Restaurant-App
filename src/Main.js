import React, { useState,useEffect } from 'react';
import AuthRootStackScreen from "./AuthRootStackScreen"
import {connect} from "react-redux";
import {Text,View, ActivityIndicator, StatusBar} from 'react-native';
import * as actions from './Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { 
    NavigationContainer, 
  } from '@react-navigation/native';
import MainAppScreens from './InApp';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextSample from './Components/Text'
    const Main = ({userLogin}) => {
    const [token, onChangeToken] = React.useState('');
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        try{
          async function GetToken(){
             await AsyncStorage.getItem('token', (err, value) => {
              if (err) {
                  console.log(err)
              } else {
                const va = JSON.parse(value) // boolean false
                if(va){
                  console.log('userinformation',va)
                  onChangeToken(va);
                }
             
                // setLoading(false)
               }
          })
              // await AsyncStorage.setItem('userinformation',userLogin)
          
              // onChangeToken(Token);
              // setLoading(false);
              setLoading(false)
            }
          GetToken()
        }catch(error){
          console.log(error)
        }
      },[userLogin])
      if(loading){
        return(
          <View style={{
                  width:'100%', 
                  height: '100%', 
                  justifyContent:'center', 
                  alignItems:'center', 
                  alignSelf:'center', 
                  backgroundColor: '#f54749',
                  flex: 1,
                  alignContent:'center', 
                }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LottieView 
                  speed={2} 
                  style={{
                    height: '50%',
                    width: '50%', 
                    alignSelf:'center', 
                    justifyContent:'center'
                  }}  
                  autoPlay loop source={require('./Assets/Lottie/loading.json')} 
                />
                <TextSample 
                                    Label="Loading..." 
                                    Color="white" 
                                    Size={hp("3.5%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                                    />
          </View>
        )
}else{
    return(
        <NavigationContainer>
          {
            userLogin.token || token.token != null ?
              <MainAppScreens />: <AuthRootStackScreen /> 
          }
        </NavigationContainer>
        )
      }
}

const mapStatetoProps = ({userLogin, userAuthSignUp}) =>
{
    return {userLogin, userAuthSignUp}
}
export default connect(mapStatetoProps,actions)(Main)