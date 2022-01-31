import React, {
    useEffect,
    useState,
    useRef
  } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    PermissionsAndroid,
    Image,
    KeyboardAvoidingView,
    LayoutAnimation,
    Platform,
    UIManager,
    Animated,
    TouchableHighlight,
    TextInput,
    ScrollView
  } from 'react-native';
import {connect} from "react-redux";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import {  Badge } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';
import TextSample from '../../Components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import * as actions from '../../Store/Actions/'
import {deploy_API} from './../../Config/Apis.json'
import { FlatList } from 'react-native-gesture-handler';
import ItemsList from '../../Components/ItemsList';
import Skeleton from '../../Components/Skeleton';

  const ItemScreen = ({
      navigation, body,getItem,userGetItems, getItemsClear,userAddToCart
    }) => {
      console.log("body",body)
      // const onChangeSearch = query => setSearchQuery(query);
      // const [items, onChangeItems] = useState([])
      const [loading, onChangeLoading] = useState(false)
      const [noData, onChangeData] = useState(true)

      const [searchQuery, setSearchQuery] = React.useState('');
      const onChangeSearch = query =>
      { 
        // console.log(query)
        setSearchQuery(query)
  
        const newData = userGetItems.filter((item) => {
          const itemData = `${item.restaurant_name.toUpperCase()}`
          const textData = query.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
        onChangeItems(newData)
      };
      const [items, onChangeItems] = useState([])

useEffect(()=>{
    if(userGetItems.length > 0){
      console.log(userGetItems, "================== =============== ==========")
      onChangeItems(userGetItems)
      onChangeLoading(true)
      onChangeData(false)
    }
    console.log(userGetItems)
    navigation.addListener('blur',()=>{
      getItemsClear()
    })
  },[userGetItems])

  

return ( 
      <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />
          <ImageBackground resizeMode='cover' source={require('./../../Assets/Images/bg.png')} style={{width: '100%', height: '65%', position:'absolute', top: 0}}>
          <View style={{alignItems:'center', justifyContent:'space-between', top: 40, flexDirection:'row', width: '90%', alignSelf:'center' }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('home')}>
                      <View style={{zIndex: 99999, elevation: 9, backgroundColor: '#f54749', width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                            <Ionicons name="arrow-back-outline" style={{}} size={20} color='white' />
                      </View>
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                                        <View style={{top:10,zIndex: 9999,left: 10}}><Badge  value={userAddToCart.length}  status="error"  /></View>
                                        <View style={{ backgroundColor:'white',   borderColor: '#f54749', borderWidth: 2, width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                                              <Ionicons name="cart-outline" style={{}} size={20} color='#f54749' />
                                        </View>
                                </TouchableOpacity>
              </View>
            <View style={{justifyContent:'space-around', alignItems:'center', width: '100%', flexDirection:'row',alignSelf:'center', position: 'absolute', top: 100}}>
              <View style={{flexDirection:'column', justifyContent:'center', alignItems:'flex-start', width: '40%'}}>
              <TextSample 
                                      Label={body.name} 
                                      Color="black" 
                                      Size={hp("3%")} 
                                      TextAlign='left'
                                      NumberOfLines={1} 
                                      Font="Overpass-Bold"
                                      TextDecorationLine='none'
                                      TextTransform='none'
                    /> 
                      <TextSample 
                                      Label={body.quantity} 
                                      Color="black" 
                                      Size={hp("2%")} 
                                      TextAlign='left'
                                      NumberOfLines={3} 
                                      Font="Overpass-BoldItalic"
                                      TextDecorationLine='none'
                                      TextTransform='none'
                    /> 
              </View>
            <View style={{width: 150, height: 120,alignItems:'flex-end', bottom: 10}}>
              <Image 
                resizeMode='contain'
                style={{width: 100, height: '100%'}}
                source={{uri: `${deploy_API+'/'+body.image}`}}
              />
            </View>
          </View>
          </ImageBackground>
          <View style={{
              height: '70%', 
              width:'100%', 
              backgroundColor:'white', 
              bottom: 0, 
              position:'absolute', 
              borderTopLeftRadius: 60, 
              borderWidth: 0.5, zIndex: 9999, 
              elevation: 9,
            }}>
          <View style={{width: '100%', flexDirection:'row', alignItems:'center', justifyContent:'center', alignSelf: 'center',  height: '17%', marginBottom: 0, paddingTop: 10}}>
            <Searchbar
                                          placeholder="Search "
                                          onChangeText={onChangeSearch}
                                          value={searchQuery}
                                          style={{borderRadius: 20, width: '90%'}}
            />
            {/* <View style={{ alignItems:'center', justifyContent:'center'}}>
                                        <TouchableOpacity style={{backgroundColor:'#f54749', width: 40, height: 40, borderRadius: 50, alignItems:'center', justifyContent:'center'}} onPress={()=> navigation.navigate('searchfilter')}>
                                            <Ionicons name="filter" style={{}} size={20} color='white' />
                                        </TouchableOpacity>
            </View> */}
          </View>
        <>
        {
          loading && !noData ? 
              <View style={{width: '100%', height: '100%', backgroundColor:'white'}}>
                        <FlatList 
                            data={items}
                            // keyExtractor={(item) => item.item_id}
                            keyExtractor = {(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            initialNumToRender={7}
                            ListFooterComponent={<View style={{ height: 150}} />}
                            numColumns={2}
                            style={{position:'relative',width: '100%', flexWrap:'wrap',}}
                            contentContainerStyle={{width: '100%',}}
                            scrollEnabled
                            bounces
                            bouncesZoom
                            // maintainVisibleContentPosition
                            renderItem={({ item, index }) => 
                                        <ItemsList
                                            ItemID={item.item_id}
                                            RestaurantID={item.restaurant_id}
                                            RestaurantName={item.restaurant_name}
                                            CategoryID={item.category_id}
                                            ItemStatus={item.item_status}
                                            Title={item.item_name}
                                            Images={item.item_image}
                                            Price={item.item_price}
                                            Navigation={navigation}
                                            Description={item.item_description}
                                            Address={item.restaurant_address}
                                            Phone={item.restaurant_phone}
                                        />
                                    }
                        />
                        
      {/* "category_id":1,
      "item_created_at":"2021-12-15T04:34:56.000Z",
      "item_description":"Test test",
      "item_estimated_time":"2",
      "item_id":3,
      "item_image":"uploads/1637762029047rest4.jpg",
      "item_name":"Burger",
      "item_price":"50",
      "item_status":1,
      "item_updated_at":"2021-11-17T04:36:17.000Z",
      "rating":4,
      "restaurant_id":1,
      "restaurant_name":"KFC" */}
   
                      
              </View>: noData  ?
              <View style={{flexDirection:'column'}}>
                <View style={{height: '40%',  justifyContent:'space-around',alignSelf:'center', width: '90%', flexDirection:'row',}}>
                  <Skeleton />
                  <Skeleton />
              </View>
              <View style={{height: '40%',  justifyContent:'space-around',alignSelf:'center', width: '90%', flexDirection:'row',}}>
                  <Skeleton />
                  <Skeleton />
              </View>
          </View>: <View style={{flex: 1, backgroundColor: 'red'}} />
        } 
        </>
        </View>
    </View>
    )
}

function mapStateToProps({userGetItems, userAddToCart}){
    return {userGetItems, userAddToCart}
}

export default connect(mapStateToProps,actions)(ItemScreen)
  
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      height: '100%',
      backgroundColor: 'white'
    },
    touchableOpacity:{
      backgroundColor: 'white',
      borderWidth: 0,
      borderColor: 'white',
      width: wp('60%'),
      height: hp('6%'),
      justifyContent: 'center',
      borderRadius: 25,
      alignItems:'center'
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Overpass-Bold',
    fontSize: hp('2'),
    textAlign:'center'
  },
  })