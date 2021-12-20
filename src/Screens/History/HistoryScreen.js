import React, {useEffect, useState,useRef} from 'react';
import {
    TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,DeviceEventEmitter,BackHandler,
    Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView,RefreshControl
} from 'react-native';
import history from '../../../model/History';
import TextSample from '../../Components/Text';
import { Searchbar } from 'react-native-paper';
import Histories from '../../Components/Histories';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const HistoryScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [loading, onChangeLoading] = useState(false)
    if(loading){
        return(
            <View style={{flex: 1, backgroundColor:'purple'}} />
        )
    }else{
        return(   
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            {/* <ImageBackground style={{height: '100%'}}  source={require('./../../Assets/Images/bg.png')}> */}
            <View style={{alignItems:'center'}}>
                <FlatList
                        data={history}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={{
                                    width: '100%',
                                    height: 100,
                                    top: 35,
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
                        }
                        ListHeaderComponentStyle={{marginBottom: 50}}
                        ListFooterComponent={<View style={{height: 100}}></View>}
                        initialNumToRender={7}
                        style={{position:'relative'}}
                        scrollEnabled
                        bounces
                        bouncesZoom
                        maintainVisibleContentPosition
                        renderItem={({ item, index }) => 
                                <Histories
                                    Title={item.name}
                                    Images={item.image}
                                    Time={item.time}
                                    Items={item.items}
                                    Status={item.status}
                                    Price={item.price}
                                    Reviews={item.reviews}
                                    Location={item.location}
                                    PaymentMethod={item.paymentMethod}
                                    OrderID={item.orderID}
                                />
                                }
                />
            </View>
        </View>     
    )
}
}
export default HistoryScreen;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '103%',
        backgroundColor:'white',
        justifyContent: 'center'
    }
})
