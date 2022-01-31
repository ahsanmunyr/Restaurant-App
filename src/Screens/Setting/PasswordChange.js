import React, {useEffect, useState,useRef} from 'react';
import {
    TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
    Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextSample from '../../Components/Text';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import {connect} from "react-redux";
import * as actions from '../../Store/Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const PasswordChange = ({navigation, SignOut}) => {
    return(
        <View style={styles.container}>
              <StatusBar translucent backgroundColor="#f54749" />

              <View style={{position:'absolute', top: 40, width: '100%', flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <TouchableOpacity onPress={()=> navigation.goBack()}>
                         
                                    <Icon name="arrow-back-outline" style={{}} size={30} color='black' />
                           
                            </TouchableOpacity>
                            <View style={{alignItems:'center', justifyContent:'flex-start'}}>
                                <TextSample 
                                    Label="Password Change" 
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
                
       
        </View>
    )
}

export default connect(null,actions)(PasswordChange)


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: hp('103%'),
        backgroundColor: 'white'
    }
})