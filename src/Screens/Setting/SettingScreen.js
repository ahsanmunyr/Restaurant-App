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
const SettingScreen = ({navigation, SignOut}) => {
    return(
        <View style={styles.container}>
              <StatusBar translucent backgroundColor="#f54749" />

                <View style={{position:'absolute', top: 40, width: '100%', flexDirection:'column'}}>
                            <View style={{alignItems:'center', justifyContent:'flex-start'}}>
                                <TextSample 
                                    Label="Settings" 
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
                
               <View style={{height: '60%', width: '100%', flexDirection:'column', alignItems:'flex-start', justifyContent:'space-around'}}>
               <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', alignSelf:'center'}} onPress={()=>navigation.navigate('editprofile')}>
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', width: '90%', height: 60, alignSelf:'center', margin: 5}}>
                  
                    <View style={{flexDirection:'row', alignItems:'center', width:'70%', justifyContent:'flex-start'}} >
                        <MaterialCommunityIcons name="account-edit-outline" style={{}} size={30} color="black" />
                        <TextSample 
                                    Label="  Edit Profile" 
                                    Color="black" 
                                    Size={hp("3%")} 
                                    TextAlign='right'
                                    NumberOfLines={1} 
                                    Font="Overpass-Regular"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                                />
                        </View>
                        <View>
                            <Icon name="ios-chevron-forward-sharp" style={{}} size={30} color="black" />
                        </View>
                    
                    </View>
                </TouchableOpacity>
                    <View style={{height: 0.5, width: '90%', backgroundColor:'#d6d6d6', alignSelf:'center'}} />
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', alignSelf:'center'}} onPress={()=>navigation.navigate('passwordchange')}>
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', width: '90%', height: 60, alignSelf:'center', margin: 5}}>
                    <View style={{flexDirection:'row', alignItems:'center', width:'70%', justifyContent:'flex-start'}} >
                        <Icon name="ios-lock-open-outline" style={{}} size={25} color="black" />
                        <TextSample 
                                    Label="  Change Password" 
                                    Color="black" 
                                    Size={hp("3%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Regular"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                                />
                        </View>
                        <View>
                            <Icon name="ios-chevron-forward-sharp" style={{}} size={30} color="black" />
                        </View>
                    </View>
                    </TouchableOpacity>
                    <View style={{height: 0.5, width: '90%', backgroundColor:'#d6d6d6', alignSelf:'center'}} />
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', width: '90%', height: 60, alignSelf:'center', margin: 5}}>
                    <View style={{flexDirection:'row', alignItems:'center', width:'70%', justifyContent:'flex-start'}} >
                        <Icon name="ios-information-circle-outline" style={{}} size={25} color="black" />
                        <TextSample 
                                    Label="  Help and Supoort" 
                                    Color="black" 
                                    Size={hp("3%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Regular"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                                />
                        </View>
                        <View>
                            <Icon name="ios-chevron-forward-sharp" style={{}} size={30} color="black" />
                        </View>
                    </View>
                    <View style={{height: 0.5, width: '90%', backgroundColor:'#d6d6d6', alignSelf:'center'}} />
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row',  width: '90%', height: 60, alignSelf:'center', margin: 5}}>
                    <View style={{flexDirection:'row', alignItems:'center', width:'70%', justifyContent:'flex-start'}} >
                        <AntDesign name="Safety" style={{}} size={25} color="black" />
                        <TextSample 
                                    Label="  Privacy Policy" 
                                    Color="black" 
                                    Size={hp("3%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Regular"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                                />
                        </View>
                        <View>
                            <Icon name="ios-chevron-forward-sharp" style={{}} size={30} color="black" />
                        </View>
                    </View>
                    <View style={{height: 0.5, width: '90%', backgroundColor:'#d6d6d6', alignSelf:'center'}} />
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', width: '90%', height: 60, alignSelf:'center', margin: 5}}>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', width:'70%', justifyContent:'flex-start'}} onPress={()=>SignOut()}>
                    <View style={{flexDirection:'row', alignItems:'center', width:'70%', justifyContent:'flex-start'}} >
                        <AntDesign name="logout" style={{}} size={25} color="black" />
                        <TextSample 
                                    Label="  Logout" 
                                    Color="black" 
                                    Size={hp("3%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Regular"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                                />
                    </View>
                    </TouchableOpacity>
                        <View>
                            <Icon name="ios-chevron-forward-sharp" style={{}} size={30} color="black" />
                        </View>
                    </View>
                    <View style={{height: 0.5, width: '90%', backgroundColor:'#d6d6d6', alignSelf:'center'}} />

                    
                
               </View>
                {/* <View style={{alignItems:'center'}}>
                        <TouchableOpacityBtn title={"Logout"} onPress={()=>SignOut()} />
                </View> */}
        </View>
    )
}

export default connect(null,actions)(SettingScreen)


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: hp('103%'),
        backgroundColor: 'white'
    }
})