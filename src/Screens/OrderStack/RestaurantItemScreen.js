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
import RestaurantItemsList from '../../Components/RestaurantItemsList';
import AddCartBtn from './../../Components/AddCartBtn'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
  // import TagInput from 'react-native-tags-input';
import BottomSheets from '../../Components/BottomSheet';

const RestaurantItemScreen = ({
    navigation, body, userGetRestaurantItem,userAddToCart
    }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query =>
    { 
      // console.log(query)
      setSearchQuery(query)

      const newData = userGetRestaurantItem.filter((item) => {
        const itemData = `${item.item_name.toUpperCase()}`
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      onChangeItems(newData)
    };
    const [items, onChangeItems] = useState([])
    const [loading, onChangeLoading] = useState(false)
    const [noData, onChangeData] = useState(true)
    const fall = new Animated.Value(1)

  // const searchFilterFunction = (text) => {
  //     const newData = this.arrayholder.filter((item) => {
  //       const itemData = `${item.Title.toUpperCase()}
  //       ${item.description.toUpperCase()} ${item.status.toUpperCase()}
  //       ${item.onloc.toUpperCase()} ${item.gttl.toUpperCase()}
  //       ${moment(item.date).format('DD MMM yyyy')} ${moment(item.date).format(
  //         'DD-MMM-yyyy',
  //       )} ${moment(item.date).format('DD/MMM/yyyy')}`;
  
  //       const textData = text.toUpperCase();
  
  //       return itemData.indexOf(textData) > -1;
  //     });
  
  //     this.setState({datahistory: newData});
  //   };
    // console.log(body, ":(|):")
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 350,
        borderColor:'#fcc7c8',
        borderWidth: 1,
        borderRadius: 12
      }}
    >
      <View style={{width:'100%', margin:0, height: 300,  alignSelf:'center'}}>
         <FlatList  
                bounces
                bouncesZoom
                // maintainVisibleContentPosition
                showsVerticalScrollIndicator={false}
                data={userAddToCart}
                style={{width: '100%' }}
                contentContainerStyle={{ borderLeftWidth: 0.2}}
               
                // ListHeaderComponent={<View style={{height:50}}></View>}
                ListFooterComponent={<View style={{height: 10}}></View>}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => 
                  <BottomSheets
                      Id={item.itemId}
                      Img={item.image} 
                      Name={item.title}
                      Price={item.price}
                      Qty={item.qty}
                      Description={item.description}
                      RestaurantId={item.restaurantId}
                    />
                }
                    keyExtractor={(item, index) => index}
                />
      </View>
    </View>
  );



  // const onChangeSearch = (query) => {
  //   console.log('query')  
  //   // setSearchQuery(query);
  // }

  // const handleSearch = text => {
  //   const formattedQuery = text.toLowerCase();
  //   const filteredData = filter(fullData, user => {
  //     return contains(user, formattedQuery);
  //   });
  //   setData(filteredData);
  //   setQuery(text);
  // };
  
  // const contains = ({ name, email }, query) => {
  //   const { first, last } = name;
  
  //   if (first.includes(query) || last.includes(query) || email.includes(query)) {
  //     return true;
  //   }
  
  //   return false;
  // };


 
  const sheetRef = React.useRef(null);

    useEffect(()=>{
        if(userGetRestaurantItem.length > 0){
            // console.log(userGetRestaurantItem,':)')
            onChangeItems(userGetRestaurantItem)
        }
    },[userGetRestaurantItem])

  const goToFoo = () => {
      navigation.navigate('Cart')
  }
    return(
        <View style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Animated.View style={[styles.container, {  opacity: Animated.add(0.3, Animated.multiply(fall, 0.99))}]}>
          <FlatList
                    data={items}
                    keyExtractor={(item) => item.item_id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    key={(item) => item.item_id}
                    ListHeaderComponent={
                      <View style={{
                          height: 180,
                          justifyContent:'space-around', 
                          width: '100%',
                          flexDirection:'column',
                          alignItems:'center',
                          alignSelf:'center',
                          paddingTop: 20,
                      }}>
                      <View style={{
                        justifyContent:'space-between', 
                        flexDirection:'row',
                        alignItems:'center',
                        alignSelf:'center',
                        width: '90%',
                        }}>
                                <TouchableOpacity onPress={()=> navigation.pop()}>
                                  <View style={{ backgroundColor: '#f54749', width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                                        <Ionicons name="arrow-back-outline" style={{}} size={20} color='white' />
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => goToFoo()}>
                                        <View style={{top:10,zIndex: 9999,left: 10}}><Badge  value={userAddToCart.length} status="error"  /></View>
                                        <View style={{ backgroundColor:'white',   borderColor: '#f54749', borderWidth: 2, width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                                              <Ionicons name="cart-outline" style={{}} size={20} color='#f54749' />
                                        </View>
                                </TouchableOpacity>
                      </View>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center', 
                          justifyContent:'center', 
                          width: '100%',
                          
                          }}>
                                          <Searchbar
                                                  placeholder="Search "
                                                  onChangeText={onChangeSearch}
                                                  value={searchQuery}
                                                  style={{borderRadius: 20, width: '90%',  borderColor:'#f54749', borderWidth:1, zIndex: 1, elevation:999}}
                                          />
                                          {/* <View style={{ alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                                                  <TouchableOpacity style={{backgroundColor:'#f54749', width: 40, height: 40, borderRadius: 50, alignItems:'center', justifyContent:'center'}} >
                                                      <Ionicons name="filter" style={{}} size={20} color='white' />
                                                  </TouchableOpacity>
                                          </View> */}
                      </View>
                      
                    </View>
                  
                    }
                    ListFooterComponent={<View style={{height: 100}}></View>}
                    initialNumToRender={7}
                    style={{position:'relative'}}
                    scrollEnabled
                    bounces
                    bouncesZoom
                    
                    // maintainVisibleContentPosition
                    renderItem={({ item, index }) => 
                            <RestaurantItemsList
                                CategoryID={item.category_id}
                                ItemID={item.item_id}
                                ItemName={item.item_name}
                                ItemPrice={item.item_price}
                                ItemStatus={item.item_status}
                                Images={item.item_image}
                                RestaurantName={item.restaurant_name}
                                RestaurantID={item.restaurant_id}
                                Ratings={item.rating}
                                Navigation={navigation}
                                Description={item.item_description}
                            />
                        }
            />
            
           </Animated.View>
           {
              userAddToCart.length > 0 ?
            
              <BottomSheet
              ref={sheetRef}
              snapPoints={[330, 200, 70]}
              borderRadius={12}
              renderContent={renderContent}
              initialSnap={1}
              renderHeader={
              () =>  <View style={{height: 20, width: '100%', alignSelf:'center', alignItems:'center', zIndex: 1,}}>
                <Ionicons name="ios-ellipsis-horizontal" style={{}} size={20} color='#f54749' />
              </View>
              }
              enabledBottomClamp={true}
              enabledBottomInitialAnimation={true}
              callbackNode={fall}
              springConfig={{
                stiffness: 5,
                restDisplacementThreshold: 10,
                restSpeedThreshold: 5, 
                toss: 10,
                damping: 20
              }}
            />
              : null
            }
          
       </View>
    )
}




    function mapStateToProps({userGetRestaurantItem,userAddToCart}){
        return {userGetRestaurantItem, userAddToCart}
     }
    
    
export default connect(mapStateToProps,actions)(RestaurantItemScreen)
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