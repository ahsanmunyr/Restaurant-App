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
  ScrollView,
  FlatList
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import TextSample from '../../Components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import * as actions from '../../Store/Actions';
import Restaurants from '../../Components/Restaurant';
import {connect} from 'react-redux';
import ItemsList from '../../Components/ItemsList';
import {  Badge } from 'react-native-elements'
import { showMessage, hideMessage } from "react-native-flash-message";
const SearchScreen = ({
    navigation,SearchDataRedux,SearchDataItemRedux,userAddToCart
  }) => {
    // const [searchQuery, setSearchQuery] = React.useState('');
    // const onChangeSearch = query => setSearchQuery(query);
    const [data, onChangeData] = useState(null)
    const [item, onChangeItem] = useState(null)

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query =>
    { 
      // console.log(query)
      setSearchQuery(query)

      if(SearchDataItemRedux?.data?.data){
        let newData = (SearchDataItemRedux.data.data).filter((item) => {
          let itemData = `${item.restaurant_name.toUpperCase()}`
          let textData = query.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
        onChangeItem(newData)
        // onChangeData(null)
      }

      if(SearchDataRedux.data?.data){
        let newData = (SearchDataRedux.data.data).filter((item) => {
          let itemData = `${item.restaurant_name.toUpperCase()}`
          let textData = query.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
        onChangeData(newData)
        // onChangeItem(null)
      }
    };
    // const [items, onChangeItems] = useState(null)

    useEffect(()=>{
      // alert("SADAS")
      console.log(SearchDataItemRedux.data, "SADASDSADASDASD")
      if(SearchDataItemRedux.data){
      if(SearchDataItemRedux?.data.data?.length > 0){
        // console.log(SearchDataItemRedux.data.data, "SEARCH----ITEM")
        onChangeItem(SearchDataItemRedux.data.data)
        onChangeData(null)
      }
    }else{
 
    }
    },[SearchDataItemRedux])

    useEffect(() => {
      // console.log(SearchDataRedux.data.data)
      if(SearchDataRedux.data?.data?.length > 0){
        // console.log(SearchDataRedux.data.data, "SEARCH----")
        onChangeData(SearchDataRedux.data.data)
        onChangeItem(null)
      }
    }, [SearchDataRedux]
  )

  
  // {
  // "category_id": 66, 
  // "item_created_at": "2022-01-26T14:14:24.000Z", 
  // "item_description": "Qudrat Cola", "item_estimated_time": 
  // "10 to 15 mints ", "item_id": 14,
  // "item_image": "uploads/1637761273455rest4.jpg", 
  // "item_name": "Qudrat Cola",
  // "item_price": "12", "item_status": 1, 
  // "item_updated_at": "2022-01-26T14:14:24.000Z", 
  // "restaurant_id": 1
  // }

  const goToFoo = () => {
    navigation.navigate('Cart')
}
    return ( 
      <View style={styles.container}>
         <StatusBar translucent backgroundColor="#f54749" />
       
        
        <View style={{width: '90%', flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between', alignSelf: 'center',top: 40, height: 100 }}>
                                      <Searchbar
                                              placeholder="Search "
                                              onChangeText={onChangeSearch}
                                              value={searchQuery}
                                              style={{borderRadius: 20, width: '65%'}}
                                      />
                                      <View style={{ alignItems:'center', justifyContent:'center'}}>
                                            <TouchableOpacity style={{backgroundColor:'#f54749', width: 50, height: 50, borderRadius: 20, alignItems:'center', justifyContent:'center'}} onPress={()=> navigation.navigate('searchfilter')}>
                                                <Ionicons name="md-filter" style={{}} size={20} color='white' />
                                            </TouchableOpacity>
                                      </View>
                                <TouchableOpacity onPress={() => goToFoo()}>
                                        <View style={{zIndex: 9999,left: 10}}><Badge  value={userAddToCart.length} status="error"  /></View>
                                        <View style={{ 
                                                    backgroundColor:'white',   
                                                    borderColor: '#f54749', 
                                                    borderWidth: 2, width: 40, 
                                                    height: 40, borderRadius: 50, 
                                                    justifyContent: 'center', 
                                                    alignItems:'center', 
                                                    top: -10
                                                }}>
                                              <Ionicons name="cart-outline" style={{}} size={20} color='#f54749' />
                                        </View>
                                </TouchableOpacity>
                                      {/* <View style={{ alignItems:'center', justifyContent:'center'}}>
                                            <TouchableOpacity style={{backgroundColor:'#f54749', width: 50, height: 50, borderRadius: 20, alignItems:'center', justifyContent:'center'}} onPress={() => goToFoo()}>
                                                <Ionicons name="md-filter" style={{}} size={20} color='white' />
                                            </TouchableOpacity>
                                      </View> */}
        </View>
        <View style={{height: '80%'}}>
      {
        data != null ?
        <FlatList
            data={data}
            keyExtractor={item => item.restaurant_id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            key={item => item.restaurant_id}
            initialNumToRender={7}
            style={{position: 'relative', height: '60%'}}
            scrollEnabled
            bounces
            bouncesZoom
            renderItem={({item, index}) => (
              <Restaurants
                RestaurantID={item.restaurant_id}
                Lat={item.restaurant_latitude}
                Long={item.restaurant_longitude}
                Title={item.restaurant_name}
                Description={item.restaurant_subtitle}
                Images={item.restaurant_image}
                Ratings={item.rating}
                Reviews={item.total_reviews}
                Distance={item.distance}
                Status={item.restaurant_status}
                Address={item.restaurant_address}
                CloseTime={item.restaurant_close_time}
                OpenTime={item.restaurant_open_time}
                Phone={item.restaurant_phone}
                Email={item.restaurant_email}
                Navigation={navigation}
                screen={"main"}
              />
            )}
          />: item != null ?
          
          // "category_id": 66, 
          // "item_created_at": "2022-01-26T14:14:24.000Z", 
          // "item_description": "Qudrat Cola", 
          // "item_estimated_time": "10 to 15 mints ",
          //  "item_id": 14, 
          //  "item_image": "uploads/1637761273455rest4.jpg", 
          //  "item_name": "Qudrat Cola", 
          //  "item_price": "12", 
          //  "item_status": 1, 
          //  "item_updated_at": "2022-01-26T14:14:24.000Z", 
          //  "restaurant_address": "KFC - Gulshan-e-Iqbal, Block 7 Gulshan-e-Iqbal, Karachi",
          //   "restaurant_close_time": "5:00 am",
          //    "restaurant_created_at": "2021-11-17T09:04:39.000Z", 
          //    "restaurant_email": "farooq.khan@gmail.com", 
          //    "restaurant_id": 1,
          //     "restaurant_image": "uploads/KFC_logo.svg.png", 
          //     "restaurant_latitude": "24.9180588", 
          //     "restaurant_longitude": "67.0947953", 
          //     "restaurant_name": "KFC", 
          //     "restaurant_open_time": "9:00 am", 
          //     "restaurant_password": "$2b$10$9AfGVYrReI6/ayVwfaTFkOHV7KkX90LfvHgdfX.8kzJ6.xbwg33Ny", 
          //     "restaurant_phone": "11223344556", 
          //     "restaurant_status": 1, 
          //     "restaurant_subtitle": "Pizza, drinks, fries"
            
          <FlatList
            data={item}
            keyExtractor={item => item.item_id}
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
            renderItem={({item, index}) => (
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
            )}
          />:
          <View style={{justifyContent: 'center',  flexDirection:'column', alignItems:'center', width: '80%', height: '50%', alignSelf:'center', top: 100}}>
              <LottieView speed={2} style={{height: '90%', width: '50%'}}  autoPlay loop={false} source={require('./../../Assets/Lottie/search.json')} />
              <TextSample 
                                                                Label="Search the food you love" 
                                                                Color="black" 
                                                                Size={hp("2%")} 
                                                                TextAlign='left'
                                                                NumberOfLines={1} 
                                                                Font="Overpass-Bold"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                              /> 
              <TextSample 
                                                                Label="It's all at your fingertips – the restaurants and shops you love" 
                                                                Color="black" 
                                                                Size={hp("1.5%")} 
                                                                TextAlign='center'
                                                                NumberOfLines={2} 
                                                                Font="Overpass-Regular"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                              />
          </View>
      }
      </View>
    </View>
  )
}

function mapStateToProps({
  SearchDataRedux,SearchDataItemRedux,userAddToCart
}) {
  return {SearchDataRedux, SearchDataItemRedux,userAddToCart};
}

export default connect(mapStateToProps, actions)(SearchScreen);


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