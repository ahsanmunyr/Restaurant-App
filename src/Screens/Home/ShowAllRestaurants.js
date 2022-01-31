import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  RefreshControl,
} from 'react-native';

import * as actions from '../../Store/Actions';
import {connect} from 'react-redux';
import Restaurants from '../../Components/Restaurant';
import { Searchbar } from 'react-native-paper';

// import {ActivityIndicator, Colors} from 'react-native-paper';
// import {showMessage, hideMessage} from 'react-native-flash-message';
import { MotiView } from 'moti'
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ShowAllRestaurant = ({
  navigation,
  userLocations,
  userSearchApply,
  userGetRestaurant,
  placeOrderStatus,
  getRestaurant,
  orderAccept,
  userLatitudeLongitude,
  saveNavigatorVariable,
  firebaseData,acceptOrderDetails,firebaseCoordsRider,orderDataClear
}) => {
  // console.log("NAVIGATION", navigation)
  const [refreshing, setRefreshing] = React.useState(false);
  const [placeName, onChangePlaceName] = useState('');
  const [loading, onLoadingChange] = useState(false);
  const [status, onChangeStatus] = useState(false);
  const [data, onChangeData] = useState([])
  // console.log(userGetRestaurant, 'data RES', )
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query =>
  { 
    // console.log(query)
    setSearchQuery(query)

    const newData = (userGetRestaurant.restaurants).filter((item) => {
      const itemData = `${item.restaurant_name.toUpperCase()}`
      const textData = query.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })
    onChangeData(newData)
  };

  useEffect(()=>{
    // navigation.navigate('ProcessStack')
    if (userGetRestaurant) {
        onChangeData(userGetRestaurant.restaurants)
      }
  },[userGetRestaurant])



//   useEffect(() => {
//     if (userLocations.PlaceName == undefined) {
//       onChangePlaceName('undefine');
//     } else {
//       onChangePlaceName(userLocations.PlaceName);
//     }
//     if (userSearchApply.testing != 'abc') {
//       // console.log(userSearchApply, "Yaha")
//       onChangePlaceName(userSearchApply.PlaceName);
//     }
//     // onLoadingChange(false)
//   }, [userLocations, userSearchApply]);

  useEffect(() => {
    if (userGetRestaurant) {
      onLoadingChange(true);
    }
  }, [userGetRestaurant]);

  useEffect(() => {
    if (orderAccept.order) {
            onChangeStatus(true);
    }
  }, [orderAccept]);

// const onRefresh = React.useCallback(() => {
//     if(userLatitudeLongitude.lat && userLatitudeLongitude.long){
//         getRestaurant(userLatitudeLongitude.lat, userLatitudeLongitude.long, 30)
//     }
//         setRefreshing(true);
    
//     wait(2000).then(() => setRefreshing(false));
// }, [userLatitudeLongitude,userLocations]);

return (
    <View style={{width: '100%', height: '100%', backgroundColor:'white'}}>
            <View style={{
                            flexDirection:'row',
                            alignItems:'center', 
                            justifyContent:'center', 
                            width: '100%',
                            position:'absolute',
                            height: '20%',
                            top: 10
                        }}>
                                            <Searchbar
                                                    placeholder="Search "
                                                    onChangeText={onChangeSearch}
                                                    value={searchQuery}
                                                    style={{
                                                      borderRadius: 20, width: '90%',  borderColor:'#f54749', borderWidth:1,
                                                      shadowColor: "#000",
                                                      shadowOffset: {
                                                          width: 0,
                                                          height: 2,
                                                      },
                                                      shadowOpacity: 0.25,
                                                      shadowRadius: 3.84,
                                                      elevation: 5,
                                                  }}
                                            />
                      </View>
        <StatusBar translucent backgroundColor="#f54749" />
                <View style={{width: '100%', height: '80%', bottom: 0, position: 'absolute', alignItems:'center'}} >
                    <FlatList
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={refreshing}
                        //         onRefresh={onRefresh}
                        //         titleColor='#f54749'
                        //         tintColor="#f54749"
                        //         progressBackgroundColor= 'white'
                        //         style={{}}
                        //     />
                        // }
                        data={data}
                        keyExtractor={item => item.restaurant_id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        key={item => item.restaurant_id}
                        initialNumToRender={7}
                        style={{position: 'relative', backgroundColor:'white'}}
                        scrollEnabled
                        bounces
                        bouncesZoom
                        ListFooterComponent={
                            <View style={{height: 100}}>
                            </View>
                        }
                        // maintainVisibleContentPosition
                        renderItem={({item, index}) => (
                        <Restaurants
                            RestaurantID={item.restaurant_id}
                            Lat={item.restaurant_latitude}
                            Long={item.restaurant_longitude}
                            Title={item.restaurant_name}
                            Description={item.restaurant_subtitle}
                            Images={item.restaurant_image}
                            Ratings={item.rating}
                            Reviews={item.totat_reviews}
                            Distance={item.distance}
                            Status={item.restaurant_status}
                            Address={item.restaurant_address}
                            CloseTime={item.restaurant_close_time}
                            OpenTime={item.restaurant_open_time}
                            Phone={item.restaurant_phone}
                            Email={item.restaurant_email}
                            Navigation={navigation}
                            screen={"showall"}
                        />
                    )}
                />
        </View>
      
    </View>
  );
};

// nearMeUsers
function mapStateToProps({
  userLocations,
  userSearchApply,
  userGetRestaurant,
  placeOrderStatus,
  orderAccept,
  userLatitudeLongitude,firebaseData
}) {
  return {
    userLocations,
    userSearchApply,
    userGetRestaurant,
    placeOrderStatus,
    orderAccept,
    userLatitudeLongitude,firebaseData
  };
}

export default connect(mapStateToProps, actions)(ShowAllRestaurant);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '103%',
    backgroundColor: 'white',
  },
});

{
  /* <View style={{ top: 10, position: 'relative', width:'100%', height: 100}}><ActivityIndicator size="large" animating={true} color="#f54749" /></View>  */
}


// {!status ? (
//     <View
//       style={{
     
//         bottom: 80,
//         right: 10,
//         position: 'absolute',
      
//         // backgroundColor: '#f54749',
//       }}>
//           <Loop />
//       {/* <TouchableOpacity onPress={()=> navigation.navigate('ProcessStack')} style={{ borderRadius: 12, backgroundColor:'#f54749', alignItems:'center', justifyContent:'center', margin: 10, padding: 20}}>
//                         <TextSample 
//                                                                         Label={"+"} 
//                                                                         Color="white" 
//                                                                         Size={hp("2%")} 
//                                                                         TextAlign='left'
//                                                                         NumberOfLines={3} 
//                                                                         Font="Overpass-Bold"
//                                                                         TextDecorationLine='none'
//                                                                         TextTransform='none'
//                             /> 
//                     </TouchableOpacity> */}
//     </View>
//   ) : null}