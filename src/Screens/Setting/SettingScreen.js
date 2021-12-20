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
                <View style={{alignItems:'center'}}>
                        <TouchableOpacityBtn title={"Sign Out"} onPress={()=>SignOut()} />
                </View>
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