import React, {useEffect, useState,useRef} from 'react';
import {
    TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,DeviceEventEmitter,BackHandler,
    Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView,RefreshControl
} from 'react-native';
import history from '../../../model/History';
import TextSample from '../../Components/Text';
import { Searchbar } from 'react-native-paper';
import Histories from '../../Components/Histories';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as actions from '../../Store/Actions'
import { connect } from "react-redux";
const HistoryScreen = ({historyReducer}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    // const onChangeSearch = query => setSearchQuery(query);
    const [loading, onChangeLoading] = useState(true);
    const [items, onChangeItems] = useState(null)
    // const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query =>
    { 
      // console.log(query)
      setSearchQuery(query)

      const newData = historyReducer.data.filter((item) => {
        const itemData = `${item.restaurant_name.toUpperCase()}`
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      onChangeItems(newData)
    };


    useEffect(()=>{
        if(historyReducer?.data?.length > 0){
            onChangeItems(historyReducer.data)
            console.log("=--======",historyReducer.data, "=======" )
            onChangeLoading(false)
        }else{
            onChangeLoading(false)
            onChangeItems(null)
        }
    },[])

    if(loading){
        return(
            <LottieView
                speed={2}
                style={{
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
                }}
                autoPlay
                loop
                source={require('../../Assets/Lottie/loading.json')}
            />
        )
    }else{
        return(   
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            {/* <ImageBackground style={{height: '100%'}}  source={require('./../../Assets/Images/bg.png')}> */}
            <View style={{
                                    width: '100%',
                                    height: 100,
                                    // top: 45,
                                    }}>
                                    <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <TextSample 
                                                                Label="History" 
                                                                Color="black" 
                                                                Size={hp("3%")} 
                                                                TextAlign='left'
                                                                NumberOfLines={1} 
                                                                Font="Overpass-Bold"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                                            />
                                    </View>
                                    <View style={{justifyContent:'center',width: '95%', alignItems:'center', alignSelf:'center', top: 10}}>
                                    <Searchbar
                                            placeholder="Search"
                                            onChangeText={onChangeSearch}
                                            value={searchQuery}
                                            style={{borderRadius: 15}}
                                            />
                                    </View>
                </View>
            {
                items != null ?
            
            <View style={{alignItems:'center',}}>
                <FlatList
                        data={items}
                        keyExtractor={(item) => item.order_id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}             
                        ListHeaderComponentStyle={{marginBottom: 50}}
                        ListFooterComponent={<View style={{height: 100}}></View>}
                        initialNumToRender={7}
                        style={{position:'relative', height: '80%', width: '100%', alignSelf:'center'}}
                        scrollEnabled
                        bounces
                        bouncesZoom
                        renderItem={({ item, index }) => 
                                <Histories
                                    Title={item.restaurant_name}
                                    Images={item.restaurant_image}
                                    Time={item.order_created_at}
                                    Items={JSON.parse(item.items)}
                                    OrderLocation={item.order_location}
                                    Status={item.order_status}
                                    Price={item.order_price}
                                    Reviews={4}
                                    Location={item.restaurant_address}
                                    PaymentMethod={item.order_payment_method}
                                    OrderID={item.order_id}
                                />
                                }
                />
            </View>:<View style={{alignSelf:'center', height:'70%', width: '90%', backgroundColor:'white', justifyContent:'space-around', alignItems:'center'}}>   
                        <LottieView
                            speed={2}
                            style={{
                            // height: '60%',
                            // width: '100%',
                            // alignSelf: 'center',
                            // justifyContent: 'center',
                            // backgroundColor:'red',
                            // alignItems:'center'
                            }}
                            autoPlay
                            loop
                            source={require('../../Assets/Lottie/nodata.json')}
                        />
                        
                    </View>
        }
        </View>     
    )
}
}

function mapStateToProps({ historyReducer }) {
    return { historyReducer }
  }
  export default connect(mapStateToProps, actions)(HistoryScreen)


var styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '103%',
        backgroundColor:'white',
        justifyContent: 'center'
    }
})
