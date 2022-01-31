import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,Linking,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import Messages from '../../../model/Messages';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MessageList from './MessageList'
const MessageScreen = ({navigation, route}) => {
    // const [messages, onChangeMessages] = React.useState([Messages]);
   
    useEffect(() => {
        // console.log(messages)
      
       });
    
    const Separater=()=>{
        return(
            <View
                style={{
                    borderBottomColor: '#D8D8D8',
                    borderBottomWidth: 0.8,
                    width: wp('100%'),
                    justifyContent: 'center',
                    alignSelf:'center'
                }}
                />
        )
    }
    
    return(
        <View style={styles.container}>
            <FlatList  
                bounces
                bouncesZoom
                // maintainVisibleContentPosition
                showsVerticalScrollIndicator={false}
                data={Messages}
                ListHeaderComponent={<View style={{height:20}}></View>}
                ListFooterComponent={<View style={{height: 120}}></View>}
                scrollEnabled
                ItemSeparatorComponent={Separater}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => 
                  <MessageList
                    Time={item.MessageTime}
                    Image={item.Image} 
                    Name={item.Name}
                    Message={item.details}
                    OnlineStatus={item.OnlineStatus}
                    Navigation={navigation}
                  />}
                    keyExtractor={(item, index) => index}
                  />
        </View>
    )
}


export default MessageScreen;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: hp('103%'),
        backgroundColor:'#FCFCFC'    }
})