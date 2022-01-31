import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Badge } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE,Marker} from "react-native-maps";
import { markers, mapDarkStyle, mapStandardStyle } from './../../../model/mapData';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppText from '../../Components/AppText';
import { Rating } from 'react-native-elements';
import UserProfileMarker from './../../Components/UserProfileMarker'
import YourImage from './../../Assets/Images/pic5.png'
import { Avatar } from 'react-native-elements';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.420;
const SPACING_FOR_CARD_INSET = width * 0.055 - 10;

const UserMap = ({navigation, route, props}) => {


  const initialMapState = {
    markers,
    region: {
                  latitude: 24.794208,
                  longitude: 67.062948,
                  latitudeDelta: 0.025,
                  longitudeDelta: 0.025,
              },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    // console.log(props)
    // GETNearPlace()
    console.log(_map)
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const GETNearPlace = () => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + 24.794208 + ',' + 67.062948 + '&radius=300&type=restaurant&key=AIzaSyBTkGKmNPWRxzKC-BKFy96mfGtfPrJf_jU';
    fetch(url)
        .then((response) => response.json())
        .then((JsonResponse) => {
            // console.log(JsonResponse)

        })
        .catch((error) => {
            alert('error')
        });
  }


  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }


  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1.1, 1.1, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

    const onRegionChange = (mark) => {
        const Delta = 0.025
        changeCoords({
            latitude:mark.nativeEvent.coordinate.latitude,
            longitude: mark.nativeEvent.coordinate.longitude,
            latitudeDelta: Delta,
            longitudeDelta: Delta
        })
       
    }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  // const size = zoomLevel <= 10 ? 40 : 80;
  return (
    <View style={styles.container}>
      <MapView
        // minZoomLevel={300}
        // zoomControlEnabled
    
        onRegionChange={()=> console.log(_map.current.props)}
        onRegionChangeComplete={()=> console.log(_map.current.props)}
        minZoomLevel={10}
        maxZoomLevel={100}
        initialRegion={state.region}
        onMarkerDragEnd={onRegionChange}
        ref={_map}
        initialRegion={state.region}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
      >
           <Marker
            stopPropagation={false}
            style={{position:'absolute'}}
              coordinate={{ "latitude": state.region.latitude,
              "longitude": state.region.longitude }}
              title={"Your Location"} >
              {

              }
                          <UserProfileMarker source={YourImage} />
            </Marker>

        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
              <Animated.View style={{  backgroundColor:'#EA2C2E', borderWidth: 1, borderColor: '#EA2C2E', borderRadius: 50, padding:0,alignItems:'center' }}>
              
            
                 <Animated.Image
                  source={marker.profileImage}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
             </Animated.View>
              </Animated.View>
            </MapView.Marker>
          );
        })}

      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {state.markers.map((marker, index) =>(
          <TouchableOpacity  key={index} 
          onPress={()=> navigation.navigate('OfferADrink')}
          >
          <View style={styles.card}>
            <View style={styles.imageView}>
            <Avatar
                rounded
                size='large'
                source={marker.profileImage}
            />
               <Badge 
                    badgeStyle={{height:12,width: 12, borderRadius:50, borderColor: 'white', borderWidth: 1, position: 'absolute'}}
                    status='success'
                    containerStyle={{ position: 'absolute', top: 25, right: 55 }}
                />
              {/* <Image 
                source={marker.image}
                style={styles.cardImage}
                resizeMode='cover'
              /> */}
            </View>
            <View style={styles.textContent}>
            <AppText nol={1} textAlign="left" family="Overpass-Regular" size={hp("1.6%")} color="black" Label={marker.name} />
            {/* <AppText nol={1} textAlign="left" family="Overpass-Regular" size={hp("1.3%")} color="grey" Label={marker.description} /> */}
              <View style={{justifyContent: 'space-between', flexDirection:'row', alignItems:'center'}}> 
                  {/* <Rating
                      defaultRating={1}
                      type='star'
                      ratingColor='#3498db'
                      ratingBackgroundColor='#c8c7c8'
                      ratingCount={5}
                      readonly
                      startingValue={marker.rating}
                      imageSize={15}
                      style={{ paddingVertical: 10,  }}
                    /> */}
                    <AppText nol={3} family="Overpass-Regular" size={hp("1.4%")} color="grey" Label={marker.Address} />
                     {/* <AppText nol={1} family="Overpass-Regular" size={hp("1.8%")} color="grey" Label={marker.distance} /> */}
                </View>
                <AppText nol={1} family="Overpass-Regular" size={hp("1.4%")} color="grey" Label={marker.distance} />
            </View>
          </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

    </View>
  );
};

export default UserMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView:{
    padding:5,
    borderRadius: 6,
    height: hp('18%'),
    justifyContent: 'center',
    alignContent:'center', 
    alignItems:'center',
    alignSelf:'center',backgroundColor: '#EA2C2E',
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
    
  },

  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    // shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 7,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 0,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    height: CARD_HEIGHT,
    width: 150,
    overflow: "hidden",
    marginBottom: 100,
    borderRadius:8,

    
    
  
    
  },
  cardImage: {
    flex: 3,
    margin: 2,
    alignSelf: "center",
   
  },
  textContent: {
    flex: 2,
    padding: 10,
    textAlign:'left',

  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    // alignItems: "center",
    // justifyContent: "center",
    // width:50,
    // height:50,
    backgroundColor:'#EA2C2E',
    borderWidth: 1,
     borderColor: '#EA2C2E', borderRadius: 50,
      padding:0,
      alignItems:'center'
  },
  marker: {
    width: 20,
    height: 20,
                                                                                                                                  
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});
